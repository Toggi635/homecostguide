import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HomeCostGuide – Real Home Improvement Cost Guides",
    template: "%s | HomeCostGuide",
  },
  description:
    "Get accurate, up-to-date home improvement cost guides. Roofing, HVAC, plumbing, electrical, remodeling, and maintenance costs with free calculators.",
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
      <body className={inter.className}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
