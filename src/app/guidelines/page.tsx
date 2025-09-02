import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ShieldCheckIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description:
    "Learn about Coders Den's community guidelines, code of conduct, and expectations for creating a positive learning environment.",
};

const coreValues = [
  {
    icon: HeartIcon,
    title: "Be Respectful",
    description:
      "Treat all community members with kindness, respect, and empathy. We celebrate diversity and welcome people from all backgrounds.",
  },
  {
    icon: UserGroupIcon,
    title: "Be Inclusive",
    description:
      "Create an environment where everyone feels welcome, regardless of their experience level, background, or identity.",
  },
  {
    icon: AcademicCapIcon,
    title: "Be Helpful",
    description:
      "Share knowledge generously, help others learn, and contribute positively to the community's growth.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Be Professional",
    description:
      "Maintain professional communication standards and represent the community positively in all interactions.",
  },
];

const guidelines = [
  {
    category: "Communication",
    rules: [
      "Use clear, respectful language in all communications",
      "Avoid spam, excessive self-promotion, or off-topic discussions",
      "Keep conversations constructive and solution-oriented",
      "Use appropriate channels for different types of discussions",
      "Respect others' time and avoid unnecessary mentions or DMs",
    ],
  },
  {
    category: "Learning Environment",
    rules: [
      "Ask questions freely - no question is too basic or advanced",
      "Provide helpful, accurate answers when you can assist others",
      "Share resources and learning materials that benefit the community",
      "Give constructive feedback and accept it gracefully",
      "Celebrate others' achievements and milestones",
    ],
  },
  {
    category: "Code Sharing",
    rules: [
      "Share code snippets and projects to help others learn",
      "Provide context and explanation when sharing code",
      "Respect intellectual property and give proper attribution",
      "Use code blocks and proper formatting for readability",
      "Avoid sharing malicious or harmful code",
    ],
  },
  {
    category: "Events & Activities",
    rules: [
      "Participate actively and respectfully in community events",
      "Be punctual and prepared for scheduled activities",
      "Collaborate effectively during group projects and hackathons",
      "Provide constructive feedback during code reviews",
      "Support and encourage fellow participants",
    ],
  },
];

const prohibitedBehavior = [
  "Harassment, bullying, or discriminatory behavior of any kind",
  "Sharing inappropriate, offensive, or explicit content",
  "Spamming, excessive self-promotion, or commercial solicitation",
  "Sharing personal information without consent",
  "Impersonating others or creating fake accounts",
  "Disrupting community events or discussions",
  "Sharing malicious code, viruses, or harmful content",
  "Violating intellectual property rights or plagiarizing content",
];

const consequences = [
  {
    level: "First Warning",
    description:
      "Friendly reminder about community guidelines with guidance on appropriate behavior",
  },
  {
    level: "Formal Warning",
    description:
      "Official warning documented in member record with specific expectations for improvement",
  },
  {
    level: "Temporary Suspension",
    description:
      "Temporary removal from community activities (1-30 days) depending on severity",
  },
  {
    level: "Permanent Ban",
    description:
      "Permanent removal from the community for severe or repeated violations",
  },
];

export default function GuidelinesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Community Guidelines
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our guidelines help create a positive, inclusive, and productive
            learning environment for all community members. By participating in
            Coders Den, you agree to follow these guidelines.
          </p>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {coreValues.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
            Community Guidelines
          </h2>
          <div className="space-y-8">
            {guidelines.map((section) => (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle>{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prohibited Behavior */}
        <div className="mt-24">
          <div className="flex items-center space-x-3 mb-8">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Prohibited Behavior
            </h2>
          </div>
          <Card className="border-red-200">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-6">
                The following behaviors are not tolerated in our community and
                may result in warnings, suspension, or permanent removal:
              </p>
              <ul className="space-y-3">
                {prohibitedBehavior.map((behavior, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-red-600"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {behavior}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Consequences */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
            Enforcement & Consequences
          </h2>
          <p className="text-muted-foreground mb-8">
            We believe in progressive discipline and will work with community
            members to address issues. However, severe violations may result in
            immediate suspension or removal.
          </p>
          <div className="space-y-4">
            {consequences.map((consequence, index) => (
              <Card key={consequence.level}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {consequence.level}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {consequence.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reporting */}
        <div className="mt-24">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                Reporting Violations
              </h2>
              <p className="text-muted-foreground mb-6">
                If you witness or experience behavior that violates our
                community guidelines, please report it to our moderation team
                immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:moderation@codersden.community"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Report via Email
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            These guidelines are subject to change. We&apos;ll notify the
            community of any significant updates.
            <br />
            Last updated: August 2025
          </p>
        </div>
      </div>
    </div>
  );
}
