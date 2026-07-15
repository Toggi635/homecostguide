import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Cost Calculators & Tools",
  description: "Browse all free home improvement cost calculators and interactive tools from HomeCostGuide.",
};

export default function CalculatorsPage() {
  const calculatorArticles = articles.filter((a) => a.format === "calculator");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">All Cost Calculators & Tools</h1>
      <p className="text-gray-500 mb-8">
        Use our free interactive calculators to get personalized cost estimates for your home improvement projects.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {calculatorArticles.map((a) => (
          <Link
            key={a.id}
            href={`/${a.pillar}/${a.slug}/`}
            className="block border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <h2 className="font-medium text-sm mb-1">{a.title}</h2>
            <p className="text-xs text-gray-400">{a.targetKeyword}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
