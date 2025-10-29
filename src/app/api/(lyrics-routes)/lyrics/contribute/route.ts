import { DBConnect } from "@/lib/dbconnect";
import LyricsModel from "@/models/lyrics.model";
import { NextRequest, NextResponse } from "next/server";

const extractLines = (text: string): string[] => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
};

export async function POST(req: NextRequest) {
  /*
  1. Connect to the database
  2. Extract and validate the request body
  3. Save the lyrics to the database
  4. Return a success or error response
  */
  try {
    await DBConnect();
    const body = await req.json();
    const { rawString: rawText, global_id } = body;

    if (!rawText || !global_id) {
      console.log("Missing required fields:", { rawText, global_id });
      return NextResponse.json(
        {
          success: false,
          error: "rawText and global_id are required",
        },
        { status: 400 }
      );
    }
    const linesToinsert = extractLines(rawText).map((line) => ({ line: line }));

    const existingLyrics = await LyricsModel.findOne({ global_id });

    if (existingLyrics) {
      existingLyrics.lyricsText = [
        ...existingLyrics.lyricsText,

        ...linesToinsert,
      ];

      await existingLyrics.save();

      return NextResponse.json(
        {
          success: true,
          data: existingLyrics,
          message: "Lyrics updated successfully",
        },
        { status: 200 }
      );
    }

    // const lines = extractLines(rawText);
    // console.log(lines);

    // if (lines.length === 0) {
    //   return NextResponse.json(
    //     { success: false, error: "Lyrics text cannot be empty" },
    //     { status: 400 }
    //   );
    // }

    //to insert the data in the database with model we need

    const newLyrics = await LyricsModel.create({
      global_id,
      lyricsText: linesToinsert,
    });

    if (!newLyrics) {
      return NextResponse.json(
        { success: false, error: "Failed to save lyrics" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, data: newLyrics },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting lyrics:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit lyrics",
          message: error.message || "Internal server error",
        },
        { status: 500 }
      );
    }
  }
}
