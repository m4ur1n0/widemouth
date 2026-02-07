import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_CONTACT_QUERY } from "@/sanity/lib/queries";

// Lazy initialize Resend to avoid build-time errors when API key is not set
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  if (!resend) {
    throw new Error("Resend is not configured");
  }
  return resend;
}

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 emails per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message, company } = body;

    // Honeypot check
    if (company) {
      console.log("Honeypot triggered - likely spam");
      return NextResponse.json(
        { ok: false, error: "Invalid submission." },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Subject is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Message is required." },
        { status: 400 }
      );
    }

    // Length limits
    if (subject.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Subject is too long (max 200 characters)." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long (max 5000 characters)." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Fetch recipient email from Sanity
    const settings = await sanityFetch({
      query: SITE_SETTINGS_CONTACT_QUERY,
      revalidate: 300, // Cache for 5 minutes
    });

    if (!settings?.email) {
      console.error("No recipient email configured in Sanity");
      return NextResponse.json(
        { ok: false, error: "Contact form is not configured. Please try again later." },
        { status: 500 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { ok: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    // Send email via Resend
    // Note: Update 'from' address once domain is verified in Resend
    // For now, using Resend's onboarding sender (onboarding@resend.dev works during testing)
    const emailContent = `
New contact form submission from Widemouth website

From: ${name || "Anonymous"} (${email})
Subject: ${subject}

Message:
${message}

---
Reply to this email to respond directly to ${email}
    `.trim();

    const data = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: settings.email,
      replyTo: email,
      subject: `[Widemouth Contact] ${subject}`,
      text: emailContent,
    });

    console.log("Email sent successfully:", data);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
