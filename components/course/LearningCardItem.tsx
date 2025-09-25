/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/app/loaderspinner"; // loader component
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Spinner for Generate (no navigation)
  const triggerGenerateSpinner = () => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 3000);
  };

  // Spinner for View (with navigation)
  const triggerViewSpinner = (path: string) => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      router.push(path);
    }, 3000);
  };

  // Generate content handler
  const GenerateContent = async () => {
    toast("Generating content...");
    setLoading(true);
    triggerGenerateSpinner();

    let chapters = "";
    course?.courseLayout.chapters.forEach((chapter: any) => {
      chapters =
        (chapter.chapter_title || chapter.chapterTitle) + ", " + chapters;
    });

    try {
      await axios.post("/api/generate-study-type", {
        courseId: course?.courseId,
        type: item.type,
        chapters,
      });
      toast.success("Content generation started!");
      setTimeout(refreshData, 3000);
    } catch {
      toast.error("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const isContentAvailable = studyTypeContent?.[item.type]?.length > 0;

  // View handler
  const handleView = () => {
    // ✅ navigate to correct page depending on type
    const path =
      item.type === "flashcard"
        ? `/course/${course.courseId}/flashcards`
        : `/course/${course.courseId}/${item.type}`;

    triggerViewSpinner(path);
  };

  return (
    <div
      className={`flex flex-col items-center p-5 rounded-lg shadow-md h-full transition-colors
        ${!isContentAvailable ? "grayscale" : ""} bg-neutral-900 border border-neutral-700 relative`}
    >
      {/* Availability Badge */}
      <h2
        className={`p-1 px-2 rounded-full text-[10px] mb-2 ${
          isContentAvailable
            ? "bg-green-600 text-white"
            : "bg-gray-600 text-white"
        }`}
      >
        {isContentAvailable ? "Available" : "Unavailable"}
      </h2>

      {/* Icon */}
      <Image src={item.icon} alt={item.name} width={50} height={50} />

      {/* Name */}
      <h2 className="font-medium mt-3 text-white">{item.name}</h2>

      {/* Description */}
      <p className="text-gray-300 mb-4 text-center text-sm flex-grow">
        {item.desc}
      </p>

      {/* Loader Overlay */}
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg z-50">
          <Spinner />
        </div>
      )}

      {/* Action Button */}
      <div className="mt-auto w-full relative">
        {!isContentAvailable ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              GenerateContent();
            }}
            variant="outline"
            className="w-full text-white border-white bg-neutral-800"
            disabled={loading}
          >
            {loading && <RefreshCcw className="animate-spin mr-2 h-4 w-4" />}
            {!loading && "Generate"}
          </Button>
        ) : (
          <Button
            onClick={handleView}
            variant="outline"
            className="w-full text-white border-white bg-neutral-800"
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default LearningCardItem;
