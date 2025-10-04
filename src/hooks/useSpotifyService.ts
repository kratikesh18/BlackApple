import { useCallback } from "react";
import api from "@/lib/api";
import { TrackType } from "@/types/responseTypes";
import { useDispatch } from "react-redux";

type LyricsCheckResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const useSpotifyService = () => {
  const dispatch = useDispatch();

  const getCurrentlyPlaying =
    useCallback(async (): Promise<TrackType | null> => {
      try {
        const response = await api.get("/spotify/track");
        dispatch({
          type: "currentTrack/setCurrentTrack",
          payload: response.data,
        });
        // console.log("Currently playing track data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching currently playing track:", error);
        return null; // caller को safe fallback
      }
    }, []);

  const checkLyricsAvailability = useCallback(
    async (global_id: string): Promise<LyricsCheckResponse> => {
      try {
        const response = await api.post("/lyrics/check", { global_id });
        return response.data;
      } catch (error: any) {
        console.error("Error checking lyrics availability:", error);
        return {
          success: false,
          error: error?.message || "Failed to check lyrics",
        };
      }
    },
    []
  );

  const submitLyrics = async (data: {
    rawString: string;
    global_id: string;
    track: TrackType;
  }) => {
    console.log("Submitting lyrics with data:", data);
    try {
      console.log("Submitting lyrics data:", data);
      const response = await api.post("/lyrics/contribute", data);
      console.log("Lyrics submission response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error submitting lyrics:", error);
      return {
        success: false,
        error: (error as Error)?.message || "Failed to submit lyrics",
      };
    }
  };

  return { getCurrentlyPlaying, checkLyricsAvailability, submitLyrics };
};
