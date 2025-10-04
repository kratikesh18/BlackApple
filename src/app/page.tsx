"use client";
import ExploreTab from "@/components/app-components/home-page-components/ExploreTab";
import GrooveTab from "@/components/app-components/home-page-components/GrooveTab";
import TabNavigation from "@/components/app-components/home-page-components/TabNavigation";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import { useLyricsService } from "@/hooks/useLyricsService";
import { useSpotifyService } from "@/hooks/useSpotifyService";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Groove" | "Explore">("Groove");

  const { getCurrentlyPlaying, checkLyricsAvailability } = useSpotifyService();
  const { getLyricsForCurrentTrack } = useLyricsService();

  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  useEffect(() => {
    // document.title = "BlueCocain - Home";

    const fetchData = async () => {
      try {
        const currentTrack = await getCurrentlyPlaying();
        if (currentTrack) {
          console.log("Fetched current track on home page:", currentTrack);
        }
      } catch (err) {
        console.error("Error fetching current track:", err);
      }
    };

    fetchData();
    //  auto-refresh every 30 sec
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        if (currentTrack) {
          const lyricsAvailable = await checkLyricsAvailability(
            currentTrack.global_id
          );

          if (lyricsAvailable) {
            const lyrics = await getLyricsForCurrentTrack(
              currentTrack.global_id
            );
            console.log("Fetched lyrics:", lyrics);
          }
        }
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    fetchLyrics();
  }, [checkLyricsAvailability, getLyricsForCurrentTrack]);

  return (
    <SectionWrapper>
      <div className="text-white h-[86vh] flex flex-col justify-between">
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Sections */}

        {activeTab === "Groove" && <GrooveTab />}
        {/* {activeTab === "Explore" && <ExploreTab />} */}
        {activeTab === "Explore" && (
          <div className="flex justify-center items-center h-full w-full">
            <h1 className="text-3xl font-bold">Comming Soon</h1>
          </div>
        )}

        {/* Spotify Current State */}
        <SectionWrapper className="bg-gray-200/10 backdrop-blur-2xl bg-opacity-10 border border-white/20 px-3 rounded-lg ">
          <SpotifyCurrentState track={currentTrack} />
        </SectionWrapper>
      </div>
    </SectionWrapper>
  );
}
