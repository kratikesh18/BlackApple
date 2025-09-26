import EditIcon from "@/components/icons/EditIcon";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

const tempGrooveData = [
  {
    line: "kaise badalte kaise guzarte din",
    startTime: 0,
    endTime: 5,
    _id: "66853d5743da48e5e78da1e8",
  },
  {
    line: "kaise kadar the",
    startTime: 6,
    endTime: 10,
    _id: "66853d5743da48e5e78da1e9",
  },
  {
    line: "fir bhi hain sard yeh din",
    startTime: 11,
    endTime: 15,
    _id: "66853d5743da48e5e78da1ea",
  },
  {
    line: "kya hi batau meri yeh raahein hain",
    startTime: 16,
    endTime: 20,
    _id: "66853d5743da48e5e78da1eb",
  },
  {
    line: "kya hi kahun mein zahir hain yeh",
    startTime: 21,
    endTime: 25,
    _id: "66853d5743da48e5e78da1ec",
  },
  {
    line: "tere hi hum hain",
    startTime: 26,
    endTime: 30,
    _id: "66853d5743da48e5e78da1ed",
  },
  {
    line: "kya yeh pyar kam hain",
    startTime: 31,
    endTime: 35,
    _id: "66853d5743da48e5e78da1ee",
  },
  {
    line: "haan hi tere naam ham hain",
    startTime: 36,
    endTime: 40,
    _id: "66853d5743da48e5e78da1ef",
  },
  {
    line: "arz hain kiya",
    startTime: 41,
    endTime: 45,
    _id: "66853d5743da48e5e78da1f0",
  },
  {
    line: "hain meri aadat",
    startTime: 46,
    endTime: 50,
    _id: "66853d5743da48e5e78da1f1",
  },
  {
    line: "ruh ka saaz gham hain",
    startTime: 51,
    endTime: 55,
    _id: "66853d5743da48e5e78da1f2",
  },
  {
    line: "tere hi toh sath man hain",
    startTime: 56,
    endTime: 60,
    _id: "66853d5743da48e5e78da1f3",
  },
  {
    line: "maane na jiya",
    startTime: 61,
    endTime: 65,
    _id: "66853d5743da48e5e78da1f4",
  },
  {
    line: "dard nahi toh sard hain tere bin",
    startTime: 66,
    endTime: 70,
    _id: "66853d5743da48e5e78da1f5",
  },
  {
    line: "kyun hain khafa tu hi toh hain manzil",
    startTime: 71,
    endTime: 75,
    _id: "66853d5743da48e5e78da1f6",
  },
  {
    line: "kaisi ibadat pairo siyahi hain",
    startTime: 76,
    endTime: 80,
    _id: "66853d5743da48e5e78da1f7",
  },
  {
    line: "mere kalam ki tu hi kahani hain",
    startTime: 81,
    endTime: 85,
    _id: "66853d5743da48e5e78da1f8",
  },
  {
    line: "in khwahishon mein khoya hua hu",
    startTime: 86,
    endTime: 90,
    _id: "66853d5743da48e5e78da1f9",
  },
  {
    line: "in zakhm khatir meri suno",
    startTime: 91,
    endTime: 95,
    _id: "66853d5743da48e5e78da1fa",
  },
  {
    line: "tere hi hum hain",
    startTime: 96,
    endTime: 100,
    _id: "66853d5743da48e5e78da1fb",
  },
  {
    line: "kya yeh pyar kam hain",
    startTime: 101,
    endTime: 105,
    _id: "66853d5743da48e5e78da1fc",
  },
  {
    line: "haan hi tere naam ham hain",
    startTime: 106,
    endTime: 110,
    _id: "66853d5743da48e5e78da1fd",
  },
  {
    line: "arz hain kiya",
    startTime: 111,
    endTime: 115,
    _id: "66853d5743da48e5e78da1fe",
  },
  {
    line: "hain meri aadat , rooh ka saaz gham hainn",
    startTime: 116,
    endTime: 120,
    _id: "66853d5743da48e5e78da1ff",
  },
  {
    line: "tere hi toh sath man hain",
    startTime: 121,
    endTime: 125,
    _id: "66853d5743da48e5e78da200",
  },
  {
    line: "maane na jiya",
    startTime: 126,
    endTime: 130,
    _id: "66853d5743da48e5e78da201",
  },
  {
    line: "in khwahishon mein khoya hua hu",
    startTime: 131,
    endTime: 135,
    _id: "66853d5743da48e5e78da202",
  },
  {
    line: "in zakhm khatir meri suno",
    startTime: 136,
    endTime: 140,
    _id: "66853d5743da48e5e78da203",
  },
  {
    line: "tere hi hum hain",
    startTime: 141,
    endTime: 145,
    _id: "66853d5743da48e5e78da204",
  },
  {
    line: "kya yeh pyar kam hain",
    startTime: 146,
    endTime: 150,
    _id: "66853d5743da48e5e78da205",
  },
  {
    line: "haan hi tere naam ham hain",
    startTime: 151,
    endTime: 155,
    _id: "66853d5743da48e5e78da206",
  },
  {
    line: "arz hain kiya",
    startTime: 156,
    endTime: 160,
    _id: "66853d5743da48e5e78da207",
  },
  {
    line: "hain meri aadat",
    startTime: 161,
    endTime: 165,
    _id: "66853d5743da48e5e78da208",
  },
  {
    line: "rooh ka saaz gham hain",
    startTime: 166,
    endTime: 170,
    _id: "66853d5743da48e5e78da209",
  },
  {
    line: "tere hi toh sath man hain",
    startTime: 171,
    endTime: 175,
    _id: "66853d5743da48e5e78da20a",
  },
  {
    line: "maane na jiya",
    startTime: 176,
    endTime: 180,
    _id: "66853d5743da48e5e78da20b",
  },
  {
    line: "maane na jiya",
    startTime: 181,
    endTime: 185,
    _id: "66853d5743da48e5e78da20c",
  },
];

function GrooveTab() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

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
  useEffect(() => {
    axios.get("/api/getCurrentlyPlayingSong").catch(() => {});
  }, []);

  // Simulate playback time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Find the current line based on time
  const getCurrentLine = useCallback(() => {
    return tempGrooveData.find(
      (line) => line.startTime <= currentTime && line.endTime >= currentTime
    );
  }, [currentTime]);

  const currentLine = getCurrentLine();

  // Set time to clicked line's start
  const handleLineClick = (index: number) => {
    setCurrentTime(tempGrooveData[index].startTime);
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

  return (
    <div
      className="flex w-full flex-col gap-2 overflow-y-auto scrollbar-none my-2 max-h-[75vh] md:max-h-[80vh] px-1 md:px-3"
      ref={lyricsContainerRef}
    >
      {tempGrooveData.map((item, index) => (
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
      <Link
        href="/contribute/"
        className="fixed bottom-24 right-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-full shadow-lg transition z-20"
        aria-label="Edit Lyrics"
      >
        <EditIcon />
      </Link>
    </div>
  );
}

export default GrooveTab;
