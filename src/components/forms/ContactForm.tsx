"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  type: z.enum(["general", "partnership", "support", "feedback"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { submitContactForm } = await import("@/lib/api-client");
      const response = await submitContactForm(data);

      if (response.success) {
        console.log("Contact form submitted successfully:", response.data);
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could show an error message to the user here
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Message sent successfully!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
        <Button
          className="mt-6"
          onClick={() => setIsSubmitted(false)}
          variant="outline"
        >
          Send another message
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Your full name"
        />

        <Input
          label="Email Address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Inquiry Type
        </label>
        <select
          {...register("type")}
          className="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {contactTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      <Input
        label="Subject"
        {...register("subject")}
        error={errors.subject?.message}
        placeholder="Brief description of your inquiry"
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={6}
          className="flex min-h-[120px] w-full rounded-lg border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          placeholder="Tell us more about your inquiry..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our privacy policy and terms of
        service.
      </p>
    </form>
  );
}
