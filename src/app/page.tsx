import Link from "next/link";
import PillarCard from "@/components/PillarCard";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import HomeSearch from "@/components/HomeSearch";
import { pillars, getArticlesByTier } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { BadgeCheck, RefreshCw, FileText, Calculator } from "lucide-react";

export const metadata = {
  title: "HomeCostGuide – Real Home Improvement Cost Guides",
  description:
    "Get accurate, up-to-date home improvement cost guides. Roofing, HVAC, plumbing, electrical, remodeling, and maintenance costs with free calculators.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const topArticles = getArticlesByTier("A");

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HomeCostGuide",
    url: SITE_URL,
    description: "Get accurate, up-to-date home improvement cost guides with free calculators.",
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: topArticles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${a.pillar}/${a.slug}/`,
    })),
  };

  const recentArticles = topArticles.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <JsonLd data={websiteSchema} />
      <JsonLd data={itemListSchema} />

      <section className="py-12 lg:py-16 lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        <div className="motion-safe:animate-fade-up mb-8 lg:mb-0">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink leading-tight mb-4">
            Know What Home Projects Really Cost
          </h1>
          <p className="text-lg text-muted mb-6">
            Transparent, researched pricing guides for roofing, HVAC, plumbing, electrical, remodeling, and home maintenance. No guesswork.
          </p>
          <Button href="/calculators/" variant="primary">
            <Calculator size={16} />
            Browse Cost Calculators
          </Button>
        </div>
        <div className="rounded-card bg-gradient-to-br from-forest/10 to-rust/10 p-6 shadow-soft">
          <h3 className="font-serif font-semibold text-ink text-sm mb-4">Recently Updated Cost Guides</h3>
          <div className="space-y-3">
            {recentArticles.map((a) => {
              const pillarObj = pillars.find((p) => p.slug === a.pillar);
              const dotColor = pillarObj
                ? ["roofing-exterior", "plumbing", "kitchen-bath", "home-maintenance"].includes(pillarObj.slug)
                  ? "bg-rust"
                  : "bg-forest"
                : "bg-rust";
              return (
                <Link key={a.id} href={`/${a.pillar}/${a.slug}/`} className="flex items-center gap-3 group">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                  <span className="text-sm text-ink/80 group-hover:text-rust transition-colors flex-1 truncate">{a.title}</span>
                  <span className="text-xs font-medium text-rust shrink-0">{a.costLow}–{a.costHigh}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-white border border-line rounded-card p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-forest/10 text-forest">
              <Calculator size={22} />
            </span>
            <div>
              <h2 className="text-xl font-serif font-semibold text-ink">Home Maintenance Cost Calculator</h2>
              <p className="text-sm text-muted">Plan your annual home maintenance budget</p>
            </div>
          </div>
          <p className="text-muted text-sm mb-4">Our flagship calculator helps you estimate how much to set aside each year for home maintenance based on your home&apos;s age, size, and location.</p>
          <Button href="/home-maintenance/annual-home-maintenance-cost-calculator/" variant="secondary">
            Try the Calculator
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-serif font-semibold text-ink mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <PillarCard key={p.slug} slug={p.slug} name={p.name} description={p.description} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-serif font-semibold text-ink mb-6">Most Searched Cost Guides</h2>
        <HomeSearch topArticles={topArticles} />
      </section>

      <section className="mb-12 bg-white border border-line rounded-card p-8 shadow-soft">
        <h2 className="text-lg font-serif font-semibold text-ink mb-6">How We Calculate Costs</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start gap-3 flex-1">
            <BadgeCheck size={20} className="text-forest shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-ink mb-1">Sourced Data</h3>
              <p className="text-sm text-muted">Costs come from industry databases, contractor surveys, and published averages from trusted home-service aggregators.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 flex-1">
            <RefreshCw size={20} className="text-rust shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-ink mb-1">Always Updated</h3>
              <p className="text-sm text-muted">We review and refresh our pricing guides annually to reflect current market rates.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 flex-1">
            <FileText size={20} className="text-forest shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-ink mb-1">Transparent Methodology</h3>
              <p className="text-sm text-muted">Every cost range explains what&apos;s included, what affects pricing, and how we arrived at the numbers.</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button href="/methodology/" variant="ghost">
            Read our full methodology
          </Button>
        </div>
      </section>
    </div>
  );
}
