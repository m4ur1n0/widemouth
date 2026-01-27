import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ui, ui2 } from "./ui/classes";

export default async function Home() {
  const siteSettings = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    revalidate: 3600,
  });

  return (
    <div className={`${ui.section} flex justify-center`}>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">

        {siteSettings?.bandPhoto && (
          <div className="w-full flex justify-center py-10">
            <div className="relative w-full max-w-2xl aspect-2/1">
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



            </div>
          </div>
        )}




      </main>
    </div>
  );
}
