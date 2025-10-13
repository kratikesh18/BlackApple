import api from "@/lib/api";
import { AxiosResponse, ResponseType } from "axios";
import { toast } from "sonner";

const useLyricsService = () => {
  async function getLyricsForCurrentTrack(global_id: string) {
    try {
      const response = await api.get(
        `/lyrics/getLyrics?global_id=${global_id}`
      );
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      toast.error(error.message);
      console.log("Error in useLyricsHook", error);
    }
  }

  return {
    getLyricsForCurrentTrack,
  };
};
export { useLyricsService };
