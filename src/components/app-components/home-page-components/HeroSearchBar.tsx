"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import axios from "axios";
import { useMySession } from "@/context/MySessionContext";
import {
  MyTopArtistsResponse,
  RecentlyPlayedResponse,
} from "@/types/RecentlyPlayedResponse";
import SongTile from "../Tile-components/SongTile";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeSearch } from "@/store/searchBarSlice";

export const HeroSearchBar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.searchBar);
  const { session } = useMySession();

  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultTracks, setResultTracks] = useState<
    RecentlyPlayedResponse[] | null
  >(null);
  const [resultArtists, setResultArtists] = useState<
    MyTopArtistsResponse[] | null
  >(null);

  // debounce input -> update query
  const debounced = useMemo(
    () =>
      debounce((q: string) => {
        setQuery(q.trim());
      }, 450),
    []
  );

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  // fetch results when query changes and overlay is open
  useEffect(() => {
    //if searchbar not opened then do nothing
    if (!isOpen) return;

    //if query is empty then reset all states
    if (!query) {
      setResultTracks(null);
      setResultArtists(null);
      setError(null);
      setLoading(false);
      return;
    }

    const ac = new AbortController();

    const fetchSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://api.spotify.com/v1/search`, {
          params: {
            q: query,
            type: "track,artist,album",
            limit: 6,
            market: "IN",
          },
          headers: { Authorization: `Bearer ${session?.accessToken}` },
          signal: ac.signal,
        });

        const data = res.data;
        console.log(data);
        setResultTracks(data.tracks?.items?.length ? data.tracks.items : null);
        setResultArtists(
          data.artists?.items?.length ? data.artists.items : null
        );
        if (!data.tracks?.items?.length && !data.artists?.items?.length) {
          setError("No results found.");
        }
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
    return () => ac.abort();
  }, [query, isOpen, session?.accessToken]);

  // escape to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeSearch()); // replace with your action if different
      }
    };

    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 backdrop-blur-[0.7px] p-4 border-2 border-white "
      aria-modal="true"
      role="dialog"
      // clicking backdrop closes overlay
      onClick={() => dispatch(closeSearch())}
    >
      {/* <div
        className="relative w-full max-w-3xl mx-auto rounded-xl bg-gradient-to-br from-gray-900/90 to-black/80 border border-white shadow-2xl "
        onClick={(e) => e.stopPropagation()}
      > */}
      {/* close button */}
      {/* <button
          aria-label="Close search"
          onClick={() => dispatch(closeSearch())}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button> */}

      {/* centered input */}
      <div className="absolute top-[17vh] w-full px-4 md:p-0 md:w-md h-fit ">
        <Input
          autoFocus
          onChange={(e) => debounced(e.target.value)}
          placeholder="Search for lyrics, artists, albums..."
          className="p-4 py-6   md:text-xl w-full  border border-white/30 placeholder-gray-400 text-white focus:border-white focus:ring-0 bg-black "
        />
      </div>

      {/* results */}
      <div className="mt-6 max-h-[60vh] overflow-y-auto">
        {loading && <div className="loader "></div>}

        {error && !loading && (
          <p className="text-center text-red-400 py-4">{error}</p>
        )}
        {/*
          <div className="flex flex-wrap gap-3 justify-center">
            {resultTracks &&
              resultTracks.map((song, i) => (
                <SongTile
                  key={i}
                  albumArt={song.track.album.images[0]?.url}
                  name={song.track.name}
                  artist={song.track.artists[0]?.name}
                />
              ))}
          </div>

          {resultArtists && (
            <div className="mt-4">
              <h3 className="text-sm text-gray-300 mb-2">Artists</h3>
              <div className="flex flex-wrap gap-2">
                {resultArtists.map((a, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 rounded-md bg-white/5 text-gray-200 text-sm"
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            </div>
          )} */}
        {!resultTracks || !resultArtists ? (
          <></>
        ) : (
          <div>Response logged in console</div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};
