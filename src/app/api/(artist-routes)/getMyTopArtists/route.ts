"use server";
import { ApiResponse } from "@/lib/apiResponse";

import { spotify } from "@/lib/spotify";

export async function GET(req: Request) {
  try {
    const s = await spotify();

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
      image: artist.images?.[0]?.url || "/default-artist.png",
    }));

    return ApiResponse.success(
      formatted,
      "Top artists fetched successfully",
      200
    );
  } catch (error: any) {
    console.log("Error fetching top artists:", error);
    return ApiResponse.error(`Error: ${error.message || error}`, 500);
  }
}
