"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQAccordion({ items, title }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-serif font-semibold mb-4">{title}</h3>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-line rounded-card overflow-hidden">
            <button
              className="w-full text-left px-4 py-3 bg-paper hover:bg-line/50 font-medium text-sm flex justify-between items-center transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-ink">{item.question}</span>
              <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            {openIndex === i && (
              <div className="px-4 py-3 text-sm text-muted border-t border-line">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
