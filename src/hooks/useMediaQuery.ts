import { useEffect, useState } from "react";

// Tracks whether a CSS media query currently matches, updating live on
// resize. Useful for the rare case where a layout decision can't be made
// with CSS alone (e.g. Recharts' Pie/Legend props, which aren't driven by
// stylesheets).
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    listener();
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
