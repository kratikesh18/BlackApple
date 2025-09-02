import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import axios from "axios";
import { useMySession } from "@/context/MySessionContext";
import {
  MyTopArtistsResponse,
  RecentlyPlayedResponse,
} from "@/types/RecentlyPlayedResponse";
import SongTile from "../Tile-components/SongTile";

export const HeroSearchBar = () => {
  const { session, status } = useMySession();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [resultTracks, setResultTracks] = useState<
    RecentlyPlayedResponse[] | null
  >(null);
  // const [resultAlbums, setResultAlbums] = useState<any[]>([]);
  const [resultArtists, setResultArtists] = useState<
    MyTopArtistsResponse[] | null
  >(null);

  useEffect(() => {
    const fetchSpotifyLibrary = async () => {
      setLoading(true);
      setError(null);
      if (!searchQuery) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchQuery}&type=album%2Cartist%2Ctrack&market=IN&limit=5&offset=5`,

          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          if (response.data.tracks.items.length > 0) {
            setResultTracks(response.data.tracks.items);
          }
          // if (response.data.albums.items.length > 0) {
          //   setResultAlbums(response.data.albums.items);
          // }
          if (response.data.artists.items.length > 0) {
            setResultArtists(response.data.artists.items);
          }
          if (response.data.tracks.items.length === 0) {
            setError("No results found for your search.");
          } else {
            setError(null);
          }
        }
      } catch (error) {
        console.log("Error fetching top artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyLibrary();
  }, [searchQuery]);

  return (
    <div className="flex justify-center items-center mx-auto flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for Lyrics "
        className="text-lg py-5 font-semibold  rounded-md bg-gray-200/10 border border-white/20 text-white  md:text-2xl placeholder:text-gray-300/90"
      />

      {loading && <div className="loader"></div>}

      <div className="flex gap-2.5 w-max mb-3">
        {resultTracks &&
          resultTracks.map((song, index) => (
            <SongTile
              albumArt={song.track.album.images[0].url}
              name={song.track.name}
              artist={song.track.artists[0].name}
              key={index}
            />
          ))}
      </div>

      {/* {error && (
        <div className={`text-red-700 ${error ? "block" : "hidden"}`}>
          {error}
          <h2 className="text-white flex gap-2 text-2xl items-center">
            Create{" "}
            <Link
              href={`/addLyrics/createAlbum/${searchQuery}`}
              className="font-bold underline "
            >
              {searchQuery}
            </Link>{" "}
            <RightIcon />{" "}
          </h2>
        </div>
      )} */}
    </div>
  );
};
