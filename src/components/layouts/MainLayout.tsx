"use client";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../app-components/Navbar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import SpotifyCurrentState, {
  TrackType,
} from "../app-components/profile-page-components/SpotifyCurrentState";
import HotKeyLayout from "./HotKeyLayout";
import api from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "@/store/currentTrackSlice";
import { RootState } from "@/store/store";
import { AxiosError } from "axios";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

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
  }, [dispatch]);

  const [remainingTime, setRemainingTime] = useState(30000);
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );
  useEffect(() => {
    getCurrentlyPlayingSong();

    //already got the lyrics informatin with the updated state of store

    // Convert to minutes and seconds
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);

    // Format nicely (e.g., "4:35")
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    console.log("Remaining time:", formattedTime);
    const interval = setInterval(() => {
      getCurrentlyPlayingSong();
    }, remainingTime);

    return () => clearInterval(interval);
  }, [getCurrentlyPlayingSong]);

  return (
    <>
      <header className="h-[80px] border text-white flex  items-center justify-center">
        <Navbar />
      </header>

      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>

      <footer>
        {/* Hide SpotifyCurrentState on /profile and /lyrics/:gid */}
        {!(pathname === "/profile" || pathname.startsWith("/lyrics")) && (
          <SpotifyCurrentState />
        )}

        <HotKeyLayout />
        <Toaster />
      </footer>
    </>
  );
};

export { MainLayout };
