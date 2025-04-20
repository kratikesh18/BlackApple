"use client";
import ExploreTab from "@/components/app-components/home-page-components/ExploreTab";
import GrooveTab from "@/components/app-components/home-page-components/GrooveTab";
import TabNavigation from "@/components/app-components/home-page-components/TabNavigation";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Groove" | "Explore">("Groove");

  return (
    <SectionWrapper>
      <div className="text-white h-[86vh]  flex flex-col justify-between">
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Sections */}
       
          {activeTab === "Explore" && <ExploreTab />}
          {activeTab === "Groove" && <GrooveTab />}
    

        {/* Spotify Current State */}
        <SectionWrapper className="bg-gray-200/10 backdrop-blur-2xl bg-opacity-10 border border-white/20 px-3 rounded-lg ">
          <SpotifyCurrentState />
        </SectionWrapper>
      </div>
    </SectionWrapper>
  );
}
