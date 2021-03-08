import { useState, useCallback, useRef } from 'react';

export function useCounter(initialValue: number, ms: number) {
  const [count, setCount] = useState(initialValue);
	const [finished, setFinished] = useState(false);
  const intervalRef: any = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
		const startTime = Date.now();
		const counter = initialValue;
		setFinished(false);

    intervalRef.current = setInterval(() => {
      const seconds = Math.round((Date.now() - startTime) / 1000);
      const lapseSeconds = counter - seconds;
			// set counter
			setCount(lapseSeconds);
			// validate user status
			if (Number(seconds) >= Number(counter)) {
				stop();
				setFinished(true);
			}
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
		setFinished(false);
    setCount(initialValue);
		stop();
		start();
  }, []);
  return { count, start, stop, reset, finished };
}
