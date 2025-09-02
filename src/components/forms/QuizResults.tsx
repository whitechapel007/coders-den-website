"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Quiz } from "@/types";
import {
  TrophyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  quizData: {
    answers: Record<string, unknown>;
    score: number;
    timeSpent: number;
  };
  quiz: Quiz;
  onContinue: () => void;
  onRetake: () => void;
}

export function QuizResults({
  quizData,
  quiz,
  onContinue,
  onRetake,
}: QuizResultsProps) {
  const { answers, score, timeSpent } = quizData;
  const passed = score >= quiz.passingScore;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You have a strong foundation.";
    if (score >= 80) return "Great job! You have solid programming knowledge.";
    if (score >= 70) return "Good work! You have a decent understanding.";
    if (score >= 60) return "Not bad! There's room for improvement.";
    return "Keep learning! Everyone starts somewhere.";
  };

  const getRecommendedPath = (score: number) => {
    if (score >= 80) {
      return {
        title: "Advanced Track",
        description:
          "You're ready for advanced topics and can help mentor others.",
        suggestions: [
          "Join advanced workshops and masterclasses",
          "Participate in hackathons and coding challenges",
          "Consider becoming a community mentor",
          "Contribute to open source projects",
        ],
      };
    } else if (score >= 60) {
      return {
        title: "Intermediate Track",
        description:
          "Build on your foundation with practical projects and mentorship.",
        suggestions: [
          "Join intermediate workshops and study groups",
          "Work on guided projects with mentors",
          "Attend mock interview sessions",
          "Practice with coding challenges",
        ],
      };
    } else {
      return {
        title: "Beginner Track",
        description: "Start with fundamentals and build a strong foundation.",
        suggestions: [
          "Begin with beginner-friendly workshops",
          "Join study groups for basic concepts",
          "Get paired with an experienced mentor",
          "Focus on one language at a time",
        ],
      };
    }
  };

  const recommendedPath = getRecommendedPath(score);

  const getDetailedResults = () => {
    const results = quiz.questions.map((question) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;

      return {
        question,
        userAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const byTechStack = results.reduce((acc, result) => {
      const tech = result.question.techStack;
      if (!acc[tech]) {
        acc[tech] = { correct: 0, total: 0 };
      }
      acc[tech].total++;
      if (result.isCorrect) {
        acc[tech].correct++;
      }
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    return { results, byTechStack };
  };

  const { results, byTechStack } = getDetailedResults();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Results Card */}
      <Card className="mb-8 overflow-hidden">
        <div className={cn("h-2", passed ? "bg-green-500" : "bg-red-500")} />
        <CardHeader className="text-center pb-4">
          <div
            className={cn(
              "mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-4",
              passed ? "bg-green-100" : "bg-red-100"
            )}
          >
            <TrophyIcon
              className={cn(
                "h-8 w-8",
                passed ? "text-green-600" : "text-red-600"
              )}
            />
          </div>
          <CardTitle className="text-3xl mb-2">
            {passed ? "Congratulations!" : "Keep Learning!"}
          </CardTitle>
          <p className="text-muted-foreground">{getScoreMessage(score)}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div
                className={cn("text-4xl font-bold mb-2", getScoreColor(score))}
              >
                {score}%
              </div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {Object.values(answers).length}
              </div>
              <div className="text-sm text-muted-foreground">
                Questions Answered
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">
                {timeSpent}m
              </div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
          </div>

          {/* Performance by Tech Stack */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance by Topic</h3>
            <div className="space-y-3">
              {Object.entries(byTechStack).map(([tech, stats]) => {
                const percentage = Math.round(
                  (stats.correct / stats.total) * 100
                );
                return (
                  <div key={tech} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="capitalize font-medium">{tech}</span>
                      <span className="text-sm text-muted-foreground">
                        {stats.correct}/{stats.total} correct
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full",
                            percentage >= 70
                              ? "bg-green-500"
                              : percentage >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onContinue}>
              Continue to Registration
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={onRetake}>
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Learning Path */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              {recommendedPath.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {recommendedPath.description}
            </p>
          </div>
          <div className="space-y-2">
            {recommendedPath.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Question Review */}
      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
          <p className="text-sm text-muted-foreground">
            Review your answers and learn from explanations
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={result.question.id}
                className="border-b border-border pb-6 last:border-b-0"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-1",
                      result.isCorrect ? "bg-green-100" : "bg-red-100"
                    )}
                  >
                    {result.isCorrect ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">
                      Question {index + 1}:{" "}
                      {result.question.question.split("```")[0].trim()}
                    </h4>
                    <div className="text-sm text-muted-foreground mb-2">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mr-2",
                          result.isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}
                      >
                        {result.isCorrect ? "Correct" : "Incorrect"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {result.question.techStack} •{" "}
                        {result.question.difficulty}
                      </span>
                    </div>
                    {!result.isCorrect && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <p className="font-medium text-foreground mb-1">
                          Explanation:
                        </p>
                        <p className="text-muted-foreground">
                          {result.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
