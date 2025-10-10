import React, { useCallback, useEffect, useRef, useState } from "react";

interface GrooveTabProps {
  grooveData: [
    {
      line: string;
      startTime: number;
      endTime: number;
      _id: string;
    }
  ];
}
function GrooveTab({ grooveData }: GrooveTabProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

  // console.log("Groove data:", grooveData);
  // Scroll to the current line when it changes
  useEffect(() => {
    if (currentLineRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const line = currentLineRef.current;
      const scrollTo =
        line.offsetTop - container.offsetHeight / 2 + line.offsetHeight / 2;
      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  }, [currentTime]);

  // Fetch currently playing song on mount (if needed)
  // useEffect(() => {
  //   axios.get("/api/getCurrentlyPlayingSong").catch(() => {});
  // }, []);

  // Simulate playback time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Find the current line based on time
  const getCurrentLine = useCallback(() => {
    return grooveData.find(
      (line) => line.startTime <= currentTime && line.endTime >= currentTime
    );
  }, [currentTime]);

  const currentLine = getCurrentLine();

  // Set time to clicked line's start
  const handleLineClick = (index: number) => {
    setCurrentTime(grooveData[index].startTime);
  };

  // Format seconds as mm:ss
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };
  if (!grooveData)
    return <div className="text-gray-400">No groove data available.</div>;

  return (
    <div
      className="flex w-full flex-col gap-2 overflow-y-auto scrollbar-none my-2 max-h-[75vh] md:max-h-[80vh] px-1 md:px-3"
      ref={lyricsContainerRef}
    >
      <h1>hllo</h1>
      {grooveData &&
        grooveData.map((item, index) => (
          <div
            key={item._id}
            className={`cursor-pointer p-2 rounded-md transition ${
              currentLine === item
                ? " text-white"
                : "hover:bg-gray-700/40 text-gray-400/90"
            }`}
            ref={currentLine === item ? currentLineRef : null}
            onClick={() => handleLineClick(index)}
          >
            <h1 className="text-xl md:text-2xl font-medium md:font-semibold ">
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

export default GrooveTab;
