import SpotifyStateSkeleton from "@/components/extra-components/SpotifyStateSkeleton";
import { Button } from "@/components/ui/button";
import { useMySession } from "@/context/MySessionContext";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type TrackType = {
  album: {
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
  };
  artists: { name: string }[];
  name: string;
};

function SpotifyCurrentState() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [track, setTrack] = useState<TrackType | null>(null);
  const { session } = useMySession();

  const hasFetched = useRef(false);
  useEffect(() => {
    // if (hasFetched.current) return; // Prevent multiple fetches
    // hasFetched.current = true; // Set the flag to true after the first fetch

    const getCurrentPlayingTrack = async () => {
      setLoading(true);
      // setTimeout(() => {
      //   console.log("hello");
      //   setLoading(false);
      // }, 100000);
      setError("");

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing/isworking?=false",
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (response.status === 204) {
          setError("No track is currently playing on Spotify.");
          setIsAvailable(false);
          return;
        }

        if (response.status === 401) {
          setError("Token expired. Please re-authenticate.");
          setIsAvailable(false);
          return;
        }

        if (response.status === 200 && response.data) {
          setTrack({
            album: {
              name: response.data.item.album.name,
              artists: response.data.item.album.artists.map((artist: any) => ({
                name: artist.name,
              })),
              images: response.data.item.album.images,
            },
            artists: response.data.item.artists.map((artist: any) => ({
              name: artist.name,
            })),
            name: response.data.item.name,
          });
          setIsAvailable(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const { response } = error;
          setError(
            response?.data?.error?.message || "Hold on, we are working on this."
          );
        } else {
          setError("An unexpected error occurred.");
        }
        setIsAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    getCurrentPlayingTrack();
  }, [session]);

  if (loading) {
    return <SpotifyStateSkeleton />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!isAvailable || !track) {
    return <p>No track is currently playing on Spotify.</p>;
  }

  return (
    <div className="flex items-center justify-between p-4">
      {/* Left Side - Text Info */}
      <div className="flex flex-col justify-between gap-1 max-w-[70%]">
        <h1 className="font-bold text-xl text-white truncate">{track.name}</h1>
        <h2 className="text-base text-gray-300 truncate">
          {track.artists.map((artist) => artist.name).join(", ")}
        </h2>
        <h2 className="text-base text-gray-300 truncate">{track.album.name}</h2>

        <Link
          href={`/lyrics/#`}
          className="mt-2 inline-block w-fit bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Show Lyrics
        </Link>
      </div>

      {/* Right Side - Album Art */}
      <div className="ml-4 shrink-0">
        <img
          src={track.album.images[0]?.url || ""}
          alt={track.name}
          className="h-28 w-28 object-cover rounded-lg border border-zinc-800"
        />
      </div>
    </div>
  );
}

export default SpotifyCurrentState;
