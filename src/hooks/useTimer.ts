import { useState, useEffect, useRef, useCallback } from 'react';
import { notification } from 'antd';

const STORAGE_KEY_PREFIX = 'ca:timer';

const buildKey = (problemId: string, suffix: string): string =>
  `${STORAGE_KEY_PREFIX}:${problemId}:${suffix}`;

export type TimerStatus = 'idle' | 'running' | 'paused' | 'expired';

export interface TimerState {
  totalSeconds: number;
  remaining: number;
  status: TimerStatus;
}

export interface UseTimerReturn {
  remaining: number;
  totalSeconds: number;
  status: TimerStatus;
  formattedTime: string;
  progressPercent: number;
  start: (hours: number, minutes: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  toggle: () => void;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

const loadState = (problemId: string): TimerState | null => {
  try {
    const raw = localStorage.getItem(buildKey(problemId, 'state'));
    return raw ? (JSON.parse(raw) as TimerState) : null;
  } catch {
    return null;
  }
};

const saveState = (problemId: string, state: TimerState): void => {
  localStorage.setItem(buildKey(problemId, 'state'), JSON.stringify(state));
};

const clearState = (problemId: string): void => {
  localStorage.removeItem(buildKey(problemId, 'state'));
};

/**
 * useTimer — countdown timer persisted to localStorage.
 *
 * Flow:
 *  idle    → user sets hours/minutes and calls start()
 *  running → ticks down every second, saves state each tick
 *  paused  → interval cleared, state saved
 *  expired → notification fires, resets to idle after dismiss
 */
export const useTimer = (problemId: string): UseTimerReturn => {
  const [state, setState] = useState<TimerState>(() => {
    const saved = loadState(problemId);
    // If it was running when user left, treat it as paused on return
    if (saved && saved.status === 'running') {
      return { ...saved, status: 'paused' };
    }
    return saved ?? { totalSeconds: 0, remaining: 0, status: 'idle' };
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef<TimerState>(state);
  stateRef.current = state;

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onExpire = useCallback(() => {
    clearTick();
    const expired: TimerState = { ...stateRef.current, remaining: 0, status: 'expired' };
    setState(expired);
    saveState(problemId, expired);

    notification.warning({
      message: "Time's up!",
      description: 'Your allocated time for this problem has ended.',
      duration: 0,
      placement: 'topRight',
    });
  }, [problemId]);

  const startTick = useCallback(() => {
    clearTick();
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.remaining <= 1) {
          onExpire();
          return prev;
        }
        const next: TimerState = { ...prev, remaining: prev.remaining - 1 };
        saveState(problemId, next);
        return next;
      });
    }, 1000);
  }, [problemId, onExpire]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTick();
      saveState(problemId, stateRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(
    (hours: number, minutes: number) => {
      const total = hours * 3600 + minutes * 60;
      if (total <= 0) return;
      const next: TimerState = { totalSeconds: total, remaining: total, status: 'running' };
      setState(next);
      saveState(problemId, next);
      startTick();
    },
    [problemId, startTick],
  );

  const pause = useCallback(() => {
    clearTick();
    setState((prev) => {
      const next: TimerState = { ...prev, status: 'paused' };
      saveState(problemId, next);
      return next;
    });
  }, [problemId]);

  const resume = useCallback(() => {
    setState((prev) => {
      const next: TimerState = { ...prev, status: 'running' };
      saveState(problemId, next);
      return next;
    });
    startTick();
  }, [problemId, startTick]);

  const reset = useCallback(() => {
    clearTick();
    clearState(problemId);
    setState({ totalSeconds: 0, remaining: 0, status: 'idle' });
  }, [problemId]);

  const toggle = useCallback(() => {
    if (state.status === 'running') pause();
    else if (state.status === 'paused') resume();
  }, [state.status, pause, resume]);

  const progressPercent =
    state.totalSeconds > 0 ? Math.round((state.remaining / state.totalSeconds) * 100) : 0;

  return {
    remaining: state.remaining,
    totalSeconds: state.totalSeconds,
    status: state.status,
    formattedTime: formatTime(state.remaining),
    progressPercent,
    start,
    pause,
    resume,
    reset,
    toggle,
  };
};
