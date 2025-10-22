import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface GrooveTabProps {
  grooveData: {
    line: string;
    startTime: number;
    endTime: number;
    _id: any;
  }[];
}

function GrooveTab({ grooveData }: GrooveTabProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

  // ---- Simulate playback time with requestAnimationFrame ----
  useEffect(() => {
    let animationFrame: number;

    const updateTime = () => {
      setCurrentTime((prev) => prev + 1);
      animationFrame = requestAnimationFrame(updateTime);
    };

    animationFrame = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // ---- Find current line based on time (memoized) ----
  const currentLine = useMemo(() => {
    return grooveData.find(
      (line) => line.startTime <= currentTime && line.endTime >= currentTime
    );
  }, [currentTime, grooveData]);

  // ---- Scroll to current line when it changes ----
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
  }, []);

  // ---- Format time as mm:ss ----
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

// import React from "react";

// const GrooveTab = () => {
//   return <div className="text-2xl">GrooveTab</div>;
// };

// export default GrooveTab;
