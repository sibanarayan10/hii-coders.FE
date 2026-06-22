import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import SockJS from 'sockjs-client';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useAuth } from './AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type SubmissionCallback = (result: any) => void;

interface SubmissionWebSocketContextType {
  /**
   * Subscribe to real-time updates for a submission.
   * Safe to call multiple times — only one socket is ever open.
   */
  subscribe: (submissionId: string, callback: SubmissionCallback) => void;
  /** Stop listening for a specific submission (e.g. on card unmount) */
  unsubscribe: (submissionId: string) => void;
  connected: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SubmissionWebSocketContext = createContext<SubmissionWebSocketContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SubmissionWebSocketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  // Map of submissionId → active STOMP subscription
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());
  // Pending subscriptions requested before the client connected
  const pendingRef = useRef<Map<string, SubmissionCallback>>(new Map());

  // ── Connect once when user is authenticated ───────────────────────────────

  useEffect(() => {
    if (!isAuthenticated) return;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_SUBMISSION_BACKEND_URL}/ws`),
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        // Flush any subscriptions that were requested before the socket opened
        pendingRef.current.forEach((callback, submissionId) => {
          doSubscribe(client, submissionId, callback);
        });
        pendingRef.current.clear();
      },

      onDisconnect: () => {
        setConnected(false);
        subscriptionsRef.current.clear();
      },

      onStompError: (frame) => {
        console.error('[SubmissionWS] STOMP error:', frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      subscriptionsRef.current.clear();
      pendingRef.current.clear();
    };
  }, [isAuthenticated]);

  // ── Internal subscribe helper ─────────────────────────────────────────────

  const doSubscribe = (client: Client, submissionId: string, callback: SubmissionCallback) => {
    // Avoid duplicate subscriptions
    if (subscriptionsRef.current.has(submissionId)) return;

    const sub = client.subscribe(`/topic/submission/${submissionId}`, (msg) => {
      const body = JSON.parse(msg.body);
      callback(body);
    });

    subscriptionsRef.current.set(submissionId, sub);
  };

  // ── Public API ────────────────────────────────────────────────────────────

  const subscribe = useCallback((submissionId: string, callback: SubmissionCallback) => {
    const client = clientRef.current;

    if (client?.connected) {
      doSubscribe(client, submissionId, callback);
    } else {
      // Queue it — will be flushed in onConnect
      pendingRef.current.set(submissionId, callback);
    }
  }, []);

  const unsubscribe = useCallback((submissionId: string) => {
    const sub = subscriptionsRef.current.get(submissionId);
    if (sub) {
      sub.unsubscribe();
      subscriptionsRef.current.delete(submissionId);
    }
    pendingRef.current.delete(submissionId);
  }, []);

  return (
    <SubmissionWebSocketContext.Provider value={{ subscribe, unsubscribe, connected }}>
      {children}
    </SubmissionWebSocketContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSubmissionWebSocket() {
  const ctx = useContext(SubmissionWebSocketContext);
  if (!ctx)
    throw new Error('useSubmissionWebSocket must be used inside SubmissionWebSocketProvider');
  return ctx;
}
