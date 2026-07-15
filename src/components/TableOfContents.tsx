"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3");
    const tocItems: TOCItem[] = [];
    headings.forEach((h) => {
      if (h.id) {
        tocItems.push({ id: h.id, text: h.textContent || "", level: Number(h.tagName.substring(1)) });
      }
    });
    setItems(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="bg-paper border border-line rounded-card p-4 my-6">
      <p className="font-medium text-sm text-ink mb-2">On This Page</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className={`text-sm hover:text-rust transition-colors ${activeId === item.id ? "text-rust font-medium" : "text-muted"}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
