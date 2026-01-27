"use client";

import React, { useEffect, useState } from "react";

let modelViewerLoaded = false;

type Props = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  rotationPerSecond?: string;
};

export default function ModelViewer({
  src,
  poster,
  alt,
  className,
  style,
  rotationPerSecond = "18deg",
}: Props) {
  const [ready, setReady] = useState(modelViewerLoaded);

  useEffect(() => {
    if (!modelViewerLoaded) {
      import("@google/model-viewer").then(() => {
        modelViewerLoaded = true;
        setReady(true);
      });
    }
  }, []);

  if (!ready) {
    return null;
  }

  return React.createElement("model-viewer", {
    src,
    poster,
    alt: alt ?? "",
    "auto-rotate": true,
    "rotation-per-second": rotationPerSecond,
    "camera-controls": true,
    loading: "lazy",
    exposure: "1",
    "shadow-intensity": "0",
    class: className,
    style,
  });
}
