"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";

const PLACEHOLDER =
  "data:image/svg+xml;%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 24 24'%3E%3Crect fill='%23343a40' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='52%25' fill='%23fff' font-size='10' font-family='Arial' dominant-baseline='middle' text-anchor='middle'%3ENO%20IMG%3C/text%3E%3C/svg%3E";

export type TrackType = {
  gid: string;
  name: string;
  artists: string[];
  album: {
    name: string;
    image: string;
  };
  progressMs: number;
  isPlaying: boolean;
  isLyricsAvailable: boolean;
  duration: number;
  remainingTime: number;
};

export default function SpotifyCurrentState() {
  const [loading] = useState<boolean>(false);
  const pathname = usePathname();

  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack,
  );

  // ---- State for live progress ----
  const [progress, setProgress] = useState<number>(
    currentTrack?.progressMs || 0,
  );

  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const accumulatedRef = useRef<number>(currentTrack?.progressMs || 0);

  // ---- Animate progress bar (robust rAF implementation) ----
  useEffect(() => {
    // if no track -> clear and exit
    if (!currentTrack) {
      setProgress(0);
      accumulatedRef.current = 0;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // initialize values from currentTrack
    const { progressMs = 0, duration = 0, isPlaying } = currentTrack;

    accumulatedRef.current = progressMs;

    setProgress(progressMs);

    lastTimestampRef.current = null;

    // cancel any previous animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const step = (timestamp: number) => {
      // set initial timestamp
      if (lastTimestampRef.current === null)
        lastTimestampRef.current = timestamp;
      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (isPlaying) {
        // advance accumulated progress by delta ms
        accumulatedRef.current = Math.min(
          accumulatedRef.current + delta,
          duration,
        );
        setProgress(accumulatedRef.current);
      } else {
        // when paused, keep the reported progress in sync with source
        accumulatedRef.current = progressMs;
        setProgress(progressMs);
      }

      // continue animating only if track not finished
      if (accumulatedRef.current < duration) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        // ensure final value at end
        setProgress(duration);
      }
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      lastTimestampRef.current = null;
    };
    // rerun when the reference to currentTrack changes
  }, [currentTrack]);

  if (!currentTrack) {
    return <div>NO Song Playing on Spotify</div>;
  }

  // ---- Calculate progress percentage ----
  const progressPercent =
    currentTrack.duration > 0
      ? Math.min((progress / currentTrack.duration) * 100, 100)
      : 0;

  // ---- Helper for formatting time (mm:ss) ----
  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const min = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (totalSeconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="bg-accent-foreground border border-white/10 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 ">
      {/* Artwork */}

      <div className="flex-shrink-0">
        <img
          src={currentTrack.album.image || PLACEHOLDER}
          alt={currentTrack.album.name}
          className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-md"
        />
      </div>

      {/* Info */}

      <div className="flex-1 min-w-0 w-full">
        <h4 className="text-lg font-semibold text-white truncate">
          {currentTrack.name}
        </h4>

        <p className="text-sm text-gray-300 truncate">
          {currentTrack.artists.join(", ")}
        </p>

        <p className="text-sm text-gray-400 truncate">
          {currentTrack.album.name}
        </p>

        {/* Progress */}

        <div className="mt-3 w-full">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(progress)}</span>

            <span>{formatTime(currentTrack.duration)}</span>
          </div>

          <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="flex gap-2">
        {currentTrack.isLyricsAvailable && (
          <Link
            href={`/lyrics/${currentTrack.gid}`}
            className="bg-purple-700 hover:bg-purple-800 px-3 py-2 rounded-md text-sm"
          >
            Show Lyrics
          </Link>
        )}

        {!pathname.startsWith("/contribute") && (
          <Link
            href={`/contribute/${currentTrack.gid}`}
            className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-md text-sm"
          >
            Contribute
          </Link>
        )}
      </div>
    </div>
  );
}

