/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";

interface CourseIntroProps {
  course: any;
}

const CourseIntro = ({ course }: CourseIntroProps) => {
  return (
    <div className="flex gap-5 items-center p-6 md:p-10 border border-neutral-800 rounded-lg shadow-md bg-neutral-900 hover:bg-neutral-800 transition-colors">
      <Image
        src={"/course.png"}
        width={70}
        height={70}
        alt="Course Image"
        className="rounded-md"
      />
      <div className="flex-1">
        <h2 className="font-bold md:text-2xl text-white text-lg">
          {course?.courseLayout.course_title}
        </h2>
        <p className="line-clamp-2 text-neutral-400 md:block hidden mt-1">
          {course?.courseLayout?.course_summary}
        </p>
        <h2 className="mt-3 text-sm md:text-lg text-white">
          Total Chapters: {course?.courseLayout?.chapters?.length}
        </h2>
      </div>
    </div>
  );
};

export default CourseIntro;
