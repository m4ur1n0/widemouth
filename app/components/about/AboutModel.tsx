"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

let modelViewerLoaded = false;

type Props = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  rotationPerSecond?: string;

  // NEW: behavior controls
  selected?: boolean;      // rotate constantly while selected
  pageVisible?: boolean;   // pass from parent; stops rotation when tab hidden
  pauseWhenOffscreen?: boolean; // optional (default true)
};

export type ModelViewerRef = {
  reset: () => void;
};

function useOnScreen<T extends Element>(
  ref: React.RefObject<T | null> | null,
  enabled: boolean,
  rootMargin = "200px"
) {
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (!ref) return;
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, rootMargin]);

  return enabled ? onScreen : true;
}

const ModelViewer = forwardRef<ModelViewerRef, Props>(function ModelViewer(
  {
    src,
    poster,
    alt,
    className,
    style,
    rotationPerSecond = "30deg",
    selected = false,
    pageVisible = true,
    pauseWhenOffscreen = true,
  },
  ref
) {
  const [ready, setReady] = useState(modelViewerLoaded);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mvRef = useRef<any>(null);

  // wrapper used for hover + intersection observer
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // optional: pause when scrolled away
  const onScreen = useOnScreen(wrapRef, pauseWhenOffscreen);

  useEffect(() => {
    if (!modelViewerLoaded) {
      import("@google/model-viewer").then(() => {
        modelViewerLoaded = true;
        setReady(true);
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({
    reset() {
      const el = mvRef.current;
      if (!el) return;

      el.cameraOrbit = "10deg 75deg 5m";
      el.fieldOfView = "30deg";
      el.modelRotation="0deg 0deg 0deg"

      if (el.jumpCameraToGoal) {
        el.jumpCameraToGoal();
      }
    },
  }));

  // Rotation policy:
  // - never rotate if tab hidden
  // - never rotate if offscreen (optional)
  // - rotate if selected OR hovered
  const shouldRotate = ready && pageVisible && onScreen && (selected || hovered);

  useEffect(() => {
    const el = mvRef.current;
    if (!el) return;

    if (shouldRotate) {
      el.setAttribute("auto-rotate", "");
      // keep your configured speed
      el.setAttribute("rotation-per-second", rotationPerSecond);
    } else {
      el.removeAttribute("auto-rotate");
    }
  }, [shouldRotate, rotationPerSecond]);

  if (!ready) {
    return null;
  }

  return (
    <div
      ref={wrapRef}
      className="w-full h-full touch-none"
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}

    >
      {React.createElement("model-viewer", {
        ref: mvRef,
        src,
        poster,
        alt: alt ?? "",
        // NOTE: do NOT hardcode auto-rotate true anymore.
        // We toggle it via the effect above.
        "rotation-per-second": rotationPerSecond,
        "camera-controls": true,
        "disable-zoom": true,
        "disable-pan": true,
        "disable-tap": true,
        "interaction-prompt": "none",
        "autoRotateDelay": 0,
        loading: "lazy",
        exposure: "1",
        "shadow-intensity": "0",
        class: className,
        style: { ...style, width: "100%", height: "100%", touchAction: "none" },
        // onpointerenter: () => setHovered(true),
        // onpointerleave: () => setHovered(false)
      })}
    </div>
  );
});

export default ModelViewer;
