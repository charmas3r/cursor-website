import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Agency San Diego | Your Happily Ever After Starts Here",
  description:
    "Where creativity, passion, and attention to detail come together to craft unforgettable weddings. Nestled in the heart of Southern California, we specialize in transforming your unique vision into a beautifully tailored celebration.",
  keywords: [
    "wedding planner San Diego",
    "wedding coordinator",
    "Southern California weddings",
    "beachfront ceremony",
    "desert wedding",
    "San Diego wedding agency",
  ],
  openGraph: {
    title: "Wedding Agency San Diego | Your Happily Ever After Starts Here",
    description:
      "Where creativity, passion, and attention to detail come together to craft unforgettable weddings in Southern California.",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

