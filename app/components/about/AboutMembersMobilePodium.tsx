"use client";

import { BandMember } from "@/types/sanity";
import { uiIndie as ui } from "@/app/ui/classes";
import BandMemberStage, { BandMemberStageRef } from "./BandMemberStage";
import BandMemberBioPanel from "./BandMemberBioPanel";
import { useState, useRef, useCallback } from "react";
import { usePageVisible } from "@/app/hooks/usePageVisible";

type Props = {
  members: BandMember[];
};

/**
 * TODO: Mobile "Podium" Experience (to be implemented later)
 *
 * Design spec:
 * - Show a brief description about all band members at the top
 * - Display ONE 3D model on a "podium" (larger, centered stage)
 * - Provide a clear selector UI to switch between band members:
 *   - Option 1: Horizontal tabs/segmented control with member names
 *   - Option 2: Vertical list with thumbnails/names
 *   - Option 3: Simple prev/next buttons with member name displayed
 * - When selector changes, smoothly transition to new member's model + bio
 *
 * Current implementation:
 * - Simple fallback: horizontally scrollable row of stages
 * - Consider this a placeholder until the full podium experience is designed
 */
export default function AboutMembersMobilePodium({ members }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRefs = useRef<Map<string, BandMemberStageRef>>(new Map());
  const selectedMember = members.find((m) => m._id === selectedId) || null;
  const pageVisible = usePageVisible();

  const handleSelect = useCallback((id: string) => {
    // Reset all other models before selecting new one
    stageRefs.current.forEach((ref, memberId) => {
      if (memberId !== id) {
        ref.resetModel();
      }
    });
    setSelectedId(id);
  }, []);

  return (
    <div className="w-full">
      {/* Placeholder intro text */}
      <div className={`${ui.frame} ${ui.framePad} ${ui.frameRound} mb-6`}>
        <p className={`${ui.small} text-center`}>
          meet the band — scroll to explore each member
        </p>
      </div>

      {/* Horizontally scrollable row (temporary mobile solution) */}
      <div className="overflow-x-auto pb-4 -mx-5 px-5 mb-6">
        <div className="flex gap-4 min-w-max">
          {members.map((member) => (
            <div key={member._id} className="w-[240px] flex-shrink-0">
              <BandMemberStage
                ref={(el) => {
                  if (el) {
                    stageRefs.current.set(member._id, el);
                  } else {
                    stageRefs.current.delete(member._id);
                  }
                }}
                member={member}
                selected={selectedId === member._id}
                onSelect={handleSelect}
                pageVisible={pageVisible}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bio panel */}
      <BandMemberBioPanel member={selectedMember} />

      {/* TODO indicator for future implementation */}
      <div className="mt-4 p-3 border border-dotted border-zinc-950/20 bg-zinc-50/50">
        <p className={`${ui.scribbleNote} text-center`}>
          → mobile &quot;podium&quot; experience coming soon
        </p>
      </div>
    </div>
  );
}
