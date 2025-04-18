import React from "react";
import { Skeleton } from "../ui/skeleton";

function SpotifyStateSkeleton() {
  return (
    <div className="flex items-center gap-8 justify-around  p-4 rounded-lg">
      <div className="h-28 w-28 flex flex-col justify-around">
        <Skeleton className="h-4 w-[140px] bg-gray-500/30" />
        <Skeleton className="h-4 w-[140px] bg-gray-500/30" />
        <div>
          <Skeleton className="h-4 w-[100px] bg-gray-500/30" />
        </div>
      </div>
      <div>
        <Skeleton className="h-28 w-28 rounded-lg bg-gray-500/30" />
      </div>
    </div>
  );
}

export default SpotifyStateSkeleton;
