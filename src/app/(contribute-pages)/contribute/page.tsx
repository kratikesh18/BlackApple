"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import SectionWrapper from "@/components/app-components/profile-page-components/SectionWrapper";

function ContributeHomePage() {
  const [currentLine, setCurrentLine] = useState("");
  const [lyrics, setLyrics] = useState<string[]>([]);

  const handleAddLine = () => {
    if (currentLine.trim()) {
      setLyrics([...lyrics, currentLine.trim()]);
      setCurrentLine("");
    }
  };

  const handleReview = () => {
    // You can later redirect to a review page or show a modal
    console.log("Reviewing Lyrics:", lyrics);
    alert("Review mode: " + lyrics.join("\n"));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Start Writing Lyrics
      </h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter a line of lyrics"
          value={currentLine}
          onChange={(e) => setCurrentLine(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddLine()}
        />
        <Button onClick={handleAddLine}>Add Line</Button>
      </div>

      {lyrics.length > 0 && (
        <div className="bg-gray-800/30 p-4 rounded shadow-md mb-4 space-y-2">
          {lyrics.map((line, index) => (
            <p key={index} className="border-b border-gray-700 pb-1">
              {line}
            </p>
          ))}
        </div>
      )}

      <Button onClick={handleReview} className="w-full">
        Review Lyrics
      </Button>
      <SectionWrapper>
        <SpotifyCurrentState />
      </SectionWrapper>
    </div>
  );
}

export default ContributeHomePage;
