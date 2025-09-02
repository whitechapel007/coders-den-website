# Google Sheets API Setup Guide

This guide will help you set up Google Sheets integration for your Coders Den website to automatically save form submissions.

## Prerequisites

- Google account
- Google Cloud Console access
- A Google Spreadsheet where you want to store the data

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "coders-den-website")
4. Click "Create"

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create a Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Enter a name (e.g., "sheets-api-service")
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" → "Create New Key"
5. Select "JSON" format
6. Click "Create" - this will download a JSON file

## Step 5: Set Up Your Google Spreadsheet

1. Create a new Google Spreadsheet or use an existing one
2. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
3. Share the spreadsheet with your service account:
   - Click "Share" in your spreadsheet
   - Add the service account email (from the JSON file)
   - Give it "Editor" permissions

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open the downloaded JSON file and extract these values:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

3. Update your `.env.local` file:
   ```env
   GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
   ```

   **Important**: Keep the quotes around the private key and preserve the `\n` characters.

## Step 7: Set Up Sheet Structure

The API will automatically create headers when the first submission is made. However, you can manually create sheets with these names:

### Registrations Sheet
Headers: `Timestamp`, `Full Name`, `Email`, `Phone Number`, `Years of Experience`, `Learning Goals`, `Current Skill Level`, `Preferred Learning Style`, `Availability`, `Motivation`

### Contact Forms Sheet
Headers: `Timestamp`, `Name`, `Email`, `Subject`, `Type`, `Message`

### Quiz Results Sheet
Headers: `Timestamp`, `Score`, `Time Spent (seconds)`, `Skill Level`, `Recommendations`, `Answers (JSON)`

### Newsletter Signups Sheet
Headers: `Timestamp`, `Email`, `Source`

## Step 8: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Submit a form on your website
3. Check your Google Spreadsheet to see if the data appears

## Troubleshooting

### Common Issues

1. **"Error: The caller does not have permission"**
   - Make sure you shared the spreadsheet with the service account email
   - Verify the service account has "Editor" permissions

2. **"Error: Unable to parse range"**
   - Check that your spreadsheet ID is correct
   - Ensure the sheet names match exactly

3. **"Error: Invalid credentials"**
   - Verify your private key is correctly formatted in the .env file
   - Make sure there are no extra spaces or missing characters

4. **"Error: API not enabled"**
   - Ensure Google Sheets API is enabled in your Google Cloud project

### Testing API Endpoints

You can test the API endpoints directly:

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "type": "general",
    "message": "This is a test message"
  }'
```

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your service account JSON file secure
- Consider using environment-specific service accounts for production
- Regularly rotate your service account keys

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variables to your hosting platform
2. Make sure the private key is properly escaped
3. Test the integration in your production environment

## API Endpoints

The following API endpoints are available:

- `POST /api/contact` - Contact form submissions
- `POST /api/registration` - Registration form submissions
- `POST /api/quiz-results` - Quiz results
- `POST /api/newsletter` - Newsletter subscriptions

Each endpoint validates the input data and saves it to the appropriate Google Sheets tab.
