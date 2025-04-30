import Link from "next/link";
import React from "react";

type SongTileProps = {
  name: string;
  albumArt: string;
  artist: string;
};
2;
function SongTile(songData: SongTileProps) {
  return (
    <div className=" w-36 p-2 mx-auto border border-white/20 text-white rounded-sm shadow-lg overflow-hidden">
      <div className="flex flex-col items-center gap-[0.25em]">
        <Link href={`/lyrics/${songData.name}`}>
          <img
            src={songData.albumArt}
            alt={songData.name}
            className="h-28 w-28 object-cover shadow-md"
          />
        </Link>
        <div className="">
          <Link href={`/lyrics/${songData.name}`}>
            <h1 className="text-base font-semibold truncate">{songData.name}</h1>
          </Link>
          <Link href={`/artist/${songData.artist}`}>
            <h2 className="text-sm text-gray-300 mt-1">{songData.artist}</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SongTile;
