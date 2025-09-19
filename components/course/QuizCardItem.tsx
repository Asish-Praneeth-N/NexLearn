"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface QuizCardItemProps {
  quiz: any;
  userSelectedOption: (option: any) => void;
  showCorrectAnswer?: boolean;
}

const QuizCardItem = ({ quiz, userSelectedOption, showCorrectAnswer = false }: QuizCardItemProps) => {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [quiz]);

  const handleSelect = (option: any) => {
    if (selectedOption) return;
    setSelectedOption(option);
    userSelectedOption(option);
  };

  const getButtonStyle = (option: any) => {
    if (!selectedOption) {
      return "bg-white hover:bg-slate-100 text-slate-800";
    }

    if (selectedOption === option) {
      if (showCorrectAnswer && option === quiz?.correctAnswer) {
        return "bg-green-500 text-white hover:bg-green-600 border-green-500";
      } else if (showCorrectAnswer && option !== quiz?.correctAnswer) {
        return "bg-red-500 text-white hover:bg-red-600 border-red-500";
      } else {
        return "bg-blue-500 text-white hover:bg-blue-600";
      }
    }

    if (showCorrectAnswer && option === quiz?.correctAnswer) {
      return "bg-green-100 text-green-800 border-green-300 hover:bg-green-200";
    }

    return "bg-gray-100 text-gray-600 cursor-not-allowed";
  };

  const renderIcon = (option: any) => {
    if (!selectedOption || !showCorrectAnswer) return null;

    if (option === quiz?.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-current ml-2" />;
    } else if (option === selectedOption && option !== quiz?.correctAnswer) {
      return <XCircle className="h-5 w-5 text-current ml-2" />;
    }

    return null;
  };

  return (
    <div>
      <h2 className="font-semibold text-center text-2xl my-4 p-2">
        {quiz?.questionText}
      </h2>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {quiz?.options.map((option: any, index: number) => (
          <Button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={!!selectedOption}
            className={`w-full text-sm md:text-base text-left whitespace-normal
              py-4 px-3 min-h-[60px] rounded-xl shadow-md border transition-all duration-200
              flex items-center justify-between
              ${getButtonStyle(option)}`}
          >
            <span className="flex-1">{option}</span>
            {renderIcon(option)}
          </Button>
        ))}
      </div>

      {showCorrectAnswer && selectedOption && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold">Correct Answer: </span>
            <span>{quiz?.correctAnswer}</span>
          </div>
          {selectedOption !== quiz?.correctAnswer && (
            <div className="flex items-center gap-2 text-blue-800 mt-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="font-semibold">Your Answer: </span>
              <span>{selectedOption}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizCardItem;
