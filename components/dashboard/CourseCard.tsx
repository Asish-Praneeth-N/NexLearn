"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { Button } from "../ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { CourseCountContext } from "../context/CourseCountContext";
import Link from "next/link";

// Define Course type
interface Chapter {
  chapter_title?: string;
  chapterTitle?: string;
}

interface Course {
  courseId: string;
  courseName: string;
  courseLayout: {
    chapters: Chapter[];
  };
}

// API request payload type
interface GetCoursesPayload {
  createdBy?: string;
}

// API response type
interface CoursesResponse {
  result: Course[];
}

const CourseCard = () => {
  const { user } = useUser();
  const [courseCard, setCourseCard] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const courseContext = useContext(CourseCountContext);
  const totalCourse = courseContext?.totalCourse ?? 0;

  useEffect(() => {
    if (user) {
      GetCourseCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetCourseCard = async () => {
    setLoading(true);
    try {
      const payload: GetCoursesPayload = {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      };
      const result = await axios.post<CoursesResponse>("/api/courses", payload);
      const courses = result.data.result ?? [];
      setCourseCard(courses);

      if (courseContext?.setTotalCourse) {
        courseContext.setTotalCourse(courses.length);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mobile "Create Course" Button */}
      <div className="md:hidden block space-y-3 mt-4">
        {totalCourse < 10 ? (
          <Link href="/create" className="w-full">
            <Button className="w-full h-12 gap-2 bg-white text-black hover:bg-gray-200 shadow-lg font-semibold rounded-xl transition-all">
              <Plus className="w-5 h-5" /> Create New Course
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full h-12 gap-2 bg-white/10 text-gray-400 border border-white/10 rounded-xl">
            <Plus className="w-5 h-5" /> Limit Reached
          </Button>
        )}
        <p className="text-xs text-center text-gray-500">
          Plan limit: {totalCourse}/10 courses
        </p>
      </div>

      {/* Courses Section */}
      <div className="md:mt-10 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Your Courses
          </h2>
          <Button
            onClick={GetCourseCard}
            variant="ghost"
            className="gap-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading === false && courseCard.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <Plus className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Courses Yet</h3>
            <p className="text-gray-400 max-w-sm mb-8">
              Start your learning journey by creating your first AI-powered course. It only takes a few seconds!
            </p>
            <Link href="/create">
              <Button className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 rounded-xl font-semibold transition-all hover:scale-105">
                <Plus className="w-5 h-5 mr-2" /> Create First Course
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[300px] w-full bg-white/5 rounded-3xl animate-pulse border border-white/5"
                />
              ))
              : courseCard.map((course, index) => (
                <div key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
                  <CourseItem course={course} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;