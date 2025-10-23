"use client";

import api from "@/lib/api";
import { RootState } from "@/store/store";
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

export interface GrooveTabItem {
  line: string;
  startTime: number;
  endTime: number;
  _id: string;
}

function GrooveTab() {
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  const router = useRouter();
  const pathname = usePathname();
  const [grooveData, setGrooveData] = useState<GrooveTabItem[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // ---- Fetch lyrics data ----
  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        if (!currentTrack?.gid) return;

        // Redirect only if not already on lyrics page
        if (pathname.startsWith("/lyrics")) {
          router.replace(`/lyrics/${currentTrack.gid}`);
        }

        const res = await api.get(`/lyrics/getLyrics?gid=${currentTrack.gid}`);
        const data = res.data?.data;

        if (!data || !data.lyricsText) {
          toast.error("Lyrics not found.");
          return;
        }

        setGrooveData(data.lyricsText);
      } catch (err: any) {
        toast.error("Failed to fetch lyrics.");
        console.error(err.message);
      }
    };

    fetchLyrics();
  }, [currentTrack, pathname, router]);

  // ---- Simulate playback time ----
  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const delta = (now - startTimeRef.current) / 1000; // seconds
      setCurrentTime(delta);
      requestAnimationFrame(updateTime);
    };

    const animationFrame = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

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
    startTimeRef.current = Date.now() - startTime * 1000;
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

  if (!grooveData || grooveData.length === 0)
    return <div className="text-gray-400">No groove data available.</div>;

  return (
    <div
      className="flex w-full flex-col gap-2 overflow-y-auto scrollbar-none my-2 max-h-[75vh] md:max-h-[80vh] px-1 md:px-3"
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
