import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function tick() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
