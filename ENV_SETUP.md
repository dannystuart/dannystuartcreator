# Environment Variables Configuration

## Required Environment Variables

This application requires the following environment variables to function properly:

### Newsletter Subscription (MailerLite)

```bash
MAILERLITE_API_TOKEN=your_mailerlite_api_token_here
MAILERLITE_GROUP_ID=your_group_id_here
```

**Required for:**
- Newsletter subscription functionality (`/api/subscribe` endpoint)

**How to obtain:**
1. Sign up for a [MailerLite account](https://www.mailerlite.com/)
2. Navigate to Integrations → Developer API
3. Generate an API token
4. Create a group for subscribers and copy the Group ID

---

## Setup Instructions

### 1. Create Local Environment File

```bash
# In the project root directory
touch .env.local
```

### 2. Add Your Variables

Open `.env.local` and add:

```bash
MAILERLITE_API_TOKEN=ml_xxxxxxxxxxxxxxxxxxxxx
MAILERLITE_GROUP_ID=123456789
```

### 3. Verify .gitignore

**IMPORTANT:** Never commit `.env.local` to version control!

Verify it's in `.gitignore`:
```bash
grep -q ".env" .gitignore && echo "✅ .env files are ignored" || echo "❌ Add .env* to .gitignore!"
```

---

## Production Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   - Name: `MAILERLITE_API_TOKEN`
   - Value: `your_token`
   - Environments: Production, Preview, Development

4. Redeploy your application

### Other Platforms

Consult your platform's documentation for setting environment variables:
- **Netlify**: Site settings → Build & deploy → Environment
- **Railway**: Project → Variables
- **AWS Amplify**: App settings → Environment variables

---

## Security Best Practices ✅

### ✅ DO:
- Store sensitive data in `.env.local`
- Use different values for development/production
- Rotate API keys periodically
- Limit API key permissions to minimum required

### ❌ DON'T:
- Commit `.env.local` to Git
- Share API keys in screenshots/demos
- Use production keys in development
- Hardcode secrets in source code

---

## Verification

### Check if variables are loaded:

Create a test API route (DELETE after verification):

```typescript
// src/app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasApiToken: !!process.env.MAILERLITE_API_TOKEN,
    hasGroupId: !!process.env.MAILERLITE_GROUP_ID,
  });
}
```

Visit: `http://localhost:3000/api/test-env`

Expected output:
```json
{
  "hasApiToken": true,
  "hasGroupId": true
}
```

**Remember to delete this test file before deploying!**

---

## Troubleshooting

### Variables not loading?

1. **Restart dev server** after creating/modifying `.env.local`:
```bash
# Stop server (Ctrl+C)
npm run dev
```

2. **Check file location**: `.env.local` must be in the project root, not in `src/`

3. **Check file syntax**: No quotes needed around values:
```bash
# ❌ Wrong
MAILERLITE_API_TOKEN="ml_xxx"

# ✅ Correct
MAILERLITE_API_TOKEN=ml_xxx
```

4. **Check variable names**: Must match exactly (case-sensitive)

---

## Example .env.local Template

```bash
# Newsletter Service (MailerLite)
MAILERLITE_API_TOKEN=
MAILERLITE_GROUP_ID=

# Add other services as needed
# ANALYTICS_ID=
# SENTRY_DSN=
```

Copy this template to your `.env.local` and fill in the values.
