import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Coders Den - Free Coding Community",
    template: "%s | Coders Den",
  },
  description:
    "Join Coders Den, a free coding community helping developers level up, become job-ready, and connect with mentors through interactive classes, events, and networking.",
  keywords: [
    "coding",
    "programming",
    "community",
    "javascript",
    "python",
    "mentorship",
    "career",
    "developers",
  ],
  authors: [{ name: "Coders Den" }],
  creator: "Coders Den",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codersden.community",
    title: "Coders Den - Free Coding Community",
    description:
      "Join Coders Den, a free coding community helping developers level up, become job-ready, and connect with mentors.",
    siteName: "Coders Den",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coders Den - Free Coding Community",
    description:
      "Join Coders Den, a free coding community helping developers level up, become job-ready, and connect with mentors.",
    creator: "@codersden",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
