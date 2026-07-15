import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articles, getPillar, getArticle } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorBio from "@/components/AuthorBio";
import CostRangeBox from "@/components/CostRangeBox";
import CostCalculator from "@/components/CostCalculator";
import ScopeCostCalculator from "@/components/ScopeCostCalculator";
import ComparisonTable from "@/components/ComparisonTable";
import RepairVsReplaceWidget from "@/components/RepairVsReplaceWidget";
import HouseholdBillTable from "@/components/HouseholdBillTable";
import TableOfContents from "@/components/TableOfContents";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedArticles from "@/components/RelatedArticles";
import FindAProCTA from "@/components/FindAProCTA";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import Button from "@/components/Button";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  return articles.map((a) => ({ pillar: a.pillar, article: a.slug }));
}

export function generateMetadata({ params }: { params: { pillar: string; article: string } }) {
  const article = getArticle(params.article);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/${article.pillar}/${article.slug}/` },
  };
}

async function getMDXSource(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "src", "content", "articles", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

// article.costLow/costAvg/costHigh are display strings like "$5,700" - parse to numbers
// so real components (CostCalculator, RepairVsReplaceWidget) can use them for real math.
function parseCost(value: string): number {
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const mdxComponents = {
  CostCalculator,
  ComparisonTable,
  RepairVsReplaceWidget,
  HouseholdBillTable,
};

export default async function ArticlePage({ params }: { params: { pillar: string; article: string } }) {
  const article = getArticle(params.article);
  if (!article) notFound();

  const pillar = getPillar(article.pillar);
  if (!pillar) notFound();

  const mdxSource = await getMDXSource(article.slug);

  const faqItems = [
    { question: `What is the average ${article.targetKeyword}?`, answer: `The national average for this project ranges from ${article.costLow} to ${article.costHigh}, with most homeowners spending around ${article.costAvg}${article.costUnit}. Your actual cost depends on size, materials, and location. Source: ${article.costSource}.` },
    { question: "How often should I replace or service this?", answer: "Typical lifespan varies by product and usage. Check the manufacturer guidelines and consider annual inspections to maximize longevity." },
    { question: "Does homeowners insurance cover this?", answer: "Standard homeowners policies cover sudden damage but not gradual wear and tear. Review your policy or speak with your agent about specific coverage." },
    { question: "Can I finance this project?", answer: "Many contractors offer financing options, or you can explore home equity loans, personal loans, or credit cards with promotional APRs for larger projects." },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: "HomeCostGuide", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "HomeCostGuide",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${article.pillar}/${article.slug}/`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: pillar.name, item: `${SITE_URL}/${pillar.slug}/` },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: pillar.name, href: `/${pillar.slug}/` },
        { label: article.title },
      ]} />

      <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink leading-tight mb-2">{article.title}</h1>
      <p className="text-sm text-muted mb-4">Last updated: January 15, 2026</p>

      <AuthorBio />

      <CostRangeBox
        label={`National Average ${article.targetKeyword}${article.costUnit}`}
        low={article.costLow}
        average={article.costAvg}
        high={article.costHigh}
      />

      <AdSlot placement="after-intro" />

      <TableOfContents />

      <article className="prose prose-article max-w-none text-ink/90">
        {mdxSource ? (
          <MDXRemote source={mdxSource} components={mdxComponents} />
        ) : (
          <p className="text-muted italic">Content coming soon.</p>
        )}
      </article>

      {article.format === "calculator" && (
        <ScopeCostCalculator
          costLow={parseCost(article.costLow)}
          costAvg={parseCost(article.costAvg)}
          costHigh={parseCost(article.costHigh)}
          sourceNote={`Based on ${article.costSource}. Adjust scope to match a smaller or larger project than average.`}
        />
      )}

      {article.format === "decision-table" && (
        <RepairVsReplaceWidget
          systemName={pillar.name}
          replacementCostLow={parseCost(article.costLow) * 4}
          replacementCostHigh={parseCost(article.costHigh) * 4}
        />
      )}

      <AdSlot placement="mid-content" />

      <AdSlot placement="pre-faq" />

      <FAQAccordion
        title="Frequently Asked Questions"
        items={faqItems}
      />

      <FindAProCTA
        partnerName={pillar.name.toLowerCase().includes("hvac") ? "HVAC pros" : `${pillar.name.toLowerCase()} pros`}
      />

      <RelatedArticles currentArticle={article} />

      <div className="mt-6 text-center">
        <Button href="/methodology/" variant="ghost">
          How we calculate costs
        </Button>
      </div>
    </div>
  );
}
