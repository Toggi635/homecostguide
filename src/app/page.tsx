import Link from "next/link";
import PillarCard from "@/components/PillarCard";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import { pillars, getArticlesByTier } from "@/lib/content";

export default function HomePage() {
  const topArticles = getArticlesByTier("A");

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HomeCostGuide",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://homecostguide.com",
    description: "Get accurate, up-to-date home improvement cost guides with free calculators.",
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: topArticles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://homecostguide.com"}/${a.pillar}/${a.slug}/`,
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <JsonLd data={websiteSchema} />
      <JsonLd data={itemListSchema} />

      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Know What Home Projects Really Cost
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          Transparent, researched pricing guides for roofing, HVAC, plumbing, electrical, remodeling, and home maintenance. No guesswork.
        </p>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="e.g., cost to replace a roof..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
            readOnly
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Home Maintenance Cost Calculator</h2>
          <p className="text-blue-100 mb-4">Plan your annual home maintenance budget with our flagship calculator.</p>
          <Link
            href="/home-maintenance/annual-home-maintenance-cost-calculator/"
            className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Try the Calculator
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <PillarCard key={p.slug} slug={p.slug} name={p.name} description={p.description} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Most Searched Cost Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topArticles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <section className="mb-12 bg-gray-50 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">How We Calculate Costs</h2>
        <p className="text-sm text-gray-500 mb-4">
          Our cost data comes from industry databases, contractor surveys, and published averages from trusted home-service aggregators. We update our guides annually.
        </p>
        <Link href="/methodology/" className="text-sm text-blue-600 hover:underline">
          Read our full methodology →
        </Link>
      </section>
    </div>
  );
}
