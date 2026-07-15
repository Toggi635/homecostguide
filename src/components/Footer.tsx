import Link from "next/link";
import { pillars } from "@/lib/content";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-muted mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-serif font-semibold text-white text-lg mb-4">
              <span className="bg-rust text-white rounded-lg p-1.5">
                <Home size={16} />
              </span>
              HomeCostGuide
            </Link>
            <p className="text-sm text-muted">
              Real home improvement costs, pricing guides, and calculators to help you budget with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Cost Guides</h4>
            <ul className="space-y-2">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}/`} className="text-sm hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/calculators/" className="text-sm hover:text-white transition-colors">All Calculators</Link></li>
              <li><Link href="/methodology/" className="text-sm hover:text-white transition-colors">How We Calculate Costs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">About</h4>
            <ul className="space-y-2">
              <li><Link href="/about/" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/editorial-guidelines/" className="text-sm hover:text-white transition-colors">Editorial Guidelines</Link></li>
              <li><Link href="/contact/" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy/" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="text-sm hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} HomeCostGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
