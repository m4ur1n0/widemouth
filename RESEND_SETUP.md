# Resend Email Setup for Contact Form

The contact form (`/contact`) uses [Resend](https://resend.com) to send emails. Follow these steps to configure it.

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Free tier includes: 100 emails/day, 3,000 emails/month (perfect for contact forms)

## 2. Get Your API Key

1. In the Resend dashboard, navigate to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Widemouth Contact Form")
4. Copy the API key (starts with `re_...`)

## 3. Add Environment Variables

Add these to your `.env.local` file:

```bash
# Resend API Key (required)
RESEND_API_KEY="re_your_api_key_here"

# From email address (optional - defaults to onboarding@resend.dev for testing)
RESEND_FROM_EMAIL="contact@yourdomain.com"
```

**Note:** During development/testing, you can use Resend's default onboarding sender (`onboarding@resend.dev`). For production, you should verify your domain.

## 4. Domain Verification (Production Only)

To send from your own domain (e.g., `contact@widemouth.com`), you need to verify it:

### Steps:
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `widemouth.com`)
4. Resend will provide DNS records to add:
   - **SPF record** (TXT)
   - **DKIM record** (TXT)
   - **DMARC record** (TXT) - optional but recommended

### Add DNS Records:
5. Log into your DNS provider (Cloudflare, Namecheap, etc.)
6. Add the DNS records provided by Resend
7. Wait for DNS propagation (5-30 minutes)
8. Return to Resend and click **Verify Domain**

### Update Environment Variable:
9. Once verified, update `.env.local`:
   ```bash
   RESEND_FROM_EMAIL="contact@widemouth.com"
   ```

## 5. Configure Recipient Email in Sanity

The recipient email (where contact form messages are sent) is stored in Sanity:

1. Go to your Sanity Studio (http://localhost:3333/studio or your production studio URL)
2. Navigate to **Site Settings**
3. Fill in the **Email for Contact Us** field
4. Click **Publish**

## 6. Test the Contact Form

1. Start your dev server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check the recipient email inbox

## Rate Limiting

The API includes basic in-memory rate limiting:
- **5 emails per hour per IP address**
- Resets on server restart
- For production, consider Redis-based rate limiting

## Anti-Spam Protection

- **Honeypot field**: Hidden `company` field catches bots
- **Rate limiting**: Prevents abuse
- **Server-side validation**: All fields validated before sending

## Troubleshooting

### "Email service is not configured"
- Check that `RESEND_API_KEY` is set in `.env.local`
- Restart your dev server after adding env vars

### "Contact form is not configured"
- Ensure `email` field is set in Sanity Site Settings
- Check that the email is published (not just saved as draft)

### Emails not arriving
- Check spam folder
- Verify your domain is properly configured in Resend
- Check Resend dashboard logs for delivery status
- Ensure `RESEND_FROM_EMAIL` uses a verified domain

### "Too many requests"
- Wait 1 hour or restart the server (resets in-memory rate limit)
- For production, implement persistent rate limiting

## API Endpoint

**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "Optional Name",
  "email": "sender@example.com",
  "subject": "Subject line",
  "message": "Message content"
}
```

**Response:**
```json
{
  "ok": true
}
```

**Error Response:**
```json
{
  "ok": false,
  "error": "Error message"
}
```
