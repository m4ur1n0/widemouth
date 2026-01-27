// app/page.tsx
import { CountdownTimer } from "@/app/components/CountdownTimer";
import { ui } from "@/app/ui/classes";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function HomePage() {

    const siteSettings = await sanityFetch({
        query: SITE_SETTINGS_QUERY,
        revalidate: 3600,
      });
      
  return (
    <main className={ui.section}>


      {/* Body */}
      <div className={`${ui.container} ${ui.stack} mt-10`}>
        {/* Poster board */}
        <section className="relative py-10">
          <div className={`${ui.card} ${ui.cardPadLg} relative overflow-hidden`}>
            {/* accents (keep to 1–2) */}
            <Star className="absolute -right-2 top-10 rotate-12 opacity-90" />
            <Star className="absolute left-10 bottom-10 -rotate-6 opacity-70" />

            <div className="grid gap-8 md:grid-cols-2">
              {/* left: oval + countdown */}
              <div className="space-y-6">
                <div className="aspect-16/10 w-full relative rounded-[999px] bg-zinc-200/70 border border-zinc-900/10">

                    {siteSettings && <Image
                        src={urlFor(siteSettings.bandPhoto)
                            .width(1200)
                            .quality(80)
                            .format('webp')
                            .url()}
                        alt="Band photo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-cover relative rounded-[999px]"
                        quality={90}
                        priority
                    />}

                </div>
                <div className="flex items-baseline justify-between">
                  <div className={ui.label}>{siteSettings ? `${siteSettings.featuredProject.title} coming` : "next thing"}</div>
                  <div className="font-mono text-lg md:text-xl text-zinc-900">
                    <CountdownTimer datetime={siteSettings ? siteSettings.featuredProject.timerEnd : Date()} />
                  </div>
                </div>
              </div>

              {/* right: square “release art” */}
              <div className="space-y-6">
                <div className="aspect-square w-full rounded-2xl bg-zinc-200/70 border border-zinc-900/10 relative">
                
                    {siteSettings && <Image
                        src={urlFor(siteSettings.featuredProject.image)
                            .width(1200)
                            .quality(80)
                            .format('webp')
                            .url()}
                        alt="Band photo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-cover relative rounded-2xl"
                        quality={90}
                        priority
                    />}

                </div>
                <div className="flex items-center justify-between">
                  <span className={ui.subtle}>some small caption here</span>
                  <span className={ui.pill}>new</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shows */}
        <section className={`${ui.card} ${ui.cardPadLg}`}>
          <div className={ui.cardHeaderRow}>
            <h2 className={ui.h2}>
              <span className={ui.messyUnderline}>Help Us Help You</span>
            </h2>
            <span className={ui.pill}>tour</span>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <ShowRow city="Madison, WI" date="01/22/26" />
            <ShowRow city="Madison, WI" date="01/22/26" />
            <ShowRow city="Madison, WI" date="01/22/26" />
            <ShowRow city="Madison, WI" date="01/22/26" />
            <ShowRow city="Madison, WI" date="01/22/26" />
          </div>
        </section>

        {/* Newsletter */}
        <section className={`${ui.card} ${ui.cardPadLg}`}>
          <div className={ui.cardHeaderRow}>
            <h2 className={ui.h2}>Stay Up To Date</h2>
          </div>

          <div className="mt-6">
            <form className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-full border border-zinc-900/20 bg-white px-6 py-4 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-amber-200 border border-zinc-900/20 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              >
                <StarCircle className="h-4 w-4" />
                Submit
              </button>
            </form>
            <div className="mt-3 text-center">
              <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className={`${ui.subtle} ${ui.link}`}>
                Visit the Substack
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center gap-6">
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
  );
}

function ShowRow({ city, date }: { city: string; date: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="shrink-0">{city}</span>
      <span className="h-px flex-1 border-b border-dotted border-zinc-900/25 translate-y-[-2px]" />
      <span className="shrink-0 font-mono text-[12px] text-zinc-700">{date}</span>
    </div>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`h-10 w-10 fill-yellow-400 ${className}`}
      aria-hidden
    >
      <path d="M50 5l12 30 33 2-25 20 8 32-28-16-28 16 8-32-25-20 33-2z" />
    </svg>
  );
}

function StarCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6l1.5 4.5 4.5.5-3.5 2.5 1 4.5-3.5-2-3.5 2 1-4.5-3.5-2.5 4.5-.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-900/20 bg-white/10 backdrop-blur hover:bg-white/30 transition-colors"
    >
      {children}
    </a>
  );
}

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${className}`}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Mail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${className}`}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function Link({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${className}`}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function Spotify({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12.5c1.5-.5 3-1 5-1s3.5.5 5 1M8.5 9.5c1.5-.5 3-1 5-1s3.5.5 4.5 1M9 15.5c1-.3 2-.5 3-.5s2 .2 3 .5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
