import { NextRequest, NextResponse } from "next/server";
import LyricsModel from "@/models/lyrics.model";
import { DBConnect } from "@/lib/dbconnect";

export async function GET(req: NextRequest) {
  try {
    await DBConnect();

    // const body = await req.json();
    const { searchParams } = new URL(req.url);

    const global_id = searchParams.get("gid");

    if (!global_id) {
      return Response.json(
        { success: false, error: "global_id is required" },
        { status: 400 }
      );
    }

    const lyrics = await LyricsModel.findOne({ global_id }).lean();

    if (!lyrics) {
      return Response.json(
        { success: false, error: "Lyrics not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "fetched sucessfull", data: lyrics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch lyrics",
          message: error?.message || "Internal server error",
        },
        { status: 500 }
      );
    }
  }
}
