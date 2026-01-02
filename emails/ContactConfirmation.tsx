import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactConfirmationEmailProps {
  name: string;
  weddingDate?: string;
  venue?: string;
}

export default function ContactConfirmationEmail({
  name = "Beautiful Couple",
  weddingDate,
  venue,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for reaching out to Wedding Agency San Diego! We&apos;ve received your message.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>
              Wedding Agency <span style={logoAccent}>San Diego</span>
            </Text>
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"
              alt="Beautiful wedding ceremony"
              width="100%"
              height="200"
              style={heroImage}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>
              Thank You, {name.split(" ")[0]}! 💕
            </Heading>

            <Text style={paragraph}>
              We&apos;re thrilled that you&apos;ve reached out to us! Your message has been received, 
              and our team is excited to learn more about your wedding vision.
            </Text>

            <Text style={paragraph}>
              One of our wedding specialists will be in touch within 24-48 hours to discuss 
              how we can help make your special day absolutely perfect.
            </Text>

            {(weddingDate || venue) && (
              <Section style={detailsBox}>
                <Text style={detailsHeading}>Your Wedding Details</Text>
                {weddingDate && (
                  <Text style={detailsText}>
                    <strong>Date:</strong> {weddingDate}
                  </Text>
                )}
                {venue && (
                  <Text style={detailsText}>
                    <strong>Venue/Location:</strong> {venue}
                  </Text>
                )}
              </Section>
            )}

            <Text style={paragraph}>
              In the meantime, feel free to explore our portfolio and get inspired!
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Link href="https://weddingagencysandiego.com/portfolio" style={button}>
                View Our Portfolio
              </Link>
            </Section>
          </Section>

          {/* Divider */}
          <Hr style={divider} />

          {/* What's Next Section */}
          <Section style={content}>
            <Heading as="h2" style={subheading}>
              What Happens Next?
            </Heading>

            <Section style={stepContainer}>
              <Text style={stepNumber}>1</Text>
              <Text style={stepText}>
                <strong>We Review Your Inquiry</strong>
                <br />
                Our team carefully reviews your message and wedding details.
              </Text>
            </Section>

            <Section style={stepContainer}>
              <Text style={stepNumber}>2</Text>
              <Text style={stepText}>
                <strong>Personal Consultation</strong>
                <br />
                We&apos;ll schedule a complimentary consultation call or meeting.
              </Text>
            </Section>

            <Section style={stepContainer}>
              <Text style={stepNumber}>3</Text>
              <Text style={stepText}>
                <strong>Custom Proposal</strong>
                <br />
                Receive a tailored package designed for your unique celebration.
              </Text>
            </Section>
          </Section>

          {/* Quote Section */}
          <Section style={quoteSection}>
            <Text style={quote}>
              &ldquo;Every love story deserves its own chapter.&rdquo;
            </Text>
            <Text style={quoteAuthor}>— Wedding Agency San Diego</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerLogo}>
              Wedding Agency <span style={logoAccent}>San Diego</span>
            </Text>
            <Text style={footerText}>
              San Diego, CA
              <br />
              +1 (760) 216-7427
            </Text>
            <Section style={socialLinks}>
              <Link href="#" style={socialLink}>Instagram</Link>
              <Text style={socialDivider}>•</Text>
              <Link href="#" style={socialLink}>Facebook</Link>
            </Section>
            <Text style={footerSmall}>
              © {new Date().getFullYear()} Wedding Agency San Diego. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles matching the site's theme
const main = {
  backgroundColor: "#FAF9F7", // cream-50
  fontFamily:
    '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
};

const header = {
  backgroundColor: "#2D2D2D", // charcoal-900
  padding: "24px 32px",
  textAlign: "center" as const,
};

const logoText = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  fontFamily: '"Playfair Display", Georgia, serif',
  margin: "0",
};

const logoAccent = {
  color: "#E8B4B8", // blush-400
};

const heroSection = {
  padding: "0",
};

const heroImage = {
  objectFit: "cover" as const,
  width: "100%",
  height: "200px",
};

const content = {
  padding: "32px",
};

const heading = {
  color: "#2D2D2D", // charcoal-900
  fontSize: "28px",
  fontWeight: "500",
  fontFamily: '"Playfair Display", Georgia, serif',
  textAlign: "center" as const,
  margin: "0 0 24px 0",
};

const subheading = {
  color: "#2D2D2D",
  fontSize: "20px",
  fontWeight: "500",
  fontFamily: '"Playfair Display", Georgia, serif',
  margin: "0 0 20px 0",
};

const paragraph = {
  color: "#4A4A4A", // charcoal-700
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const detailsBox = {
  backgroundColor: "#FAF9F7", // cream-50
  borderLeft: "4px solid #E8B4B8", // blush-400
  padding: "16px 20px",
  margin: "24px 0",
  borderRadius: "0 8px 8px 0",
};

const detailsHeading = {
  color: "#2D2D2D",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  margin: "0 0 12px 0",
};

const detailsText = {
  color: "#4A4A4A",
  fontSize: "15px",
  margin: "0 0 8px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#2D2D2D", // charcoal-900
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "12px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  display: "inline-block",
};

const divider = {
  borderTop: "1px solid #E5E5E5",
  margin: "0",
};

const stepContainer = {
  display: "flex",
  marginBottom: "16px",
};

const stepNumber = {
  backgroundColor: "#E8B4B8", // blush-400
  color: "#ffffff",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  textAlign: "center" as const,
  lineHeight: "28px",
  fontSize: "14px",
  fontWeight: "600",
  marginRight: "16px",
  flexShrink: 0,
};

const stepText = {
  color: "#4A4A4A",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0",
};

const quoteSection = {
  backgroundColor: "#2D2D2D", // charcoal-900
  padding: "32px",
  textAlign: "center" as const,
};

const quote = {
  color: "#E5E5E5",
  fontSize: "20px",
  fontStyle: "italic",
  fontFamily: '"Playfair Display", Georgia, serif',
  margin: "0 0 8px 0",
};

const quoteAuthor = {
  color: "#E8B4B8", // blush-400
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const footer = {
  backgroundColor: "#FAF9F7", // cream-50
  padding: "32px",
  textAlign: "center" as const,
};

const footerLogo = {
  color: "#2D2D2D",
  fontSize: "18px",
  fontWeight: "700",
  fontFamily: '"Playfair Display", Georgia, serif',
  margin: "0 0 12px 0",
};

const footerText = {
  color: "#6B6B6B",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const socialLinks = {
  margin: "16px 0",
};

const socialLink = {
  color: "#E8B4B8",
  fontSize: "14px",
  textDecoration: "none",
};

const socialDivider = {
  color: "#CCCCCC",
  margin: "0 8px",
  display: "inline",
};

const footerSmall = {
  color: "#999999",
  fontSize: "12px",
  margin: "16px 0 0 0",
};

