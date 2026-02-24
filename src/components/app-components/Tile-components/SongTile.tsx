import Image from "next/image";
import Link from "next/link";
import React from "react";

type SongTileProps = {
  name: string;
  albumArt?: string | null;
  artist?: string | null;
};

const PLACEHOLDER =
  "data:image/svg+xml;%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 24 24'%3E%3Crect fill='%23464646' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='%23fff' font-size='10' font-family='Arial' dominant-baseline='middle' text-anchor='middle'%3ENO ART%3C/text%3E%3C/svg%3E";

function SongTile({ name, albumArt, artist }: SongTileProps) {
  const url = `/lyrics/${encodeURIComponent(name)}`;
  const artistUrl = `/artist/${encodeURIComponent(artist || "")}`;

  return (
    <article
      className="w-36 sm:w-40 md:w-44 p-2 bg-black/25 border-white/10 rounded-lg shadow-md hover:scale-105 transform transition ease-out duration-200 overflow-hidden"
      aria-label={`${name} by ${artist || "Unknown artist"}`}
      title={`${name} — ${artist || "Unknown artist"}`}
    >
      <Link href={url} className="block">
        <img
          src={albumArt || PLACEHOLDER}
          alt={name}
          loading="lazy"
          className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-md shadow-sm"

        />
      </Link>

      <div className="mt-2">
        <Link href={url} className="block">
          <h3 className="text-sm md:text-base font-semibold text-white truncate">
            {name}
          </h3>
        </Link>

        {artist && (
          <Link href={artistUrl} className="block">
            <p className="text-xs md:text-sm text-gray-300 mt-1 truncate">
              {artist}
            </p>
          </Link>
        )}
      </div>
    </article>
  );
}

export default React.memo(SongTile);
