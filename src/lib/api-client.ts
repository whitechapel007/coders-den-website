import axios, { AxiosError, AxiosResponse } from "axios";

// API client utilities for form submissions

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  data?: unknown,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST"
): Promise<ApiResponse<T>> {
  try {
    let response: AxiosResponse<ApiResponse<T>>;

    switch (method) {
      case "POST":
        response = await apiClient.post(endpoint, data);
        break;
      case "PUT":
        response = await apiClient.put(endpoint, data);
        break;
      case "DELETE":
        response = await apiClient.delete(endpoint);
        break;
      default:
        response = await apiClient.get(endpoint);
    }

    const result = response.data;

    if (!result.success) {
      throw new ApiError(
        result.message || "An error occurred",
        response.status,
        result.errors
      );
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorData = axiosError.response?.data;

      throw new ApiError(
        errorData?.message || axiosError.message || "Network error occurred",
        axiosError.response?.status || 0,
        errorData?.errors
      );
    }

    // Other errors
    console.error(`API call to ${endpoint} failed:`, error);
    throw new ApiError("An unexpected error occurred", 0);
  }
}

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  type: "general" | "partnership" | "support" | "feedback";
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  return apiCall<{
    id: string;
    timestamp: string;
  }>("/api/contact", data);
}

// Registration form submission
export interface RegistrationFormData {
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

export async function submitRegistrationForm(data: RegistrationFormData) {
  return apiCall<{
    id: string;
    timestamp: string;
    nextSteps: string[];
  }>("/api/registration", data);
}

// Quiz results submission
export interface QuizResultsData {
  answers: Record<string, unknown>;
  score: number;
  timeSpent: number;
  skillLevel?: string;
  recommendations?: string[];
}

export async function submitQuizResults(data: QuizResultsData) {
  return apiCall<{
    id: string;
    timestamp: string;
    score: number;
    skillLevel: string;
    recommendations: string[];
    timeSpent: number;
  }>("/api/quiz-results", data);
}

// Newsletter subscription
export interface NewsletterData {
  email: string;
  source?: string;
}

export async function subscribeToNewsletter(data: NewsletterData) {
  return apiCall<{
    id: string;
    timestamp: string;
    email: string;
  }>("/api/newsletter", data);
}

// Error handling utilities - already defined above

// Retry mechanism for failed requests
export async function apiCallWithRetry<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  maxRetries = 3,
  delay = 1000
): Promise<ApiResponse<T>> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiFunction();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
}

// Form validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

// Rate limiting helper
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  canMakeRequest(key: string, maxRequests = 5, windowMs = 60000): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
