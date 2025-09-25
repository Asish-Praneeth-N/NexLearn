
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
//import { RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Spinner from "@/app/loaderspinner";// Import the Spinner component

interface CourseItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
}

const CourseItem = ({ course }: CourseItemProps) => {
  const [isNavigating, setIsNavigating] = useState(false); // State to track navigation
  const router = useRouter();

  const handleViewClick = () => {
    setIsNavigating(true); // Show spinner when button is clicked
    // Delay navigation by 3 seconds
    setTimeout(() => {
      router.push(`/course/${course?.courseId}`); // Navigate to the course page
    }, 3000); // 3000ms = 3 seconds
  };

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
          <div className="flex items-center justify-center text-sm px-3 py-1 rounded-full bg-neutral-700 text-white gap-2">
            <Spinner /> {/* Use the updated Spinner */}
            Generating...
          </div>
        ) : isNavigating ? (
          <div className="flex items-center justify-center">
            <Spinner /> {/* Show the spinner during navigation */}
          </div>
        ) : (
          <Button
            className="bg-white text-black hover:bg-neutral-200 shadow-md"
            onClick={handleViewClick}
          >
            View
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default CourseItem;
