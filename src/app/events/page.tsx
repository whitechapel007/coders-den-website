"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { events, eventTypes, difficultyLevels } from "@/data/events";
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  FunnelIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = events.filter((event) => {
    const typeMatch = selectedType === "all" || event.type === selectedType;
    const difficultyMatch =
      selectedDifficulty === "all" || event.difficulty === selectedDifficulty;
    return typeMatch && difficultyMatch;
  });

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) > new Date()
  );
  const featuredEvents = upcomingEvents.filter((event) => event.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 1440) {
      // 24 hours or more
      const days = Math.floor(minutes / 1440);
      return `${days} day${days > 1 ? "s" : ""}`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getTypeIcon = (type: string) => {
    const typeData = eventTypes.find((t) => t.value === type);
    return typeData?.icon || "📅";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
      "all-levels": "bg-blue-100 text-blue-800",
    };
    return (
      colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getLocationIcon = (location: string) => {
    if (location === "online") return "🌐";
    if (location === "in-person") return "🏢";
    if (location === "hybrid") return "🔄";
    return "📍";
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Events &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Programs
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join our interactive workshops, hackathons, game nights, and
            networking events. Learn, build, and connect with fellow developers.
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              Featured Events
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {featuredEvents.slice(0, 3).map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow border-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">
                        {getTypeIcon(event.type)}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          getDifficultyColor(event.difficulty)
                        )}
                      >
                        {event.difficulty.replace("-", " ")}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>
                          {formatTime(event.date)} •{" "}
                          {formatDuration(event.duration)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{getLocationIcon(event.location)}</span>
                        <span className="capitalize">{event.location}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center space-x-2">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>
                            {event.currentParticipants}/{event.maxParticipants}{" "}
                            registered
                          </span>
                        </div>
                      )}
                    </div>

                    {event.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                        {event.techStack.length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                            +{event.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <Button className="w-full" size="sm">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filters and All Events */}
        <div className="mx-auto mt-24 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              All Events ({upcomingEvents.length})
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

          {/* Filter Controls */}
          <div
            className={cn(
              "transition-all duration-200 overflow-hidden",
              showFilters ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0"
            )}
          >
            <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Event Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        selectedType === type.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <span className="mr-1">{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Difficulty Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setSelectedDifficulty(level.value)}
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        selectedDifficulty === level.value
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {event.title}
                            </h3>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                getDifficultyColor(event.difficulty)
                              )}
                            >
                              {event.difficulty.replace("-", " ")}
                            </span>
                          </div>

                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>
                                {formatTime(event.date)} •{" "}
                                {formatDuration(event.duration)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>{getLocationIcon(event.location)}</span>
                              <span className="capitalize">
                                {event.location}
                              </span>
                            </div>
                            {event.maxParticipants && (
                              <div className="flex items-center space-x-1">
                                <UserGroupIcon className="h-4 w-4" />
                                <span>
                                  {event.currentParticipants}/
                                  {event.maxParticipants}
                                </span>
                              </div>
                            )}
                            {event.instructor && (
                              <div className="flex items-center space-x-1">
                                <AcademicCapIcon className="h-4 w-4" />
                                <span>{event.instructor}</span>
                              </div>
                            )}
                          </div>

                          {event.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {event.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button size="lg">Register</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {upcomingEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                No upcoming events match your filters.
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedType("all");
                  setSelectedDifficulty("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-32 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Want to host an event?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Share your expertise with the community. We&apos;re always looking
            for passionate developers to lead workshops and share their
            knowledge.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <a href="/contact">Propose an Event</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
