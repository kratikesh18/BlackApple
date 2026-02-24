"use client";
import Refresh from "@/components/icons/Refresh";
import { Button } from "@/components/ui/button";
import { useMySession } from "@/context/MySessionContext";
import api from "@/lib/api";
import { RootState } from "@/store/store";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { HeroSearchBar } from "./HeroSearchBar";
import { useLyricsService } from "@/hooks/useLyricsService";
import SectionWrapper from "../profile-page-components/SectionWrapper";

export interface GrooveTabItem {
  line: string;
  startTime: number;
  endTime: number;
  _id: string;
}

function GrooveTab() {
  //fetching the pathnames for the easy routing
  const router = useRouter();
  const pathname = usePathname();
  const {getLyricsForCurrentTrack} = useLyricsService()
  //accessing the state from the store
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  //groove data initially empty array
  const [grooveData, setGrooveData] = useState<GrooveTabItem[]>([]);

  //starting of the song intiallly zero
  const [currentTime, setCurrentTime] = useState<number>(0);

  // const [error, setError] = useState<string | null>(null);

  //references to the lyrics inner components
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

  const animationRef = useRef<number>(0);

  const lastProgressRef = useRef<number>(0);
  const startTimestampRef = useRef<number>(0);

  //  Fetch lyrics data when track changes
  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        if (!currentTrack?.gid) return;

        // reset lyrics before fetching new ones
        setGrooveData([]);
        setCurrentTime(0);

        // Redirect only if not already on lyrics page
        if (pathname.startsWith("/lyrics")) {
          router.replace(`/lyrics/${currentTrack.gid}`);
        }

        // const res = await api.get(`/lyrics/getLyrics?gid=${currentTrack.gid}`);
        const res = await getLyricsForCurrentTrack(currentTrack.gid);

        // console.log("Printing the rsponse from lyrics call ", res);
        const data =  res;

        if (!data || !data.lyricsText) {
          // toast.error("Lyrics not found.");
          // setError("Lyrics Not Found ");
          throw new Error("Lyrics not available");
        }

        setGrooveData(data.lyricsText);
        // setError(null);
      } catch (err) {
        if (err instanceof Error) {
          // toast.error(err.message || "Failed to fetch lyrics.");
          setGrooveData([]);
          console.warn(err.message);
        }else{
          console.warn(err);
        }
      }
    };

    fetchLyrics();
  }, [currentTrack, pathname, router]);

  // Sync currentTime with Spotify playback
  useEffect(() => {
    if (!currentTrack) return;

    cancelAnimationFrame(animationRef.current!);

    const { progressMs = 0, isPlaying, duration = 0 } = currentTrack;

    lastProgressRef.current = progressMs;
    startTimestampRef.current = Date.now();

    const updateTime = () => {
      if (isPlaying) {
        const elapsed = Date.now() - startTimestampRef.current;
        const newProgress = lastProgressRef.current + elapsed;
        setCurrentTime(Math.min(newProgress / 1000, duration / 1000)); // in seconds
      } else {
        // paused → keep showing last known position
        setCurrentTime(progressMs / 1000);
        lastProgressRef.current = progressMs;
        startTimestampRef.current = Date.now();
      }

      animationRef.current = requestAnimationFrame(updateTime);
    };

    animationRef.current = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [
    currentTrack,
    currentTrack?.isPlaying,
    currentTrack?.progressMs,
    currentTrack?.duration,
  ]);

  // ---- Find current line ----
  const currentLine = useMemo(
    () =>
      grooveData.find(
        (line) => line.startTime <= currentTime && line.endTime >= currentTime
      ),
    [currentTime, grooveData]
  );

  // ---- Scroll to current line ----
  useEffect(() => {
    if (currentLineRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const line = currentLineRef.current;
      const scrollTo =
        line.offsetTop - container.offsetHeight / 2 + line.offsetHeight / 2;
      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  }, [currentLine]);

  // ---- Jump to clicked line ----
  const handleLineClick = useCallback((startTime: number) => {
    setCurrentTime(startTime);
    lastProgressRef.current = startTime * 1000;
    startTimestampRef.current = Date.now();
  }, []);

  // ---- Format time ----
  const formatTime = useCallback((seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  }, []);

  const { session, status } = useMySession();

  if (status === "unauthenticated" && !session) {
    return (
      <div>
        UnAuthenticated
        <HeroSearchBar />
      </div>
    );
  }

  if (!grooveData || grooveData.length === 0)
    return (
      <div className="flex flex-col items-center justify-center text-center mt-40 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-3xl font-semibold ">No Lyrics Found</h1>
          <p className="text-gray-400 max-w-md">
            Looks like this track doesn’t have any synced lyrics yet. Be the
            first to contribute and help others enjoy the groove.
          </p>
        </div>

        <Link
          href={`/contribute/${currentTrack?.gid}`}
          className="px-6 py-3 bg-purple-700 rounded-lg text-white font-medium shadow-md hover:shadow-blue-500/30 transition-all duration-300 flex  justify-center items-center gap-4 "
        >
          Start Writing Lyrics
          <Edit />
        </Link>
        <div>
          <h1 className="text-2xl pb-2">Not Showing Track?</h1>
          <Button variant={"ghost"} className="bg-green-600 rounded-full">
            Click to Refresh
            <Refresh />
          </Button>
        </div>
      </div>
    );

  return (
    <div
      className="flex w-full h-full flex-col gap-2 my-2 px-1 md:px-3 "
      ref={lyricsContainerRef}
    >
        {grooveData.map((item) => (
          <div
            key={item._id}
            className={`cursor-pointer p-2 rounded-md transition ${
              currentLine === item
                ? "text-white"
                : "hover:bg-gray-700/40 text-gray-400/90"
            }`}
            ref={currentLine === item ? currentLineRef : null}
            onClick={() => handleLineClick(item.startTime)}
          >
            <h1 className="text-xl md:text-2xl font-medium md:font-semibold">
              {item.line}
            </h1>
            <div className="text-xs flex justify-between text-gray-400">
              <p>{formatTime(item.startTime)}</p>
              <p>{formatTime(item.endTime)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default React.memo(GrooveTab);
