import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { getServerSession } from "next-auth";

const client_id = process.env.SPOTIFY_CLIENT_ID!;


export async function spotify() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("No active Spotify session found");
  }

  //@ts-expect-error
  return SpotifyApi.withAccessToken(client_id, {
    access_token: session.accessToken as string,
  });
}
