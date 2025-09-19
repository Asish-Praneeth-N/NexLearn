"use client";

import QuizCardItem from "@/components/course/QuizCardItem";
import StepProgress from "@/components/course/StepProgress";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, MessageSquare } from "lucide-react";

interface QuizAnswer {
  questionIndex: number;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: string[];
}

const Quiz = () => {
  const { courseId } = useParams();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quiz, setQuiz] = useState<any[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    GetQuiz();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(() => {
    setCorrectAnswer(null);
  }, [stepCount]);

  const GetQuiz = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "quiz",
    });
    setQuiz(result.data.content.questions);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkAnswer = (userAnswer: any, currentQuestion: any) => {
    const isCorrect = userAnswer === currentQuestion?.correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswer(true);
      setScore((prev) => prev + 1);
    } else {
      setCorrectAnswer(false);
    }

    const answerRecord: QuizAnswer = {
      questionIndex: stepCount,
      questionText: currentQuestion?.questionText || '',
      userAnswer: userAnswer,
      correctAnswer: currentQuestion?.correctAnswer || '',
      isCorrect: isCorrect,
      options: currentQuestion?.options || []
    };

    setQuizAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[stepCount] = answerRecord;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (stepCount < quiz.length - 1) {
      setStepCount((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setStepCount(0);
    setScore(0);
    setCorrectAnswer(null);
    setShowResults(false);
    setQuizAnswers([]);
    setIsDialogOpen(false);
  };

  const wrongAnswers = quizAnswers.filter(answer => !answer.isCorrect);

  return (
    <div>
      <h2 className="font-bold text-3xl text-center mb-4">Quiz</h2>

      {!showResults && (
        <StepProgress
          data={quiz}
          stepCount={stepCount}
          setStepCount={(value: number) => setStepCount(value)}
        />
      )}

      <div className="mt-6">
        {!showResults ? (
          <>
            <QuizCardItem
              key={stepCount}
              quiz={quiz[stepCount]}
              userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              showCorrectAnswer={correctAnswer === false}
            />

            <div className="mt-6">
              {correctAnswer === false && (
                <div className="bg-rose-100 text-rose-700 p-4 shadow-md border border-rose-400 rounded-lg">
                  <h2 className="text-center text-lg font-semibold">Incorrect</h2>
                  <p className="text-center text-sm">
                    That wasn&apos;t right ☹️, review and try again.
                  </p>
                </div>
              )}
              {correctAnswer === true && (
                <div className="bg-emerald-100 text-emerald-700 p-4 shadow-md border border-emerald-400 rounded-lg">
                  <h2 className="text-center text-lg font-semibold">Correct 🎉</h2>
                  <p className="text-center text-sm">
                    Nice work! Click next to continue 💪
                  </p>
                </div>
              )}
            </div>

            {correctAnswer !== null && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 shadow-md"
                >
                  {stepCount === quiz.length - 1 ? "See Results" : "Next"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-10 shadow-xl rounded-2xl text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-800">Quiz Completed 🎉</h2>
            <p className="mt-3 text-lg text-slate-600">
              You scored{" "}
              <span className="font-bold text-indigo-600">{score}</span> out of{" "}
              {quiz.length}
            </p>
            
            <div className="flex flex-col gap-3 mt-6">
              <Button
                onClick={restartQuiz}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                Restart Quiz
              </Button>
              
              {wrongAnswers.length > 0 && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 shadow-md"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Feedback ({wrongAnswers.length} wrong)
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-xl">
                        <MessageSquare className="h-5 w-5 text-orange-600" />
                        Quiz Feedback
                      </DialogTitle>
                    </DialogHeader>
                    
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-6">
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {wrongAnswers.map((answer, index) => (
                          <div 
                            key={answer.questionIndex} 
                            className="border rounded-lg p-4 bg-gray-50"
                          >
                            <h3 className="font-semibold text-lg mb-3 text-gray-800">
                              Question {answer.questionIndex + 1}
                            </h3>
                            <p className="text-gray-700 mb-4 font-medium">
                              {answer.questionText}
                            </p>
                            
                            <div className="space-y-3">
                              {answer.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={`p-3 rounded-lg border-2 transition-all ${
                                    option === answer.correctAnswer
                                      ? 'bg-green-50 border-green-300 text-green-800'
                                      : option === answer.userAnswer
                                      ? 'bg-red-50 border-red-300 text-red-800'
                                      : 'bg-white border-gray-200 text-gray-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {option === answer.correctAnswer && (
                                      <CheckCircle className="h-5 w-5 text-green-600" />
                                    )}
                                    {option === answer.userAnswer && option !== answer.correctAnswer && (
                                      <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                    <span className="flex-1">{option}</span>
                                    {option === answer.correctAnswer && (
                                      <span className="text-xs font-semibold bg-green-200 text-green-800 px-2 py-1 rounded-full">
                                        Correct
                                      </span>
                                    )}
                                    {option === answer.userAnswer && option !== answer.correctAnswer && (
                                      <span className="text-xs font-semibold bg-red-200 text-red-800 px-2 py-1 rounded-full">
                                        Your Answer
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
