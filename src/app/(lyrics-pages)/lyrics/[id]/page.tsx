"use client";
import GrooveTab from "@/components/app-components/home-page-components/GrooveTab";
import ArtistTile from "@/components/app-components/Tile-components/ArtistTile";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type SongDataType = {
  song: {
    name: string;
  };
  artist: {
    name: string;
    artistImage: string;
  }[];
  albumDetails: {
    albumArt: string;
    name: string;
    releaseDate: string;
  };
  lyrics: {
    line: string;
    startTime: string;
    endTime: string;
  }[];
};

function LyricsPage() {
  const { id } = useParams();


  const [songData, setSongdData] = useState<SongDataType | null>(null);

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
              src="https://c.saavncdn.com/178/Shehron-Ke-Raaz-English-2021-20210622130715-500x500.jpg"
              alt="cover"
              className="rounded-md w-28 h-28 flex-2 lg:h-full lg:w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <p className="font-semibold">Tere Hi Hum</p>
            <p className="text-gray-300">Prateek Kuhad</p>
            <p className="text-gray-300">Shehron ke raaz</p>
            <p className="text-gray-400">2019</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <ArtistTile
            artistImage="https://i.scdn.co/image/ab6761610000e5eb67e860359135844d8fd6da73"
            artistName="Prateek Kuhad"
            classname="border-none"
          />
        </div>
      </div>
    </div>
  );
}

export default LyricsPage;
