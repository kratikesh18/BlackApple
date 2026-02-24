import { NextRequest, NextResponse } from "next/server";

import { getSpotifyClient } from "@/lib/spotify";
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk";

export interface ISongData{
  gid : string,
  name : string,
  artists : [string],
  album:{
    name:string,
    image:string
  }
}
const formatData = (rawdata: Track) => {
  return {
    gid: rawdata.id,
    name: rawdata.name,

    artists: rawdata.artists.map((artist: any) => artist.name),

    album: {
      name: rawdata.album.name,
      image: rawdata.album.images[0]?.url,
    },
  };
};

export async function GET(req: NextRequest) {
  try {
    const client = await getSpotifyClient();

    // const body = await req.json();
    const { searchParams } = new URL(req.url);

    const global_id = searchParams.get("gid");

    if (!global_id) {
      return Response.json(
        { success: false, error: "global_id is required" },
        { status: 400 },
      );
    }

    const songDetailsRaw: Track = await client.tracks.get(global_id);

    // const songDetailsFiltered = formatSongDetails(songDetailsRaw);
    const songDetailsFiltered = formatData(songDetailsRaw);

    if (!songDetailsFiltered) {
      return Response.json(
        { success: false, error: "Lyrics not found" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "fetched sucessfull",
        data: songDetailsFiltered,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch lyrics",
          message: error?.message || "Internal server error",
        },
        { status: 500 },
      );
    }
  }
}
