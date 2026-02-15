import { sanityFetch } from "@/sanity/lib/fetch";
import { ALBUMS_QUERY } from "@/sanity/lib/queries";
import { AlbumWithUrls } from "@/types/sanity";
import AlbumCard from "../components/music/AlbumCard";
import { uiIndie } from "../ui/classes";
import CollageStylePhoto from "../components/layout/CollageStylePhoto";

export default async function MusicPage() {
    const albums: AlbumWithUrls[] = await sanityFetch({
        query: ALBUMS_QUERY,
        revalidate: 300,
    });

    return (
        <div className={`${uiIndie.page} relative`}>
            <div className=" px-4 lg:px-10 relative">
                {/* Split layout container */}
                <div className={`${uiIndie.section} relative flex flex-col items-center lg:gap-8 h-full`}>
                    {/* LEFT COLUMN: Sticky polaroid image */}
                    {/* <aside className="lg:w-1/3 shrink-0 lg:sticky lg:top-32x lg:self-start h-fit">
                        <div className="flex items-center justify-center lg:justify-center lg:items-center lg:h-[calc(100vh-12rem)] p-4 lg:p-8 ">
                            <div className="relative w-[20vw] max-w-sm lg:max-w-md aspect-3/4 bg-zinc-50 border border-black/45 -rotate-6 shadow-lg">
                                <Image
                                    src="/images/widemouth-brand-image-1.png"
                                    alt="Widemouth"
                                    fill
                                    priority
                                    className="object-contain p-4"
                                    sizes="(max-width: 768px) 90vw, 400px"
                                />
                                <HandStar className="absolute -right-2 -top-2 md:-right-3 md:-top-3 rotate-12 scale-[2.2] md:scale-[2.5] pointer-events-none z-10" />
                                <HandStar className="absolute -left-2 -bottom-2 md:-left-3 md:-bottom-3 -rotate-6 scale-[1.9] md:scale-[2.1] pointer-events-none z-10" />
                            </div>
                        </div>
                    </aside> */}

                    {/* RIGHT COLUMN: Scrollable album content */}
                    <main className="w-full px-6 sm:px-8 lg:px-12 py-12 lg:py-16  ">
                        {/** on that collage shit */}
                        <CollageStylePhoto
                            src="/images/decoration7.png"
                            width={350}
                            height={350}
                            className="-left-[9%] top-[7rem] hidden md:block"
                        />
                        <CollageStylePhoto
                            src="/images/two-kids-2.png"
                            width={350}
                            height={350}
                            className="-left-[2%] top-[32rem] hidden md:block"
                        />
                        <CollageStylePhoto
                            src="/images/two-kids-1.png"
                            width={400}
                            height={400}
                            className="-right-[17%] md:top-[54rem] lg:top-[64rem] hidden md:block"
                        />
                        <CollageStylePhoto
                            src="/images/girl-with-gun.png"
                            width={300}
                            height={300}
                            className="-right-[2%] md:top-[23rem] lg:top-[20rem] hidden md:block"
                        />
                        <CollageStylePhoto
                            src="/images/decoration1.png"
                            width={400}
                            height={400}
                            className="right-[7%] top-[39rem] hidden md:block"
                        />

                        <CollageStylePhoto
                            src="/images/decoration0.png"
                            width={200}
                            height={200}
                            className="-left-[5%] top-[57rem] hidden md:block"
                        />
                        
                        
                        <CollageStylePhoto
                            src="/images/decoration4.png"
                            width={400}
                            height={400}
                            className="right-[7%] top-[39rem] hidden md:block"
                        />
                        
                        
                        
                        <CollageStylePhoto
                            src="/images/decoration2.png"
                            width={300}
                            height={300}
                            className="-left-[5%] top-[93rem] hidden md:block"
                        />

                        <CollageStylePhoto
                            src="/images/decoration3.png"
                            width={400}
                            height={400}
                            className="-right-[7%] top-[98rem] hidden md:block"
                        />
                        <CollageStylePhoto
                            src="/images/decoration6.png"
                            width={150}
                            height={150}
                            className="right-[7%] top-[113rem] hidden md:block"
                        />

                        <CollageStylePhoto
                            src="/images/decoration5.png"
                            width={400}
                            height={400}
                            className="-left-[3%] top-[105rem] hidden md:block"
                        />
                        <CollageStylePhoto
                            src="/images/decoration8.png"
                            width={200}
                            height={200}
                            className="left-[6%] top-[75rem] hidden md:block"
                        />

                        {/* Albums - single column, scrolling one by one */}
                        <section className="space-y-24 md:space-y-32 w-full flex flex-col items-center ">
                            {albums && albums.length > 0 ? (
                                albums.map((album) => (
                                    <AlbumCard
                                        key={album._id}
                                        album={album}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 w-full">
                                    <p className="text-[15px] text-zinc-500">
                                        No albums available yet.
                                    </p>
                                </div>
                            )}
                        </section>

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
