"use client";

import Link from "next/link";
import { useState } from "react";
import { pillars } from "@/lib/content";
import { Home, Calculator, Menu, X } from "lucide-react";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-serif font-semibold text-ink text-lg">
            <span className="bg-rust text-white rounded-lg p-1.5">
              <Home size={18} />
            </span>
            HomeCostGuide
          </Link>
          <button
            className="lg:hidden p-3 text-muted hover:text-rust transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden lg:flex items-center gap-0 lg:gap-1">
            <Link href="/" className="px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-ink/70 hover:text-rust transition-colors">
              Home
            </Link>
            {pillars.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}/`}
                className="px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-ink/70 hover:text-rust transition-colors whitespace-nowrap"
              >
                {p.name}
              </Link>
            ))}
            <Link href="/calculators/" className="px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-ink/70 hover:text-rust transition-colors">
              <span className="inline-flex items-center gap-1"><Calculator size={14} />Calculators</span>
            </Link>
            <Link href="/about/" className="px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-ink/70 hover:text-rust transition-colors">
              About
            </Link>
          </nav>
        </div>
        {mobileOpen && (
          <nav id="mobile-nav-panel" className="lg:hidden pb-4 border-t border-line pt-2">
            <Link href="/" className="block px-3 py-3 text-sm text-ink/70 hover:text-rust transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
            {pillars.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} className="block px-3 py-3 text-sm text-ink/70 hover:text-rust transition-colors" onClick={() => setMobileOpen(false)}>{p.name}</Link>
            ))}
            <Link href="/calculators/" className="block px-3 py-3 text-sm text-ink/70 hover:text-rust transition-colors" onClick={() => setMobileOpen(false)}>Calculators</Link>
            <Link href="/about/" className="block px-3 py-3 text-sm text-ink/70 hover:text-rust transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
