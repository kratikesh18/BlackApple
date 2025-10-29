// import { useCallback } from "react";
// import api from "@/lib/api";
// import { TrackType } from "@/types/responseTypes";
// import { useDispatch } from "react-redux";
// import { AxiosError } from "axios";

// type LyricsCheckResponse = {
//   success: boolean;
//   data?: any;
//   error?: string;
// };

// export const useSpotifyService = () => {
//   const dispatch = useDispatch();

//   const getCurrentlyPlaying = useCallback(async (): Promise<TrackType> => {
//     try {
//       const response = await api.get("/spotify/track");
//       dispatch({
//         type: "currentTrack/setCurrentTrack",
//         payload: response.data,
//       });
//       // console.log("Currently playing track data:", response.data);
//       return response.data;
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         return {
//           success: false,
//           error: error.response?.data.error,
//         };
//       }
//       // console.error("Error fetching currently playing track:", error);
//       return null; // caller को safe fallback
//     }
//   }, [dispatch]);

//   const checkLyricsAvailability = useCallback(
//     async (global_id: string): Promise<LyricsCheckResponse | any> => {
//       if (!global_id) {
//         return null;
//       }
//       try {
//         const response = await api.get(`/lyrics/check?gid=${global_id}`);
//         return response.data;
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           console.log("error is xios", error.response?.data.error);
//           return {
//             success: false,
//             error: error?.response?.data.error || "Failed to check lyrics",
//           };
//         }
//       }
//     },
//     []
//   );

//   const submitLyrics = async (data: {
//     rawString: string;
//     global_id: string;
//     track: TrackType;
//   }) => {
//     console.log("Submitting lyrics with data:", data);
//     try {
//       console.log("Submitting lyrics data:", data);
//       const response = await api.post("/lyrics/contribute", data);
//       console.log("Lyrics submission response:", response.data);
//       return response.data;
//     } catch (error) {
//       // console.error("Error submitting lyrics:", error);
//       if (error instanceof AxiosError) {
//         return {
//           success: false,
//           error: error.response?.data.error || "Failed to submit lyrics",
//         };
//       }
//     }
//   };

//   const getRecentlyPlayedSongs = useCallback(() => {}, []);

//   return { getCurrentlyPlaying, checkLyricsAvailability, submitLyrics };
// };
