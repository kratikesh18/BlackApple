import { spotify } from "@/lib/spotify";
import { ApiResponse } from "@/lib/apiResponse";
import { DBConnect } from "@/lib/dbconnect";
import LyricsModel from "@/models/lyrics.model";
import type { PlaybackState } from "@spotify/web-api-ts-sdk";

interface CurrentlyPlayingSongType extends PlaybackState {}
export async function GET() {
  try {
    const s = await spotify();

    const currentlyPlayingSong: CurrentlyPlayingSongType =
      await s.player.getCurrentlyPlayingTrack();

    if (!currentlyPlayingSong || !currentlyPlayingSong.item) {
      return ApiResponse.success(null, "No song is currently playing", 200);
    }

    const formatted = {
      gid: currentlyPlayingSong.item.id,
      name: currentlyPlayingSong.item.name,
      artists: currentlyPlayingSong.item.artists.map(
        (artist: any) => artist.name
      ),
      album: {
        name: currentlyPlayingSong.item.album.name,
        image: currentlyPlayingSong.item.album.images[0]?.url,
      },
      progressMs: currentlyPlayingSong.progress_ms,
      isPlaying: currentlyPlayingSong.is_playing,
      duration: currentlyPlayingSong.item.duration_ms,
      remainingTime:
        currentlyPlayingSong.item.duration_ms -
        currentlyPlayingSong.progress_ms,
    };

    //checking if the lyrics is available or not in the db

    await DBConnect();

    const lyrics = (await LyricsModel.exists({
      global_id: currentlyPlayingSong.item.id,
    }))
      ? true
      : false;

    return ApiResponse.success(
      { ...formatted, isLyricsAvailable: lyrics },
      "Currently playing song fetched successfully",
      200
    );
  } catch (error) {
    console.error("Failed to fetch currently playing track:", error);
    if (error instanceof Error) {
      return ApiResponse.error("Failed to fetch currently playing track", 500);
    }
  }
}
