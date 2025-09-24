"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ChapterListProps {
  course: any;
}

const ChapterList = ({ course }: ChapterListProps) => {
  const CHAPTERS = course?.courseLayout?.chapters;

  return (
    <div className="mt-5 mb-8">
      <h2 className="font-medium text-xl text-white">Chapters</h2>
      <div className="mt-3 space-y-2">
        {CHAPTERS?.map(
          (
            chapter: {
              chapter_number: any;
              chapter_title: string;
              summary: string;
            },
            index: any
          ) => (
            <div
              key={chapter?.chapter_number || index}
              className="flex gap-4 items-start p-4 border border-white/20 shadow-md rounded-lg cursor-pointer bg-black hover:bg-white/10 transition-colors"
            >
              <h2 className="text-2xl text-white">📖</h2>
              <div>
                <h2 className="font-medium text-white">
                  {chapter?.chapter_title}
                </h2>
                <p className="text-white/70 text-sm mt-1">
                  {chapter?.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChapterList;
