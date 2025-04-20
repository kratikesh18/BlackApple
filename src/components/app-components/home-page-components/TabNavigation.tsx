import { Button } from "@/components/ui/button";
import React from "react";

function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "Groove" | "Explore";
  setActiveTab: (tab: "Groove" | "Explore") => void;
}) {
  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        onClick={() => setActiveTab("Groove")}
        className={`px-4 py-2 rounded-lg font-semibold ${
          activeTab === "Groove"
            ? "bg-purple-700 text-white"
            : "bg-gray-700 text-gray-300"
        }`}
      >
        Groove
      </Button>
      <Button
        onClick={() => setActiveTab("Explore")}
        className={`px-4 py-2 rounded-lg font-semibold ${
          activeTab === "Explore"
            ? "bg-purple-700 text-white"
            : "bg-gray-700 text-gray-300"
        }`}
      >
        Explore
      </Button>
    </div>
  );
}

export default TabNavigation;
