import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import Link from "next/link";
import RightIcon from "@/components/icons/RightIcon";

export const HeroSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (searchQuery !== "") {
      //   fetchLyrics(searchQuery);
    }
    if (searchQuery === "") {
      //   setLyrics(null);
    }
  }, [searchQuery]);

  return (
    <div className="flex justify-center items-center mx-auto flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for Lyrics "
        className="text-lg py-5 font-semibold  rounded-md bg-gray-200/10 border border-white/20 text-white   md:text-2xl placeholder:text-gray-300/90"
      />

      {loading && <div className="loader"></div>}

      {error && (
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
      )}

      {/* {lyrics && (
        <div className="flex flex-col gap-4 justify-center items-center w-[90%]">
          {lyrics.map((item) => (
            <SearchTile item={item} key={item._id} />
          ))}
        </div>
      )} */}
    </div>
  );
};
