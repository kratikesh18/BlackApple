import api from "@/lib/api";
import { AxiosResponse, ResponseType } from "axios";

const useLyricsService = () => {
  async function getLyricsForCurrentTrack(global_id: string) {
    const response = await api.get(`/lyrics/getLyrics?global_id=${global_id}`);

    
  }

  return {
    getLyricsForCurrentTrack,
  };
};
export { useLyricsService };
