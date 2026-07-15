import { notFound } from "next/navigation";
import Link from "next/link";
import { pillars, getPillar, getArticlesByPillar } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ArticleImage from "@/components/ArticleImage";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export function generateMetadata({ params }: { params: { pillar: string } }) {
  const pillar = getPillar(params.pillar);
  if (!pillar) return {};
  return {
    title: `${pillar.name} Cost Guides`,
    description: pillar.metaDescription,
    alternates: { canonical: `/${pillar.slug}/` },
  };
}

const ASSET_PATH = process.env.NODE_ENV === "production" ? "/homecostguide" : "";

export default function PillarPage({ params }: { params: { pillar: string } }) {
  const pillar = getPillar(params.pillar);
  if (!pillar) notFound();

  const pillarArticles = getArticlesByPillar(pillar.slug);
  const relatedPillars = pillar.relatedPillars.map((slug) => getPillar(slug)).filter(Boolean);

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: pillar.name },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pillarArticles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${a.pillar}/${a.slug}/`,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${pillar.name} Cost Guides`,
    description: pillar.description,
    url: `${SITE_URL}/${pillar.slug}/`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <JsonLd data={breadcrumbListSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={collectionPageSchema} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: pillar.name }]} />

      <figure className="my-6 rounded-card overflow-hidden border border-line">
        <ArticleImage
          src={`${ASSET_PATH}/pillar-images/${pillar.slug}.svg`}
          alt={`${pillar.name} cost guides overview`}
          width={1200}
          height={400}
          className="w-full h-auto"
          loading="eager"
        />
      </figure>

      <h1 className="text-3xl font-serif font-semibold text-ink mb-4">{pillar.name} Cost Guides</h1>
      <p className="text-muted mb-8 max-w-3xl">{pillar.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {pillarArticles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>

      {pillarArticles.length === 0 && (
        <p className="text-muted text-center py-12">No guides yet in this category. Check back soon.</p>
      )}

      {relatedPillars.length > 0 && (
        <section className="border-t border-line pt-8">
          <h2 className="text-xl font-serif font-semibold text-ink mb-4">Related Categories</h2>
          <div className="flex flex-wrap gap-3">
            {relatedPillars.map((rp) =>
              rp ? (
                <Link
                  key={rp.slug}
                  href={`/${rp.slug}/`}
                  className="text-rust hover:text-rust-dark underline text-sm"
                >
                  {rp.name}
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}

      <section className="border-t border-line mt-8 pt-8">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Frequently Asked Questions</h2>
        <p className="text-sm text-muted">
          Browse individual guides above for detailed FAQs about specific projects and their costs.
        </p>
      </section>
    </div>
  );
}
