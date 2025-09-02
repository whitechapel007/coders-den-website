import {
  saveContactFormData,
  validateGoogleSheetsConfig,
} from "@/lib/google-sheets";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  type: z.enum(["general", "partnership", "support", "feedback"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (!validateGoogleSheetsConfig()) {
      console.warn("Google Sheets not configured, skipping data save");
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Save to Google Sheets if configured
    if (validateGoogleSheetsConfig()) {
      try {
        await saveContactFormData({
          ...validatedData,
          timestamp: new Date(),
        });
      } catch (sheetsError) {
        console.error("Failed to save to Google Sheets:", sheetsError);
        // Continue execution - don't fail the entire request if sheets fail
      }
    }

    // Here you could also:
    // - Send email notifications
    // - Save to database
    // - Trigger webhooks
    // - Send to CRM systems

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        data: {
          id: `contact_${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
