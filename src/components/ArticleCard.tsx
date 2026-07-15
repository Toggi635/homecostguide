import Link from "next/link";
import type { Article } from "@/lib/content";

interface ArticleCardProps {
  article: Article;
  costPreview?: string;
}

export default function ArticleCard({ article, costPreview }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.pillar}/${article.slug}/`}
      className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-sm leading-snug">{article.title}</h3>
        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
          article.priorityTier === "A" ? "bg-green-100 text-green-700" :
          article.priorityTier === "B" ? "bg-yellow-100 text-yellow-700" :
          "bg-gray-100 text-gray-500"
        }`}>
          {article.priorityTier}
        </span>
      </div>
      {costPreview && <p className="text-xs text-gray-400 mt-1">{costPreview}</p>}
      <div className="flex gap-2 mt-2">
        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{article.intent}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
          article.difficulty === "Low" || article.difficulty === "Low-Med" ? "bg-green-50 text-green-600" :
          article.difficulty === "Med" ? "bg-yellow-50 text-yellow-600" :
          "bg-red-50 text-red-600"
        }`}>
          {article.difficulty}
        </span>
      </div>
    </Link>
  );
}
