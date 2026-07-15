import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, organizationSchema } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HomeCostGuide – Real Home Improvement Cost Guides",
    template: "%s | HomeCostGuide",
  },
  description:
    "Get accurate, up-to-date home improvement cost guides. Roofing, HVAC, plumbing, electrical, remodeling, and maintenance costs with free calculators.",
  openGraph: {
    type: "website",
    siteName: "HomeCostGuide",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const isRealAdsenseId = adsenseId && adsenseId !== "ca-pub-0000000000000000";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {isRealAdsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans bg-paper text-ink`}>
        <JsonLd data={organizationSchema} />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
