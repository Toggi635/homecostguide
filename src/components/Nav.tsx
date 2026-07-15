"use client";

import Link from "next/link";
import { useState } from "react";
import { pillars } from "@/lib/content";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            HomeCostGuide
          </Link>
          <button
            className="md:hidden p-2 text-gray-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md hover:bg-gray-50">
              Home
            </Link>
            {pillars.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}/`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md hover:bg-gray-50 whitespace-nowrap"
              >
                {p.name}
              </Link>
            ))}
            <Link href="/calculators/" className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md hover:bg-gray-50">
              Calculators
            </Link>
            <Link href="/about/" className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md hover:bg-gray-50">
              About
            </Link>
          </nav>
        </div>
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100 pt-2">
            <Link href="/" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setMobileOpen(false)}>Home</Link>
            {pillars.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setMobileOpen(false)}>{p.name}</Link>
            ))}
            <Link href="/calculators/" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setMobileOpen(false)}>Calculators</Link>
            <Link href="/about/" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setMobileOpen(false)}>About</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
