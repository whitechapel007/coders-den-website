"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/data/blog";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Unwrap the params Promise using React.use()
  const { slug } = use(params);

  useEffect(() => {
    // Find the post by slug
    const foundPost = blogPosts.find((p) => p.slug === slug);

    if (!foundPost) {
      notFound();
      return;
    }

    setPost(foundPost);

    // Find related posts (same category, excluding current post)
    const related = blogPosts
      .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
      .slice(0, 3);

    setRelatedPosts(related);
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                  getCategoryColor(post.category)
                )}
              >
                {post.category}
              </span>
              <div className="flex items-center text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-between border-b border-border pb-6">
              <div className="flex items-center space-x-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-foreground">
                    {post.author.name}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(post.publishDate)}
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br>"),
            }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center space-x-2">
              <TagIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={relatedPost.image || "/blog/default.jpg"}
                      alt={relatedPost.title}
                      width={300}
                      height={200}
                      className="h-32 w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          getCategoryColor(relatedPost.category)
                        )}
                      >
                        {relatedPost.category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {relatedPost.readTime} min
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-4">
                Enjoyed this article?
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for more tutorials, tips, and
                community updates.
              </p>
              <Link href="/newsletter">
                <Button>Subscribe to Newsletter</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
