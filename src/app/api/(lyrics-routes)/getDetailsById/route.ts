import { NextRequest, NextResponse } from "next/server";

import { getSpotifyClient } from "@/lib/spotify";
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk";
import { DBConnect } from "@/lib/dbconnect";
import LyricsModel from "@/models/lyrics.model";

export interface ISongData {
  gid: string;
  name: string;
  artists: [string];
  album: {
    name: string;
    image: string;
  };
  lyrics: {
    lyricsText:
      | [{ line: string; startTime: number; endTime: number; _id: string }]
      | [];
  };
}
const formatData = (rawdata: Track, lyrics: any) => {
  return {
    gid: rawdata.id,
    name: rawdata.name,

    artists: rawdata.artists.map((artist: any) => artist.name),

    album: {
      name: rawdata.album.name,
      image: rawdata.album.images[0]?.url,
    },
    lyrics: lyrics || [],
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

    // code for getting the lyrics from database
    await DBConnect();
    const lyricsExist = await LyricsModel.findOne({ global_id }).select(
      "lyricsText",
    );

    // console.log(lyricsText)

    // const songDetailsFiltered = formatSongDetails(songDetailsRaw);
    const songDetailsFiltered = formatData(songDetailsRaw, lyricsExist);

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
