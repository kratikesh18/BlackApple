import Link from "next/link";
import React from "react";

type ArtistTileProps = {
  artistName: string;
  artistImage: string;
  genres?: string;
  classname?: string;
};
function ArtistTile(artistData: ArtistTileProps) {
  return (
    <div
      className={`w-fit p-2 mx-auto border border-white/20 text-white rounded-sm shadow-lg overflow-hidden ${artistData.classname}`}
    >
      <div className="">
        <img
          src={artistData.artistImage}
          alt="artist image"
          className="h-28 w-28 object-cover shadow-md rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>{artistData.artistName}</h1>{" "}
        <h2 className="text-sm text-gray-300 mt-1">{artistData.genres}</h2>
      </div>
    </div>
  );
}

export default ArtistTile;
