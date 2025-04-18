import React from "react";

type ArtistTileProps = {
  artistName: string;
  artistImage: string;
};
function ArtistTile(artistData: ArtistTileProps) {
  return (
    <div className="flex flex-col gap-2 justify-between items-center w-fit ">
      <img
        src={artistData.artistImage}
        alt=""
        className="rounded-full w-28 h-28"
      />
      <h1>{artistData.artistName}</h1>
    </div>
  );
}

export default ArtistTile;
