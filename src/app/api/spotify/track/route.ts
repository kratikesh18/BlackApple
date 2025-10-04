import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import { TrackType } from "@/types/responseTypes";


const filterData = (data: any): TrackType => {
  const filteredData: TrackType = {
    name: data.item.name,
    artists: data.item.artists.map((a: any) => ({ name: a.name })),
    album: {
      name: data.item.album.name,
      artists: data.item.album.artists.map((a: any) => ({ name: a.name })),
      images: data.item.album.images.map((img: any) => ({ url: img.url })),
    },
    global_id: data.item.id,
  };

  return filteredData;
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    throw new ApiError(400, "unauthenticated or missing access token");
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    let data: any = null;
    if (response.ok) {
      try {
        data = await response.json();
      } catch (err) {
        return NextResponse.json(
          { error: "Invalid JSON response from Spotify" },
          { status: 502 }
        );
      }
    } else {
      return NextResponse.json(
        { error: `Spotify API error: ${response.status}` },
        { status: response.status }
      );
    }

    // 🔹 Transform Spotify's response → TrackType

    const filtered: TrackType = filterData(data);
    // console.log("printing ", filtered);
    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch track" },
      { status: 500 }
    );
  }
}
