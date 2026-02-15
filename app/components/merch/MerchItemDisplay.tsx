"use client"

import { uiIndie as ui } from "@/app/ui/classes";
import { SanityResponsiveImage } from "../SanityResponsiveImage";
import { MerchItem } from "@/types/sanity";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const MerchItemDisplay = (item: MerchItem) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group block h-full transition-transform duration-300 will-change-transform scale-[0.92] hover:scale-[0.95] text-left">
          <div className={`${ui.stageOuter} ${ui.stagePad} h-full flex flex-col`}>
            <div className={`${ui.stage} ${ui.stageSquare}`}>
              <SanityResponsiveImage
                image={item.picture}
                alt={item.description || `Merch item - $${item.price}`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className={`${ui.captionRow} `}>
              <p className="text-[14px] text-zinc-950 leading-5 line-clamp-2">
                {item.description}
              </p>
              <span className={ui.mono}>${item.price.toFixed(2)}</span>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] overflow-y-auto md:max-w-4xl">
        <DialogTitle className="p-3 md:p-4 text-[14px] md:text-[16px] uppercase tracking-[0.22em] text-zinc-700 mb-2">

                Merch Item

        </DialogTitle>
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4 md:gap-6 p-4 md:p-6">
          {/* Image - appears first on mobile, second on desktop */}
          <div className="w-3/4 md:w-[400px] md:order-2 flex-shrink-0">
            <div className="relative w-full aspect-square border border-zinc-950/10 overflow-hidden">
              <SanityResponsiveImage
                image={item.picture}
                alt={item.description || `Merch item - $${item.price}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Details - appears second on mobile, first on desktop */}
          <div className="flex-1 md:order-1 flex flex-col justify-between space-y-4 md:space-y-6 w-full">
            {/* Description */}
            <div>
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-2">
                Description
              </h3>
              <p className="text-[14px] md:text-[15px] text-zinc-950 leading-relaxed">
                {item.description || "No description available"}
              </p>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-2">
                Price
              </h3>
              <p className="text-xl md:text-2xl font-semibold text-zinc-950">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Button */}
            <div className="pt-3 md:pt-4 border-t border-zinc-950/15">
              {item.bandcampLink ? (
                <a
                  href={item.bandcampLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full border border-zinc-950/25 bg-zinc-950 text-[#fbf7f0] px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm uppercase tracking-[0.18em] hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25 transition-colors"
                >
                  Buy on Bandcamp
                </a>
              ) : (
                <div className="text-center text-[12px] md:text-[13px] text-zinc-500 italic py-2">
                  Purchase link coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MerchItemDisplay
