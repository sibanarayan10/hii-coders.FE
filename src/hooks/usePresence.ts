import { useEffect } from 'react';
import { useCoreWebSocket } from '../contexts/CoreWebSocketContext';

/**
 * usePresence — drop into ProblemSolvePage to get live viewer count.
 *
 * Usage:
 *   const { viewerCount, onlineCount } = usePresence(problemId);
 *
 * On mount:
 *   - subscribes to /topic/presence/problem/{problemId}
 *   - sends /app/presence/enter
 * On unmount:
 *   - sends /app/presence/leave
 *   - unsubscribes from the topic
 */
export function usePresence(problemId: string | undefined) {
  const {
    onlineCount,
    getProblemViewerCount,
    enterProblem,
    leaveProblem,
    subscribeToProblem,
    unsubscribeFromProblem,
  } = useCoreWebSocket();

  useEffect(() => {
    if (!problemId) return;

    subscribeToProblem(problemId);
    enterProblem(problemId);

    return () => {
      leaveProblem(problemId);
      unsubscribeFromProblem(problemId);
    };
  }, [problemId]);

  return {
    /** How many users are currently viewing this problem */
    viewerCount: problemId ? getProblemViewerCount(problemId) : 0,
    /** Total users online on the platform */
    onlineCount,
  };
}
