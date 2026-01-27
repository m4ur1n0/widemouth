// app/ui/classes.ts
export const ui = {
  // Layout + rhythm
  page: "bg-zinc-50 text-zinc-900",
  shell: "min-h-screen",
  container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-10 md:py-14 ",
  stack: "space-y-10 md:space-y-14",

  // Typography
  body: "text-[15px] leading-6 md:text-[16px] md:leading-7 text-zinc-900",
  h1: "text-4xl md:text-6xl font-semibold tracking-tight",
  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
  label: "text-xs uppercase tracking-widest text-zinc-600",
  subtle: "text-sm text-zinc-600",
  link: "underline decoration-zinc-900/30 underline-offset-4 hover:decoration-zinc-900",

  // Cards (flyer-like)
  card: "rounded-2xl border border-zinc-900/15 bg-white/70 backdrop-blur p-5 shadow-[0_1px_0_rgba(0,0,0,0.08)]",
  cardPadLg: "p-6 md:p-7",
  cardHeaderRow: "flex items-start justify-between gap-4",
  cardTitle: "text-lg font-semibold tracking-tight",
  cardMeta: "text-xs text-zinc-600",

  // Buttons
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/20 bg-zinc-900 text-zinc-50 px-4 py-2 text-sm hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30",
  btnSecondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/20 bg-transparent px-4 py-2 text-sm hover:bg-zinc-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",
  btnGhost:
    "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-zinc-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",

  // Pills / stamps
  pill:
    "inline-flex items-center rounded-full border border-zinc-900/15 bg-white px-2 py-0.5 text-[11px] text-zinc-700",
  pillAccent:
    "inline-flex items-center rounded-full border border-zinc-900/15 bg-white px-2 py-0.5 text-[11px] text-zinc-900",

  // “Messy” accents (use sparingly)
  messyHeadingWrap: "inline-block rotate-[-1deg]",
  messyUnderline: "underline decoration-2 underline-offset-4",
  messyItalic: "italic",

  // 3D “pedestal”
  pedestalOuter: "rounded-3xl border border-zinc-900/15 bg-white/60 p-4 md:p-6",
  pedestalStage: "aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100",
  pedestalCaption: "mt-3 flex items-center justify-between gap-3 text-xs text-zinc-600",

  // Simple lists / tables
  list: "divide-y divide-zinc-900/10",
  listRow: "py-3 flex items-start justify-between gap-4",
  mono: "font-mono text-[12px] text-zinc-600",
} as const;

export const ui2 = {
  misprintWrap: "relative",
  misprintBack:
    "absolute inset-0 translate-x-[2px] translate-y-[2px] rounded-2xl border border-zinc-900/15 -z-10",
};
