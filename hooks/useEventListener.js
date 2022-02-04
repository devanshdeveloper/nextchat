import { useEffect, useRef } from "react";

export default function useEventListener(eventType, callback, element) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = element || window;
    const handler = (e) => callbackRef.current(e);
    el.addEventListener(eventType, handler);
    return () => el.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
