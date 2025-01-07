import { useState, useEffect } from 'react';

const IDLE_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export function useIdleTimer() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsIdle(false);
      timeoutId = setTimeout(() => setIsIdle(true), IDLE_TIME);
    };

    // Events that reset the timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer));

    // Initial timer
    resetTimer();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, []);

  return isIdle;
}