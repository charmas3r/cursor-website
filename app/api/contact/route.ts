import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import ContactConfirmationEmail from "@/emails/ContactConfirmation";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  date?: string;
  venue?: string;
  message?: string;
  website?: string; // Honeypot field - should be empty
  recaptchaToken?: string;
}

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

// Minimum score threshold (0.0 - 1.0, higher = more likely human)
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured first
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    // Initialize Resend client inside the handler (not at module level)
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body: ContactFormData = await request.json();
    const { name, email, phone, date, venue, message, website, recaptchaToken } = body;

    // Honeypot check - if the hidden field has a value, it's likely a bot
    // Return fake success to not tip off the bot
    if (website) {
      console.log("Honeypot triggered - likely bot submission blocked");
      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // reCAPTCHA v3 verification
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        const recaptchaResponse = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              secret: process.env.RECAPTCHA_SECRET_KEY,
              response: recaptchaToken,
            }),
          }
        );

        const recaptchaResult: RecaptchaResponse = await recaptchaResponse.json();

        if (!recaptchaResult.success) {
          console.log("reCAPTCHA verification failed:", recaptchaResult["error-codes"]);
          return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
          );
        }

        if (recaptchaResult.score !== undefined && recaptchaResult.score < RECAPTCHA_SCORE_THRESHOLD) {
          console.log(`reCAPTCHA score too low: ${recaptchaResult.score} (threshold: ${RECAPTCHA_SCORE_THRESHOLD})`);
          return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
          );
        }

        // Verify the action matches what we expect
        if (recaptchaResult.action !== "contact_form") {
          console.log(`reCAPTCHA action mismatch: expected "contact_form", got "${recaptchaResult.action}"`);
          return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
          );
        }

        console.log(`reCAPTCHA passed - score: ${recaptchaResult.score}`);
      } catch (recaptchaError) {
        console.error("reCAPTCHA verification error:", recaptchaError);
        // Continue processing - don't block if reCAPTCHA service is down
      }
    } else if (!recaptchaToken) {
      console.log("No reCAPTCHA token provided - relying on honeypot only");
    }

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Format the wedding date for display
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : undefined;

    // Render the email template to HTML
    const emailHtml = await render(
      ContactConfirmationEmail({
        name,
        weddingDate: formattedDate,
        venue,
      })
    );

    // Send confirmation email to the customer
    const { error: customerEmailError } = await resend.emails.send({
      from: "Wedding Agency San Diego <hello@updates.weddingagencysandiego.com>",
      to: email,
      subject: "Thank You for Contacting Wedding Agency San Diego! 💕",
      html: emailHtml,
    });

    if (customerEmailError) {
      console.error("Error sending customer email:", customerEmailError);
      return NextResponse.json(
        { error: customerEmailError.message || "Failed to send confirmation email" },
        { status: 500 }
      );
    }

    // Send notification email to the business (optional - don't fail if this doesn't work)
    try {
      await resend.emails.send({
        from: "Wedding Agency San Diego <hello@updates.weddingagencysandiego.com>",
        to: "nicole@weddingagencysandiego.com", // Business notification email
        replyTo: email,
        subject: `New Wedding Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Wedding Date:</strong> ${formattedDate || "Not specified"}</p>
          <p><strong>Venue/Location:</strong> ${venue || "Not specified"}</p>
          <h3>Message:</h3>
          <p>${message || "No message provided"}</p>
        `,
      });
    } catch (businessEmailErr) {
      console.error("Error sending business notification:", businessEmailErr);
      // Don't fail the request if business email fails
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
