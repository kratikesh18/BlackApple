"use client";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import UserHeader from "@/components/app-components/profile-page-components/UserHeader";
import ArtistTile from "@/components/app-components/Tile-components/ArtistTile";
import SongTile from "@/components/app-components/Tile-components/SongTile";
import { useMySession } from "@/context/MySessionContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import React, { useEffect } from "react";
// import Link from "next/link";
import axios from "axios";
import {
  MyTopArtistsResponse,
  RecentlyPlayedResponse,
} from "@/types/RecentlyPlayedResponse";
import api from "@/lib/api";

const ProfilePage = () => {
  const { session, status } = useMySession();

  if (!session) {
    return <h1>anauthenticated</h1>;
  }

  const [recentlyPlayed, setRecentlyPlayed] = React.useState<
    RecentlyPlayedResponse[] | null
  >(null);

  const [myTopArtists, setMyTopArtists] = React.useState<
    MyTopArtistsResponse[] | null
  >(null);

  useEffect(() => {
    const getRecentlyPlayedSongs = async () => {
      try {
        // const response = await axios.get(
        //   "https://api.spotify.com/v1/me/player/recently-played?limit=5",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${session?.accessToken}`,
        //     },
        //   }
        // );

        const response = (await api.get("/getRecentlyPlayedSongs")).data;
        console.log(response.data);
        if (response.status === 200) {
          setRecentlyPlayed(response.data?.items);
          // console.log(response.data.items);
        }
        // console.log(response.status === 200);
      } catch (error) {
        console.error("Error fetching recently played songs:", error);
      }
    };

    const getMyTopArtists = async () => {
      try {
        const { data: artistData } = await api.get("/getMyTopArtists");

        // console.log(response2.data.items);
        // console.log(artistData.data);
        if (!artistData) {
          throw new Error("Failes to Fetch Artist data");
        }
        setMyTopArtists(artistData.data.items);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };
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
            {recentlyPlayed &&
              recentlyPlayed.map((song, index) => (
                <SongTile
                  albumArt={song.track.album.images[0].url}
                  name={song.track.name}
                  artist={song.track.artists[0].name}
                  key={index}
                />
              ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>

      {/* Top Artists Section */}
      <SectionWrapper title="Your Top Artists">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 w-max mb-3">
            {myTopArtists?.map((singer, index) => (
              <ArtistTile
                artistImage={singer.images[0].url}
                artistName={singer.name}
                // genres={singer.genres[0]}
                key={index}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper>

      {/* <SectionWrapper title="Your Contributions">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 w-max mb-3">
            {SongData.map((songs, index) => (
              <SongTile
                albumArt={songs.albumArt}
                name={songs.name}
                artist={songs.artist}
                key={index}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-30" />
        </ScrollArea>
      </SectionWrapper> */}
    </div>
  );
};
export default ProfilePage;

// const SongData = [
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
//   {
//     albumArt:
//       "https://i.scdn.co/image/ab67616d0000b2730ce26aadfde6d3a4c9f7e0d0",
//     artist: "Vaultboy",
//     name: "Rocket Science",
//   },
// ];

// const SingerData = [
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
//   {
//     artistImage:
//       "https://i.scdn.co/image/ab6761610000e5eb784daff754ecfe0464ddbeb9",
//     artistName: "Ed Sheeran",
//   },
// ];

// //
// const tempRecentlyPlayed = {
//   items: [
//     {
//       track: {
//         album: {
//           album_type: "album",
//           artists: [
//             {
//               external_urls: {
//                 spotify:
//                   "https://open.spotify.com/artist/1mYsTxnqsietFxj1OgoGbG",
//               },
//               href: "https://api.spotify.com/v1/artists/1mYsTxnqsietFxj1OgoGbG",
//               id: "1mYsTxnqsietFxj1OgoGbG",
//               name: "A.R. Rahman",
//               type: "artist",
//               uri: "spotify:artist:1mYsTxnqsietFxj1OgoGbG",
//             },
//           ],
//           external_urls: {
//             spotify: "https://open.spotify.com/album/3HpV4jIHMPWTHuwMFMReue",
//           },
//           href: "https://api.spotify.com/v1/albums/3HpV4jIHMPWTHuwMFMReue",
//           id: "3HpV4jIHMPWTHuwMFMReue",
//           images: [
//             {
//               height: 640,
//               url: "https://i.scdn.co/image/ab67616d0000b273a4686f3b95e096ba4ce53f83",
//               width: 640,
//             },
//             {
//               height: 300,
//               url: "https://i.scdn.co/image/ab67616d00001e02a4686f3b95e096ba4ce53f83",
//               width: 300,
//             },
//             {
//               height: 64,
//               url: "https://i.scdn.co/image/ab67616d00004851a4686f3b95e096ba4ce53f83",
//               width: 64,
//             },
//           ],
//           name: "I",
//           release_date: "2015-01-09",
//           release_date_precision: "day",
//           total_tracks: 7,
//           type: "album",
//           uri: "spotify:album:3HpV4jIHMPWTHuwMFMReue",
//         },
//         artists: [
//           {
//             external_urls: {
//               spotify: "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw",
//             },
//             href: "https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw",
//             id: "4YRxDV8wJFPHPTeXepOstw",
//             name: "Arijit Singh",
//             type: "artist",
//             uri: "spotify:artist:4YRxDV8wJFPHPTeXepOstw",
//           },
//           {
//             external_urls: {
//               spotify: "https://open.spotify.com/artist/0oOet2f43PA68X5RxKobEy",
//             },
//             href: "https://api.spotify.com/v1/artists/0oOet2f43PA68X5RxKobEy",
//             id: "0oOet2f43PA68X5RxKobEy",
//             name: "Shreya Ghoshal",
//             type: "artist",
//             uri: "spotify:artist:0oOet2f43PA68X5RxKobEy",
//           },
//         ],
//         disc_number: 1,
//         duration_ms: 308485,
//         explicit: false,
//         external_ids: {
//           isrc: "INS181427607",
//         },
//         external_urls: {
//           spotify: "https://open.spotify.com/track/0XCtA9pYB0aOciPzrJpkAK",
//         },
//         href: "https://api.spotify.com/v1/tracks/0XCtA9pYB0aOciPzrJpkAK",
//         id: "0XCtA9pYB0aOciPzrJpkAK",
//         is_local: false,
//         name: "Tu Chale",
//         popularity: 57,
//         preview_url: null,
//         track_number: 3,
//         type: "track",
//         uri: "spotify:track:0XCtA9pYB0aOciPzrJpkAK",
//       },
//       played_at: "2025-04-30T18:40:35.796Z",
//       context: null,
//     },
//   ],
// };
