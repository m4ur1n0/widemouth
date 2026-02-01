"use client";

import { useState } from "react";
import Image from "next/image";
import ModelViewer from "./AboutModel";

const MODEL_SRC = "/models/jamie-gltf-optimized.glb";
const POSTER_SRC = "/models/dummy-poster.webp";

const GALLERY_ITEMS = [
  { id: "model-1", title: "Model 1" },
  { id: "model-2", title: "Model 2" },
  { id: "model-3", title: "Model 3" },
  { id: "model-4", title: "Model 4" },
];

export default function AboutModelGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex w-full justify-center px-4">
      <div className="w-full max-w-4xl md:w-[60%]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {GALLERY_ITEMS.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100"
              >
                {/* {isActive ? ( */}
                  <>
                    <ModelViewer
                      src={MODEL_SRC}
                      poster={POSTER_SRC}
                      alt={item.title}
                      rotationPerSecond="20deg"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    </>
                    {/* <button
                      onClick={() => setActiveId(null)}
                      className="absolute right-3 top-3 rounded-md bg-black/70 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/90"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleCardClick(item.id)}
                    className="group relative h-full w-full cursor-pointer"
                  >
                    <Image
                      src={POSTER_SRC}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-3 py-1.5 text-sm font-medium text-white transition-colors group-hover:bg-black/90">
                      View 3D
                    </span>
                  </button>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
