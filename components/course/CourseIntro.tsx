/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";

interface CourseIntroProps {
  course: any;
}

const CourseIntro = ({ course }: CourseIntroProps) => {
  return (
    <div className="flex gap-6 items-center p-8 glass-dark rounded-2xl shadow-xl border border-white/10 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors" />

      <Image
        src={"/course.png"}
        width={90}
        height={90}
        alt="Course Image"
        className="rounded-xl shadow-lg"
      />
      <div className="flex-1 space-y-2">
        <h2 className="font-bold md:text-3xl text-white tracking-tight">
          {course?.courseLayout.course_title}
        </h2>
        <p className="line-clamp-2 text-gray-400 text-sm md:text-base leading-relaxed">
          {course?.courseLayout?.course_summary}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white border border-white/5">
            {course?.courseLayout?.chapters?.length} Chapters
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/20">
            AI Generated
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseIntro;
