// app/page.tsx
import { ui } from "@/app/ui/classes";

export default function HomePage() {
  return (
    <main className={ui.section}>


      {/* Body */}
      <div className={`${ui.container} ${ui.stack} mt-10`}>
        {/* Poster board */}
        <section className="relative">
          <div className={`${ui.card} ${ui.cardPadLg} relative overflow-hidden`}>
            {/* accents (keep to 1–2) */}
            <Star className="absolute -right-2 top-10 rotate-12 opacity-90" />
            <Star className="absolute left-10 bottom-10 -rotate-6 opacity-70" />

            <div className="grid gap-8 md:grid-cols-2">
              {/* left: oval + countdown */}
              <div className="space-y-6">
                <div className="aspect-[16/10] w-full rounded-[999px] bg-zinc-200/70 border border-zinc-900/10" />
                <div className="flex items-baseline justify-between">
                  <div className={ui.label}>next thing</div>
                  <div className="font-mono text-lg md:text-xl text-zinc-900">
                    8d : 13h : 45m
                  </div>
                </div>
              </div>

              {/* right: square “release art” */}
              <div className="space-y-6">
                <div className="aspect-square w-full rounded-2xl bg-zinc-200/70 border border-zinc-900/10" />
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
