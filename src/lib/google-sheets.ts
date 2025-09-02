import { google } from "googleapis";

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
  // These should be set in your environment variables
  PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID,
};

// Sheet names for different types of data
export const SHEET_NAMES = {
  REGISTRATIONS: "Registrations",
  CONTACT_FORMS: "Contact Forms",
  QUIZ_RESULTS: "Quiz Results",
  NEWSLETTER_SIGNUPS: "Newsletter Signups",
} as const;

// Initialize Google Sheets API
async function getGoogleSheetsInstance() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: GOOGLE_SHEETS_CONFIG.PRIVATE_KEY,
        client_email: GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
  } catch (error) {
    console.error("Failed to initialize Google Sheets:", error);
    throw new Error("Google Sheets initialization failed");
  }
}

// Function to create a new sheet if it doesn't exist
export async function createSheetIfNotExists(sheetName: string) {
  try {
    const sheets = await getGoogleSheetsInstance();

    // Get spreadsheet metadata to check if sheet exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === sheetName
    );

    if (!sheetExists) {
      console.log(`Creating new sheet: ${sheetName}`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            },
          ],
        },
      });
      console.log(`Successfully created sheet: ${sheetName}`);
    }
  } catch (error) {
    console.error(`Failed to create sheet ${sheetName}:`, error);
    // Don't throw - let the append operation handle the error
  }
}

// Generic function to append data to a sheet
export async function appendToSheet(
  sheetName: string,
  values: (string | number | boolean)[][]
) {
  try {
    const sheets = await getGoogleSheetsInstance();

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(`Failed to append data to sheet ${sheetName}:`, error);

    // If sheet doesn't exist, try to create it and retry
    if (error?.code === 400 || error?.status === 400) {
      try {
        await createSheetIfNotExists(sheetName);
        // Retry the append operation
        const sheets = await getGoogleSheetsInstance();
        const retryResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
          range: `${sheetName}!A:Z`,
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values,
          },
        });
        return retryResponse.data;
      } catch (retryError) {
        console.error(`Failed to create sheet and retry append:`, retryError);
        throw retryError;
      }
    }

    throw error;
  }
}

// Function to create headers if sheet is empty
export async function ensureSheetHeaders(sheetName: string, headers: string[]) {
  try {
    const sheets = await getGoogleSheetsInstance();

    // Check if sheet has data - use A1:Z1 range instead
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: `${sheetName}!A1:Z1`,
    });

    // If no data or empty, add headers
    if (!response.data.values || response.data.values.length === 0) {
      await appendToSheet(sheetName, [headers]);
    }
  } catch (error: any) {
    console.error(`Failed to ensure headers for sheet ${sheetName}:`, error);

    // If the sheet doesn't exist, try to create it by adding headers
    if (error?.code === 400 || error?.status === 400) {
      console.log(
        `Sheet ${sheetName} might not exist, attempting to create it...`
      );
      try {
        await appendToSheet(sheetName, [headers]);
        console.log(`Successfully created sheet ${sheetName} with headers`);
      } catch (createError) {
        console.error(`Failed to create sheet ${sheetName}:`, createError);
        // Don't throw here - let the registration continue without sheets
      }
    }
  }
}

// Registration data handler
export async function saveRegistrationData(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  yearsOfExperience: number;
  learningGoals: string[];
  currentSkills: string[];
  motivation: string;
  availability: string[];
  quizScore?: number;
  timestamp?: Date;
}) {
  const headers = [
    "Timestamp",
    "Full Name",
    "Email",
    "Phone Number",
    "Years of Experience",
    "Learning Goals",
    "Current Skills",
    "Availability",
    "Motivation",
    "Quiz Score",
  ];

  await ensureSheetHeaders(SHEET_NAMES.REGISTRATIONS, headers);

  const values = [
    data.timestamp?.toISOString() || new Date().toISOString(),
    data.fullName,
    data.email,
    data.phoneNumber,
    data.yearsOfExperience,
    data.learningGoals.join(", "),
    data.currentSkills.join(", "),
    data.availability.join(", "),
    data.motivation,
    data.quizScore || "",
  ];

  return await appendToSheet(SHEET_NAMES.REGISTRATIONS, [values]);
}

// Contact form data handler
export async function saveContactFormData(data: {
  name: string;
  email: string;
  subject: string;
  type: string;
  message: string;
  timestamp?: Date;
}) {
  const headers = ["Timestamp", "Name", "Email", "Subject", "Type", "Message"];

  await ensureSheetHeaders(SHEET_NAMES.CONTACT_FORMS, headers);

  const values = [
    data.timestamp?.toISOString() || new Date().toISOString(),
    data.name,
    data.email,
    data.subject,
    data.type,
    data.message,
  ];

  return await appendToSheet(SHEET_NAMES.CONTACT_FORMS, [values]);
}

// Quiz results data handler
export async function saveQuizResultsData(data: {
  answers: Record<string, unknown>;
  score: number;
  timeSpent: number;
  skillLevel?: string;
  recommendations?: string[];
  timestamp?: Date;
}) {
  const headers = [
    "Timestamp",
    "Score",
    "Time Spent (seconds)",
    "Skill Level",
    "Recommendations",
    "Answers (JSON)",
  ];

  await ensureSheetHeaders(SHEET_NAMES.QUIZ_RESULTS, headers);

  const values = [
    data.timestamp?.toISOString() || new Date().toISOString(),
    data.score,
    data.timeSpent,
    data.skillLevel || "",
    data.recommendations?.join(", ") || "",
    JSON.stringify(data.answers),
  ];

  return await appendToSheet(SHEET_NAMES.QUIZ_RESULTS, [values]);
}

// Newsletter signup handler
export async function saveNewsletterSignup(data: {
  email: string;
  source?: string;
  timestamp?: Date;
}) {
  const headers = ["Timestamp", "Email", "Source"];

  await ensureSheetHeaders(SHEET_NAMES.NEWSLETTER_SIGNUPS, headers);

  const values = [
    data.timestamp?.toISOString() || new Date().toISOString(),
    data.email,
    data.source || "Website",
  ];

  return await appendToSheet(SHEET_NAMES.NEWSLETTER_SIGNUPS, [values]);
}

// Utility function to validate Google Sheets configuration
export function validateGoogleSheetsConfig(): boolean {
  return !!(
    GOOGLE_SHEETS_CONFIG.PRIVATE_KEY &&
    GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL &&
    GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID
  );
}
