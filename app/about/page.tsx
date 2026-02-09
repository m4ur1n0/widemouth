import { sanityFetch } from "@/sanity/lib/fetch";
import { BAND_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { BandMember } from "@/types/sanity";
import { uiIndie as ui } from "../ui/classes";
import AboutMembersDesktopRow from "../components/about/AboutMembersDesktopRow";
import AboutMembersMobilePodium from "../components/about/AboutMembersMobilePodium";

export default async function AboutPage() {
  const members: BandMember[] = await sanityFetch({
    query: BAND_MEMBERS_QUERY,
    revalidate: 300,
  });

  return (
    <div className={ui.page}>
      <main className={`${ui.container} `}>
        <div className={`${ui.section}`}>
            {/* Desktop: 4 models in a row */}
            <div className="hidden lg:block">
            <AboutMembersDesktopRow members={members} />
            </div>

            {/* Mobile/Tablet: Scrollable/stacked layout (stub for now) */}
            <div className="lg:hidden">
            <AboutMembersMobilePodium members={members} />
            </div>
        </div>
      </main>
    </div>
  );
}
