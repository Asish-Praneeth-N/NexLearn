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
        {/* Front Side */}
        <div
          className="p-4 bg-neutral-900 text-white flex items-center justify-center text-center rounded-lg cursor-pointer shadow-lg h-[250px] w-[250px] md:h-[350px] md:w-[350px] hover:bg-neutral-800 transition-colors"
          onClick={handleClick}
        >
          <h2 className="text-lg md:text-2xl font-medium">{flashcard?.front}</h2>
        </div>

        {/* Back Side */}
        <div
          className="p-4 bg-neutral-800 text-white flex items-center justify-center text-center rounded-lg cursor-pointer shadow-lg h-[250px] w-[250px] md:h-[350px] md:w-[350px] hover:bg-neutral-700 transition-colors"
          onClick={handleClick}
        >
          <h2 className="text-lg md:text-2xl font-medium">{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlashcardItem;
