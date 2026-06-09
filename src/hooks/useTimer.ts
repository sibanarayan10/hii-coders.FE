import { useCallback, useEffect, useRef, useState } from 'react';

export type TimerMode = 'stopwatch' | 'countdown';

export interface UseTimerReturn {
  mode: TimerMode;
  setMode: (m: TimerMode) => void;
  seconds: number;           // current elapsed (stopwatch) or remaining (countdown)
  isRunning: boolean;
  isExpired: boolean;        // countdown hit 0
  start: () => void;
  pause: () => void;
  reset: () => void;
  setCountdownTarget: (totalSeconds: number) => void;
  countdownTarget: number;   // the configured duration in seconds
}

export function useTimer(): UseTimerReturn {
  const [mode, setModeState] = useState<TimerMode>('stopwatch');
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [countdownTarget, setCountdownTargetState] = useState(25 * 60); // default 25 min

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const start = useCallback(() => {
    if (isRunning) return;
    setIsExpired(false);
    setIsRunning(true);
  }, [isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsExpired(false);
    setSeconds(mode === 'countdown' ? countdownTarget : 0);
  }, [mode, countdownTarget]);

  const setMode = useCallback((m: TimerMode) => {
    setIsRunning(false);
    setIsExpired(false);
    setModeState(m);
    setSeconds(m === 'countdown' ? countdownTarget : 0);
  }, [countdownTarget]);

  const setCountdownTarget = useCallback((total: number) => {
    setCountdownTargetState(total);
    setSeconds(total);
    setIsRunning(false);
    setIsExpired(false);
  }, []);

  // Initialize seconds when mode or countdownTarget changes
  useEffect(() => {
    setSeconds(mode === 'countdown' ? countdownTarget : 0);
  }, [mode, countdownTarget]);

  useEffect(() => {
    if (!isRunning) { clearTimer(); return; }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (mode === 'stopwatch') return prev + 1;
        if (prev <= 1) {
          setIsRunning(false);
          setIsExpired(true);
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, mode]);

  return { mode, setMode, seconds, isRunning, isExpired, start, pause, reset, setCountdownTarget, countdownTarget };
}

export function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
