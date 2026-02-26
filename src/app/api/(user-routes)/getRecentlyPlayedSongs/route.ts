"use server";

import { ApiResponse } from "@/lib/apiResponse";
import { getSpotifyClient} from "@/lib/spotify";

export async function GET() {
  //getting the server session

  try {
    //as of we are making the request using fetch api then we must have to covert into json first

    const s = await getSpotifyClient();

    const recentlyPlayedSongs = await s.player.getRecentlyPlayedTracks(5);

    if (!recentlyPlayedSongs) {
      // console.log(recentlyPlayedSongs);
      throw new Error(
        "Error fetching the recentlyplaying tracks",
        recentlyPlayedSongs
      );
    }
    const response = recentlyPlayedSongs.items.map((song) => ({
      gid: song.track.id,
      song_name: song.track.name,
      image: song.track.album.images[0].url,
      artist: song.track.artists.map((artist) => ({
        artist_id: artist.id,
        artist_name: artist.name,
      })),
    }));

    //after successfully pulling the recently played we have to send it to the frontend
    return ApiResponse.success(
      response,
      "Recently Played songs fetched successfully",
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.error(`Failed : ${error.message}`, 500);
    }
  }
}
