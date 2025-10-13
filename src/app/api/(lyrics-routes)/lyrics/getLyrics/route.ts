import { DBConnect } from "@/lib/dbconnect";
import LyricsModel from "@/models/lyrics.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const global_id = searchParams.get("global_id");

  // console.log("printing the params ", searchParams);

  if (!global_id) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "global_id query parameter is required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await DBConnect();
    const lyrics = await LyricsModel.findOne({ global_id });

    if (!lyrics) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Lyrics not found for the provided global_id",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ success: true, data: lyrics }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
      }),
      { status: 500,  headers: { "Content-Type": "application/json" } }
    );
  }
}
