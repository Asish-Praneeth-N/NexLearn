"use client";
import SelectCards from "@/components/inputField/SelectCards";
import TopicInput from "@/components/inputField/TopicInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  interface FormData {
    courseType?: string;
    topic?: string;
    difficultyLevel?: string;
  }

  useEffect(() => {
    console.log("Updated form data:", formData);
  }, [formData]);

  const handleUserInput = (fieldName: keyof FormData, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      toast(
        "Your course content is being generated, please wait for a moment or try clicking the refresh button"
      );
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error generating course outline:", error);
      toast("An error occurred while generating the course outline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20 text-center">
      {/* Heading */}
      <h2 className="font-bold text-3xl text-white">
        Start Creating Your Learning Plan
      </h2>
      <p className="text-white/70 text-lg mt-2">
        Fill in all details and create your plan to start learning
      </p>

      {/* Step Content */}
      <div className="mt-10 w-full">
        {step === 0 ? (
          <SelectCards
            SelectedStudyType={(value) => handleUserInput("courseType", value)}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            selectDifficultyLevel={(value) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-32">
        {step !== 0 ? (
          <Button
            onClick={() => setStep(step - 1)}
            variant="outline"
            className="border border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            Previous
          </Button>
        ) : (
          <div />
        )}

        {step === 0 ? (
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-black border border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={GenerateCourseOutline}
            disabled={loading}
            className="bg-black border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" /> : "Generate"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Create;
