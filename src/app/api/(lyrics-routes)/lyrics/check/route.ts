import { NextRequest, NextResponse } from "next/server";
import LyricsModel from "@/models/lyrics.model";
import { DBConnect } from "@/lib/dbconnect";

export async function POST(req: NextRequest) {
  try {
    await DBConnect();

    const body = await req.json();
    const { global_id } = body;

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

    return NextResponse.json({ success: true, data: lyrics }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching lyrics:", error);

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
