import { useCallback, useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    const timeoutId = useRef("");

    const reset = useCallback(() => {
        if (timeoutId.current) clearInterval(timeoutId.current);

        function tick() {
            savedCallback.current();
        }
        const id = setInterval(tick, delay);
        timeoutId.current = id;
    }, [delay]);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay !== null) {
            reset();
            return () => clearInterval(timeoutId.current);
        }
    }, [delay, reset]);

    return { reset };
};
