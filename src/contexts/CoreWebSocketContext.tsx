import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import SockJS from 'sockjs-client';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useAuth } from './AuthContext';

interface PlatformPresence {
  onlineCount: number;
  problemViewerCounts: Record<string, number>;
}

interface CoreWebSocketContextType {
  onlineCount: number;
  getProblemViewerCount: (problemId: string) => number;
  enterProblem: (problemId: string) => void;
  leaveProblem: (problemId: string) => void;
  subscribeToProblem: (problemId: string) => void;
  unsubscribeFromProblem: (problemId: string) => void;
  connected: boolean;
}

const CoreWebSocketContext = createContext<CoreWebSocketContextType | null>(null);

export function CoreWebSocketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const clientRef = useRef<Client | null>(null);
  const problemSubRef = useRef<StompSubscription | null>(null);
  const activeProblemRef = useRef<string | null>(null);

  // ✅ FIX 1: Buffer any enterProblem call that arrives before onConnect fires.
  // On refresh the hook runs immediately but the socket isn't ready yet —
  // we store the pending problemId and flush it inside onConnect.
  const pendingEnterRef = useRef<string | null>(null);

  const [connected, setConnected] = useState(false);
  const [presence, setPresence] = useState<PlatformPresence>({
    onlineCount: 0,
    problemViewerCounts: {},
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`),
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        // Subscribe to platform-wide presence
        client.subscribe('/topic/presence/platform', (msg) => {
          const data: PlatformPresence = JSON.parse(msg.body);
          setPresence(data);
        });

        // ✅ FIX 1: Re-subscribe to the problem topic and re-enter the problem
        // on every (re)connect — this covers both fresh loads and refreshes.
        const problemId = pendingEnterRef.current ?? activeProblemRef.current;
        if (problemId) {
          // Re-subscribe to problem topic
          problemSubRef.current?.unsubscribe();
          problemSubRef.current = client.subscribe(
            `/topic/presence/problem/${problemId}`,
            (msg) => {
              const data: { problemId: string; viewerCount: number } = JSON.parse(msg.body);
              setPresence((prev) => ({
                ...prev,
                problemViewerCounts: {
                  ...prev.problemViewerCounts,
                  [data.problemId]: data.viewerCount,
                },
              }));
            }
          );

          // Tell the server we are viewing this problem
          client.publish({
            destination: '/app/presence/enter',
            body: JSON.stringify({ problemId }),
          });

          activeProblemRef.current = problemId;
          pendingEnterRef.current = null;
        }
      },

      onDisconnect: () => {
        setConnected(false);
      },

      onStompError: (frame) => {
        console.error('[CoreWS] STOMP error:', frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [isAuthenticated]);

  // ── Problem subscription ──────────────────────────────────────────────────

  const subscribeToProblem = useCallback((problemId: string) => {
    const client = clientRef.current;

    if (!client?.connected) {
      // ✅ FIX 1: Not connected yet — buffer it, onConnect will flush
      pendingEnterRef.current = problemId;
      return;
    }

    if (activeProblemRef.current === problemId) return;

    problemSubRef.current?.unsubscribe();
    problemSubRef.current = client.subscribe(
      `/topic/presence/problem/${problemId}`,
      (msg) => {
        const data: { problemId: string; viewerCount: number } = JSON.parse(msg.body);
        setPresence((prev) => ({
          ...prev,
          problemViewerCounts: {
            ...prev.problemViewerCounts,
            [data.problemId]: data.viewerCount,
          },
        }));
      }
    );

    activeProblemRef.current = problemId;
  }, []);

  const unsubscribeFromProblem = useCallback((_problemId: string) => {
    problemSubRef.current?.unsubscribe();
    problemSubRef.current = null;
    activeProblemRef.current = null;
    pendingEnterRef.current = null;
  }, []);

  // ── Publish enter / leave ─────────────────────────────────────────────────

  const enterProblem = useCallback((problemId: string) => {
    const client = clientRef.current;

    if (!client?.connected) {
      // ✅ FIX 1: Buffer — will be sent in onConnect
      pendingEnterRef.current = problemId;
      return;
    }

    client.publish({
      destination: '/app/presence/enter',
      body: JSON.stringify({ problemId }),
    });
  }, []);

  const leaveProblem = useCallback((problemId: string) => {
    const client = clientRef.current;
    if (!client?.connected) return;

    client.publish({
      destination: '/app/presence/leave',
      body: JSON.stringify({ problemId }),
    });
  }, []);

  const getProblemViewerCount = useCallback(
    (problemId: string) => presence.problemViewerCounts[problemId] ?? 0,
    [presence]
  );

  return (
    <CoreWebSocketContext.Provider
      value={{
        onlineCount: presence.onlineCount,
        getProblemViewerCount,
        enterProblem,
        leaveProblem,
        subscribeToProblem,
        unsubscribeFromProblem,
        connected,
      }}
    >
      {children}
    </CoreWebSocketContext.Provider>
  );
}

export function useCoreWebSocket() {
  const ctx = useContext(CoreWebSocketContext);
  if (!ctx) throw new Error('useCoreWebSocket must be used inside CoreWebSocketProvider');
  return ctx;
}
