"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { getServerSession } from "next-auth";
import { cache } from "react";

const client_id = process.env.SPOTIFY_CLIENT_ID!;

export const  getSpotifyClient = cache(async()=> {
  //we are getting a sesssion here
  const session = await getServerSession(authOptions);

  //for getting token to check if user is authenticated
  if (!session?.accessToken) {
    throw new Error("No active Spotify session found");
  }


  //depending on that accesstoken we are instantiating a client
  //@ts-expect-error
  return SpotifyApi.withAccessToken(client_id, {
    access_token: session.accessToken as string,
  });
});

