import api from "@/lib/api";
import { AxiosResponse, ResponseType } from "axios";

const useLyricsService = () => {
  async function getLyricsForCurrentTrack(global_id: string) {
    try {
      const response: AxiosResponse = await api.get(
        `/lyrics/getLyrics?global_id=${global_id}`
      );
      if (!response.data.success) {
        throw new Error("Failed to fetch lyrics");
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      throw error;
    }
  }

  return {
    getLyricsForCurrentTrack,
  };
};
export { useLyricsService };
