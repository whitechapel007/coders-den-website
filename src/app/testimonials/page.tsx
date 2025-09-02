"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/testimonials";
import { StarIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Stories", count: testimonials.length },
  {
    value: "job-placement",
    label: "Job Placements",
    count: testimonials.filter((t) => t.category === "job-placement").length,
  },
  {
    value: "skill-improvement",
    label: "Skill Growth",
    count: testimonials.filter((t) => t.category === "skill-improvement")
      .length,
  },
  {
    value: "community",
    label: "Community",
    count: testimonials.filter((t) => t.category === "community").length,
  },
  {
    value: "mentorship",
    label: "Mentorship",
    count: testimonials.filter((t) => t.category === "mentorship").length,
  },
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTestimonials =
    selectedCategory === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.category === selectedCategory
        );

  const getCategoryColor = (category: string) => {
    const colors = {
      "job-placement": "bg-green-100 text-green-800",
      "skill-improvement": "bg-blue-100 text-blue-800",
      community: "bg-purple-100 text-purple-800",
      mentorship: "bg-orange-100 text-orange-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      "job-placement": "Job Placement",
      "skill-improvement": "Skill Growth",
      community: "Community",
      mentorship: "Mentorship",
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Success{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Real stories from developers who transformed their careers, improved
            their skills, and found their community at Coders Den.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 lg:mx-0 lg:max-w-none">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">
              {testimonials.length}
            </div>
            <div className="text-sm text-muted-foreground">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">95%</div>
            <div className="text-sm text-muted-foreground">Would Recommend</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {filteredTestimonials.length}{" "}
              {filteredTestimonials.length === 1 ? "Story" : "Stories"}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<FunnelIcon className="h-4 w-4" />}
            >
              Filter
            </Button>
          </div>

          {/* Filter Categories */}
          <div
            className={cn(
              "transition-all duration-200 overflow-hidden",
              showFilters ? "max-h-40 opacity-100 mb-8" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category.label}
                  <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-foreground mb-6 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </blockquote>

                  {/* Member Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.member.avatar}
                        alt={testimonial.member.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">
                        {testimonial.member.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )}
                      </div>
                    </div>
                    <div>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          getCategoryColor(testimonial.category)
                        )}
                      >
                        {getCategoryLabel(testimonial.category)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                No testimonials found for this category.
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("all")}
              >
                View All Stories
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-32 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to write your success story?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of developers who have transformed their careers with
            Coders Den.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <a href="/quiz">Join Our Community</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
