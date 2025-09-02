"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { blogPosts, blogCategories, popularTags } from "@/data/blog";
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      tutorial: "bg-blue-100 text-blue-800",
      career: "bg-green-100 text-green-800",
      news: "bg-purple-100 text-purple-800",
      technology: "bg-orange-100 text-orange-800",
      community: "bg-pink-100 text-pink-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Blog &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Resources
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Tutorials, career advice, and insights from our community of
            developers. Learn, grow, and stay updated with the latest in tech.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="mb-8">
            <Input
              variant="search"
              placeholder="Search articles, tutorials, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
              className="w-full"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blogCategories.map((category) => (
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

          {/* Popular Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    selectedTag === tag
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 &&
          selectedCategory === "all" &&
          !searchQuery &&
          !selectedTag && (
            <div className="mx-auto mt-16 max-w-7xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {featuredPosts.slice(0, 3).map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={post.image || "/blog/default.jpg"}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            getCategoryColor(post.category)
                          )}
                        >
                          {post.category}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {post.readTime} min read
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="text-xs text-muted-foreground">
                            {post.author.name}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(post.publishDate)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        {/* All Posts */}
        <div className="mx-auto mt-24 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {searchQuery || selectedTag ? "Search Results" : "All Articles"} (
              {filteredPosts.length})
            </h2>
            {(searchQuery || selectedTag || selectedCategory !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                      <div className="lg:w-1/3 mb-4 lg:mb-0">
                        <Image
                          src={post.image || "/blog/default.jpg"}
                          alt={post.title}
                          width={300}
                          height={200}
                          className="w-full h-48 lg:h-32 object-cover rounded-lg"
                        />
                      </div>

                      <div className="lg:w-2/3">
                        <div className="flex items-center space-x-3 mb-3">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              getCategoryColor(post.category)
                            )}
                          >
                            {post.category}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {post.readTime} min read
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 4).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span className="text-sm text-muted-foreground">
                              {post.author.name}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(post.publishDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                No articles found matching your criteria.
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mx-auto mt-32 max-w-2xl text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-6">
                Get the latest tutorials, career tips, and community updates
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
