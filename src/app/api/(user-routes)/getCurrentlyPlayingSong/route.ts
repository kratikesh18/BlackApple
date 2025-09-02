import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";

interface SpotifyCurrentlyPlaying {
  item: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      artists: { name: string }[];
      images: { url: string; height: number; width: number }[];
    };
  };
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({
      status: 401,
      success: false,
      message: "Unauthorized: No active session found.",
    });
  }

  try {
    const response = await axios.get<SpotifyCurrentlyPlaying>(
      "https://api.spotify.com/v1/me/player/currently-playing/",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "No track is currently playing on Spotify.",
        isAvailable: false,
      });
    }

    if (response.status === 401) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Token expired. Please re-authenticate.",
        isAvailable: false,
      });
    }

    if (response.status === 200 && response.data) {
      const spotifyData = {
        name: response.data.item.name,
        id: response.data.item.id,
        artists: response.data.item.artists.map((artist) => ({
          name: artist.name,
        })),
        album: {
          name: response.data.item.album.name,
          artists: response.data.item.album.artists.map((artist) => ({
            name: artist.name,
          })),
          images: response.data.item.album.images,
        },
      };

      return NextResponse.json({
        status: 200,
        success: true,
        data: spotifyData,
        message: "Currently playing song fetched successfully.",
      });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error?.message ||
        "Spotify API error. Please try again later.";

      return NextResponse.json({
        status: error.response?.status || 500,
        success: false,
        message,
        isAvailable: false,
      });
    }

    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error. Please try again later.",
      isAvailable: false,
    });
  }
}
