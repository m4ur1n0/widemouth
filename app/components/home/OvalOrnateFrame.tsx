// app/ui/OvalChalkFrame.tsx
"use client";

import Image from "next/image";

export default function OvalChalkFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      <Image
        src="/vectors/oval-frame.svg"
        alt="Ornate Oval Frame"
        fill
        className="object-contain"
        style={{ transform: "rotate(90deg) scale(1.65)" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        loading="eager"
      />
    </div>
  );
}
