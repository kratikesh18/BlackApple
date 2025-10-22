"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ApiResponse } from "@/lib/apiResponse";
import { RecentlyPlayedResponse } from "@/types/RecentlyPlayedResponse";


export async function GET(req: Request) {
  //getting the server session
  const session = await getServerSession(authOptions);
  if (!session) {
    //if not the session then throw the error respose
    return ApiResponse.error("No server Session", 401);
  }

  try {
    const response: spot = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: "GET",
      }
    );
    //as of we are making the request using fetch api then we must have to covert into json first

    const { items: recentlyPlayedSongs } = await response.json();

    const dataToSend: RecentlyPlayedResponse = {
      track: {
        name: "",
        album: { images: { url: "" } },
        artists: [{ name: "" }, { name: "" }],
        global_id: "",
      },
    };
    console.log(recentlyPlayedSongs);
    if (!recentlyPlayedSongs) {
      throw new Error("Failed to get recently Played ");
    }

    //after successfully pulling the recently played we have to send it to the frontend
    return ApiResponse.success(
      recentlyPlayedSongs,
      "Recently Played songs fetched successfully",
      200
    );
  } catch (error: any) {
    return ApiResponse.error(`Failed : ${error.message}`, 500);
  }
}
