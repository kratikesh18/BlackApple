"use server";
import { ApiResponse } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return ApiResponse.error("Session not found ", 401);
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=5",
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: "GET",
      }
    ).then(async (data) => await data.json());
    // console.log("printing the spotify response", response);
    return ApiResponse.success(response, "fetched successfull", 202);
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return ApiResponse.error(`error : ${error}`, 301);
  }
}
