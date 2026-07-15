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
      <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((article) => (
          <Link
            key={article.id}
            href={`/${article.pillar}/${article.slug}/`}
            className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <p className="text-xs text-gray-400 mb-1">{pillar?.name}</p>
            <p className="text-sm font-medium">{article.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
