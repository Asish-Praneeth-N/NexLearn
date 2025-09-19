"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { Button } from "../ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { CourseCountContext } from "../context/CourseCountContext";
import Link from "next/link";

const CourseCard = () => {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courseCard, setCourseCard] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && GetCourseCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetCourseCard = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    setCourseCard(result.data.result);
    setLoading(false);
    setTotalCourse(result.data.result?.length);
  };

  return (
    <>
      <div className="md:hidden block space-y-2 mt-4">
        {totalCourse < 10 ? (
          <Link href={`/create`} className="w-full">
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus /> Create New Course
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full gap-2">
            <Plus /> Create New Course
          </Button>
        )}
        <span className="bg-sky-100 text-sky-700 text-sm flex justify-center p-2 rounded-lg">
          You can only create up to 10 courses
        </span>
      </div>

      <div className="md:mt-10 mt-4">
        <h2 className="text-2xl font-bold text-slate-800 flex justify-between mb-4">
          Your Courses
          <Button onClick={() => GetCourseCard()} variant="ghost" className="gap-2 text-indigo-600">
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        </h2>

        {loading === false && courseCard?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white shadow-md rounded-2xl p-10 border border-dashed border-slate-300">
            <h3 className="text-lg font-semibold mt-4 text-slate-700">No Courses Yet</h3>
            <p className="text-slate-500 text-sm mt-2">
              Start by creating your first AI-powered course!
            </p>
            <Link href="/create">
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-1" /> Create Course
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
            {loading === false
              ? courseCard?.map((course, index) => (
                  <CourseItem course={course} key={index} />
                ))
              : [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-56 w-full bg-slate-200 rounded-lg animate-pulse" />
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCard;
