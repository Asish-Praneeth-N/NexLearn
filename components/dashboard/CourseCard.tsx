"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import CourseItem from "./CourseItem";
import { Button } from "../ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { CourseCountContext } from "../context/CourseCountContext";
import Link from "next/link";

// Define a proper course type
interface Course {
  courseId: string;
  courseLayout: {
    chapters: { chapter_title?: string; chapterTitle?: string }[];
  };
  [key: string]: any;
}

const CourseCard = () => {
  const { user } = useUser();
  const [courseCard, setCourseCard] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const { totalCourse, setTotalCourse } = useContext(CourseCountContext) as {
    totalCourse: number;
    setTotalCourse: (val: number) => void;
  };

  // useCallback to fix missing dependency
  const GetCourseCard = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseCard(result.data.result);
      setTotalCourse(result.data.result?.length);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  }, [user, setTotalCourse]);

  useEffect(() => {
    GetCourseCard();
  }, [GetCourseCard]);

  return (
    <>
      {/* Mobile create button */}
      <div className="md:hidden block space-y-2 mt-4">
        {totalCourse < 10 ? (
          <Link href={`/create`} className="w-full">
            <Button className="w-full gap-2 bg-white text-black hover:bg-neutral-200 shadow-md">
              <Plus /> Create New Course
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full gap-2 bg-neutral-800 text-white">
            <Plus /> Create New Course
          </Button>
        )}
        <span className="bg-neutral-800 text-white text-sm flex justify-center p-2 rounded-lg">
          You can only create up to 10 courses
        </span>
      </div>

      {/* Courses list */}
      <div className="md:mt-10 mt-4">
        <h2 className="text-2xl font-bold text-white flex justify-between mb-4">
          Your Courses
          <Button
            onClick={GetCourseCard}
            variant="ghost"
            className="gap-2 text-white border border-neutral-700 hover:bg-neutral-800"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        </h2>

        {loading === false && courseCard.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-neutral-900 shadow-md rounded-2xl p-10 border border-dashed border-neutral-700">
            <h3 className="text-lg font-semibold mt-4 text-white">No Courses Yet</h3>
            <p className="text-neutral-400 text-sm mt-2">
              Start by creating your first AI-powered course!
            </p>
            <Link href="/create">
              <Button className="mt-4 bg-white text-black hover:bg-neutral-200 shadow-md">
                <Plus className="w-4 h-4 mr-1" /> Create Course
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-56 w-full bg-neutral-800 rounded-lg animate-pulse" />
                ))
              : courseCard.map((course, index) => <CourseItem course={course} key={index} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCard;
