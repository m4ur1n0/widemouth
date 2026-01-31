import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { SanityImage } from "@/types/sanity"

export function SanityResponsiveImage({
  image,
  alt = "",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image: SanityImage
  alt?: string
  className?: string
  sizes?: string
}) {
  if (!image?.asset) return null

  const src = urlFor(image).width(2000).quality(80).auto("format").url()

  return (
    <div className={`relative w-full aspect-1 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  )
}
