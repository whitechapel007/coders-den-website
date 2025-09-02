"use client";

import { useState } from "react";
import { QuizStep } from "@/components/forms/QuizStep";
import { RegistrationStep } from "@/components/forms/RegistrationStep";
import { QuizResults } from "@/components/forms/QuizResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { trackOptions, getJavaScriptQuiz, getPythonQuiz } from "@/data/quiz";
import { Quiz } from "@/types";
import {
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  CheckCircleIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type Step =
  | "intro"
  | "track-selection"
  | "quiz"
  | "results"
  | "registration"
  | "complete";

interface QuizData {
  answers: Record<string, unknown>;
  score: number;
  timeSpent: number;
}

interface RegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  yearsOfExperience: number;
  learningGoals: string[];
  currentSkills: string[];
  motivation: string;
  availability: string[];
}

const steps = [
  { id: "intro", title: "Welcome", icon: AcademicCapIcon },
  { id: "track-selection", title: "Choose Track", icon: CodeBracketIcon },
  { id: "quiz", title: "Assessment", icon: ClipboardDocumentListIcon },
  { id: "results", title: "Results", icon: CheckCircleIcon },
  { id: "registration", title: "Registration", icon: UserPlusIcon },
  { id: "complete", title: "Complete", icon: CheckCircleIcon },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [selectedTrack, setSelectedTrack] = useState<
    "javascript" | "python" | null
  >(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  // Generate fresh quiz when track is selected or quiz is retaken
  const generateQuiz = () => {
    if (selectedTrack === "python") {
      setCurrentQuiz(getPythonQuiz());
    } else if (selectedTrack === "javascript") {
      setCurrentQuiz(getJavaScriptQuiz());
    }
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const handleQuizComplete = (data: QuizData) => {
    setQuizData(data);
    setCurrentStep("results");
  };

  const handleRetakeQuiz = () => {
    generateQuiz(); // Generate new random questions
    setCurrentStep("quiz");
  };

  const handleStartQuiz = () => {
    generateQuiz(); // Generate random questions when starting
    setCurrentStep("quiz");
  };

  const handleRegistrationComplete = (data: RegistrationData) => {
    // Here you would typically send data to Google Sheets
    console.log("Quiz Data:", quizData);
    console.log("Registration Data:", data);
    setCurrentStep("complete");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "intro":
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-8">
              <AcademicCapIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              Welcome to Coders Den!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We&apos;re excited to have you join our community! This quick
              assessment will help us understand your current skills and
              recommend the best learning path for you.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                  <span>What to Expect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Skills Assessment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      15 questions covering JavaScript, Python, and general
                      programming concepts
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Registration Form
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your goals, experience, and what you&apos;d
                      like to learn
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Personalized Recommendations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get customized learning paths and community access based
                      on your profile
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">30</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">Free</div>
                  <div className="text-sm text-muted-foreground">Always</div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setCurrentStep("track-selection")}
              className="w-full sm:w-auto"
            >
              Start Assessment
            </Button>
          </div>
        );

      case "track-selection":
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              Choose Your Track
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Select the programming language you&apos;d like to focus on for
              your assessment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {trackOptions.map((track) => (
                <Card
                  key={track.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTrack === track.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedTrack(track.id as "javascript" | "python")
                  }
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{track.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">
                      {track.title}
                    </h3>
                    <p className="text-muted-foreground">{track.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              size="lg"
              onClick={handleStartQuiz}
              disabled={!selectedTrack}
            >
              Start{" "}
              {selectedTrack
                ? trackOptions.find((t) => t.id === selectedTrack)?.title
                : ""}{" "}
              Assessment
            </Button>
          </div>
        );

      case "quiz":
        if (!currentQuiz) {
          return <div>Loading quiz...</div>;
        }
        return (
          <QuizStep
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            onBack={() => setCurrentStep("track-selection")}
          />
        );

      case "results":
        if (!currentQuiz) {
          return <div>Loading results...</div>;
        }
        return (
          <QuizResults
            quizData={quizData!}
            quiz={currentQuiz}
            onContinue={() => setCurrentStep("registration")}
            onRetake={handleRetakeQuiz}
          />
        );

      case "registration":
        return (
          <RegistrationStep
            quizScore={quizData?.score || 0}
            onComplete={handleRegistrationComplete}
            onBack={() => setCurrentStep("results")}
          />
        );

      case "complete":
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-8">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
              Welcome to the Community!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Congratulations! You&apos;ve successfully joined Coders Den.
              We&apos;ve sent you an email with next steps and links to join our
              community channels.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>What&apos;s Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">
                    Check your email for community access links
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">
                    Join our Discord server for real-time discussions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">
                    Browse upcoming events and workshops
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">
                    Start with your personalized learning path
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/events">View Events</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/about">Meet the Community</a>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < getCurrentStepIndex();
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-muted-foreground bg-background text-muted-foreground"
                    )}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div
                      className={cn(
                        "text-sm font-medium",
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-600"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-12 h-0.5 mx-4",
                        isCompleted ? "bg-green-500" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">{renderStepContent()}</div>
      </div>
    </div>
  );
}
