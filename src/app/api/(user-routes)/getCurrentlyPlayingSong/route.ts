import { NextRequest } from "next/server";
import { spotify } from "@/lib/spotify";
import { ApiResponse } from "@/lib/apiResponse";
import { DBConnect } from "@/lib/dbconnect";
import LyricsModel from "@/models/lyrics.model";

export async function GET(req: NextRequest) {
  try {
    const s = await spotify();

    const currentlyPlayingSong: any = await s.player.getCurrentlyPlayingTrack();

    if (!currentlyPlayingSong || !currentlyPlayingSong.item) {
      return ApiResponse.success(null, "No song is currently playing", 200);
    }

    //@ts-ignore
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
  } catch (error: any) {
    console.error("Failed to fetch currently playing track:", error);
    return ApiResponse.error("Failed to fetch currently playing track", 500);
  }
}
