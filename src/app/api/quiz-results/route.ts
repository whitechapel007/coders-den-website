import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveQuizResultsData, validateGoogleSheetsConfig } from '@/lib/google-sheets';

// Validation schema for quiz results
const quizResultsSchema = z.object({
  answers: z.record(z.unknown()),
  score: z.number().min(0).max(100),
  timeSpent: z.number().min(0),
  skillLevel: z.string().optional(),
  recommendations: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (!validateGoogleSheetsConfig()) {
      console.warn('Google Sheets not configured, skipping data save');
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = quizResultsSchema.parse(body);

    // Determine skill level based on score if not provided
    let skillLevel = validatedData.skillLevel;
    if (!skillLevel) {
      if (validatedData.score >= 80) {
        skillLevel = 'Advanced';
      } else if (validatedData.score >= 60) {
        skillLevel = 'Intermediate';
      } else {
        skillLevel = 'Beginner';
      }
    }

    // Generate recommendations based on score and answers
    let recommendations = validatedData.recommendations;
    if (!recommendations) {
      recommendations = generateRecommendations(validatedData.score, validatedData.answers);
    }

    // Save to Google Sheets if configured
    if (validateGoogleSheetsConfig()) {
      try {
        await saveQuizResultsData({
          ...validatedData,
          skillLevel,
          recommendations,
          timestamp: new Date(),
        });
      } catch (sheetsError) {
        console.error('Failed to save to Google Sheets:', sheetsError);
        // Continue execution - don't fail the entire request if sheets fail
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Quiz results saved successfully',
        data: {
          id: `quiz_${Date.now()}`,
          timestamp: new Date().toISOString(),
          score: validatedData.score,
          skillLevel,
          recommendations,
          timeSpent: validatedData.timeSpent,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Quiz results submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Generate recommendations based on quiz performance
function generateRecommendations(score: number, answers: Record<string, unknown>): string[] {
  const recommendations: string[] = [];

  if (score < 40) {
    recommendations.push('Start with JavaScript fundamentals course');
    recommendations.push('Practice basic programming concepts daily');
    recommendations.push('Join beginner study groups');
  } else if (score < 70) {
    recommendations.push('Focus on intermediate JavaScript concepts');
    recommendations.push('Build small projects to practice');
    recommendations.push('Learn about modern ES6+ features');
  } else {
    recommendations.push('Explore advanced JavaScript patterns');
    recommendations.push('Learn a modern framework (React, Vue, or Angular)');
    recommendations.push('Consider contributing to open source projects');
  }

  // Add specific recommendations based on weak areas
  // This would be customized based on your quiz structure
  
  return recommendations;
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
