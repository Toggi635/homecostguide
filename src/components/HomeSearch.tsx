"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Search } from "lucide-react";
import type { Article } from "@/lib/content";

interface HomeSearchProps {
  topArticles: Article[];
}

export default function HomeSearch({ topArticles }: HomeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = searchQuery
    ? topArticles.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topArticles;

  return (
    <>
      <div className="relative max-w-md mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="e.g., cost to replace a roof..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-btn border border-line bg-white pl-10 pr-4 py-3 text-sm shadow-soft focus:ring-2 focus:ring-rust/40 focus:border-rust outline-none transition-shadow"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((a) => <ArticleCard key={a.id} article={a} />)
        ) : (
          <p className="text-muted text-sm col-span-full">No guides match your search.</p>
        )}
      </div>
    </>
  );
}
