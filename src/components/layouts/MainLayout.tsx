"use client";
import React, { useCallback, useEffect } from "react";
import Navbar from "../app-components/Navbar";
import { Toaster } from "sonner";

import SpotifyCurrentState, {
  TrackType,
} from "../app-components/profile-page-components/SpotifyCurrentState";
import HotKeyLayout from "./HotKeyLayout";
import api from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "@/store/slices/currentTrackSlice";
import { RootState } from "@/store/store";
import { AxiosError } from "axios";
import { useMySession } from "@/context/MySessionContext";
import {usePathname} from 'next/navigation'

const MainLayout = ({ children }: { children: React.ReactNode }) => {


  const pathname = usePathname();
  const dispatch = useDispatch();
  const { session } = useMySession();

  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack,
  );

  const getCurrentlyPlayingSong = useCallback(async () => {
    try {
      const response = (await api.get("/getCurrentlyPlayingSong")).data;
      const data: TrackType = response.data;

      // console.log("Currently playing data:", data);
      dispatch(setCurrentTrack(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error fetching : ", error);
      }

      if (error instanceof Error)
        console.log("Error fetching currently playing song:", error.message);
    }
  }, [dispatch, session]);

  // this is for animations of minute and seconds
  useEffect(() => {
    getCurrentlyPlayingSong();

    //already got the lyrics informatin with the updated state of store
    let interval = undefined;
    console.log("printing currenttrack ", currentTrack);


    if (!currentTrack) {
      console.log("No song playing .. so not remaining time");
    }

    if (currentTrack) {
      // Convert to minutes and seconds
      const minutes = Math.floor(currentTrack.remainingTime / 60000);
      const seconds = Math.floor((currentTrack.remainingTime % 60000) / 1000);

      // Format nicely (e.g., "4:35")
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      console.log("Remaining time:", formattedTime);

      interval = setInterval(() => {
        getCurrentlyPlayingSong();
      }, currentTrack.remainingTime);
    }


    return () => clearInterval(interval);
  }, [getCurrentlyPlayingSong]);

  return (
    <div className="flex flex-col min-h-screen  gap-2">
      <header>
        <Navbar />
      </header>

      <main className="flex-1 min-h-0 zx ">{children}</main>

      <footer className="w-full">
        {!(pathname === "/profile" || pathname.startsWith("/lyrics")) && (
          <SpotifyCurrentState />
        )}

        <div className="absolute">
          <HotKeyLayout />
          <Toaster
            position="top-right"
            theme="dark"
            closeButton
            duration={500}
          />
        </div>
      </footer>
    </div>
  );
};

export { MainLayout };
