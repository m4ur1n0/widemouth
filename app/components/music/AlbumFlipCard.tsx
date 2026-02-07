"use client"

import { useState } from "react"
import { SanityImage } from "@/types/sanity"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"

interface AlbumFlipCardProps {
  title: string
  frontCover: SanityImage
  backCover?: SanityImage
  tracklist?: { title: string }[]
}

export default function AlbumFlipCard({
  title,
  frontCover,
  backCover,
  tracklist,
}: AlbumFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const frontSrc = frontCover?.asset
    ? urlFor(frontCover).width(1200).quality(85).format('webp').url()
    : null

  const backSrc = backCover?.asset
    ? urlFor(backCover).width(1200).quality(85).format('webp').url()
    : frontSrc // Fallback to front if no back cover

  // Scale tracklist text based on number of songs
  const trackCount = tracklist?.length || 0
  const getTracklistTextSize = () => {
    if (trackCount === 0) return "text-[13px]"
    if (trackCount <= 8) return "text-[14px] md:text-[15px]"
    if (trackCount <= 15) return "text-[13px] md:text-[14px]"
    if (trackCount <= 25) return "text-[12px] md:text-[13px]"
    return "text-[11px] md:text-[12px]" // max density for very long albums
  }

  const tracklistTextSize = getTracklistTextSize()

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleFlip()
    }
  }

  return (
    <div className="flip-card-container group relative">
      <button
        type="button"
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
        aria-label={`Flip album sleeve for ${title}`}
        className="flip-card-trigger w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/40 focus-visible:ring-offset-2 rounded-sm"
      >
        {/* Perspective wrapper */}
        <div className="flip-card-perspective w-full aspect-square relative">
          {/* 3D rotating inner container */}
          <div
            className={`flip-card-inner relative w-full h-full transition-transform duration-700 ease-out ${
              isFlipped ? "flip-card-flipped" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front face */}
            <div
              className="flip-card-face flip-card-front absolute inset-0 border border-zinc-950/25 bg-zinc-100 overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.4)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {frontSrc && (
                <Image
                  src={frontSrc}
                  alt={`${title} front cover`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 90vw"
                  className="object-cover"
                />
              )}
              {/* Subtle glare overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Back face */}
            <div
              className="flip-card-face flip-card-back absolute inset-0 border border-zinc-950/25 bg-zinc-100 overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {backSrc && (
                <Image
                  src={backSrc}
                  alt={`${title} back cover`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 90vw"
                  className="object-cover"
                />
              )}

              {/* Overlay for tracklist readability */}
              <div className="absolute inset-0 bg-zinc-50/75 backdrop-blur-[2px]" />

              {/* Tracklist */}
              <div className="absolute inset-0 p-5 md:p-6 lg:p-8 overflow-auto">
                {tracklist && tracklist.length > 0 ? (
                  <div className="space-y-1">
                    <h3 className="text-[11px] uppercase tracking-[0.2em] text-zinc-700 mb-3 md:mb-4">
                      Tracklist
                    </h3>
                    <ol className="space-y-1.5">
                      {tracklist.map((track, idx) => (
                        <li
                          key={idx}
                          className={`${tracklistTextSize} leading-snug text-zinc-950 flex gap-2`}
                        >
                          <span className="text-zinc-600 font-mono text-[11px] min-w-[1.5rem] flex-shrink-0">
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="break-words">{track.title}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-[12px] text-zinc-500 italic">
                      Tracklist unavailable
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>
      </button>

      <style jsx>{`
        /* Perspective for 3D effect */
        .flip-card-perspective {
          perspective: 1000px;
        }

        /* Hover flip on desktop (non-touch devices) */
        @media (hover: hover) and (pointer: fine) {
          .flip-card-trigger:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
        }

        /* Manual flip (touch devices + click) */
        .flip-card-flipped {
          transform: rotateY(180deg) !important;
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .flip-card-inner {
            transition: opacity 0.8s ease !important;
          }

          .flip-card-trigger:hover .flip-card-inner,
          .flip-card-flipped {
            transform: none !important;
          }

          .flip-card-trigger:hover .flip-card-front,
          .flip-card-flipped .flip-card-front {
            opacity: 0;
          }

          .flip-card-trigger:hover .flip-card-back,
          .flip-card-flipped .flip-card-back {
            opacity: 1;
          }

          .flip-card-back {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

function HandStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      className={`w-8 h-8 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M25 3 L28 17 L42 18 L30 27 L33 42 L25 34 L17 42 L20 27 L8 18 L22 17 Z"
        fill="#fde047"
        stroke="#a16207"
        strokeWidth="1"
      />
    </svg>
  )
}
