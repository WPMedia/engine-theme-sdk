import { useEffect, useRef } from "react";

const useInterval = (callback: Function, delay?: number | null): void => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const savedCallback = useRef<Function>(() => {});

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick(): void {
			savedCallback.current();
		}

		if (delay !== null) {
			const id = setInterval(tick, delay);
			return (): void => clearInterval(id);
		}

		return undefined;
	}, [delay]);
};

export default useInterval;
