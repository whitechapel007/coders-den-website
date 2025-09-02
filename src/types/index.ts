export interface Member {
  id: string;
  name: string;
  role: "member" | "mentor" | "admin";
  avatar: string;
  bio: string;
  techStack: string[];
  experience: "beginner" | "intermediate" | "advanced";
  joinDate: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Testimonial {
  id: string;
  memberId: string;
  member: Pick<Member, "name" | "avatar" | "role">;
  content: string;
  rating: number;
  category: "skill-improvement" | "job-placement" | "community" | "mentorship";
  date: string;
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type:
    | "class"
    | "hackathon"
    | "game-night"
    | "interview"
    | "workshop"
    | "networking";
  date: string;
  duration: number; // in minutes
  location: "online" | "in-person" | "hybrid";
  maxParticipants?: number;
  currentParticipants: number;
  techStack: string[];
  difficulty: "beginner" | "intermediate" | "advanced" | "all-levels";
  instructor?: string;
  registrationUrl?: string;
  featured: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "code-snippet" | "true-false";
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  techStack: "javascript" | "python" | "general";
  codeSnippet?: string;
  image?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number;
}

export interface RegistrationForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  yearsOfExperience: number;
  learningGoals: string[];
  currentSkills: string[];
  motivation: string;
  availability: string[];
  quizScore?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Pick<Member, "name" | "avatar">;
  publishDate: string;
  lastModified: string;
  tags: string[];
  category: "tutorial" | "news" | "career" | "technology" | "community";
  readTime: number; // in minutes
  featured: boolean;
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "general" | "partnership" | "support" | "feedback";
}

export interface SocialLink {
  platform:
    | "discord"
    | "slack"
    | "telegram"
    | "github"
    | "linkedin"
    | "twitter";
  url: string;
  label: string;
  icon: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  eventsHosted: number;
  successStories: number;
  mentorshipHours: number;
  jobPlacements: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}
