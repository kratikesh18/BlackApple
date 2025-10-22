"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import { useSpotifyService } from "@/hooks/useSpotifyService";
import { TrackType } from "@/types/responseTypes";
import { usePathname, useRouter } from "next/navigation";

const PLACEHOLDER =
  "data:image/svg+xml;%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 24 24'%3E%3Crect fill='%23343a40' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='52%25' fill='%23fff' font-size='10' font-family='Arial' dominant-baseline='middle' text-anchor='middle'%3ENO%20IMG%3C/text%3E%3C/svg%3E";

export default function SpotifyCurrentState() {
  const { getCurrentlyPlaying } = useSpotifyService();

  const [track, setTrack] = useState<TrackType | null>({
    album: {
      name: "taylor",
      artists: [{ name: "pateek" }],
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b273806c160566580d6335d1f16c",
        },
      ],
    },
    artists: [{ name: "prateek" }],
    global_id: "2323t3434",
    name: "dik",
    progress: "3421",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCurrentlyPlaying();
        console.log(res);
        if (!mounted) return;
        setTrack(res);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load current track");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    // load();
    return () => {
      mounted = false;
    };
  }, [getCurrentlyPlaying]);

  return (
    <div className="container bg-gray-700/40 border border-white/6 rounded-lg p-4 md:p-5 flex flex-col md:flex-row items-center gap-4">
      {/* Artwork */}
      <div className="flex-shrink-0">
        <img
          src={track?.album.images?.[0]?.url || PLACEHOLDER}
          alt={track?.name || "No track"}
          className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-md"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
            <div className="h-3 bg-zinc-800 rounded w-1/2" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : track ? (
          <>
            <h4 className="text-sm md:text-base font-semibold text-white truncate">
              {track.name}
            </h4>
            <p className="text-xs md:text-sm text-gray-300 truncate">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
            <p className="text-xs text-gray-400 truncate">
              Album: {track.album.name}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-400">
            No track is currently playing.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0">
        <div></div>
        {track ? (
          <Link
            href={`/lyrics/${encodeURIComponent(track.name)}`}
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white text-xs md:text-sm px-3 py-2 rounded-md"
          >
            Show Lyrics
          </Link>
        ) : (
          <button
            className="inline-block bg-gray-700 text-white text-xs md:text-sm px-3 py-2 rounded-md"
            disabled
          >
            No Lyrics
          </button>
        )}
      </div>
    </div>
  );
}
