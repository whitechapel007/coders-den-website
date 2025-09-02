import {
  saveRegistrationData,
  validateGoogleSheetsConfig,
} from "@/lib/google-sheets";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for registration form
const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  yearsOfExperience: z.number().min(0).max(50),
  learningGoals: z
    .array(z.string())
    .min(1, "Please select at least one learning goal"),
  currentSkills: z
    .array(z.string())
    .min(1, "Please select at least one current skill"),
  motivation: z
    .string()
    .min(
      50,
      "Please tell us more about your motivation (at least 50 characters)"
    ),
  availability: z
    .array(z.string())
    .min(1, "Please select at least one availability option"),
  quizScore: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (!validateGoogleSheetsConfig()) {
      console.warn("Google Sheets not configured, skipping data save");
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);

    // Save to Google Sheets if configured
    if (validateGoogleSheetsConfig()) {
      try {
        await saveRegistrationData({
          ...validatedData,
          timestamp: new Date(),
        });
        console.log("Successfully saved registration to Google Sheets");
      } catch (sheetsError) {
        console.error("Failed to save to Google Sheets:", sheetsError);
        // Continue execution - don't fail the entire request if sheets fail
        // This allows the registration to succeed even if Google Sheets is misconfigured
      }
    } else {
      console.log("Google Sheets not configured - skipping data save");
    }

    // Here you could also:
    // - Send welcome email
    // - Add to mailing list
    // - Create user account
    // - Send to CRM
    // - Trigger onboarding workflow

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully",
        data: {
          id: `reg_${Date.now()}`,
          timestamp: new Date().toISOString(),
          nextSteps: [
            "Check your email for confirmation",
            "Join our Discord community",
            "Complete the skill assessment quiz",
          ],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration submission error:", error);

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
