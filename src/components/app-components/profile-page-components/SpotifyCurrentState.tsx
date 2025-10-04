import SpotifyStateSkeleton from "@/components/extra-components/SpotifyStateSkeleton";
import { useMySession } from "@/context/MySessionContext";
import { useSpotifyService } from "@/hooks/useSpotifyService";
import { RootState } from "@/store/store";
import { TrackType } from "@/types/responseTypes";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SpotifyCurrentState({ track }: { track: TrackType | null }) {
  // // const [track, setTrack] = useState<TrackType | null>(null);
  // if (currentTrack) {
  //   // setTrack(currentTrack);
  //   console.log("Current track from redux:", currentTrack);
  // }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLyricsAvailable, setIsLyricsAvailable] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const currentTrack = await getCurrentlyPlaying();

  //       if (!currentTrack) {
  //         setTrack(null);
  //         setError("No track is currently playing.");
  //         return;
  //       }

  //       dispatch({
  //         type: "currentTrack/setCurrentTrack",
  //         payload: currentTrack,
  //       });

  //       setTrack(currentTrack);
  //       const lyricsResponse = await checkLyricsAvailability(
  //         currentTrack.global_id
  //       );

  //       setIsLyricsAvailable(
  //         !!lyricsResponse?.success && !!lyricsResponse?.data
  //       );
  //     } catch (err) {
  //       console.error("Error fetching current track:", err);
  //       setError("Failed to load current track.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  //   //  auto-refresh every 30 sec
  //   const interval = setInterval(fetchData, 30000);
  //   return () => clearInterval(interval);
  // }, [getCurrentlyPlaying, checkLyricsAvailability]);

  const pathname = usePathname();

  if (loading) {
    return <SpotifyStateSkeleton />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!track) {
    return <p className="text-gray-300">No track is currently playing.</p>;
  }

  return (
    <div className="flex items-center justify-between ">
      {/* Left Side - Text Info */}
      <div className="flex flex-col justify-between gap-1 max-w-[70%]">
        <h1 className="font-bold text-base md:text-xl text-white truncate">
          {track?.name}
        </h1>
        <h2 className="text-sm text-gray-300 truncate">
          {track?.artists?.map((artist, index) => (
            <Link href={`/artist/${artist?.name}`} key={index}>
              {artist.name}
              {", "}
            </Link>
          ))}
        </h2>
        <h2 className="text-sm text-gray-300 truncate">{track?.album?.name}</h2>

        {pathname !== "/lyrics" && isLyricsAvailable ? (
          <Link
            href="/lyrics"
            className="mt-2 inline-block px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            View Lyrics
          </Link>
        ) : (
          <div>
            {pathname !== "/lyrics" && (
              <p className="mt-2 text-sm text-gray-500">
                Lyrics not available for this track.
              </p>
            )}
            <Link
              href={`/contribute/${track.global_id}`}
              className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Contribute Lyrics
            </Link>
          </div>
        )}
      </div>

      {/* Right Side - Album Art */}
      <div className="ml-4 shrink-0">
        <img
          src={track?.album?.images[0]?.url}
          alt={track.name}
          className="h-24 w-24 md:h-28 md:w-28 object-cover rounded-lg border border-zinc-800"
        />
      </div>
    </div>
  );
}

export default SpotifyCurrentState;
