// app/ui/classes.ts
export const uiIndie = {
  // Global shell
  page: "min-h-screen text-zinc-950 antialiased",
  // Optional: put your background image here if you use one
//   page: "min-h-screen text-zinc-950 antialiased bg-[#fbf7f0] bg-[url('/images/widemouth-landscape.png')] bg-fixed bg-cover",

  // Layout + rhythm (structured, not cardy)
  container: "mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-10 pt-24 lg:pt-8",
  section: "py-10 ",
  stack: "space-y-8 md:space-y-12",
  inset: "px-1 sm:px-2", // small inner offset for “printed” feeling

  // Type: editorial + slightly harsh
  body: "text-[15px] leading-6 md:text-[16px] md:leading-7 text-zinc-950",
  small: "text-[13px] leading-5 text-zinc-800",
  label: "text-[11px] uppercase tracking-[0.22em] text-zinc-700",
  mono: "font-mono text-[12px] tracking-tight text-zinc-700",
  h1: "text-4xl md:text-6xl font-semibold tracking-tight",
  pageTitle: "text-3xl md:text-4xl font-semibold tracking-tight font-family-fell! scale-y-150 mt-4",
  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
  h3: "text-xl md:text-2xl font-semibold tracking-tight",

  // Links: zine-ish
  link: "underline underline-offset-4 decoration-zinc-950/30 hover:decoration-zinc-950",
  linkSubtle:
    "underline underline-offset-4 decoration-zinc-950/20 hover:decoration-zinc-950/60",

  // Rules / separators (replaces modern cards)
  rule: "border-t border-zinc-950/15",
  ruleDotted: "border-t border-dotted border-zinc-950/30",
  divider: "h-px bg-zinc-950/15",

  // “Frames” (not cards): mostly border + paper + tiny shadow
  frame:
    "border border-zinc-950/20 bg-white/35 backdrop-blur-[1px] shadow-[0_1px_0_rgba(0,0,0,0.08)]",
  framePad: "p-4 md:p-5",
  frameRound: "rounded-sm", // keep it sharp / printed

  // “Poster” block: one big composed region for messy accents
  poster:
    "relative overflow-hidden border border-zinc-950/20 bg-white/25",
  posterPad: "p-5 md:p-7",

  // Buttons (avoid modern pill feel)
  btn:
    "inline-flex items-center justify-center gap-2 border border-zinc-950/25 bg-transparent px-3 py-2 text-sm hover:bg-zinc-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25",
  btnInk:
    "inline-flex items-center justify-center gap-2 border border-zinc-950/25 bg-zinc-950 text-[#fbf7f0] px-3 py-2 text-sm hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25",

  // Stamps / tags (small, not pill-y)
  stamp:
    "indie-stamp inline-flex items-center border border-zinc-950/25 bg-white/40 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-zinc-900 !font-geist-mono",
  stampMuted:
    "indie-stamp inline-flex items-center border border-zinc-950/15 bg-white/20 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-zinc-700 !font-geist-mono",

  // Messy accents (use sparingly)
  messyWrap: "inline-block -rotate-[1deg]",
  messyUnderline: "underline decoration-2 underline-offset-4 decoration-zinc-950/60",
  messyItalic: "italic",
  scribbleNote: "text-[12px] text-zinc-700 italic",

  // Media blocks (for 3D + images): pedestal without “modern card”
  stageOuter: "border border-zinc-950/20 bg-white/20",
  stagePad: "p-3 md:p-4",
  stage:
    "w-full overflow-hidden bg-zinc-200/40 border border-zinc-950/10",
  stageWide: "aspect-[16/10]",
  stageSquare: "aspect-square",
  captionRow: "mt-2 flex items-center justify-between gap-3",
  caption: "indie-caption text-[12px] text-zinc-700 font-family-geist-mono",

  // Lists / rows
  list: "divide-y divide-zinc-950/12",
  row: "py-3 flex items-baseline gap-3",
  dots: "h-px flex-1 border-b border-dotted border-zinc-950/35 translate-y-[-2px]",
} as const;
