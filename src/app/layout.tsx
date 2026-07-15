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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
