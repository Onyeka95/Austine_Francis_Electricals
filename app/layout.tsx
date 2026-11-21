import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";

// Heading font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Needed so relative image paths become full web addresses in link previews.
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Electrician in Onitsha, Anambra State`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Electrician in Onitsha`,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/images/hero/hero.jpg",
        width: 1920,
        height: 1080,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Electrician in Onitsha`,
    description: siteConfig.description,
    images: ["/images/hero/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Lets keyboard users skip the navbar */}
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand-amber focus:px-4 focus:py-2 focus:text-brand-navy"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}