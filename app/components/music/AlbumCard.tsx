"use client"

import { AlbumWithUrls } from "@/types/sanity"
import { uiIndie as ui } from "@/app/ui/classes"
import AlbumFlipCard from "./AlbumFlipCard"

interface AlbumCardProps {
  album: AlbumWithUrls
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <article className="group">
      {/* Flip card area */}
      <AlbumFlipCard
        title={album.title}
        frontCover={album.coverFront}
        backCover={album.coverBack}
        tracklist={album.songs}
      />

      {/* Title & credits below */}
      <div className="mt-4 md:mt-5 space-y-2">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-950">
          {album.title}
        </h2>

        {/* Credits: year, spotify link, etc */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] md:text-[15px] text-zinc-700">
          {album.year && <span className={ui.mono}>{album.year}</span>}

          {album.songs && album.songs.length > 0 && (
            <>
              <span className="text-zinc-400">•</span>
              <span className={ui.small}>
                {album.songs.length} {album.songs.length === 1 ? "track" : "tracks"}
              </span>
            </>
          )}

          {album.spotifyLink && (
            <>
              <span className="text-zinc-400">•</span>
              <a
                href={album.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ui.linkSubtle} text-[14px] md:text-[15px]`}
                onClick={(e) => e.stopPropagation()}
              >
                Listen on Spotify
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
