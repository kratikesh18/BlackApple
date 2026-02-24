import api from "@/lib/api";
import { AxiosError } from "axios";

import { toast } from "sonner";
type GetLyricsForCurrentTrackReturnType = {
  _id: string;
  global_id: string;
  lyricsText: {
    line: string;
    startTime: number;
    endTime: number;
    _id: string;
  }[];
  contributedBy: any[]; // or a proper type if known
  keywords: string[];
  readyToPulish: boolean;
  createdAt: string; // could be Date if you parse it
  updatedAt: string;
  __v: number;
};

function  useLyricsService () {

  //this is funciton inside hook
  async function getLyricsForCurrentTrack(global_id: string):Promise<GetLyricsForCurrentTrackReturnType|null> {
    try {
      const response = await api.get(
        `/lyrics/getLyrics?gid=${global_id}`
      );
      // console.log(response.data);

      return response.data.data;
    } catch (error) {
      if(error instanceof AxiosError){
        if(error.status == 404){
          toast.error("Lyrics Not Found.")
        }
      }

      console.log("Error in useLyricsHook", error);

    }
    return null;
  }


  //below block of code show that useLyricsService is returning the getLyricsForCurrenttrack
  return {
    getLyricsForCurrentTrack,
  };

};

export { useLyricsService };
