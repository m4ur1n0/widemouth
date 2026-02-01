"use client";

import { BandMember } from "@/types/sanity";
import { uiIndie as ui } from "@/app/ui/classes";

type Props = {
  member: BandMember | null;
};

export default function BandMemberBioPanel({ member }: Props) {
  return (
    <div
      className={`
        ${ui.frame} ${ui.framePad} ${ui.frameRound}
        min-h-[200px] transition-all duration-300
        motion-reduce:transition-none
      `}
    >
      {member ? (
        <div
          key={member._id}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
        >
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-zinc-950/15">
            <h3 className={`${ui.h3} mb-1`}>{member.name}</h3>
            <p className={`${ui.label}`}>{member.instrument}</p>
          </div>

          {/* Bio */}
          <div className={`${ui.body} mb-4`}>
            {member.bio}
          </div>

          {/* Websites/Links */}
          {member.websites && member.websites.length > 0 && (
            <div className="pt-3 border-t border-dotted border-zinc-950/20">
              <p className={`${ui.label} mb-2`}>Links</p>
              <div className="flex flex-wrap gap-2">
                {member.websites.map((url, idx) => {
                  // Extract domain for display
                  let displayText = url;
                  try {
                    const urlObj = new URL(url);
                    displayText = urlObj.hostname.replace("www.", "");
                  } catch {
                    // If URL parsing fails, use as-is
                  }

                  return (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${ui.stamp} hover:bg-white/60 transition-colors`}
                    >
                      {displayText}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className={`${ui.scribbleNote} text-center`}>
            click a model to view bio
          </p>
        </div>
      )}
    </div>
  );
}
