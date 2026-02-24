import { getSpotifyClient } from "@/lib/spotify";
import { ApiResponse } from "@/lib/apiResponse";
import { DBConnect } from "@/lib/dbconnect";
import LyricsModel from "@/models/lyrics.model";
import type { PlaybackState , } from "@spotify/web-api-ts-sdk";

interface CurrentlyPlayingSongType extends PlaybackState {}

const formatData = (currentlyPlayingSong: CurrentlyPlayingSongType) => {
  return {
    gid: currentlyPlayingSong.item.id,
    name: currentlyPlayingSong.item.name,
    isPlaying: currentlyPlayingSong.is_playing,

    progressMs: currentlyPlayingSong.progress_ms,
    duration: currentlyPlayingSong.item.duration_ms,
    remainingTime:
      currentlyPlayingSong.item.duration_ms - currentlyPlayingSong.progress_ms,
    //@ts-ignore
    artists: currentlyPlayingSong.item.artists.map(
      (artist: any) => artist.name,
    ),
    album: {
      //@ts-ignore
      name: currentlyPlayingSong.item.album.name,
      //@ts-ignore
      image: currentlyPlayingSong.item.album.images[0]?.url,
    },
  }
};

export async function GET() {
  try {
    const s = await getSpotifyClient();

    const currentlyPlayingSong: CurrentlyPlayingSongType =
      await s.player.getCurrentlyPlayingTrack();

    if (!currentlyPlayingSong || !currentlyPlayingSong.item) {
      return ApiResponse.success(null, "No song is currently playing", 200);
    }

    const formatted = formatData(currentlyPlayingSong);

    //checking if the lyrics is available or not in the db

    await DBConnect();

    const lyrics = await LyricsModel.exists({
      global_id: currentlyPlayingSong.item.id,
    });

    //spread operator
    const responseToSend = { ...formatted, isLyricsAvailable: lyrics };

    return ApiResponse.success(
      responseToSend,
      "Currently playing song fetched successfully",
      200,
    );
  } catch (error) {
    console.error("Failed to fetch currently playing track:", error);
    if (error instanceof Error) {
      return ApiResponse.error("Failed to fetch currently playing track", 500);
    }
  }
}
