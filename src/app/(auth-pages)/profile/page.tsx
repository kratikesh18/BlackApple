"use client";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import UserHeader from "@/components/app-components/profile-page-components/UserHeader";
import ArtistTile from "@/components/app-components/Tile-components/ArtistTile";
import SongTile from "@/components/app-components/Tile-components/SongTile";
import { useMySession } from "@/context/MySessionContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import React, { useCallback, useEffect } from "react";

import {
  MyTopArtistsResponse,
  RecentlyPlayedResponse,
} from "@/types/RecentlyPlayedResponse";
import api from "@/lib/api";

interface recentlyPlayedTrackType {
  gid: string;
  song_name: string;
  image: string;
  artist: [{ artist_id: string; artist_name: string }];
}

[
  {
    id: "2oBG74gAocPMFv6Ij9ykdo",
    name: "Seedhe Maut",
    image: "https://i.scdn.co/image/ab6761610000e5ebdbfd70ecee8d42dfd5fbb29d",
  },
];
interface topArtistsType {
  id: string;
  name: string;
  image: string;
}
const ProfilePage = () => {
  const { session, status } = useMySession();

  if (!session) {
    return <h1>anauthenticated</h1>;
  }

  const [recentlyPlayed, setRecentlyPlayed] = React.useState<
    recentlyPlayedTrackType[] | null
  >(null);

  const [myTopArtists, setMyTopArtists] = React.useState<
    topArtistsType[] | null
  >(null);

  const getRecentlyPlayedSongs = useCallback(async () => {
    try {
      const response = await api.get("/getRecentlyPlayedSongs");
      console.log("Recently played response:", response.data);

      if (response.data) {
        setRecentlyPlayed(response.data.data); // ✅ your ApiResponse wraps data inside `data`
      }
    } catch (error) {
      console.error("Error fetching recently played songs:", error);
    }
  }, []);

  const getMyTopArtists = useCallback(async () => {
    try {
      const response = await api.get("/getMyTopArtists");
      console.log("Top artists response:", response.data);

      if (response.data) {
        setMyTopArtists(response.data.data); // ✅ your ApiResponse wraps data inside `data`
      }
    } catch (error) {
      console.error("Error fetching top artists:", error);
    }
  }, []);

  useEffect(() => {
    getMyTopArtists();
    getRecentlyPlayedSongs();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      {/* Header Section */}
      <UserHeader name={session.user?.name!} image={session.user?.image!} />

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
