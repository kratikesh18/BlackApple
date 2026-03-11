"use client";

import React, { useState } from "react";
import GrooveTab from "@/components/app-components/home-page-components/GrooveTab";
import TabNavigation from "@/components/app-components/home-page-components/TabNavigation";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";

type TabType = "Groove" | "Explore";

const ExplorePage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1 className="text-3xl font-bold text-gray-400">Coming Soon</h1>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("Groove");

  return (
    // <SectionWrapper className=" ">
    <div className="theme-background h-full flex flex-col">
      {/* Navigation Tabs */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
        {activeTab === "Groove" && <GrooveTab />}

        {activeTab === "Explore" && <ExplorePage />}
      </div>
    </div>

    // </SectionWrapper>
  );
}
