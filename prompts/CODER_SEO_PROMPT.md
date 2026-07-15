# CODER TASK: HomeCostGuide Technical SEO Implementation Pass

## Context

You are implementing a prioritized SEO fix list for HomeCostGuide, a Next.js 14 App Router static-export site (`output: "export"`) deployed to GitHub Pages at `https://toggi635.github.io/homecostguide/` (all lowercase — this is verified correct, do NOT change it). This is a Planner→Coder handoff: the audit is already done. Execute the changes below exactly as specified. Do not re-audit, do not second-guess the findings, do not expand scope beyond what's listed.

## Hard constraints (apply to every change below)

- **Do NOT touch the 50 MDX article files** in `src/content/articles/*.mdx`. Their prose content quality (templated structure, awkward openers) is a known issue but is explicitly OUT OF SCOPE for this pass — it requires a separate content-editing task with human review. Do not rewrite, restructure, or add in-body links to any `.mdx` file.
- **Do NOT change `next.config.mjs`'s `basePath`/`assetPrefix`** or `src/lib/site.ts`'s `SITE_URL` constant. These are already correctly set to lowercase `/homecostguide` and `https://toggi635.github.io/homecostguide` respectively — this was a hard-won, verified fix (mixed-case 404s, lowercase 200s). Any URL construction you add must import and use `SITE_URL` from `@/lib/site`, never hardcode a new base URL.
- **Never fabricate**: no fake author names, no fake individual credentials, no fake `sameAs` social profile URLs, no fake staggered publish dates, no fake logo/brand assets beyond the explicitly-authorized stopgap in P4.
- **Do not add new npm dependencies.** One dependency removal is authorized (P5.1) — no additions.
- **Do not change the visual design** except where explicitly instructed (nav breakpoint change in P3.2, aria attributes in P3.3 — these are accessibility/SEO fixes, not redesigns). Do not touch Tailwind config, color tokens, spacing, or any other visual styling not explicitly listed below.
- Preserve all existing working URLs and existing JSON-LD that isn't explicitly being replaced.

---

## PRIORITY 1 — CRITICAL

### P1.1 — Fix FAQPage schema so it exactly matches visible FAQ content

**File:** `src/app/[pillar]/[article]/page.tsx`

Currently there is a hardcoded `faqSchema` object (with 2 generic Q&As) that is separate from and does NOT match the 4 Q&As actually rendered by `<FAQAccordion>`. This is a Google structured-data policy violation (schema must match visible content) and must be fixed by using a single shared array as the source of truth.

Do this:
1. Find the current `faqSchema` object (roughly lines 89–110) and DELETE it.
2. Find the array of FAQ items currently passed inline as the `items` prop to `<FAQAccordion>` (roughly lines 171–176):
```tsx
<FAQAccordion
  title="Frequently Asked Questions"
  items={[
    { question: `What is the average ${article.targetKeyword}?`, answer: `The national average for this project ranges from ${article.costLow} to ${article.costHigh}, with most homeowners spending around ${article.costAvg}${article.costUnit}. Your actual cost depends on size, materials, and location. Source: ${article.costSource}.` },
    { question: "How often should I replace or service this?", answer: "Typical lifespan varies by product and usage. Check the manufacturer guidelines and consider annual inspections to maximize longevity." },
    { question: "Does homeowners insurance cover this?", answer: "Standard homeowners policies cover sudden damage but not gradual wear and tear. Review your policy or speak with your agent about specific coverage." },
    { question: "Can I finance this project?", answer: "Many contractors offer financing options, or you can explore home equity loans, personal loans, or credit cards with promotional APRs for larger projects." },
  ]}
/>
```
3. Extract that array into a local `const` defined earlier in the component function body (before the `return`), e.g.:
```tsx
const faqItems = [
  { question: `What is the average ${article.targetKeyword}?`, answer: `The national average for this project ranges from ${article.costLow} to ${article.costHigh}, with most homeowners spending around ${article.costAvg}${article.costUnit}. Your actual cost depends on size, materials, and location. Source: ${article.costSource}.` },
  { question: "How often should I replace or service this?", answer: "Typical lifespan varies by product and usage. Check the manufacturer guidelines and consider annual inspections to maximize longevity." },
  { question: "Does homeowners insurance cover this?", answer: "Standard homeowners policies cover sudden damage but not gradual wear and tear. Review your policy or speak with your agent about specific coverage." },
  { question: "Can I finance this project?", answer: "Many contractors offer financing options, or you can explore home equity loans, personal loans, or credit cards with promotional APRs for larger projects." },
];
```
4. Change the `<FAQAccordion>` usage to `<FAQAccordion title="Frequently Asked Questions" items={faqItems} />`.
5. Rebuild the `faqSchema` object by mapping over that same `faqItems` array:
```tsx
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
```
6. Keep the existing `<JsonLd data={faqSchema} />` render call as-is (it already exists — just confirm it still renders after your edit).

Result: the FAQ schema and the visibly rendered FAQAccordion are now guaranteed to be identical because they come from one array.

### P1.2 — Add self-referencing canonical URLs to every page

**Step 1 — Root layout.** File: `src/app/layout.tsx`.
Import `SITE_URL` from `@/lib/site` and add `metadataBase` to the existing `metadata` export:
```tsx
import { SITE_URL } from "@/lib/site";
```
Update the `metadata` object to include `metadataBase`:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HomeCostGuide – Real Home Improvement Cost Guides",
    template: "%s | HomeCostGuide",
  },
  description:
    "Get accurate, up-to-date home improvement cost guides. Roofing, HVAC, plumbing, electrical, remodeling, and maintenance costs with free calculators.",
};
```
Once `metadataBase` is set, all subsequent canonical paths below can be written as simple relative strings (e.g. `"/about/"`) and Next.js will resolve them against `SITE_URL` correctly — this avoids re-typing `SITE_URL` string concatenation everywhere and reduces typo risk. Use relative paths for every canonical below.

**Step 2 — Pillar pages.** File: `src/app/[pillar]/page.tsx`.
Update `generateMetadata`:
```tsx
export function generateMetadata({ params }: { params: { pillar: string } }) {
  const pillar = getPillar(params.pillar);
  if (!pillar) return {};
  return {
    title: `${pillar.name} Cost Guides`,
    description: pillar.description,
    alternates: { canonical: `/${pillar.slug}/` },
  };
}
```

**Step 3 — Article pages.** File: `src/app/[pillar]/[article]/page.tsx`.
Update `generateMetadata`:
```tsx
export function generateMetadata({ params }: { params: { pillar: string; article: string } }) {
  const article = getArticle(params.article);
  if (!article) return {};
  return {
    title: article.title,
    description: `Find out the ${article.targetKeyword} with our 2026 guide. National average, low-high range, and free cost calculator.`,
    alternates: { canonical: `/${article.pillar}/${article.slug}/` },
  };
}
```
(Note: this description string gets replaced properly in P3.1 below — for this step, only add the `alternates.canonical` line, don't touch the description yet if you're doing P1 before P3.)

**Step 4 — Every static page.** Add `alternates: { canonical: "<path>" }` to the existing `metadata` export in each of these files, matching the exact paths already used in `src/app/sitemap.ts`'s `staticPages` array:
- `src/app/about/page.tsx` → canonical: `"/about/"`
- `src/app/calculators/page.tsx` → canonical: `"/calculators/"`
- `src/app/contact/page.tsx` → canonical: `"/contact/"`
- `src/app/editorial-guidelines/page.tsx` → canonical: `"/editorial-guidelines/"`
- `src/app/methodology/page.tsx` → canonical: `"/methodology/"`
- `src/app/privacy-policy/page.tsx` → canonical: `"/privacy-policy/"`
- `src/app/terms/page.tsx` → canonical: `"/terms/"`

Example for `about/page.tsx`:
```tsx
export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about HomeCostGuide and our mission to provide transparent, accurate home improvement cost information.",
  alternates: { canonical: "/about/" },
};
```
Apply the same pattern (add one `alternates` line to the existing metadata object) to the other 6 static pages — do not otherwise modify their content.

**Step 5 — Homepage canonical** is handled together with P1.3 below (the homepage needs a client/server split before it can export metadata at all).

### P1.3 — Split the homepage into a server component (fixes missing metadata) + isolated client search component

**Problem:** `src/app/page.tsx` currently has `"use client"` at the top, which means it CANNOT export `metadata` — Next.js forbids exporting `metadata`/`generateMetadata` from a Client Component. This means the homepage currently has no explicit title/description/canonical of its own and silently inherits only the root layout defaults. It also means the entire homepage tree (including static grids that don't need interactivity) gets hydrated as client JS unnecessarily.

**Step 1 — Create a new file** `src/components/HomeSearch.tsx`:
```tsx
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
```
Note: the search `<input>` was originally in the hero section (top of the old `page.tsx`) and the filtered grid was in the "Most Searched Cost Guides" section further down — both depended on the same `searchQuery` state, so both must live together in this one client component. Preserve exact class names shown above (copied verbatim from the original file) — do not restyle.

**Step 2 — Rewrite `src/app/page.tsx`** to remove `"use client"`, remove the `useState`/`Search` import/filtering logic (now in `HomeSearch.tsx`), add a `metadata` export with canonical, and render `<HomeSearch topArticles={topArticles} />` in place of both the old search-input block AND the old filtered-grid block. Everything else (hero heading/copy, "Recently Updated" card, methodology card, pillar grid, JSON-LD) stays exactly as-is, unchanged, in this file.

Concretely:
- Remove line 1 `"use client";` and the `useState` import.
- Remove the `Search` icon import from the top-level import list in `page.tsx` (it now only belongs in `HomeSearch.tsx`) — but keep `BadgeCheck, RefreshCw, FileText, Calculator` imports since those are still used directly in `page.tsx`.
- Add import: `import HomeSearch from "@/components/HomeSearch";`
- Add this metadata export near the top of the file (after imports, before the component function):
```tsx
export const metadata = {
  title: "HomeCostGuide – Real Home Improvement Cost Guides",
  description:
    "Get accurate, up-to-date home improvement cost guides. Roofing, HVAC, plumbing, electrical, remodeling, and maintenance costs with free calculators.",
  alternates: { canonical: "/" },
};
```
- In the hero section, replace the old inline search `<div className="relative max-w-md mb-6">...</div>` block with nothing (it moves into `HomeSearch`) — but keep the `<Button href="/calculators/" variant="primary">` that follows it in the hero, unchanged.
- Keep the hero's search box relocation simple and low-risk: render `<HomeSearch topArticles={topArticles} />` (the full component: input + grid together, exactly as coded above) as a single unit placed in the position of the current "Most Searched Cost Guides" section (replacing the old input div in the hero entirely, moving the input down next to its results). This is a minor, acceptable visual change (search box moves from hero to directly above its own results grid, which is arguably clearer UX) and is the lowest-risk correct implementation. Remove the standalone search `<input>` JSX from the hero section entirely and leave the hero's left column as: heading, paragraph, then the "Browse Cost Calculators" button directly.
- Keep the `<section className="mb-12"><h2 className="text-2xl font-serif font-semibold text-ink mb-6">Most Searched Cost Guides</h2>` wrapper and heading as static server-rendered JSX in `page.tsx`, and place `<HomeSearch topArticles={topArticles} />` inside that section in place of the old input+grid JSX.
- Leave `websiteSchema`, `itemListSchema`, and their `<JsonLd>` render calls exactly as they are today in `page.tsx` — these don't depend on client state and can stay server-rendered.

---

## PRIORITY 2 — HIGH

### P2.1 — Fix Article JSON-LD schema completeness and type accuracy

**File:** `src/lib/content.ts`

Add two new fields to the `Article` interface:
```ts
export interface Article {
  id: number;
  title: string;
  slug: string;
  pillar: string;
  targetKeyword: string;
  intent: "INFO" | "COMM" | "TRANS";
  difficulty: "Low" | "Low-Med" | "Med" | "Med-High" | "High";
  format: "guide" | "calculator" | "comparison-table" | "decision-table" | "data-table";
  priorityTier: "A" | "B" | "C";
  estVolume: string;
  costLow: string;
  costAvg: string;
  costHigh: string;
  costUnit: string;
  costSource: string;
  datePublished: string;
  dateModified: string;
}
```
Populate `datePublished: "2026-01-15"` and `dateModified: "2026-01-15"` for ALL 50 article entries (same honest single date for both fields on every entry, since no true differentiated publish history exists — do NOT invent staggered fake dates). This is a mechanical find-and-add: every one of the 50 article object literals in the `articles` array needs `, datePublished: "2026-01-15", dateModified: "2026-01-15"` appended before its closing `}`.

**File:** `src/app/[pillar]/[article]/page.tsx`

Replace the current `articleSchema` object:
```tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: `Find out the ${article.targetKeyword} with our 2026 guide.`,
  dateModified: "2026-01-15",
  author: { "@type": "Person", name: "HomeCostGuide Team" },
  publisher: { "@type": "Organization", name: "HomeCostGuide" },
};
```
with:
```tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: `Find out the ${article.targetKeyword} with our 2026 guide.`,
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
```
Note: `author` changed from `"@type": "Person"` to `"@type": "Organization"` — "HomeCostGuide Team" is not a real named individual, so `Person` type is factually wrong; `Organization` is accurate and honest. Do NOT invent a fake named person to use `Person` type instead.
This requires `public/logo.png` to exist — sequence this after P4.1 below, or if doing P2.1 first, the schema will reference a not-yet-existing file, which is acceptable temporarily since P4.1 is in the same overall task and will be completed before final verification.

### P2.2 — Add Organization schema sitewide

**File:** `src/lib/site.ts`

Add a new exported constant to this file (do not create a separate file):
```ts
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HomeCostGuide",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};
```
Do NOT add a `sameAs` field — there are no real social profile URLs to reference, and fabricating one is prohibited.

**File:** `src/app/layout.tsx`

Import `JsonLd` and `organizationSchema`, and render it once inside the `<body>` (so it appears sitewide without repeating it on every individual page):
```tsx
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/site";
```
Inside the `return (...)`, add `<JsonLd data={organizationSchema} />` as the first child inside `<body className={...}>`, before `<Nav />`.

### P2.3 — Add Open Graph + Twitter Card metadata

**File:** `src/app/layout.tsx`

Update the `metadata` export (which now already has `metadataBase` from P1.2) to add `openGraph` and `twitter` fields:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HomeCostGuide – Real Home Improvement Cost Guides",
    template: "%s | HomeCostGuide",
  },
  description:
    "Get accurate, up-to-date home improvement cost guides. Roofing, HVAC, plumbing, electrical, remodeling, and maintenance costs with free calculators.",
  openGraph: {
    type: "website",
    siteName: "HomeCostGuide",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};
```
This requires `public/og-default.png` (1200×630) to exist — create it as part of P4.1 below using the same stopgap approach. Do not attempt per-article dynamic OG image generation (`opengraph-image.tsx`) — this is NOT compatible with `output: "export"` static export in a simple way and is explicitly out of scope for this pass.

### P2.4 — Fix literal `[household size]` placeholder leaking into metadata

**File:** `src/lib/content.ts`

Find article `id: 12` (currently `targetKeyword: "average electric bill for [household size]"`) and change it to:
```ts
targetKeyword: "average electric bill by household size",
```
Find article `id: 30` (currently `targetKeyword: "average water bill for [household size]"`) and change it to:
```ts
targetKeyword: "average water bill by household size",
```
After making this change, grep the entire `content.ts` file for any remaining literal `[` or `]` characters in any field value to confirm no other unresolved bracket placeholders exist. Also grep for `{{` across `content.ts` and all files in `src/app/` and `src/components/` to confirm no other unresolved template-token artifacts remain anywhere (this mirrors the already-fixed `{{COST_LOW}}` bug class — treat any hit as a bug to fix the same way).

### P2.5 — Add breadcrumbs to all 7 static pages

For each of the following 7 files, do the same two things: (a) add a visible `<Breadcrumbs>` component right after the opening wrapper div, and (b) add a matching `BreadcrumbList` JSON-LD block.

Files and their exact page names to use in the breadcrumb:
- `src/app/about/page.tsx` → "About"
- `src/app/calculators/page.tsx` → "Calculators"
- `src/app/contact/page.tsx` → "Contact"
- `src/app/editorial-guidelines/page.tsx` → "Editorial Guidelines"
- `src/app/methodology/page.tsx` → "Methodology"
- `src/app/privacy-policy/page.tsx` → "Privacy Policy"
- `src/app/terms/page.tsx` → "Terms"

For each file:
1. Add imports: `import Breadcrumbs from "@/components/Breadcrumbs";`, `import JsonLd from "@/components/JsonLd";`, `import { SITE_URL } from "@/lib/site";`.
2. Inside the page component, before the `return`, add (substituting the correct page name and path per file):
```tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "<Page Name>" },
  ],
};
```
3. Add `<JsonLd data={breadcrumbSchema} />` and `<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "<Page Name>" }]} />` as the first two elements inside the page's outermost returned `<div>`, before the existing `<h1>`.

Follow the exact pattern already used in `src/app/[pillar]/page.tsx` (lines ~29–36 and ~53) as your reference implementation — copy that shape, just adjust breadcrumb labels/paths.

### P2.6 — Add CollectionPage schema to pillar pages

**File:** `src/app/[pillar]/page.tsx`

Add a third JSON-LD block alongside the existing `breadcrumbListSchema` and `itemListSchema`:
```tsx
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${pillar.name} Cost Guides`,
  description: pillar.description,
  url: `${SITE_URL}/${pillar.slug}/`,
};
```
Render it: `<JsonLd data={collectionPageSchema} />` alongside the other two existing `<JsonLd>` calls near the top of the returned JSX.

---

## PRIORITY 3 — MEDIUM

### P3.1 — Write per-format meta descriptions instead of one identical template

**File:** `src/lib/content.ts`

Add a `metaDescription: string` field to the `Article` interface (alongside `datePublished`/`dateModified` added in P2.1):
```ts
  metaDescription: string;
```
For all 50 articles, generate this field mechanically from each article's own existing `costLow`, `costAvg`, `costHigh`, `costUnit`, `targetKeyword`, and `format` fields — do not write freeform creative copy, use one of these deterministic templates chosen by `format`:

- `format: "calculator"` → `` `${title's core project} costs ${costLow}–${costHigh}${costUnit} nationally, averaging ${costAvg}${costUnit}. Use our free calculator to estimate your project cost.` ``
- `format: "comparison-table"` → `` `Compare costs: ${targetKeyword} ranges from ${costLow} to ${costHigh}${costUnit}, averaging ${costAvg}${costUnit}. See the full cost breakdown by option.` ``
- `format: "decision-table"` → `` `Not sure whether to repair or replace? See real cost data (${costLow}–${costHigh}${costUnit}) and a decision guide to help you choose.` ``
- `format: "data-table"` → `` `See average costs by category: ${targetKeyword}, ranging from ${costLow} to ${costHigh}${costUnit}. Sourced data, updated for 2026.` ``
- `format: "guide"` → `` `A complete cost guide covering ${targetKeyword}: national averages, price ranges (${costLow}–${costHigh}${costUnit}), and what affects your price.` ``

Write out the actual resulting string per article (don't leave template literals unresolved in the data file — `content.ts` holds static string data, not runtime template code) — i.e., manually compute and hardcode the final string for each of the 50 `metaDescription` fields using the template appropriate to that article's `format`, substituting that article's own real `targetKeyword`/`costLow`/`costAvg`/`costHigh`/`costUnit` values into the template before writing it into the array.

**File:** `src/app/[pillar]/[article]/page.tsx`

Update `generateMetadata` to use the new field instead of the old hardcoded template string:
```tsx
export function generateMetadata({ params }: { params: { pillar: string; article: string } }) {
  const article = getArticle(params.article);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/${article.pillar}/${article.slug}/` },
  };
}
```

**File:** `src/lib/content.ts` — also add a `metaDescription: string` field to the `Pillar` interface:
```ts
export interface Pillar {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  relatedPillars: string[];
}
```
For each of the 7 pillars, write a distinct `metaDescription` that leads with an action verb ("Compare...", "See real...", "Browse...") rather than reusing `description` verbatim (keep `description` unchanged for on-page body use). Example for `roofing-exterior`:
```ts
metaDescription: "Compare real roofing, siding, gutter, and exterior project costs. Get 2026 price ranges before you hire a contractor.",
```
Write similarly distinct one-sentence CTA-style descriptions for the other 6 pillars, each referencing that pillar's actual topic areas from its existing `description` field.

**File:** `src/app/[pillar]/page.tsx` — update `generateMetadata` to use it:
```tsx
export function generateMetadata({ params }: { params: { pillar: string } }) {
  const pillar = getPillar(params.pillar);
  if (!pillar) return {};
  return {
    title: `${pillar.name} Cost Guides`,
    description: pillar.metaDescription,
    alternates: { canonical: `/${pillar.slug}/` },
  };
}
```

### P3.2 — Fix desktop nav overflow risk by raising the breakpoint

**File:** `src/components/Nav.tsx`

The nav currently switches from hamburger-menu to full desktop row at the `md:` breakpoint (768px), but 7 full pillar names (e.g. "Flooring, Painting & Interior Renovation", "Kitchen & Bathroom Remodeling") plus "Home", "Calculators", "About" in one row will overflow/wrap between roughly 768–1280px. Fix by raising the breakpoint to `xl:` (1280px) everywhere it currently says `md:` in this file:

1. Toggle button: change `className="md:hidden p-2 text-muted hover:text-rust transition-colors"` to `className="xl:hidden p-2 text-muted hover:text-rust transition-colors"`.
2. Desktop nav: change `<nav className="hidden md:flex items-center gap-1">` to `<nav className="hidden xl:flex items-center gap-1">`.
3. Mobile nav panel: change `<nav className="md:hidden pb-4 border-t border-line pt-2">` to `<nav className="xl:hidden pb-4 border-t border-line pt-2">`.

Do not change any other classes, colors, spacing, or the mobile/desktop nav's internal link markup — this is purely a breakpoint change.

### P3.3 — Add ARIA attributes to mobile nav toggle and FAQ accordion

**File:** `src/components/Nav.tsx`

Update the toggle button to add `aria-expanded` reflecting state, and add `aria-controls`/`id` linkage:
```tsx
<button
  className="xl:hidden p-2 text-muted hover:text-rust transition-colors"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle navigation"
  aria-expanded={mobileOpen}
  aria-controls="mobile-nav-panel"
>
```
Update the mobile `<nav>` element to add the matching `id`:
```tsx
<nav id="mobile-nav-panel" className="xl:hidden pb-4 border-t border-line pt-2">
```

**File:** `src/components/FAQAccordion.tsx`

Update each question button and its answer panel to add matching `aria-expanded`/`aria-controls`/`id`:
```tsx
{items.map((item, i) => (
  <div key={i} className="border border-line rounded-card overflow-hidden">
    <button
      className="w-full text-left px-4 py-3 bg-paper hover:bg-line/50 font-medium text-sm flex justify-between items-center transition-colors"
      onClick={() => setOpenIndex(openIndex === i ? null : i)}
      aria-expanded={openIndex === i}
      aria-controls={`faq-panel-${i}`}
    >
      <span className="text-ink">{item.question}</span>
      <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
    </button>
    {openIndex === i && (
      <div id={`faq-panel-${i}`} className="px-4 py-3 text-sm text-muted border-t border-line">
        {item.answer}
      </div>
    )}
  </div>
))}
```

### P3.4 — Improve related-article relevance

**File:** `src/lib/content.ts`

Replace the current `getRelatedArticles` function:
```ts
export function getRelatedArticles(article: Article, count: number = 3): Article[] {
  return articles
    .filter((a) => a.pillar === article.pillar && a.slug !== article.slug)
    .slice(0, count);
}
```
with:
```ts
export function getRelatedArticles(article: Article, count: number = 3): Article[] {
  const candidates = articles.filter((a) => a.pillar === article.pillar && a.slug !== article.slug);
  const sameFormat = candidates.filter((a) => a.format === article.format);
  const rest = candidates.filter((a) => a.format !== article.format);
  return [...sameFormat, ...rest].slice(0, count);
}
```

### DO NOT DO — explicitly out of scope for this pass

- Do NOT add contextual in-body links inside any `.mdx` file (this was flagged in the audit as "P3.5" but requires touching the 50 MDX article files' content, which is explicitly restricted to a dedicated content task per AGENTS.md — skip it entirely here).
- Do NOT rewrite any article prose, headings, or section structure inside `.mdx` files for any reason during this task.

---

## PRIORITY 4 — ASSETS (favicon / logo / OG image stopgap)

You cannot generate original brand imagery from nothing, and the site owner has not yet supplied a logo. Use this documented, honest stopgap instead of blocking on it: derive simple static icon/logo/OG-image assets from the existing `lucide-react` `Home` icon already used in `src/components/Nav.tsx` (the rust-colored house mark inside `<span className="bg-rust text-white rounded-lg p-1.5"><Home size={18} /></span>`), rendered as static PNG files. This keeps visual brand consistency with the existing Nav without fabricating a new, different brand identity.

Concretely:
1. Create `src/app/icon.png` — a 512×512 PNG: a rust-colored (look up the exact hex value defined in `tailwind.config.ts`'s custom color tokens rather than guessing) rounded-square background with a simple white house/home glyph centered on it, visually matching the Nav badge. Next.js App Router auto-detects `src/app/icon.png` and serves it as the favicon automatically at build time — this works correctly under static export since it's just a static file copy.
2. Create `src/app/apple-icon.png` — same design, 180×180 PNG. Next.js auto-serves this as the `apple-touch-icon`.
3. Create `public/logo.png` — same design again, 512×512 PNG (used by the Organization schema in P2.2 and the Article publisher schema in P2.1).
4. Create `public/og-default.png` — 1200×630 PNG: same rust house mark, but on a wider canvas with the text "HomeCostGuide" next to or below the mark (using a simple, legible sans-serif rendering — this is a static image asset, not a font-rendering concern for the site itself). Used by the Open Graph fallback in P2.3.

If you do not have image-generation tooling available in this environment to produce actual PNG pixel data, create the smallest reasonable placeholder PNGs that are visually consistent (solid rust-colored square/rectangle at the correct dimensions is an acceptable literal minimum stopgap if a proper rendered icon isn't achievable in this environment) — but attempt the actual house-glyph rendering first if any image tooling is available to you. Whichever you produce, you MUST disclose in your final summary that this is a stopgap and that a real supplied logo from the site owner would be a meaningful improvement.

5. Optionally, once these exist, create `public/manifest.json`:
```json
{
  "name": "HomeCostGuide",
  "short_name": "HomeCostGuide",
  "icons": [{ "src": "/logo.png", "sizes": "512x512", "type": "image/png" }],
  "theme_color": "#ffffff",
  "background_color": "#ffffff"
}
```
(Use the actual `theme_color` value matching the site's `paper`/background token from `tailwind.config.ts` if you can find it, rather than a generic white — check that file before hardcoding.) This is low priority — only do it if the other asset work above is already done and time permits.

---

## PRIORITY 5 — CLEANUP

### P5.1 — Remove unused `next-sitemap` dependency

**File:** `package.json`

Remove the line `"next-sitemap": "^4.2.3",` from `dependencies`. Confirm no `next-sitemap.config.js` file exists in the repo root and no `package.json` script references `next-sitemap` (current scripts are `dev`, `build`, `start`, `lint` — none should reference it). After removing it from `package.json`, run `npm install` to update `package-lock.json` accordingly.

### P5.2 — Use real per-article dates in sitemap instead of one hardcoded literal

**File:** `src/app/sitemap.ts`

This depends on P2.1 having already added `datePublished`/`dateModified` fields to every article in `content.ts`. Once those exist, change the `articleEntries` mapping from:
```ts
const articleEntries = articles.map((a) => ({
  url: `${baseUrl}/${a.pillar}/${a.slug}/`,
  lastModified: new Date("2026-01-15"),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));
```
to:
```ts
const articleEntries = articles.map((a) => ({
  url: `${baseUrl}/${a.pillar}/${a.slug}/`,
  lastModified: new Date(a.dateModified),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));
```
Leave `staticEntries` and `pillarEntries` using the existing hardcoded `new Date("2026-01-15")` — pillar/static pages don't have independently tracked dates in this data model, and inventing per-pillar dates would itself be a fabrication; only fix the piece where real per-item data now exists (articles).

### P5.3 — Add `llms.txt`

**Create file:** `public/llms.txt` with this exact content (adjust only if a pillar name/slug doesn't match `content.ts` — verify against the actual `pillars` array before finalizing):

```
# HomeCostGuide

HomeCostGuide provides transparent, sourced home improvement cost guides for U.S. homeowners. Every guide includes a national average cost, a low-to-high range, the original data source, and free interactive cost calculators where applicable.

## Categories

- Roofing & Exterior: https://toggi635.github.io/homecostguide/roofing-exterior/
- HVAC & Energy: https://toggi635.github.io/homecostguide/hvac-energy/
- Plumbing & Water Systems: https://toggi635.github.io/homecostguide/plumbing/
- Electrical: https://toggi635.github.io/homecostguide/electrical/
- Kitchen & Bathroom Remodeling: https://toggi635.github.io/homecostguide/kitchen-bath/
- Flooring, Painting & Interior Renovation: https://toggi635.github.io/homecostguide/interior-renovation/
- Home Maintenance & Repair Decisions: https://toggi635.github.io/homecostguide/home-maintenance/

## Methodology

All cost figures are sourced from published industry data (HomeGuide, Angi, Fixr, BLS, and similar aggregators/agencies) and reviewed at least annually. Full methodology: https://toggi635.github.io/homecostguide/methodology/

## About

https://toggi635.github.io/homecostguide/about/
```

### P5.4 — Verify Footer links to all 7 static pages

**File:** `src/components/Footer.tsx`

Read this file and confirm it contains working `<Link>`s to all of: `/about/`, `/methodology/`, `/editorial-guidelines/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/calculators/`. If any are missing, add them following the existing footer's link markup pattern/styling exactly (do not restyle the footer, just add missing links using the same class names as existing footer links).

### P5.5 — Verify `.env.local` is git-ignored

**File:** `.gitignore`

Confirm it contains `.env.local` or a pattern matching it (e.g. `.env*.local`). If missing, add `.env.local` as its own line. Do NOT inspect or print the actual contents of `.env.local` in any output/summary you produce — just confirm the ignore rule exists.

---

## VERIFICATION CHECKLIST — run all of these before considering the work done

1. **Build check:** Run `npm run build` and confirm it completes with zero errors and zero new warnings introduced by your changes. If it fails, fix the cause before proceeding — do not report the task complete with a broken build.
2. **Placeholder/artifact grep:** Run a repository-wide search (grep/ripgrep) across `src/` for each of these patterns and confirm zero matches remain:
   - `{{` (unresolved template tokens, same bug class as the already-fixed `{{COST_LOW}}` issue)
   - `\[household size\]` or any literal `[` immediately followed by a lowercase word and `]` inside string literals in `content.ts`
   - `/HomeCostGuide` (mixed-case path — must never appear in URL-construction code; mixed-case "HomeCostGuide" as a plain brand-name string in titles/display text is fine and expected, only path-like usages are a problem — use judgment: `href="/HomeCostGuide..."` or `${SITE_URL}/HomeCostGuide...`-style concatenation would be a bug, `<title>About HomeCostGuide</title>` is not)
3. **FAQ schema/visible-content parity spot-check:** Open the rendered output (or the source) for at least 2 different article pages (pick 2 different `format` values, e.g. one `calculator` and one `decision-table`) and confirm the `faqSchema.mainEntity` array's `name`/`text` values are character-for-character identical to what's passed into `<FAQAccordion items={faqItems} />` for that same page — since both now derive from the same `faqItems` variable, this should be true by construction, but manually confirm by reading the final file for both sampled articles.
4. **Canonical tag coverage:** Confirm a canonical tag is present (via the `alternates.canonical` metadata field, which Next.js renders as `<link rel="canonical">` in the `<head>`) on: the homepage, all 7 static pages, at least 2 pillar pages, and at least 2 article pages. Since these all flow through `generateMetadata`/`metadata` exports you edited, verify by reading each file's metadata export directly and confirming the `alternates.canonical` field is present and correctly formatted (starts with `/`, matches the page's real URL path, ends with trailing slash consistent with `trailingSlash: true` in `next.config.mjs`).
5. **Nav breakpoint sanity check (no browser available — verify via code reasoning):** Confirm `Nav.tsx` now uses `xl:` (not `md:`) consistently across all three locations edited in P3.2 (toggle button, desktop `<nav>`, mobile `<nav>` panel) — grep the file for `md:hidden` and `md:flex` and confirm zero remaining matches related to nav visibility toggling (unrelated `md:` classes elsewhere in the file, if any, are fine — only the 3 specific visibility-toggle classes must have changed). This is a reasonable static-analysis substitute for live browser testing given CLI-only access.
6. **Schema completeness re-check:** Re-open `src/app/[pillar]/[article]/page.tsx` and confirm `articleSchema` now includes `datePublished`, `dateModified`, `author.@type === "Organization"`, `publisher.logo`, and `mainEntityOfPage`. Re-open `src/app/layout.tsx` and confirm `organizationSchema` is imported and rendered, and `metadataBase`/`openGraph`/`twitter` are present in the `metadata` export.
7. **No stray "use client" break:** Confirm `src/app/page.tsx` no longer has `"use client"` at the top and successfully exports a `metadata` object (a Client Component cannot do this — if the build succeeds per check #1, this is confirmed correct).
8. **Dependency check:** Confirm `next-sitemap` is absent from `package.json` and `package-lock.json` reflects the removal.

---

## FINAL DELIVERABLE — produce this summary when done

Structure your final report in exactly these four sections:

**1. Files changed** — list every file you created or modified, grouped by priority (P1–P5).

**2. SEO improvements added** — a plain-English list of what was fixed and why it matters (canonical tags, FAQ schema/content parity, Organization/Article schema completeness, OG/Twitter tags, meta description differentiation, nav accessibility/overflow fix, sitemap date accuracy, llms.txt, dependency cleanup, etc.).

**3. Remaining issues** — explicitly state that the following were intentionally NOT touched in this pass and why:
   - The 50 MDX article files' templated/formulaic prose structure and the specific nonsensical-section problem on non-renovation articles (insurance, utility-bill articles) — flagged as requiring a dedicated content-editing task with human review, not attempted here.
   - In-body contextual internal links within article MDX content — same reason, deferred to a future content task.
   - The `HouseholdBillTable` component remains unwired for the 2 utility-bill-by-household-size articles because no real sourced per-household-size data exists yet — do not fabricate data to fill this gap.

**4. Recommended next steps requiring site-owner input** — carry forward exactly this list:
   - A real supplied logo/brand asset would replace the honest stopgap icon/logo/OG-image derived from the Nav house icon in this pass.
   - Google Search Console verification (needs the site owner's Google account; no verification meta tag exists yet).
   - Whether a real, named individual with real credentials should replace the current honest generic "HomeCostGuide Team" author framing for stronger E-E-A-T — do not fabricate one without explicit sign-off.
   - The MDX content-rewrite task (see "Remaining issues" above) should be scoped as its own dedicated pass.
   - Real sourced per-household-size utility cost data (BLS/EIA or similar) is needed before `HouseholdBillTable` can be honestly wired into the 2 relevant articles.
   - Live post-deploy verification (after this code ships to GitHub Pages) of: the custom 404 page actually rendering correctly (not GitHub's default 404), and the nav breakpoint fix actually preventing overflow in a real browser at 768px/1024px/1280px widths — both need real HTTP/browser testing that isn't possible from static code analysis alone.
   - No analytics (GA4/Plausible/etc.) currently exists anywhere in the codebase — out of scope for this pass, but worth noting for future SEO iteration decisions.
