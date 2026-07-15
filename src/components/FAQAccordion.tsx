"use client";

import { useState } from "react";

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
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-medium text-sm flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {item.question}
              <span className={`transform transition-transform ${openIndex === i ? "rotate-180" : ""}`}>▼</span>
            </button>
            {openIndex === i && (
              <div className="px-4 py-3 text-sm text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
