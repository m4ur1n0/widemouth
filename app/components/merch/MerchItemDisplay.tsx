import Link from "next/link";
import { uiIndie as ui } from "@/app/ui/classes";
import { SanityResponsiveImage } from "../SanityResponsiveImage";
import { MerchItem } from "@/types/sanity";

const MerchItemDisplay = (item: MerchItem) => {
  return (
    <Link
      href={item.bandcampLink || "#"}
      target={item.bandcampLink ? "_blank" : undefined}
      rel={item.bandcampLink ? "noopener noreferrer" : undefined}
      className="group block h-full transition-transform duration-300 will-change-transform scale-[0.92] hover:scale-[0.95] "
    >
      <div className={`${ui.stageOuter} ${ui.stagePad} h-full flex flex-col`}>
        <div className={`${ui.stage} ${ui.stageSquare}`}>
          <SanityResponsiveImage
            image={item.picture}
            alt={item.description || `Merch item - $${item.price}`}
            className="object-cover w-full h-full"
          />
        </div>

        <div className={`${ui.captionRow} mt-auto`}>
          <p className="text-[14px] text-zinc-950 leading-5 line-clamp-2">
            {item.description}
          </p>
          <span className={ui.mono}>${item.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default MerchItemDisplay
