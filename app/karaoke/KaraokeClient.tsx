"use client";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import { songs } from "@/app/data";
import type { Song } from "@/app/types";
import DevModeToggle from "@/components/DevModeToggle";
import Pickup from "@/components/pickup";
import Tooltip from "@/components/Tooltip";
import useDevMode from "@/hooks/useDevMode";

export default function KaraokeClient() {
  const [activeSong, setActiveSong] = useState<Song>(songs[0]);
  const { devMode } = useDevMode();

  return (
    <div className="min-h-screen bg-[#E09E8E]">
      <div className="flex items-center justify-center gap-0 overflow-hidden py-12 lg:gap-4">
        {songs.map((song) => (
          <button
            type="button"
            onClick={() => setActiveSong(song)}
            className="-mx-16 sm:-mx-10 lg:mx-0"
            key={song.name}
          >
            <Image
              src={song.songImage}
              alt={song.name}
              priority
              width={200}
              height={200}
              className="rounded-full bg-[repeating-radial-gradient(#000_0px,#222_5px)] object-contain p-10"
            />
          </button>
        ))}
      </div>
      <div className="flex min-h-[calc(100dvh-200px-48px-48px)] flex-col items-center justify-around gap-4 lg:flex-row">
        <div className="flex w-1/2 flex-col items-center justify-center gap-4 text-center">
          <p className="font-bold text-2xl">{activeSong.name}</p>
          <p className="text-lg">{activeSong.artist}</p>
        </div>
        <div className="relative mt-10 flex w-1/2 items-center justify-center lg:mt-0">
          <Tooltip
            content="This record player is built entirely with 3D CSS! It features a working lid, animated needle, spinning record, and functional play/pause/stop controls that integrate with the YouTube API."
            showTooltip={devMode}
          >
            <Pickup song={activeSong} />
          </Tooltip>
        </div>
      </div>
      <Script src="https://www.youtube.com/iframe_api" />
      <DevModeToggle />
    </div>
  );
}
