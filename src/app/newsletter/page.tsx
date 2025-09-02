"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { subscribeToNewsletter, ApiError } from "@/lib/api-client";
import {
  EnvelopeIcon,
  CheckCircleIcon,
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const benefits = [
  {
    icon: BookOpenIcon,
    title: "Weekly Tutorials",
    description:
      "Get the latest coding tutorials and best practices delivered to your inbox.",
  },
  {
    icon: BriefcaseIcon,
    title: "Career Tips",
    description:
      "Exclusive career advice, job opportunities, and interview preparation tips.",
  },
  {
    icon: UserGroupIcon,
    title: "Community Updates",
    description:
      "Stay updated on community events, workshops, and networking opportunities.",
  },
  {
    icon: SparklesIcon,
    title: "Exclusive Content",
    description:
      "Access to subscriber-only resources, templates, and coding challenges.",
  },
];

export default function NewsletterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await subscribeToNewsletter({
        email: data.email,
        source: "newsletter-page",
      });

      setIsSubscribed(true);
      reset();
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);

      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to subscribe. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Welcome to the Community!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for subscribing to our newsletter. You&apos;ll receive
                your first email soon with the latest tutorials and community
                updates.
              </p>
              <div className="space-y-4">
                <Button asChild>
                  <Link href="/blog">Explore Our Blog</Link>
                </Button>
                <div>
                  <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <EnvelopeIcon className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Stay{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connected
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of developers who get weekly tutorials, career tips,
            and community updates delivered straight to their inbox.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="p-6">
                  <benefit.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="mx-auto mt-16 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Subscribe to Our Newsletter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  placeholder="your.email@example.com"
                  leftIcon={<EnvelopeIcon className="h-5 w-5" />}
                />

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Unsubscribe at any time. No spam,
                  ever.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by developers at
          </p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <span className="text-lg font-semibold">Google</span>
            <span className="text-lg font-semibold">Microsoft</span>
            <span className="text-lg font-semibold">Meta</span>
            <span className="text-lg font-semibold">Netflix</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How often will I receive emails?
              </h3>
              <p className="text-muted-foreground">
                We send one newsletter per week, typically on Tuesdays.
                You&apos;ll also receive occasional updates about special events
                or important community announcements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What type of content will I receive?
              </h3>
              <p className="text-muted-foreground">
                Our newsletters include coding tutorials, career advice,
                community spotlights, upcoming events, job opportunities, and
                curated resources from around the web.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I unsubscribe anytime?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! Every email includes an unsubscribe link. You can
                also manage your subscription preferences or pause emails
                temporarily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
