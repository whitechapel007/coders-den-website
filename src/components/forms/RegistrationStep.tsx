"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitRegistrationForm, ApiError } from "@/lib/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  learningGoalsOptions,
  currentSkillsOptions,
  availabilityOptions,
} from "@/data/quiz";
import {
  ChevronLeftIcon,
  UserIcon,
  AcademicCapIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  yearsOfExperience: z.number().min(0).max(50),
  learningGoals: z
    .array(z.string())
    .min(1, "Please select at least one learning goal"),
  currentSkills: z
    .array(z.string())
    .min(1, "Please select at least one current skill"),
  motivation: z
    .string()
    .min(
      50,
      "Please tell us more about your motivation (at least 50 characters)"
    ),
  availability: z
    .array(z.string())
    .min(1, "Please select at least one availability option"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationStepProps {
  quizScore: number;
  onComplete: (data: RegistrationFormData) => void;
  onBack: () => void;
}

export function RegistrationStep({
  quizScore,
  onComplete,
  onBack,
}: RegistrationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      learningGoals: [],
      currentSkills: [],
      availability: [],
    },
  });

  const handleGoalToggle = (goal: string) => {
    const updated = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];
    setSelectedGoals(updated);
    setValue("learningGoals", updated);
  };

  const handleSkillToggle = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
    setValue("currentSkills", updated);
  };

  const handleAvailabilityToggle = (availability: string) => {
    const updated = selectedAvailability.includes(availability)
      ? selectedAvailability.filter((a) => a !== availability)
      : [...selectedAvailability, availability];
    setSelectedAvailability(updated);
    setValue("availability", updated);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit to API using axios-based client
      const submissionData = {
        ...data,
        quizScore,
      };

      const result = await submitRegistrationForm(submissionData);
      console.log("Registration submitted successfully:", result);
      onComplete(data);
    } catch (error) {
      console.error("Error submitting registration:", error);

      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to submit registration. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Back to Results
        </Button>
        <div className="text-sm text-muted-foreground">
          Step 2 of 2: Registration
        </div>
      </div>

      {/* Quiz Score Summary */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your Assessment Score</h3>
              <p className="text-sm text-muted-foreground">
                Great job completing the assessment!
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {quizScore}%
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                {...register("fullName")}
                error={errors.fullName?.message}
                placeholder="Your full name"
              />
              <Input
                label="Email Address"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
                placeholder="+1 (555) 123-4567"
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Years of Programming Experience
                </label>
                <select
                  {...register("yearsOfExperience", { valueAsNumber: true })}
                  className="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value={0}>Complete beginner</option>
                  <option value={1}>Less than 1 year</option>
                  <option value={2}>1-2 years</option>
                  <option value={3}>2-3 years</option>
                  <option value={5}>3-5 years</option>
                  <option value={10}>5+ years</option>
                </select>
                {errors.yearsOfExperience && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.yearsOfExperience.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AcademicCapIcon className="h-5 w-5" />
              <span>Learning Goals</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              What would you like to learn or improve? (Select all that apply)
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {learningGoalsOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={cn(
                    "text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm",
                    selectedGoals.includes(goal)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  {goal}
                </button>
              ))}
            </div>
            {errors.learningGoals && (
              <p className="mt-2 text-sm text-red-500">
                {errors.learningGoals.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Current Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Current Skills & Technologies</CardTitle>
            <p className="text-sm text-muted-foreground">
              What technologies do you already know? (Select all that apply)
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentSkillsOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={cn(
                    "text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm",
                    selectedSkills.includes(skill)
                      ? "border-secondary bg-secondary/5 text-secondary"
                      : "border-border hover:border-secondary/50 hover:bg-muted/50"
                  )}
                >
                  {skill}
                </button>
              ))}
            </div>
            {errors.currentSkills && (
              <p className="mt-2 text-sm text-red-500">
                {errors.currentSkills.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Motivation */}
        <Card>
          <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
            <p className="text-sm text-muted-foreground">
              What motivates you to learn programming? What are your goals?
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <textarea
                {...register("motivation")}
                rows={4}
                className="flex min-h-[120px] w-full rounded-lg border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                placeholder="Tell us about your programming journey, career goals, or what excites you about coding..."
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                {(watch("motivation") || "").length}/50 characters
              </div>
            </div>
            {errors.motivation && (
              <p className="mt-2 text-sm text-red-500">
                {errors.motivation.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>Availability</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              When are you typically available for events and workshops?
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availabilityOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAvailabilityToggle(option)}
                  className={cn(
                    "text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm",
                    selectedAvailability.includes(option)
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-accent/50 hover:bg-muted/50"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.availability && (
              <p className="mt-2 text-sm text-red-500">
                {errors.availability.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{submitError}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            loading={isSubmitting}
            className="w-full sm:w-auto px-12"
          >
            {isSubmitting ? "Joining Community..." : "Join Coders Den"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our{" "}
          <a href="/guidelines" className="text-primary hover:underline">
            community guidelines
          </a>{" "}
          and privacy policy.
        </p>
      </form>
    </div>
  );
}
