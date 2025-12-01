"use client";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import UserHeader from "@/components/app-components/profile-page-components/UserHeader";
import ArtistTile from "@/components/app-components/Tile-components/ArtistTile";
import SongTile from "@/components/app-components/Tile-components/SongTile";
import { useMySession } from "@/context/MySessionContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import React, { useCallback, useEffect, useState } from "react";

import api from "@/lib/api";

interface recentlyPlayedTrackType {
  gid: string;
  song_name: string;
  image: string;
  artist: [{ artist_id: string; artist_name: string }];
}

interface topArtistsType {
  id: string;
  name: string;
  image: string;
}
const ProfilePage = () => {
  const { session } = useMySession();

  const [recentlyPlayed, setRecentlyPlayed] = useState<
    recentlyPlayedTrackType[] | null
  >(null);

  const [myTopArtists, setMyTopArtists] = useState<topArtistsType[] | null>(
    null
  );

  const getRecentlyPlayedSongs = useCallback(async () => {
    try {
      const response = await api.get("/getRecentlyPlayedSongs");
      console.log("Recently played response:", response.data);

      if (response.data) {
        setRecentlyPlayed(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recently played songs:", error);
    }
  }, []);

  const getMyTopArtists = useCallback(async () => {
    try {
      const response = await api.get("/getMyTopArtist");
      console.log("Top artists response:", response);

      if (response.data) {
        setMyTopArtists(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching top artists:", error);
    }
  }, []);

  useEffect(() => {
    getMyTopArtists();
    getRecentlyPlayedSongs();
  }, [getMyTopArtists, getRecentlyPlayedSongs]);

  if (!session || !session.user) {
    return <h1>anauthenticated</h1>;
  }

  return (
    <div className="flex gap-3 flex-col">
      {/* Header Section */}
      <UserHeader name={session.user.name!} image={session.user.image!} />

      {/* Spotify Section */}
      <SectionWrapper title="Now Playing">
        <SpotifyCurrentState />
      </SectionWrapper>

      {/* Favorite Songs Section */}
      <SectionWrapper title="Your Recently Played Songs">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2.5 w-max mb-3">
            {recentlyPlayed ? (
              recentlyPlayed.map((song, index) => (
                <SongTile
                  albumArt={song.image}
                  name={song.song_name}
                  artist={song.artist[0].artist_name}
                  key={index}
                />
              ))
            ) : (
              <div>NO recently played songs</div>
            )}
          </div>

          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>

      {/* Top Artists Section */}
      <SectionWrapper title="Your Top Artists">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 w-max mb-3">
            {myTopArtists ? (
              myTopArtists?.map((singer, index) => (
                <ArtistTile
                  artistImage={singer.image}
                  artistName={singer.name}
                  // genres={singer.genres[0]}
                  key={index}
                />
              ))
            ) : (
              <div>Failed to Fetch Top Artist </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>
    </div>
  );
};
export default ProfilePage;
