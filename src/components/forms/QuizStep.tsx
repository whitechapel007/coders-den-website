"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Quiz, QuizQuestion } from "@/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface QuizStepProps {
  quiz: Quiz;
  onComplete: (data: {
    answers: Record<string, unknown>;
    score: number;
    timeSpent: number;
  }) => void;
  onBack: () => void;
}

export function QuizStep({ quiz, onComplete, onBack }: QuizStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [timeLeft, setTimeLeft] = useState(
    quiz.timeLimit ? quiz.timeLimit * 60 : 0
  ); // Convert to seconds
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined;

  const calculateScore = useCallback(() => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  }, [answers, quiz.questions]);

  const handleSubmitQuiz = useCallback(() => {
    const score = calculateScore();
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // Convert to minutes
    onComplete({ answers, score, timeSpent });
  }, [answers, startTime, onComplete, calculateScore]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmitQuiz]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderCodeSnippet = (code: string) => {
    return (
      <div className="bg-muted rounded-lg p-4 my-4 font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">{code}</pre>
      </div>
    );
  };

  const renderQuestion = (question: QuizQuestion) => {
    // Simple markdown-like parsing for code blocks
    const parts = question.question.split("```");
    const questionContent = parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const lines = part.split("\n");
        const code = lines.slice(1).join("\n");
        return renderCodeSnippet(code);
      } else {
        // Regular text
        return <span key={index}>{part}</span>;
      }
    });

    return <div className="whitespace-pre-wrap">{questionContent}</div>;
  };

  const renderAnswerOptions = (question: QuizQuestion) => {
    if (question.type === "multiple-choice") {
      return (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                answers[question.id] === index
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full border-2 text-sm font-semibold",
                    answers[question.id] === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  )}
                >
                  {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === "true-false") {
      return (
        <div className="space-y-3">
          {["true", "false"].map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                answers[question.id] === option
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full border-2 text-sm font-semibold",
                    answers[question.id] === option
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  )}
                >
                  {option === "true" ? "T" : "F"}
                </div>
                <span className="flex-1 capitalize">{option}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "text-green-600 bg-green-100",
      medium: "text-yellow-600 bg-yellow-100",
      hard: "text-red-600 bg-red-100",
    };
    return (
      colors[difficulty as keyof typeof colors] || "text-gray-600 bg-gray-100"
    );
  };

  const getTechStackColor = (techStack: string) => {
    const colors = {
      javascript: "text-yellow-700 bg-yellow-100",
      python: "text-blue-700 bg-blue-100",
      general: "text-purple-700 bg-purple-100",
    };
    return (
      colors[techStack as keyof typeof colors] || "text-gray-700 bg-gray-100"
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Timer and Progress */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        {quiz.timeLimit && (
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4" />
            <span
              className={cn(
                "font-mono",
                timeLeft < 300 ? "text-red-600" : "text-muted-foreground"
              )}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / quiz.questions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {renderQuestion(currentQuestion)}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                getDifficultyColor(currentQuestion.difficulty)
              )}
            >
              {currentQuestion.difficulty}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                getTechStackColor(currentQuestion.techStack)
              )}
            >
              {currentQuestion.techStack}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {currentQuestion.codeSnippet &&
            renderCodeSnippet(currentQuestion.codeSnippet)}
          {renderAnswerOptions(currentQuestion)}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {/* Question indicators */}
          <div className="hidden sm:flex items-center space-x-1">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full",
                  index === currentQuestionIndex
                    ? "bg-primary"
                    : answers[quiz.questions[index].id] !== undefined
                    ? "bg-green-500"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={nextQuestion}
          disabled={!hasAnswer}
          className={isLastQuestion ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isLastQuestion ? (
            <>
              Submit Quiz
              <CheckCircleIcon className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Answer Summary (mobile) */}
      <div className="sm:hidden mt-6 text-center text-sm text-muted-foreground">
        {Object.keys(answers).length} of {quiz.questions.length} questions
        answered
      </div>
    </div>
  );
}
