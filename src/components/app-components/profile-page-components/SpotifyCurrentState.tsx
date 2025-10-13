import { useSpotifyService } from "@/hooks/useSpotifyService";
import { TrackType } from "@/types/responseTypes";
import React, { useEffect } from "react";
import SectionWrapper from "./SectionWrapper";

const SpotifyCurrentState = () => {
  const { getCurrentlyPlaying } = useSpotifyService();
  const [currentTrack, setCurrentTrack] = React.useState<TrackType | null>(
    null
  );

  useEffect(() => {
    const fetchCurrentState = async () => {
      const currentTrack = await getCurrentlyPlaying();
      
      if (currentTrack) {
        setCurrentTrack(currentTrack);
      } else {
        setCurrentTrack(null);
      }
    };
    fetchCurrentState();
  }, []);

  return (
    <>
      {currentTrack ? (
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.album.images[0]?.url}
            alt={currentTrack.name}
            className="w-16 h-16 rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">{currentTrack.name}</h3>
            <p className="text-sm text-gray-400">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-sm text-gray-400">
              Album: {currentTrack.album.name}
            </p>
            <p className="text-sm text-gray-400">
              Duration: {Math.floor(currentTrack.duration_ms / 60000)}:
              {Math.floor((currentTrack.duration_ms % 60000) / 1000)
                .toString()
                .padStart(2, "0")}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No track is currently playing.</p>
      )}
    </>
  );
};

export default SpotifyCurrentState;
