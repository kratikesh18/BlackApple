"use client";
import React, { useState } from "react";
import LibraryIcon from "../icons/LibraryIcon";
import SearchIcon from "../icons/SearchIcon";
import UserIcon from "../icons/UserIcon";
import AddIcon from "../icons/AddIcon";
import Logo from "../extra-components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMySession } from "@/context/MySessionContext";
import HomeIcon from "../icons/HomeIcon";
import LogoutIcon from "../icons/LogoutIcon";

import { openSearch } from "@/store/searchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.searchBar);
  const { status, signOut } = useMySession();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav className="rounded-lg py-3 px-8 bg-gray-200/10 bg-opacity-10 border mt-2 border-white/20 flex gap-4 items-center justify-between ">
      {/* add icon */}
      <div>
        <Link
          href={"/contribute"}
          title="Contribute"
          className="hover:opacity-75 transition-opacity cursor-pointer"
        >
          <AddIcon />
        </Link>
      </div>

      {/* logo */}
      <div>
        <Logo />
      </div>

      {/* user actions  */}

      <div className="flex justify-center items-center gap-4 cursor-pointer">
        {!isOpen && (
          <div onClick={() => dispatch(openSearch())}>
            <SearchIcon />
          </div>
        )}
        {
          // <Popover>
          //   <PopoverTrigger title="Search">
          //     <SearchIcon />
          //   </PopoverTrigger>
          //   <PopoverContent className="mt-4 mr-4 w-full border-transparent bg-white/10 backdrop-blur-2xl text-white">
          //     <Input
          //       type="text"
          //       className="border-2 py-5 px-4 w-full text-lg rounded-md active:border-none  "
          //       placeholder="Find Lyrics"
          //     />
          //   </PopoverContent>
          // </Popover>
        }

        {pathname !== "/library" && (
          <Link href="/library" title="Library">
            <LibraryIcon />
          </Link>
        )}

        {status === "authenticated" ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger title="Profile" className="cursor-pointer">
              <UserIcon />
            </PopoverTrigger>
            <PopoverContent className="w-fit mr-4 mt-4 bg-transparent backdrop-blur-3xl border-gray-300/30 text-gray-200 flex font-semibold flex-col justify-center items-center gap-4 cursor-pointer">
              {pathname == "/profile" ? (
                <Link
                  className="flex justify-between gap-2
                "
                  href={"/"}
                  onClick={() => setOpen(false)}
                >
                  Home <HomeIcon />
                </Link>
              ) : (
                <Link
                  className="flex justify-between gap-2"
                  href={"/profile"}
                  onClick={() => setOpen(false)}
                >
                  Profile <UserIcon />
                </Link>
              )}
              <span className="flex gap-1" onClick={() => signOut()}>
                Logout <LogoutIcon />
              </span>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href={"/login"}>login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
