import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, SHOWS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { uiIndie as ui } from "./ui/classes";
import { CountdownTimer } from "./components/CountdownTimer";
import OvalChalkFrame from "./components/home/OvalOrnateFrame";
// import CollageStylePhoto from "./components/layout/CollageStylePhoto";
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


  const timerEnd = siteSettings?.featuredProject?.timerEnd ? new Date(siteSettings.featuredProject.timerEnd) : "01/01/2026"; // some date that's passed idfc
  const isComing = timerEnd > Date();




  

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

      {/* <CollageStylePhoto
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
      /> */}

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center pt-32 pb-16 px-16 space-y-24 relative z-10">

        {siteSettings?.bandPhoto && (
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-[34rem] flex justify-center  aspect-[1.3/1]">
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
                    className="object-cover rounded-[50%] "
                    quality={80}
                    priority
                />

                {/* Subtle shadow for depth */}
                <div className="absolute inset-0 rounded-[50%] shadow-inner" />

                {/* Ornate Frame Overlay */}
                <OvalChalkFrame className="z-10 pointer-events-none ml-2" />
            </div>
          </div>
        )}

        {/* Countdown + Album Cover */}
        <div className="w-full flex flex-col lg:flex-row justify-center gap-8 lg:gap-24 items-center my-32 lg:mt-24">
          {/* Album Cover - First on mobile, second on desktop */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square w-64 lg:w-[30vw] overflow-hidden bg-zinc-100">
              {siteSettings?.featuredProject?.image && (
                <Image
                  src={urlFor(siteSettings.featuredProject.image)
                    .width(800)
                    .quality(80)
                    .format('webp')
                    .url()}
                  alt={siteSettings.featuredProject.title || "Album"}
                  fill
                  sizes="(max-width: 1024px) 256px, 30vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="mt-2 text-sm text-zinc-500 text-center">
              {siteSettings?.featuredProject?.title || "coming soon"}
            </div>

            {/* Hand-drawn star stickers */}
            <HandStar className="absolute -right-3 -top-3 rotate-12 scale-[2.5]" />
            <HandStar className="absolute -left-3 bottom-3 -rotate-6 scale-[2.1]" />
          </div>

          {/* Countdown - Second on mobile, first on desktop */}
          <div className="flex flex-col items-center justify-center h-full order-2 lg:order-1">
            <div className="font-mono text-3xl text-zinc-900 tracking-tight">
                <CountdownTimer datetime={timerEnd} />
            </div>
            {isComing && <p className="pl-5 w-full text-gray-800">something&apos;s coming...</p>}
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
          <SocialIcon href={siteSettings?.instagramLink || "https://instagram.com"} label="Instagram">
            <Instagram />
          </SocialIcon>
          <SocialIcon href={siteSettings?.contactEmail ? `mailto:${siteSettings.contactEmail}` : "mailto:band@email.com"} label="Email">
            <Mail />
          </SocialIcon>
          <SocialIcon href={siteSettings?.linktreeLink || "https://linktr.ee"} label="Links">
            <Link />
          </SocialIcon>
          <SocialIcon href={siteSettings?.spotifyLink || "https://spotify.com"} label="Spotify">
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
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="Spotify-logo" height="24" width="24">
    //     <desc>
    //         Spotify logo
    //     </desc>
    //     <g fill="none" stroke="currentColor" fill-rule="nonzero" className={`w-4 h-4 ${className}`}>
    //         <path d="M8 1.3333333333333333c3.6819999999999995 0 6.666666666666666 2.9846666666666666 6.666666666666666 6.666666666666666s-2.9846666666666666 6.666666666666666 -6.666666666666666 6.666666666666666S1.3333333333333333 11.681999999999999 1.3333333333333333 8 4.318 1.3333333333333333 8 1.3333333333333333Zm0 1.3333333333333333a5.333333333333333 5.333333333333333 0 1 0 0 10.666666666666666 5.333333333333333 5.333333333333333 0 0 0 0 -10.666666666666666ZM5.151999999999999 9.407333333333334c0.9453333333333332 -0.21733333333333332 1.9566666666666666 -0.21466666666666667 2.8313333333333333 -0.07933333333333333 0.8506666666666667 0.132 1.6759999999999997 0.4066666666666666 2.1846666666666668 0.8226666666666667a0.6666666666666666 0.6666666666666666 0 0 1 -0.7759999999999999 1.0813333333333333l-0.06799999999999999 -0.048666666666666664c-0.2373333333333333 -0.19466666666666665 -0.7853333333333332 -0.42 -1.5453333333333332 -0.5373333333333333 -0.7366666666666666 -0.11466666666666665 -1.5746666666666667 -0.112 -2.328 0.06066666666666666a0.6666666666666666 0.6666666666666666 0 1 1 -0.29866666666666664 -1.2993333333333332Zm-0.3466666666666667 -1.8206666666666664c2.1726666666666663 -0.606 4.699999999999999 -0.2633333333333333 6.241999999999999 0.6833333333333332a0.6666666666666666 0.6666666666666666 0 0 1 -0.698 1.1366666666666667c-1.1886666666666665 -0.73 -3.3266666666666667 -1.0539999999999998 -5.1866666666666665 -0.536a0.6666666666666666 0.6666666666666666 0 1 1 -0.35733333333333334 -1.2839999999999998ZM4.486666666666666 5.675999999999999c2.5066666666666664 -0.7 4.997333333333334 -0.33666666666666667 7.110666666666667 0.576a0.6666666666666666 0.6666666666666666 0 0 1 -0.5286666666666666 1.224c-1.8866666666666667 -0.8153333333333334 -4.062666666666667 -1.1186666666666665 -6.223333333333334 -0.516a0.6666666666666666 0.6666666666666666 0 1 1 -0.3586666666666667 -1.2839999999999998Z" strokeWidth="0.4"></path>
            
    //     </g>
    // </svg>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="Spotify-logo" height="24" width="24" >
        <desc>
            Spotify logo
        </desc>
        <g fill="none" fill-rule="nonzero" className={`w-4 h-4 ${className}`}>
            <path d="M16 0v16H0V0h16ZM8.395333333333333 15.505333333333333l-0.007333333333333332 0.0013333333333333333 -0.047333333333333324 0.023333333333333334 -0.013333333333333332 0.0026666666666666666 -0.009333333333333332 -0.0026666666666666666 -0.047333333333333324 -0.023333333333333334c-0.006666666666666666 -0.0026666666666666666 -0.012666666666666666 -0.0006666666666666666 -0.016 0.003333333333333333l-0.0026666666666666666 0.006666666666666666 -0.011333333333333334 0.2853333333333333 0.003333333333333333 0.013333333333333332 0.006666666666666666 0.008666666666666666 0.06933333333333333 0.049333333333333326 0.009999999999999998 0.0026666666666666666 0.008 -0.0026666666666666666 0.06933333333333333 -0.049333333333333326 0.008 -0.010666666666666666 0.0026666666666666666 -0.011333333333333334 -0.011333333333333334 -0.2846666666666666c-0.0013333333333333333 -0.006666666666666666 -0.005999999999999999 -0.011333333333333334 -0.011333333333333334 -0.011999999999999999Zm0.17666666666666667 -0.07533333333333334 -0.008666666666666666 0.0013333333333333333 -0.12333333333333332 0.062 -0.006666666666666666 0.006666666666666666 -0.002 0.007333333333333332 0.011999999999999999 0.2866666666666666 0.003333333333333333 0.008 0.005333333333333333 0.004666666666666666 0.134 0.062c0.008 0.0026666666666666666 0.015333333333333332 0 0.019333333333333334 -0.005333333333333333l0.0026666666666666666 -0.009333333333333332 -0.02266666666666667 -0.4093333333333333c-0.002 -0.008 -0.006666666666666666 -0.013333333333333332 -0.013333333333333332 -0.014666666666666665Zm-0.4766666666666666 0.0013333333333333333a0.015333333333333332 0.015333333333333332 0 0 0 -0.018 0.004l-0.004 0.009333333333333332 -0.02266666666666667 0.4093333333333333c0 0.008 0.004666666666666666 0.013333333333333332 0.011333333333333334 0.016l0.009999999999999998 -0.0013333333333333333 0.134 -0.062 0.006666666666666666 -0.005333333333333333 0.0026666666666666666 -0.007333333333333332 0.011333333333333334 -0.2866666666666666 -0.002 -0.008 -0.006666666666666666 -0.006666666666666666 -0.12266666666666666 -0.06133333333333333Z" strokeWidth="0.3" ></path>
            <path fill="currentColor" d="M8 1.3333333333333333c3.6819999999999995 0 6.666666666666666 2.9846666666666666 6.666666666666666 6.666666666666666s-2.9846666666666666 6.666666666666666 -6.666666666666666 6.666666666666666S1.3333333333333333 11.681999999999999 1.3333333333333333 8 4.318 1.3333333333333333 8 1.3333333333333333Zm0 1.3333333333333333a5.333333333333333 5.333333333333333 0 1 0 0 10.666666666666666 5.333333333333333 5.333333333333333 0 0 0 0 -10.666666666666666ZM5.151999999999999 9.407333333333334c0.9453333333333332 -0.21733333333333332 1.9566666666666666 -0.21466666666666667 2.8313333333333333 -0.07933333333333333 0.8506666666666667 0.132 1.6759999999999997 0.4066666666666666 2.1846666666666668 0.8226666666666667a0.6666666666666666 0.6666666666666666 0 0 1 -0.7759999999999999 1.0813333333333333l-0.06799999999999999 -0.048666666666666664c-0.2373333333333333 -0.19466666666666665 -0.7853333333333332 -0.42 -1.5453333333333332 -0.5373333333333333 -0.7366666666666666 -0.11466666666666665 -1.5746666666666667 -0.112 -2.328 0.06066666666666666a0.6666666666666666 0.6666666666666666 0 1 1 -0.29866666666666664 -1.2993333333333332Zm-0.3466666666666667 -1.8206666666666664c2.1726666666666663 -0.606 4.699999999999999 -0.2633333333333333 6.241999999999999 0.6833333333333332a0.6666666666666666 0.6666666666666666 0 0 1 -0.698 1.1366666666666667c-1.1886666666666665 -0.73 -3.3266666666666667 -1.0539999999999998 -5.1866666666666665 -0.536a0.6666666666666666 0.6666666666666666 0 1 1 -0.35733333333333334 -1.2839999999999998ZM4.486666666666666 5.675999999999999c2.5066666666666664 -0.7 4.997333333333334 -0.33666666666666667 7.110666666666667 0.576a0.6666666666666666 0.6666666666666666 0 0 1 -0.5286666666666666 1.224c-1.8866666666666667 -0.8153333333333334 -4.062666666666667 -1.1186666666666665 -6.223333333333334 -0.516a0.6666666666666666 0.6666666666666666 0 1 1 -0.3586666666666667 -1.2839999999999998Z" strokeWidth="0.1"></path>
        </g>
    </svg>
  );
}
