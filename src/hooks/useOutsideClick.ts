import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
