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
          {/* Desktop: Two-column layout with band bio on left */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center">
            {/* Band Bio - Left Column */}
            <div className="lg:col-span-4">
              <div className={`${ui.frame} ${ui.framePad} ${ui.frameRound}`}>
                <h2 className={`${ui.h2} mb-4 pb-3 border-b border-zinc-950/15`}>
                  About the Band
                </h2>
                <div className={ui.body}>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>

            {/* Member Stages - Right Column */}
            <div className="lg:col-span-8">
              <AboutMembersDesktopRow members={members} />
            </div>
          </div>

          {/* Mobile/Tablet: Stacked layout with band bio on top */}
          <div className="lg:hidden">
            {/* Band Bio - Top Section */}
            <div className="mb-8">
              <div className={`${ui.frame} ${ui.framePad} ${ui.frameRound}`}>
                <h2 className={`${ui.h2} mb-4 pb-3 border-b border-zinc-950/15`}>
                  About the Band
                </h2>
                <div className={ui.body}>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>

            {/* Member Stages - Below */}
            <AboutMembersMobilePodium members={members} />
          </div>
        </div>
      </main>
    </div>
  );
}
