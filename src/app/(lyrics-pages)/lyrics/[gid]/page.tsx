"use client";
import GrooveTab from "@/components/app-components/home-page-components/GrooveTab";
import ArtistTile from "@/components/app-components/Tile-components/ArtistTile";
import api from "@/lib/api";
import { RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function LyricsPage() {
  const { gid } = useParams();

  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  //api call for finding the Lyrics

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex lg:flex-row gap-3 flex-col-reverse p-3">
      {/* Main Content */}

      <div className="flex h-[74vh] md:h-[90vh] lg:w-4/5 lg:p-4 rounded-lg overflow-y-scroll scrollbar-none bg-gray-400/10 p-2">
        <GrooveTab />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/5 bg-gray-400/10 rounded-lg flex flex-col justify-between py-2">
        <div className="px-2 lg:p-4 flex flex-row-reverse justify-between lg:flex-col ">
          <div>
            <img
              src={currentTrack?.album.image}
              alt="cover"
              className="rounded-md w-28 h-28 flex-2 lg:h-full lg:w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <p className="font-semibold">{currentTrack?.name}</p>
            <p className="text-gray-300">{currentTrack?.artists}</p>
            <p className="text-gray-300">{currentTrack?.album.name}</p>
            <p className="text-gray-400"></p>
          </div>
        </div>
        <div className="hidden lg:block">
          <ArtistTile
            artistImage="https://i.scdn.co/image/ab6761610000e5eb67e860359135844d8fd6da73"
            artistName={`${currentTrack?.artists}`}
            classname="border-none"
          />
        </div>
      </div>
    </div>
  );
}

export default LyricsPage;
