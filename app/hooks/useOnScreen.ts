// app/hooks/useOnScreen.ts
"use client";
import { useEffect, useState } from "react";

export function useOnScreen<T extends Element>(ref: React.RefObject<T>, rootMargin = "200px") {
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (!ref) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return onScreen;
}
