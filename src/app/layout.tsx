import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "APAS · Ayurvedic Practitioners Association Singapore",
    template: "%s · APAS",
  },
  description: "The self-regulating professional body for Ayurveda practitioners and clinics in Singapore. Public register, framework, and member portal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-palette="apas-brand" data-type="inter-serif" data-nav="segmented" data-density="comfortable">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TopBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
