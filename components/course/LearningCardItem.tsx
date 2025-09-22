/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface LearningCardItemProps {
  item: any;
  studyTypeContent: any;
  course: any;
  refreshData: () => void;
}

const LearningCardItem = ({
  item,
  studyTypeContent,
  course,
  refreshData,
}: LearningCardItemProps) => {
  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    toast("Generating content...");
    setLoading(true);

    let chapters = "";
    course?.courseLayout.chapters.forEach((chapter: any) => {
      chapters = (chapter.chapter_title || chapter.chapterTitle) + ", " + chapters;
    });

    try {
      await axios.post("/api/generate-study-type", {
        courseId: course?.courseId,
        type: item.type,
        chapters: chapters,
      });
      toast.success("Content generation started!");
      setTimeout(refreshData, 3000);
    } catch (error) {
      toast.error("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const isContentAvailable = studyTypeContent?.[item.type]?.length > 0;

  return (
    <div
      className={`flex flex-col items-center p-5 rounded-lg shadow-md h-full transition-colors ${
        !isContentAvailable ? "grayscale" : ""
      } bg-neutral-900 border border-neutral-800 hover:bg-neutral-800`}
    >
      {/* Availability Badge */}
      <h2
        className={`p-1 px-2 rounded-full text-[10px] mb-2 ${
          isContentAvailable ? "bg-green-600 text-white" : "bg-neutral-700 text-white"
        }`}
      >
        {isContentAvailable ? "Available" : "Unavailable"}
      </h2>

      {/* Icon */}
      <Image src={item.icon} alt={item.name} width={50} height={50} />

      {/* Name */}
      <h2 className="font-medium mt-3 text-white">{item.name}</h2>

      {/* Description */}
      <p className="text-neutral-400 mb-4 text-center text-sm flex-grow">{item.desc}</p>

      {/* Action Button */}
      <div className="mt-auto w-full">
        {!isContentAvailable ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              GenerateContent();
            }}
            variant="outline"
            className="w-full text-white border-white hover:bg-white hover:text-black"
            disabled={loading}
          >
            {loading && <RefreshCcw className="animate-spin mr-2 h-4 w-4" />}
            Generate
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full text-white border-white hover:bg-white hover:text-black"
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default LearningCardItem;
