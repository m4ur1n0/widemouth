"use client";

import { useState, useRef, useCallback } from "react";
import { BandMember } from "@/types/sanity";
import { uiIndie as ui } from "@/app/ui/classes";
import BandMemberStage, { BandMemberStageRef } from "./BandMemberStage";
import BandMemberBioPanel from "./BandMemberBioPanel";
import { usePageVisible } from "@/app/hooks/usePageVisible";

type Props = {
  members: BandMember[];
};

export default function AboutMembersDesktopRow({ members }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(members[0]._id);
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
      {/* 4 Stages in Single Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {members.map((member) => (
          <BandMemberStage
            key={member._id}
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
        ))}
      </div>

      {/* Bio Panel Below */}
      <BandMemberBioPanel member={selectedMember} />
    </div>
  );
}
