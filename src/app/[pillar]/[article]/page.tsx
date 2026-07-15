import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articles, getPillar, getArticle } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorBio from "@/components/AuthorBio";
import CostRangeBox from "@/components/CostRangeBox";
import CostCalculator from "@/components/CostCalculator";
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
    description: `Find out the ${article.targetKeyword} with our 2026 guide. National average, low-high range, and free cost calculator.`,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: `Find out the ${article.targetKeyword} with our 2026 guide.`,
    dateModified: "2026-01-15",
    author: { "@type": "Person", name: "HomeCostGuide Team" },
    publisher: { "@type": "Organization", name: "HomeCostGuide" },
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
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the average ${article.targetKeyword}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "The national average cost varies by project specifics. Use our calculator above for a personalized estimate.",
        },
      },
      {
        "@type": "Question",
        name: "Is it better to repair or replace?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This depends on the age of your system and the cost of repair relative to replacement. Our decision tool above can help you decide.",
        },
      },
    ],
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

      {article.format !== "guide" && article.format !== "data-table" && (
        <div className="my-8 bg-paper border border-line rounded-card p-6 shadow-soft">
          <h2 id="calculator" className="text-xl font-serif font-semibold text-ink mb-4">
            {article.format === "calculator" ? "Cost Calculator" :
             article.format === "decision-table" ? "Repair vs Replace Tool" :
             article.format === "comparison-table" ? "Comparison Tool" : "Interactive Tool"}
          </h2>
          <p className="text-sm text-muted mb-4">
            Use the interactive tool below to estimate your specific project cost.
          </p>
          <div className="border-2 border-dashed border-line rounded-card p-8 text-center text-muted">
            [{article.format === "calculator" ? "Interactive Cost Calculator" :
              article.format === "decision-table" ? "Repair vs Replace Decision Tool" :
              article.format === "comparison-table" ? "Comparison Table" :
              article.format === "data-table" ? "Data Table" : "Interactive Tool"}
            — configure with real data in content production phase]
          </div>
        </div>
      )}

      <AdSlot placement="mid-content" />

      <AdSlot placement="pre-faq" />

      <FAQAccordion
        title="Frequently Asked Questions"
        items={[
          { question: `What is the average ${article.targetKeyword}?`, answer: `The national average for this project ranges from {{COST_LOW}} to {{COST_HIGH}}, with most homeowners spending around {{COST_AVG}}. Your actual cost depends on size, materials, and location.` },
          { question: "How often should I replace or service this?", answer: "Typical lifespan varies by product and usage. Check the manufacturer guidelines and consider annual inspections to maximize longevity." },
          { question: "Does homeowners insurance cover this?", answer: "Standard homeowners policies cover sudden damage but not gradual wear and tear. Review your policy or speak with your agent about specific coverage." },
          { question: "Can I finance this project?", answer: "Many contractors offer financing options, or you can explore home equity loans, personal loans, or credit cards with promotional APRs for larger projects." },
        ]}
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
