import { Button } from "@/components/ui/button";
import React from "react";

type Tab = "Groove" | "Explore";

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs: Tab[] = ["Groove", "Explore"];

function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <nav className="flex justify-center items-center gap-2 sm:gap-4 w-full py-2">
      {tabs.map((tab) => (
        <Button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`w-28 sm:w-32 px-3 py-2 rounded-lg font-semibold transition-colors duration-150
            ${
              activeTab === tab
                ? "bg-accent-foreground text-white "
                : "bg-gray-800 text-gray-300  hover:text-white"
            }
          `}
          aria-current={activeTab === tab ? "page" : undefined}
        >
          {tab}
        </Button>
      ))}
    </nav>
  );
}

export default TabNavigation;
