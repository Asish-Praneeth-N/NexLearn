"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ChapterListProps {
  course: any;
}

const ChapterList = ({ course }: ChapterListProps) => {
  const CHAPTERS = course?.courseLayout?.chapters;

  return (
    <div className="mt-8 mb-12">
      <h2 className="font-bold text-2xl text-white mb-6">Chapters</h2>
      <div className="mt-3 space-y-4">
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
              className="flex gap-5 items-start p-6 glass-dark border border-white/10 shadow-lg rounded-2xl cursor-pointer hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-500/10 rounded-full text-xl group-hover:scale-110 transition-transform">
                📖
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-white group-hover:text-indigo-300 transition-colors">
                  {chapter?.chapter_title}
                </h2>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">
                  {chapter?.summary}
                </p>
              </div>
              <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
                →
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChapterList;
