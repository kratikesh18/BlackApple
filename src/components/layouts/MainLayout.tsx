"use client";
import React, { useCallback, useEffect } from "react";
import Navbar from "../app-components/Navbar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import SpotifyCurrentState, {
  TrackType,
} from "../app-components/profile-page-components/SpotifyCurrentState";
import HotKeyLayout from "./HotKeyLayout";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "@/store/currentTrackSlice";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const getCurrentlyPlayingSong = useCallback(async () => {
    try {
      const response = (await api.get("/getCurrentlyPlayingSong")).data;
      const data: TrackType = response.data;
      console.log("Currently playing data:", data);
      dispatch(setCurrentTrack(data));
    } catch (error: any) {
      console.log("Error fetching currently playing song:", error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getCurrentlyPlayingSong();

    const interval = setInterval(() => {
      getCurrentlyPlayingSong();
    }, 30000); // 30000ms = 30 seconds

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
