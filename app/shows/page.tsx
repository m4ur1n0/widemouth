import { sanityFetch } from "@/sanity/lib/fetch";
import { SHOWS_QUERY } from "@/sanity/lib/queries";
import { Show } from "@/types/sanity";
import { uiIndie as ui } from "../ui/classes";
import ShowsClient from "../components/shows/ShowsClient";

export default async function ShowsPage() {
  const shows: Show[] = await sanityFetch({
    query: SHOWS_QUERY,
    revalidate: 3600,
  });

  return (
    <div className={ui.page}>
      <main className={`${ui.section}`}>
        <div className={`${ui.container} ${ui.stack}`}>
          <header className="">
            <div className={ui.label}>Live</div>
            <h1 className={`${ui.h1} mt-2`}>SHOWS</h1>
            <div className={`mt-6 ${ui.rule}`} />
          </header>

          <ShowsClient shows={shows} />
        </div>
      </main>
    </div>
  );
}
