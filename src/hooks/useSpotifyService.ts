import { useCallback } from "react";
import api from "@/lib/api";

export const useSpotifyService = () => {
  const getCurrentlyPlaying = useCallback(async () => {
    try {
      // 🔹 Just call your backend route
      const response = await api.get("/spotify/track");
      return response.data;
    } catch (error) {
      console.error("Error fetching currently playing track:", error);
      throw error;
    }
  }, []);

  

  return { getCurrentlyPlaying };
};
