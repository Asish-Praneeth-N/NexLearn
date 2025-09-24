"use client";

import React from "react";
import ReactCardFlip from "react-card-flip";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface FlashcardItemProps {
  isFlipped: any;
  handleClick: () => void;
  flashcard: any;
}

const FlashcardItem = ({ isFlipped, handleClick, flashcard }: FlashcardItemProps) => {
  return (
    <div className="flex justify-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front Side (Black with White Border & Shadow) */}
        <div
          className="p-4 bg-black text-white flex items-center justify-center text-center 
                     rounded-lg cursor-pointer h-[250px] w-[250px] md:h-[350px] md:w-[350px] 
                     border border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] 
                     hover:opacity-80 transition-all"
          onClick={handleClick}
        >
          <h2 className="text-lg md:text-2xl font-medium">{flashcard?.front}</h2>
        </div>

        {/* Back Side (White with Black Border & Shadow) */}
        <div
          className="p-4 bg-white text-black flex items-center justify-center text-center 
                     rounded-lg cursor-pointer h-[250px] w-[250px] md:h-[350px] md:w-[350px] 
                     border border-black shadow-[0_0_20px_rgba(0,0,0,0.4)] 
                     hover:opacity-80 transition-all"
          onClick={handleClick}
        >
          <h2 className="text-lg md:text-2xl font-medium">{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlashcardItem;
