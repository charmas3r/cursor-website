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
}

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
    const { name, email, phone, date, venue, message } = body;

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
        to: "evansmith0115@gmail.com", // Business notification email (testing)
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
