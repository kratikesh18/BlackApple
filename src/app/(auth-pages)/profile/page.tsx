"use client";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import UserHeader from "@/components/app-components/profile-page-components/UserHeader";
import ArtistTile from "@/components/app-components/Tile-components/ArtistTile";
import SongTile from "@/components/app-components/Tile-components/SongTile";
import { useMySession } from "@/context/MySessionContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import React from "react";
import Link from "next/link";

const ProfilePage = () => {
  const { session, status } = useMySession();

  if (!session) {
    return <h1>anauthenticated</h1>;
  }

  const SongData = [
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
    {
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
      artist: "Vaultboy",
      name: "Rocket Science",
    },
  ];

  const SingerData = [
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
    {
      artistImage:
        "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
      artistName: "Ed Sheeran",
    },
  ];

  return (
    <div className=" flex gap-3 flex-col">
      {/* Header Section */}
      <UserHeader name={session.user?.name!} image={session.user?.image!} />

      {/* Spotify Section */}
      <SectionWrapper title="Currently On Spotify">
        <SpotifyCurrentState />
      </SectionWrapper>

      {/* Favorite Songs Section */}
      <SectionWrapper title="Your Favourite Songs">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2.5 w-max mb-3">
            {SongData.map((song, index) => (
              <Link href={"/lyrics/#"} key={index}>
                <SongTile
                  albumArt={song.albumArt}
                  name={song.name}
                  artist={song.artist}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>

      {/* Top Artists Section */}
      <SectionWrapper title="Your Top Artists">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 w-max mb-3">
            {SingerData.map((singer, index) => (
              <Link href={"/artist/#"} key={index}>
                <ArtistTile
                 
                  artistImage={singer.artistImage}
                  artistName={singer.artistName}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Your Contributions">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 w-max mb-3">
            {SongData.map((songs, index) => (
              <Link href={"/lyrics/#"} key={index}>
                <SongTile
                  albumArt={songs.albumArt}
                  name={songs.name}
                  artist={songs.artist}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>
    </div>
  );
};
export default ProfilePage;
