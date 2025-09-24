"use client";
import React, { createContext, useState, ReactNode } from "react";

interface CourseCountContextType {
  totalCourse: number;
  setTotalCourse: React.Dispatch<React.SetStateAction<number>>;
}

export const CourseCountContext = createContext<CourseCountContextType | undefined>(undefined);

export const CourseCountProvider = ({ children }: { children: ReactNode }) => {
  const [totalCourse, setTotalCourse] = useState(0);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      {children}
    </CourseCountContext.Provider>
  );
};
