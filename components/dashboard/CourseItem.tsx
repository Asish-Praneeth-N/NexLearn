"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Spinner from "@/app/loaderspinner";

interface CourseItemProps {
  course: any;
}

const CourseItem = ({ course }: CourseItemProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [canView, setCanView] = useState(false);
  const [remainingTime, setRemainingTime] = useState(40); // in seconds
  const router = useRouter();

  const TIMER_KEY = `course-${course?.courseId}-startTime`;
  const TIMER_DURATION = 30 * 1000; // 40 seconds

  useEffect(() => {
    if (course?.status === "Generating") {
      const startTime = localStorage.getItem(TIMER_KEY);
      const now = Date.now();

      let endTime: number;

      if (startTime) {
        const elapsed = now - parseInt(startTime, 10);
        if (elapsed >= TIMER_DURATION) {
          setCanView(true);
          localStorage.removeItem(TIMER_KEY);
          return;
        } else {
          endTime = parseInt(startTime, 10) + TIMER_DURATION;
        }
      } else {
        localStorage.setItem(TIMER_KEY, now.toString());
        endTime = now + TIMER_DURATION;
      }

      const interval = setInterval(() => {
        const secondsLeft = Math.ceil((endTime - Date.now()) / 1000);
        if (secondsLeft <= 0) {
          setRemainingTime(0);
          setCanView(true);
          localStorage.removeItem(TIMER_KEY);
          clearInterval(interval);
        } else {
          setRemainingTime(secondsLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanView(true);
    }
  }, [course?.status]);

  const handleViewClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/course/${course?.courseId}`);
    }, 3000);
  };

  // Circular timer parameters
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (remainingTime / 30) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative border border-neutral-700 rounded-2xl shadow-lg bg-neutral-900/80 backdrop-blur-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between"
    >
      {/* Overlay Circular Timer */}
      {course?.status === "Generating" && !canView && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl z-10">
          <div className="relative w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#555"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#fff"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={progress}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
              {remainingTime}s
            </div>
          </div>
        </div>
      )}

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
        {course?.status === "Generating" && !canView ? (
          <div className="flex items-center justify-center text-sm px-3 py-1 rounded-full bg-neutral-700 text-white gap-2">
            <Spinner />
            Generating...
          </div>
        ) : isNavigating ? (
          <div className="flex items-center justify-center">
            <Spinner />
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
