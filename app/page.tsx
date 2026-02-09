import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, SHOWS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { uiIndie as ui } from "./ui/classes";
import { CountdownTimer } from "./components/CountdownTimer";
import OvalChalkFrame from "./components/home/OvalOrnateFrame";
import CollageStylePhoto from "./components/layout/CollageStylePhoto";
import { Show } from "@/types/sanity";
import SubscribeToSubstack from "./components/home/SubscribeToSubstack";



export default async function Home() {
  const [siteSettings, shows] = await Promise.all([
    sanityFetch({
      query: SITE_SETTINGS_QUERY,
      revalidate: 300,
    }),
    sanityFetch({
      query: SHOWS_QUERY,
      revalidate: 300,
    }) as Promise<Show[]>,
  ]);


  

  return (
    <div className={`${ui.section} flex justify-center relative`}>
      {/* Collage Photos - decorative background elements */}
      {/* <CollageStylePhoto
        src="/images/girl-with-gun.png"
        width={350}
        height={350}
        className="left-[-4%] top-[44rem] hidden md:block"
      />
      <CollageStylePhoto
        src="/images/two-kids-1.png"
        width={400}
        height={400}
        className="right-[-10%] md:top-[96rem] lg:top-[104rem] hidden md:block"
      /> */}

      <CollageStylePhoto
        src="/images/two-kids-2.png"
        width={350}
        height={350}
        className="left-[15%] top-[63rem] hidden md:block"
      />
      <CollageStylePhoto
        src="/images/two-kids-1.png"
        width={400}
        height={400}
        className="right-[10%] md:top-[86rem] lg:top-[102rem] hidden md:block"
      />

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center pt-32 pb-16 px-16 space-y-24 relative z-10">

        {siteSettings?.bandPhoto && (
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-[34rem] aspect-[1.3/1]">
                {/* Band Photo */}
                <Image
                    src={urlFor(siteSettings.bandPhoto)
                    .width(1200)
                    .quality(80)
                    .format('webp')
                    .url()}
                    alt="Band photo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="object-cover rounded-[50%]"
                    quality={90}
                    priority
                />

                {/* Subtle shadow for depth */}
                <div className="absolute inset-0 rounded-[50%] shadow-inner" />

                {/* Ornate Frame Overlay */}
                <OvalChalkFrame className="z-10 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Countdown + Album Cover */}
        <div className="w-full grid grid-cols-2 gap-12 items-start lg:mt-24">
          {/* Left: Countdown */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-mono text-3xl text-zinc-900 tracking-tight">
              {siteSettings?.featuredProject?.timerEnd ? (
                <CountdownTimer datetime={siteSettings.featuredProject.timerEnd} />
              ) : (
                <CountdownTimer datetime={"02/23/2026"} />
              )}
            </div>
            <p className="pl-5 w-full text-gray-800">something&apos;s coming...</p>
          </div>

          {/* Right: Album Cover */}
          <div className="relative my-16">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-zinc-100">
              {siteSettings?.featuredProject?.image && (
                <Image
                  src={urlFor(siteSettings.featuredProject.image)
                    .width(800)
                    .quality(80)
                    .format('webp')
                    .url()}
                  alt={siteSettings.featuredProject.title || "Album"}
                  fill
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="mt-2 text-xs text-zinc-500 text-center">
              {siteSettings?.featuredProject?.title || "coming soon"}
            </div>

            {/* Hand-drawn star stickers */}
            <HandStar className="absolute -right-3 -top-3 rotate-12 scale-[2.5]" />
            <HandStar className="absolute -left-3 -bottom-3 -rotate-6 scale-[2.1]" />
          </div>
        </div>

        {/* Tour Dates */}
        {shows && shows.length > 0 && (
          <div className="w-full space-y-6 my-16">
            <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
              Where You&apos;ll Find Us
            </h2>
            <div className="space-y-3">
              {shows.slice(0, 5).map((show) => (
                <TourDate key={show._id} show={show} />
              ))}
            </div>
          </div>
        )}

        

        <SubscribeToSubstack substackLink={siteSettings.substackLink} />


        {/* Social Links */}
        <div className="flex gap-10 pt-4">
          <SocialIcon href="https://instagram.com" label="Instagram">
            <Instagram />
          </SocialIcon>
          <SocialIcon href="mailto:band@email.com" label="Email">
            <Mail />
          </SocialIcon>
          <SocialIcon href="https://linktr.ee" label="Links">
            <Link />
          </SocialIcon>
          <SocialIcon href="https://spotify.com" label="Spotify">
            <Spotify />
          </SocialIcon>
        </div>

      </main>
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
  );
}

function TourDate({ show }: { show: Show }) {
  const date = new Date(show.datetime);
  const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`;

  return (
    <a
      href={`/shows#${show._id}`}
      className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-2 hover:bg-zinc-50/25 transition-colors -mx-2 px-2"
    >
      <span className="text-zinc-900">{show.location}</span>
      <span className="text-sm text-zinc-500 font-mono">{formattedDate}</span>
    </a>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
    >
      {children}
    </a>
  );
}

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${className}`}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Mail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${className}`}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function Link({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${className}`}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function Spotify({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${className}`}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12.5c1.5-.5 3-1 5-1s3.5.5 5 1M8.5 9.5c1.5-.5 3-1 5-1s3.5.5 4.5 1M9 15.5c1-.3 2-.5 3-.5s2 .2 3 .5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
