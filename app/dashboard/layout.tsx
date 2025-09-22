"use client";
import { CourseCountContext } from "@/components/context/CourseCountContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [totalCourse, setTotalCourse] = useState(0);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar */}
        <div className="md:block hidden md:w-64 fixed h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="p-6 md:p-10 flex-1">{children}</div>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
};

export default DashboardLayout;
