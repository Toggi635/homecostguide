import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/content";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "All Cost Calculators & Tools",
  description: "Browse all free home improvement cost calculators and interactive tools from HomeCostGuide.",
};

export default function CalculatorsPage() {
  const calculatorArticles = articles.filter((a) => a.format === "calculator");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-rust/10 text-rust-dark">
          <Calculator size={22} />
        </span>
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">All Cost Calculators & Tools</h1>
          <p className="text-muted mt-1">Use our free interactive calculators to get personalized cost estimates for your home improvement projects.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {calculatorArticles.map((a) => (
          <Link
            key={a.id}
            href={`/${a.pillar}/${a.slug}/`}
            className="block bg-white border border-line rounded-card p-5 shadow-soft transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5 hover:border-rust/40"
          >
            <h2 className="font-serif font-medium text-sm text-ink mb-1">{a.title}</h2>
            <p className="text-xs text-muted">{a.targetKeyword}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
