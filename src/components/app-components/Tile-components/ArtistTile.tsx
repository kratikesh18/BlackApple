import Link from "next/link";
import React from "react";

type ArtistTileProps = {
  artistName: string;
  artistImage?: string | null;
  genres?: string;
  classname?: string;
};

const AVATAR_PLACEHOLDER =
  "data:image/svg+xml;%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 24 24'%3E%3Crect fill='%23343a40' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='52%25' fill='%23fff' font-size='10' font-family='Arial' dominant-baseline='middle' text-anchor='middle'%3ENO%20IMG%3C/text%3E%3C/svg%3E";

function ArtistTile({
  artistName,
  artistImage,
  genres,
  classname = "",
}: ArtistTileProps) {
  const artistUrl = `/artist/${encodeURIComponent(artistName)}`;

  return (
    <article
      className={`w-28 sm:w-32 md:w-36 flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 shadow-sm transition-transform transform hover:scale-105 ${classname}`}
      aria-label={artistName}
      title={artistName}
    >
      <Link href={artistUrl} className="block">
        <img
          src={artistImage || AVATAR_PLACEHOLDER}
          alt={artistName}
          loading="lazy"
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full object-cover border-2 border-purple-600 shadow-md"
        />
      </Link>

      <div className="w-full">
        <Link href={artistUrl} className="block">
          <h3 className="text-sm md:text-base font-semibold text-white truncate">
            {artistName}
          </h3>
        </Link>
        {genres && (
          <p className="mt-1 text-xs md:text-sm text-gray-300 truncate">
            {genres}
          </p>
        )}
      </div>
    </article>
  );
}

export default React.memo(ArtistTile);
