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
  const [error, setError] = useState("");
  const [track, setTrack] = useState<TrackType | null>(null);
  const { session } = useMySession();

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return; // Prevent multiple fetches
    hasFetched.current = true; // Set the flag to true after the first fetch
    
    const getCurrentPlayingTrack = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
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
          setError(response?.data?.error?.message || "An error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
        setIsAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    getCurrentPlayingTrack();
  }, [session?.accessToken]);

  if (loading) {
    return <p>Loading current track...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!isAvailable || !track) {
    return <p>No track is currently playing on Spotify.</p>;
  }

  return (
    <div className="flex items-center gap-8 justify-around">
      <div className="h-28 w-28 flex flex-col justify-around">
        <h1 className="font-bold text-lg">{track.name}</h1>
        <h2 className="text-gray-500">
          {track.artists.map((artist) => artist.name).join(", ")}
        </h2>
        <div>
          <Link
            href={`/lyrics/#`}
            className="bg-black px-2 py-2 rounded-md font-semibold text-white"
          >
            Show Lyrics
          </Link>
        </div>
      </div>
      <div>
        <img
          src={track.album.images[0]?.url || ""}
          alt={track.name}
          className="h-28 w-28 rounded-md"
        />
      </div>
    </div>
  );
}

export default SpotifyCurrentState;
