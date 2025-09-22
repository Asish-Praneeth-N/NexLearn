import CourseCard from "@/components/dashboard/CourseCard";
import Welcome from "@/components/dashboard/Welcome";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-black p-6 space-y-6 text-white">
      <Welcome />
      <CourseCard />
    </div>
  );
};

export default page;
