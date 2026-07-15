import Link from "next/link";
import type { Article } from "@/lib/content";

interface ArticleCardProps {
  article: Article;
  costPreview?: string;
}

const tierColors: Record<string, string> = {
  A: "bg-forest/10 text-forest",
  B: "bg-rust/10 text-rust-dark",
  C: "bg-line text-muted",
};

const difficultyColors: Record<string, string> = {
  Low: "bg-forest/10 text-forest",
  "Low-Med": "bg-forest/10 text-forest",
  Med: "bg-rust/10 text-rust-dark",
  "Med-High": "bg-rust/10 text-rust-dark",
  High: "bg-rust/10 text-rust-dark",
};

export default function ArticleCard({ article, costPreview }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.pillar}/${article.slug}/`}
      className="block bg-white border border-line rounded-card p-5 shadow-soft transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5 hover:border-rust/40"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-base font-semibold text-ink leading-snug">{article.title}</h3>
        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${tierColors[article.priorityTier] || "bg-line text-muted"}`}>
          {article.priorityTier}
        </span>
      </div>
      {costPreview && <p className="text-xs text-muted mt-1">{costPreview}</p>}
      {!costPreview && article.costLow && article.costHigh && (
        <p className="text-rust font-medium text-sm mt-1">{article.costLow}–{article.costHigh}</p>
      )}
      <div className="flex gap-2 mt-2">
        <span className="text-[10px] text-muted bg-line px-2 py-0.5 rounded-full">{article.intent}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${difficultyColors[article.difficulty] || "text-muted"}`}>
          {article.difficulty}
        </span>
      </div>
    </Link>
  );
}
