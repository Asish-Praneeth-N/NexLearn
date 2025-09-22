"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CourseItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
}

const CourseItem = ({ course }: CourseItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="border border-neutral-700 rounded-2xl shadow-lg bg-neutral-900/80 backdrop-blur-sm 
                 hover:shadow-xl transition-all p-5 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <Image src={"/course.png"} alt="Course thumbnail" width={50} height={50} />
        {course?.status !== "Generating" && (
          <span className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-neutral-600 text-white font-medium">
            New
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mt-4 font-semibold md:text-lg text-sm text-white line-clamp-1">
        {course?.courseLayout?.course_title}
      </h2>

      {/* Summary */}
      <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
        {course?.courseLayout?.course_summary}
      </p>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        {course?.status === "Generating" ? (
          <span className="text-sm px-3 py-1 rounded-full bg-neutral-700 text-white flex gap-2 items-center">
            <RefreshCcw className="animate-spin w-4 h-4" />
            Generating...
          </span>
        ) : (
          <Link href={`/course/${course?.courseId}`}>
            <Button className="bg-white text-black hover:bg-neutral-200 shadow-md">
              View
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default CourseItem;
