"use client";

import { Show } from "@/types/sanity";
import { useState, useEffect } from "react";
import { uiIndie as ui } from "@/app/ui/classes";

interface ShowsClientProps {
  shows: Show[];
}

export default function ShowsClient({ shows }: ShowsClientProps) {
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);

  const selectedShow = shows.find((show) => show._id === selectedShowId);

  // Initialize from hash on mount and handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # character
      if (hash && shows.find((show) => show._id === hash)) {
        setSelectedShowId(hash);
      } else if (!hash) {
        setSelectedShowId(null);
      }
    };

    // Set initial state from hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [shows]);

  // Keyboard handler for Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedShowId(null);
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!shows || shows.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className={`${ui.body} text-zinc-500`}>
          No shows scheduled at the moment.
        </p>
      </div>
    );
  }

  return (
    <section className="relative">
      {/* Desktop: Two-column layout */}
      <div className="hidden lg:flex lg:gap-8 lg:items-start">
        {/* Left: Table list */}
        <div
          className={`transition-all duration-300 ${
            selectedShow ? "lg:w-[55%]" : "lg:w-full"
          }`}
        >
          <ShowTable
            shows={shows}
            selectedShowId={selectedShowId}
            isCompressed={!!selectedShow}
          />
        </div>

        {/* Right: Detail panel */}
        {selectedShow && (
          <div className="lg:w-[45%] sticky top-28">
            <ShowDetail
              show={selectedShow}
              onClose={() => {
                setSelectedShowId(null);
                window.history.pushState(null, "", window.location.pathname);
              }}
            />
          </div>
        )}
      </div>

      {/* Mobile: Accordion-style */}
      <div className="lg:hidden">
        <ShowAccordion
          shows={shows}
          selectedShowId={selectedShowId}
        />
      </div>
    </section>
  );
}

// Desktop table component
function ShowTable({
  shows,
  selectedShowId,
  isCompressed,
}: {
  shows: Show[];
  selectedShowId: string | null;
  onSelectShow?: (id: string) => void;
  isCompressed: boolean;
}) {
  const handleSelectShow = (id: string) => {
    window.location.hash = id;
  };
  return (
    <div className="border border-zinc-950/20 bg-white/25">
      {/* Table header */}
      <div className="grid grid-cols-[120px_1fr_auto] gap-4 px-4 py-3 border-b border-zinc-950/15 bg-zinc-50/50">
        <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-700 font-mono">
          Date
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-700">
          Location
        </div>
        {!isCompressed && (
          <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-700">
            Tickets
          </div>
        )}
      </div>

      {/* Table rows */}
      <div className="divide-y divide-zinc-950/10">
        {shows.map((show) => {
          const isSelected = show._id === selectedShowId;
          const date = new Date(show.datetime);

          return (
            <button
              key={show._id}
              onClick={() => handleSelectShow(show._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectShow(show._id);
                }
              }}
              className={`
                w-full text-left transition-colors duration-200
                grid grid-cols-[120px_1fr_auto] gap-4 px-4 py-4
                hover:bg-zinc-950/5 focus:outline-none focus-visible:ring-2
                focus-visible:ring-inset focus-visible:ring-zinc-950/25
                ${isSelected ? "bg-zinc-950/10" : ""}
              `}
              aria-selected={isSelected}
            >
              {/* Date column */}
              <div className="font-mono text-[13px] text-zinc-900 tracking-tight">
                {formatDate(date)}
              </div>

              {/* Location column */}
              <div className="flex items-center gap-2">
                {isSelected && (
                  <span className="text-zinc-950 text-[10px]">▸</span>
                )}
                <span className="text-[15px] text-zinc-950 font-medium">
                  {show.location}
                </span>
              </div>

              {/* Tickets indicator */}
              {!isCompressed && (
                <div className="flex items-center justify-end">
                  {show.ticketLink && (
                    <span className="inline-flex items-center border border-zinc-950/25 bg-white/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-zinc-900">
                      TIX
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Desktop detail panel
function ShowDetail({ show, onClose }: { show: Show; onClose: () => void }) {
  const date = new Date(show.datetime);

  return (
    <div className="border border-zinc-950/20 bg-white/35 backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25"
          aria-label="Close details"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="space-y-6 mt-2">
          {/* Location */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-2">
              Venue
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950">
              {show.location}
            </h2>
          </div>

          {/* Date & Time */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-1">
              When
            </div>
            <div className="text-[15px] text-zinc-900 space-y-0.5">
              <div className="font-mono">{formatDateLong(date)}</div>
              <div className="font-mono text-zinc-700">{formatTime(date)}</div>
            </div>
          </div>

          {/* Lineup */}
          {(show.headliner || show.opener) && (
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-2">
                Lineup
              </div>
              <div className="space-y-1.5 text-[15px]">
                {show.headliner && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] text-zinc-500">Headliner:</span>
                    <span className="text-zinc-950">{show.headliner}</span>
                  </div>
                )}
                {show.opener && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] text-zinc-500">Opener:</span>
                    <span className="text-zinc-950">{show.opener}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tickets */}
          <div className="pt-4 border-t border-zinc-950/15">
            {show.ticketLink ? (
              <a
                href={show.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full border border-zinc-950/25 bg-zinc-950 text-[#fbf7f0] px-4 py-3 text-sm uppercase tracking-[0.18em] hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25 transition-colors"
              >
                Get Tickets
              </a>
            ) : (
              <div className="text-center text-[13px] text-zinc-500 italic py-2">
                Ticket info coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile accordion component
function ShowAccordion({
  shows,
  selectedShowId,
}: {
  shows: Show[];
  selectedShowId: string | null;
  onSelectShow?: (id: string | null) => void;
}) {
  const handleSelectShow = (id: string | null) => {
    if (id) {
      window.location.hash = id;
    } else {
      window.history.pushState(null, "", window.location.pathname);
    }
  };
  return (
    <div className="border border-zinc-950/20 bg-white/25 divide-y divide-zinc-950/10">
      {shows.map((show) => {
        const isSelected = show._id === selectedShowId;
        const date = new Date(show.datetime);

        return (
          <div key={show._id}>
            <button
              onClick={() => handleSelectShow(isSelected ? null : show._id)}
              className={`
                w-full text-left px-4 py-4 hover:bg-zinc-950/5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-inset
                focus-visible:ring-zinc-950/25 transition-colors
                ${isSelected ? "bg-zinc-950/10" : ""}
              `}
              aria-expanded={isSelected}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="font-mono text-[12px] text-zinc-700">
                    {formatDate(date)}
                  </div>
                  <div className="text-[16px] font-medium text-zinc-950">
                    {show.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {show.ticketLink && (
                    <span className="inline-flex items-center border border-zinc-950/25 bg-white/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-zinc-900">
                      TIX
                    </span>
                  )}
                  <span
                    className={`text-[10px] text-zinc-500 transition-transform ${
                      isSelected ? "rotate-90" : ""
                    }`}
                  >
                    ▸
                  </span>
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {isSelected && (
              <div className="px-4 pb-6 pt-2 bg-zinc-50/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-1">
                    When
                  </div>
                  <div className="text-[14px] text-zinc-900 space-y-0.5">
                    <div className="font-mono">{formatDateLong(date)}</div>
                    <div className="font-mono text-zinc-700">{formatTime(date)}</div>
                  </div>
                </div>

                {(show.headliner || show.opener) && (
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-700 mb-1.5">
                      Lineup
                    </div>
                    <div className="space-y-1 text-[14px]">
                      {show.headliner && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] text-zinc-500">Headliner:</span>
                          <span className="text-zinc-950">{show.headliner}</span>
                        </div>
                      )}
                      {show.opener && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] text-zinc-500">Opener:</span>
                          <span className="text-zinc-950">{show.opener}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  {show.ticketLink ? (
                    <a
                      href={show.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full border border-zinc-950/25 bg-zinc-950 text-[#fbf7f0] px-4 py-2.5 text-sm uppercase tracking-[0.18em] hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25"
                    >
                      Get Tickets
                    </a>
                  ) : (
                    <div className="text-center text-[12px] text-zinc-500 italic py-2">
                      Ticket info coming soon
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Date formatting utilities
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDateLong(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
