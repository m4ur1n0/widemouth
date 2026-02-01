"use client";

import { BandMember } from "@/types/sanity";
import { uiIndie as ui } from "@/app/ui/classes";
import ModelViewer, { ModelViewerRef } from "./AboutModel";
import { useRef, useImperativeHandle, forwardRef } from "react";

type Props = {
  member: BandMember;
  selected: boolean;
  onSelect: (id: string) => void;
  pageVisible: boolean
};

export type BandMemberStageRef = {
  resetModel: () => void;
};

const BandMemberStage = forwardRef<BandMemberStageRef, Props>(function BandMemberStage(
  { member, selected, onSelect, pageVisible },
  ref
) {
  const modelRef = useRef<ModelViewerRef>(null);

  useImperativeHandle(ref, () => ({
    resetModel() {
      modelRef.current?.reset();
    },
  }));

  const handleClick = () => {
    onSelect(member._id);
  };

  const handlePointerDown = () => {
    onSelect(member._id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(member._id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View bio for ${member.name}`}
      className={`
        group w-full text-left transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25
        ${selected ? "" : "opacity-80 hover:opacity-100"}
      `}
    >
      {/* Stage Frame */}
      <div
        className={`
          ${ui.stageOuter} ${ui.stagePad}
          transition-all duration-200
          ${selected ? "border-zinc-950/30" : "border-zinc-950/20"}
        `}
      >
        {/* Model Container */}
        <div className={`${ui.stage} ${ui.stageSquare} relative`}>
          {member.modelPath ? (
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown();
              }}
              className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
            >
              <ModelViewer
                ref={modelRef}
                src={member.modelPath}
                alt={member.name}
                rotationPerSecond="30deg"
                selected={selected}
                pageVisible={pageVisible}
                pauseWhenOffscreen={true}
                style={{
                  width: "100%",
                  height: "100%",
                }}

              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className={ui.scribbleNote}>loading…</span>
            </div>
          )}
        </div>

        {/* Caption Row */}
        <div className={ui.captionRow}>
          <div className="flex flex-col gap-0.5">
            <p className={`${ui.caption} font-medium`}>{member.name}</p>
            {/* <p className={`${ui.caption} text-zinc-600`}>{member.instrument}</p> */}
            
            <span className={selected ? ui.stamp : ui.stampMuted}>{member.instrument}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
});

export default BandMemberStage;
