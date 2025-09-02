"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/testimonials";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const featuredTestimonials = testimonials.filter((t) => t.featured);

export function TestimonialPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredTestimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = featuredTestimonials[currentIndex];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Success Stories
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hear from our community
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Real stories from developers who transformed their careers with
            Coders Den
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mx-auto mt-16 max-w-4xl">
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>

            <div className="relative p-8 sm:p-12">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>

                <div className="flex space-x-2">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentIndex
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? "text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-8 mb-8">
                  &quot;{currentTestimonial.content}&quot;
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={currentTestimonial.member.avatar}
                      alt={currentTestimonial.member.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {currentTestimonial.member.name}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {currentTestimonial.category.replace("-", " ")} success
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">89</div>
              <div className="text-sm text-muted-foreground">
                Success Stories
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">67</div>
              <div className="text-sm text-muted-foreground">
                Job Placements
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2.3k</div>
              <div className="text-sm text-muted-foreground">
                Mentorship Hours
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" asChild>
            <Link href="/testimonials">Read All Success Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
