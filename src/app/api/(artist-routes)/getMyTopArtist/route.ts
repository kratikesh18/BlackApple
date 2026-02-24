import { ApiResponse } from "@/lib/apiResponse";

import { getSpotifyClient } from "@/lib/spotify";

export async function GET() {
  try {
    const s = await getSpotifyClient();    // we can create a seperate function exporting this only instance
                                  // to reduce the multiple instance and save memory and call

    const topArtists = await s.currentUser.topItems(
      "artists",
      "medium_term",
      5
    );

    console.log("printing the top artists: ", topArtists);
    if (!topArtists) {
      return ApiResponse.error("Failed to fetch top artists", 500);
    }

    const formatted = topArtists.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.images?.[0]?.url,
    }));
    console.log("printing the formatted data: ", formatted);

    return ApiResponse.success(
      formatted,
      "Top artists fetched successfully",
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching top artists:", error);
      return ApiResponse.error(`Error: ${error.message || error}`, 500);
    }
  }
}
