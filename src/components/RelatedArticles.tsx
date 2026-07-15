import Link from "next/link";
import { articles, getPillar, getRelatedArticles } from "@/lib/content";
import type { Article } from "@/lib/content";

interface RelatedArticlesProps {
  currentArticle: Article;
}

export default function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
  const related = getRelatedArticles(currentArticle, 3);
  const pillar = getPillar(currentArticle.pillar);

  return (
    <div className="my-8">
      <h3 className="text-lg font-serif font-semibold text-ink mb-4">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((article) => (
          <Link
            key={article.id}
            href={`/${article.pillar}/${article.slug}/`}
            className="block bg-white border border-line rounded-card p-4 shadow-soft transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5 hover:border-rust/40"
          >
            <p className="text-xs text-muted mb-1">{pillar?.name}</p>
            <p className="text-sm font-medium text-ink">{article.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
