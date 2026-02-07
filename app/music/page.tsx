import { sanityFetch } from "@/sanity/lib/fetch";
import { ALBUMS_QUERY } from "@/sanity/lib/queries";
import { AlbumWithUrls } from "@/types/sanity";
import Image from "next/image";
import AlbumCard from "../components/music/AlbumCard";
import { uiIndie } from "../ui/classes";

export default async function MusicPage() {
    const albums: AlbumWithUrls[] = await sanityFetch({
        query: ALBUMS_QUERY,
        revalidate: 3600,
    });

    return (
        <div className={`${uiIndie.page}`}>
            <div className={`pt-24 px-10 `}>
                {/* Split layout container */}
                <div
                    className={`${uiIndie.section} relative px-10 flex flex-col lg:flex-row lg:gap-10 h-full `}
                >
                    {/* LEFT COLUMN: Layout spacer for responsive grid (1/3 width on desktop) */}
                    <aside className="lg:w-1/3 flex-shrink-1  sticky lg:top-36 flex flex-col">
                        {/* Header */}
                        <header className="space-y-3 mb-16">
                                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-700">
                                    Music
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                                    DISCOGRAPHY
                                </h1>
                                <div className="mt-6 border-t border-zinc-950/15" />
                        </header>
                        {/* Desktop: fixed positioned image */}
                        <div className="lg:w-[calc((100vw-25rem)/3)] lg:max-w-md">
                            <div className="flex items-center justify-center p-8">
                                <div className="relative w-full h-[50vh] bg-zinc-50 border border-black/45 -rotate-6">
                                    <Image
                                        src="/images/widemouth-brand-image-1.png"
                                        alt="Widemouth"
                                        fill
                                        priority
                                        className="object-contain"
                                        sizes="400px"
                                    />
                                    <HandStar className="absolute -right-2 -top-2 md:-right-3 md:-top-3 rotate-12 scale-[2.2] md:scale-[2.5] pointer-events-none z-10" />
                                    <HandStar className="absolute -left-2 -bottom-2 md:-left-3 md:-bottom-3 -rotate-6 scale-[1.9] md:scale-[2.1] pointer-events-none z-10" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: Scrollable album content (2/3 width on desktop) */}
                    <main className="lg:w-2/3 px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
                        <div className="w-full max-w-2xl mx-auto px-24">
                            

                            {/* Albums - single column, scrolling one by one */}
                            <section className="space-y-24 md:space-y-32">
                                {albums && albums.length > 0 ? (
                                    albums.map((album) => (
                                        <AlbumCard
                                            key={album._id}
                                            album={album}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <p className="text-[15px] text-zinc-500">
                                            No albums available yet.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
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
