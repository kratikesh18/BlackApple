import React from "react";
import { HeroSearchBar } from "./HeroSearchBar";

function ExploreTab() {
  return (
    <div className="h-full flex flex-col gap-4 justify-between items-center my-3">
      <HeroSearchBar />
      <h1 className="text-2xl font-bold ">Explore Section</h1>
      <p>
        This is the "Explore" section where users can discover new content and
        features.
      </p>
    </div>
  );
}

export default ExploreTab;
