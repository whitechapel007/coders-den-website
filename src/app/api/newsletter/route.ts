import {
  saveNewsletterSignup,
  validateGoogleSheetsConfig,
} from "@/lib/google-sheets";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for newsletter signup
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (!validateGoogleSheetsConfig()) {
      console.warn("Google Sheets not configured, skipping data save");
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Save to Google Sheets if configured
    if (validateGoogleSheetsConfig()) {
      try {
        await saveNewsletterSignup({
          ...validatedData,
          timestamp: new Date(),
        });
      } catch (sheetsError) {
        console.error("Failed to save to Google Sheets:", sheetsError);
        // Continue execution - don't fail the entire request if sheets fail
      }
    }

    // Here you could also:
    // - Add to email marketing platform (Mailchimp, ConvertKit, etc.)
    // - Send welcome email
    // - Add to CRM
    // - Trigger automation workflows

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        data: {
          id: `newsletter_${Date.now()}`,
          timestamp: new Date().toISOString(),
          email: validatedData.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

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
