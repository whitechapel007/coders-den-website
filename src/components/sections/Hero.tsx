"use client";

import { Button } from "@/components/ui/Button";
import {
  AcademicCapIcon,
  CodeBracketIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fadeInUp, fadeInDown } from "@/lib/animations";

const features = [
  {
    icon: CodeBracketIcon,
    title: "Learn by Doing",
    description: "Hands-on projects and real-world coding challenges",
  },
  {
    icon: UserGroupIcon,
    title: "Expert Mentorship",
    description:
      "Connect with experienced developers and industry professionals",
  },
  {
    icon: AcademicCapIcon,
    title: "Career Ready",
    description: "Interview prep, portfolio reviews, and job placement support",
  },
  {
    icon: SparklesIcon,
    title: "Community Events",
    description: "Game nights, hackathons, and networking opportunities",
  },
];

const codeExamples = [
  {
    language: "JavaScript",
    title: "Building a React Component",
    code: `function WelcomeCard({ name, role }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="welcome-card">
      <h2>Welcome to Coders Den, {name}!</h2>
      <p>Role: {role}</p>
      <button onClick={() => alert('Let\\'s code!')}>
        Start Learning
      </button>
    </div>
  );
}`,
  },
  {
    language: "Python",
    title: "Data Analysis with Pandas",
    code: `import pandas as pd
import matplotlib.pyplot as plt

# Load community data
df = pd.read_csv('coders_den_members.csv')

# Analyze skill levels
skill_counts = df['skill_level'].value_counts()

# Create visualization
plt.figure(figsize=(10, 6))
skill_counts.plot(kind='bar', color='#3b82f6')
plt.title('Coders Den Community Skill Distribution')
plt.xlabel('Skill Level')
plt.ylabel('Number of Members')
plt.show()`,
  },
];

function InteractiveCodeDemo() {
  const [currentExample, setCurrentExample] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentCode = codeExamples[currentExample].code;

  useEffect(() => {
    if (currentCharIndex < currentCode.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedCode(currentCode.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (currentCharIndex >= currentCode.length) {
      setIsTyping(false);
      // Switch to next example after 3 seconds
      const switchTimer = setTimeout(() => {
        const nextExample = (currentExample + 1) % codeExamples.length;
        setCurrentExample(nextExample);
        setCurrentCharIndex(0);
        setDisplayedCode("");
        setIsTyping(true);
      }, 3000);
      return () => clearTimeout(switchTimer);
    }
  }, [currentCharIndex, currentCode, currentExample, isTyping]);

  return (
    <div className="relative">
      {/* Code Editor Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-300">
          {codeExamples[currentExample].title}
        </div>
        <div className="text-xs text-gray-400">
          {codeExamples[currentExample].language}
        </div>
      </div>

      {/* Code Content */}
      <div className="bg-gray-900 p-6 rounded-b-lg font-mono text-sm overflow-hidden">
        <pre className="text-gray-100 whitespace-pre-wrap">
          <code>{displayedCode}</code>
          {isTyping && (
            <span className="animate-pulse bg-blue-400 w-2 h-5 inline-block ml-1"></span>
          )}
        </pre>
      </div>

      {/* Language Indicators */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {codeExamples.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentExample(index);
              setCurrentCharIndex(0);
              setDisplayedCode("");
              setIsTyping(true);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentExample ? "bg-primary" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            className="mb-8"
            variants={fadeInDown}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
              Join 1000+ developers already learning
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Level Up Your{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Coding Journey
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            Join Coders Den, a free coding community where developers level up
            their skills, become job-ready, and connect with mentors through
            interactive classes, events, and networking.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Link href="/quiz">
              <Button size="lg">Join Now - It&apos;s Free</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 flow-root sm:mt-24"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="rounded-md shadow-2xl ring-1 ring-foreground/10 overflow-hidden">
                <InteractiveCodeDemo />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your complete coding community
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From beginner-friendly tutorials to advanced mentorship, we
              provide everything you need to succeed in your coding journey.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <feature.icon
                      className="h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
