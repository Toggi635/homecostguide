# HomeCostGuide — Production Build Prompt (for the executing AI agent)

You are being handed a **partially-scaffolded Next.js repo** at `github.com/Toggi635/HomeCostGuide` and asked to turn it into a **real, publishable, production-quality SEO site** deployed on **GitHub Pages** at `https://toggi635.github.io/HomeCostGuide/`. This prompt is fully self-contained. Do not ask the user follow-up questions — every decision you need is specified below. Where you must make a judgment call not covered here, default to whatever a senior editorial/SEO web team at a trustworthy consumer-finance publication (Wirecutter, NerdWallet, This Old House) would do, and note the decision in your final summary.

Read this entire document before writing any code.

---

## 0. What already exists (do not rebuild from scratch — extend it)

The repo has a Next.js 14 App Router scaffold already committed:
- `src/lib/content.ts` — typed `Pillar[]` and `Article[]` data (7 pillars, 50 articles with `slug`, `pillar`, `targetKeyword`, `intent`, `difficulty`, `format`, `priorityTier`, `estVolume`).
- `src/app/[pillar]/page.tsx`, `src/app/[pillar]/[article]/page.tsx` — dynamic route templates.
- `src/app/{about,methodology,editorial-guidelines,contact,privacy-policy,terms,calculators}/page.tsx` — static pages (currently thin — flesh these out, see §5).
- `src/app/sitemap.ts`, `src/app/robots.ts` — Next.js native metadata-route sitemap/robots generators.
- `src/components/*` — `AdSlot`, `ArticleCard`, `AuthorBio`, `Breadcrumbs`, `ComparisonTable`, `CostCalculator`, `CostRangeBox`, `FAQAccordion`, `Footer`, `HouseholdBillTable`, `JsonLd`, `LeadGenCTA`, `Nav`, `PillarCard`, `RelatedArticles`, `RepairVsReplaceWidget`, `TableOfContents`.
- `src/content/articles/*.mdx` — **50 placeholder MDX files, one per article slug, with skeleton headers and fake `{{COST_LOW}}`-style placeholders.** These currently contain NO real content. Replacing these with real, complete, publication-quality articles is your single biggest job (§4).
- `BUILD_PLAN.md` — the strategy doc this site was planned from. Read it for the full 50-article table (titles, keywords, pillar assignments, priority tiers, difficulty reasoning) and the original research findings. Treat its `[R]` figures (below, also reproduced in §4.1) as verified starting data; everything else in it tagged `[E]` is a planning-stage estimate you must verify/replace with real sourced numbers during content writing.

**Known bug to fix immediately:** `src/app/layout.tsx` has a mangled em-dash character in the default title (`"HomeCostGuide �?" Real Home Improvement Cost Guides"`). Fix the encoding — the title should read `"HomeCostGuide — Real Home Improvement Cost Guides"` (proper em-dash, UTF-8 clean).

---

## 1. Hosting target: GitHub Pages, default URL, no custom domain

Site will live at **`https://toggi635.github.io/HomeCostGuide/`**. This has hard consequences for the Next.js config — implement exactly this:

**`next.config.mjs`:**
```js
import createMDX from "@next/mdx";

const withMDX = createMDX({ extension: /\.mdx?$/ });

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/HomeCostGuide" : "",
  assetPrefix: isProd ? "/HomeCostGuide/" : "",
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
```

**Every internal `<Link href>` and hardcoded URL must be root-relative (e.g. `/roofing-exterior/roof-replacement-cost/`)** — never hardcode `/HomeCostGuide/...` inline. `basePath` in `next.config.mjs` handles the prefix automatically for `next/link` and `next/navigation`. The only place you must manually account for the base path is inside `sitemap.ts`/`robots.ts` and any `og:url`/canonical `<meta>` tags that build absolute URLs from a raw string — use one shared constant for this (see §1.1).

**1.1 Site URL constant.** Create `src/lib/site.ts`:
```ts
export const SITE_URL = "https://toggi635.github.io/HomeCostGuide";
```
Use `SITE_URL` (never a relative path, never `homecostguide.com`) everywhere an absolute URL is required: `sitemap.ts`, `robots.ts`, canonical tags, Open Graph tags, and JSON-LD `url` fields. Update `src/app/sitemap.ts` and `src/app/robots.ts` to import this constant instead of reading `process.env.NEXT_PUBLIC_SITE_URL` with a `homecostguide.com` fallback (that fallback is wrong for this deployment — remove it).

**1.2 Dynamic route static generation.** Because `output: "export"` requires every path to be known at build time, `src/app/[pillar]/page.tsx` and `src/app/[pillar]/[article]/page.tsx` **must** export `generateStaticParams()` that enumerates all 7 pillars and all 50 articles from `src/lib/content.ts`. Verify this exists; add it if missing. Also add `generateMetadata()` to both dynamic route files (and every static page) producing a unique `<title>`, `<meta name="description">`, canonical `<link>`, and Open Graph tags per page — do not rely on the root layout's generic metadata alone.

**1.3 `.nojekyll`.** GitHub Pages runs Jekyll by default, which ignores any folder starting with an underscore — this would silently break Next's `_next/` asset folder. Add an empty `public/.nojekyll` file so it gets copied into `out/` on export, AND explicitly touch/create `.nojekyll` inside the GitHub Actions workflow before the deploy step as a safety net (see §2).

**1.4 404 page.** `src/app/not-found.tsx` already exists — confirm it renders inside the static export (Next static export produces `404.html` automatically from this file) and that GitHub Pages' custom 404 behavior picks it up (GitHub Pages automatically serves `404.html` from the site root for unmatched paths — no extra config needed as long as `out/404.html` exists after export).

---

## 2. GitHub Actions deployment workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build (static export)
        run: npm run build
        env:
          NODE_ENV: production

      - name: Ensure .nojekyll
        run: touch ./out/.nojekyll

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

After this file is pushed, the executing agent (or the human) must also go to **Settings → Pages → Build and deployment → Source** in the GitHub repo UI and select **"GitHub Actions"** (not "Deploy from a branch"). Note this explicitly in your final summary as a manual step the human must confirm, since it cannot be done via a git push.

Confirm `next.config.mjs`'s `output: "export"` produces an `out/` directory on `npm run build` (Next 14 does this automatically when `output: "export"` is set — no separate `next export` command needed).

---

## 3. Homepage & design system — make it look like a real publication, not an AI template

The current homepage (`src/app/page.tsx`) is a generic AI-template look: centered hero, `blue-600` gradient CTA box, soft-shadow rounded cards, an inert read-only search input, Inter font everywhere. **Replace it entirely.** Specifically avoid every item in this list — these are the immediate visual tells of an AI-generated site:

**Do not do:**
- Centered hero with a vague headline + one generic CTA button + empty decorative search bar that does nothing.
- Default Tailwind `blue-600`/`indigo-600` as the primary brand color.
- Icon-in-a-colored-circle for every "feature" (the 3-icons-in-a-row pattern).
- Uniform `rounded-lg` + `shadow-sm` on literally every card with no variation in the layout grid.
- Generic stock-photo-style illustrations or 3D blob shapes.
- Inter as the only font with no display/serif contrast for headlines.
- Placeholder testimonials, fake "10,000+ homeowners trust us" stats, or emoji in headings.

**Do this instead — concrete art direction:**
- **Color palette:** Warm, editorial, trustworthy — not SaaS-blue. Primary ink: `#1C2B24` (deep charcoal-forest). Accent: `#B5651D`(burnt terracotta/rust — used sparingly for links, price highlights, and CTAs, evokes "home/craft" without being a cliché "warm orange startup" gradient). Background: warm off-white `#FAF7F2`, not pure white. Success/price-good: `#3F6E52` (muted forest green). Keep it to these 4–5 colors total, no gradients.
- **Typography:** Pair a serif display font for headlines with a clean sans for body/UI — e.g. `"Source Serif 4"` (or `"Lora"`) for H1/H2 headings, `"Inter"` or `"IBM Plex Sans"` for body copy, tables, and UI chrome. This serif/sans contrast is what separates an editorial cost-guide site from a generic SaaS template.
- **Homepage structure (build exactly these sections, in this order):**
  1. **Masthead-style header** — logo wordmark + tagline, not a hero image. Small "Updated weekly · [N] cost guides" trust line under the nav.
  2. **Lead module**: NOT a centered hero. Use an asymmetric two-column layout — left column: a real, specific H1 ("What Does It Actually Cost to Fix or Replace Your Home?"), a 2-sentence sub-headline with a real number in it (e.g., pull the actual roof-replacement average once written), and a **functional** search/filter input that filters the visible article list client-side (no dead decorative inputs) — right column: a "Recently updated cost guides" list of 4 real articles with their price range shown inline (e.g. "Roof Replacement — $7,500–$14,000").
  3. **"Browse by category" section** — the 7 pillar cards, but styled as a clean editorial index (title + 1-line description + article count), not icon-circle SaaS cards.
  4. **"Most-asked cost questions" module** — 8 Tier-A articles listed as a dense, scannable table/list (title + price range + pillar tag), not big visual cards. This mirrors how This Old House/HomeGuide surface content and reads as authoritative rather than decorative.
  5. **"How we calculate costs" trust module** — 2–3 sentences + a link to `/methodology/`, plus 3 concrete trust markers (e.g., "Sourced from contractor surveys & industry pricing data," "Updated monthly," "Written by [real author role], reviewed for accuracy") — no fake numbers.
  6. **Flagship calculator callout** — link to the Home Maintenance Cost Calculator article, styled as a distinct utility module (bordered box, not a gradient banner).
  7. Footer (already exists — verify it links to all 7 pillars + legal pages + methodology).
- **No stock icon libraries for decoration.** If icons are used (e.g., a magnifying glass in the search input), use a single consistent icon set (Lucide is already idiomatic in this stack) sparingly — functional only, not decorative filler.

Apply the same palette/typography system to pillar pages and article pages (`CostRangeBox`, `ComparisonTable`, etc. components) so the whole site feels like one coherent publication, not a homepage skin over a generic template.

---

## 4. Content — all 50 articles must be real, complete, and not read as AI-generated

This is the core deliverable. Every one of the 50 `.mdx` files in `src/content/articles/` must be rewritten as a **complete, accurate, 1,200–2,200 word article** (length should match topic complexity — a kitchen remodel guide needs more depth than a single-fact utility-bill table). No placeholders, no `{{COST_LOW}}` tokens may remain anywhere in the codebase when you are done — grep for `{{` across `src/content` before finishing and resolve every match.

### 4.1 Verified starting figures (use these as your factual baseline for the 5 flagship articles — do not contradict them without a stated reason)

- **Roof replacement** (`roof-replacement-cost.mdx`): National average **$10,000**, typical range **$7,500–$14,000** (source: Fixr.com cost guide, retrieved during planning research). Per-square-foot: **$4.75 avg, $3.75–$11 range**. Roof repair (not replacement) averages **$1,150**. ROI on replacement: **60–70%** value recouped. Material cost tiers: asphalt shingles $6,000–$10,000; metal $14,000–$38,000; slate $20,000–$60,000. Note in-article that other publishers (This Old House) cite a higher national average (~$15,439 for a 2,000 sq ft asphalt roof) — present both, explain the variance is driven by regional labor cost and whether the figure includes tear-off/disposal, and give your own clearly-labeled blended estimate.
- **Kitchen remodel** (`average-kitchen-remodel-cost.mdx`): Multiple independent sources converge on **$14,586–$41,549, average $26,943** (Angi, Bob Vila — same underlying data source, cite as one aggregator figure). HomeGuide cites a wider **$15,000–$50,000** range. Use $15,000–$50,000 as the honest full range, $26,943 (~$27,000) as the realistic national average, and explain the range is driven by scope (cosmetic refresh vs. full gut renovation) and cabinet/countertop tier.
- **Water heater replacement** (`cost-to-replace-water-heater.mdx`): Typical range **$800–$3,500**, typical project **~$1,400** for a standard tank unit. Tankless units cost significantly more upfront — research and state the real tankless range yourself (do not guess a number not verified above; if you cannot verify a real figure, present it as a clearly labeled estimate with reasoning, e.g. "tankless units and installation typically run several times a standard tank replacement due to venting and gas-line modifications").
- **HVAC replacement / repair-vs-replace** (`new-hvac-system-cost.mdx`, `hvac-repair-vs-replace.mdx`): New full system **$5,000–$12,500** installed. The **"$5,000 Rule"** is a real, commonly-cited decision heuristic: multiply the repair estimate by the system's age in years — if that number exceeds roughly $5,000, replacement is usually the better financial call. Explain this rule concretely with a worked example (e.g., a 12-year-old unit needing an $800 repair: 12 × $800 = $9,600 → exceeds $5,000 → lean replace).
- **Homeowners insurance** (`average-cost-of-homeowners-insurance.mdx`): No verified national figure was captured during planning research — you must source a real, current national average and 3–5 state examples from a live, citable source before writing this article, and clearly label it as sourced (name the source) rather than presenting an invented number as fact.

### 4.2 For the remaining ~45 articles

Research and use real, defensible figures for every cost claim. If you have live web/search access, use it — prioritize named, citable sources (contractor-pricing aggregators, industry cost-data publishers, government/BLS data for utility costs) the same way the figures in §4.1 were sourced. If you do **not** have live research access in your execution environment, you must still avoid fabricating false precision: give ranges grounded in realistic, defensible reasoning, explicitly state in the article's methodology callout (see §4.4) that the figure is "HomeCostGuide's estimate based on typical regional contractor pricing" rather than presenting it as a cited fact. Never blend the two without distinguishing them — this is a hard requirement from the original site brief because these numbers get used for real budgeting decisions.

### 4.3 Writing style — this is the anti-AI-detection requirement

Every article must read like it was written by a specific, opinionated human home-improvement writer, not generated text. Concretely:

**Never do these (the most common AI writing tells):**
- Never open with "Whether you're a first-time homeowner or a seasoned renovator, this guide will..." or any structural equivalent that restates the reader's situation before saying anything useful.
- Never write "In today's [fast-paced/ever-changing] world" or "In conclusion" or "It's important to note that" or "When it comes to X" as a sentence opener.
- Never use a perfectly symmetrical rule-of-three list ("efficient, effective, and economical") as a crutch — vary list lengths, use 2 or 4 items when that's what's actually true.
- Never write a generic, evenly-balanced "pros and cons" list where every pro has a suspiciously matching con — real trade-offs are lopsided.
- Never end a section with a vague hedge like "costs can vary depending on several factors" without immediately naming the actual factors and their dollar impact.
- Never repeat the exact same paragraph shape (topic sentence, three generic supporting sentences, soft transition) section after section — vary sentence length and paragraph length noticeably within the same article.
- Never write a closing "summary" section that just restates the article's headings in prose. End with a concrete, practical next step instead (e.g., "Get two written quotes before you sign anything — a $3,000 spread between bids on the same job is common, and the cheapest bid is not always the trap it sounds like").

**Always do these:**
- Lead every article's first 100 words with the actual number (average and range) — no throat-clearing.
- Include at least one specific, concrete scenario or example with real numbers worked out (like the HVAC $5,000-Rule example above) in every article.
- Take an actual position where the evidence supports one ("for most homeowners, repairing is the better call below X years of age" — not just "it depends").
- Vary structure by topic: a repair-vs-replace article should foreground a decision framework; a remodel-cost article should foreground a cost breakdown table by category (labor/materials/permits); a utility-bill article should foreground the data table.
- Use plain, direct language a homeowner under financial stress would actually want — short sentences are fine when the point is simple; use a longer sentence when a real nuance needs it. Do not smooth every sentence to the same length.

### 4.4 Required structure per article

Match this to each article's assigned `format` field in `src/lib/content.ts` (`guide`, `calculator`, `comparison-table`, `decision-table`, `data-table`):

1. H1 (article title, from `content.ts`)
2. "Last updated: [Month Year]" + author byline (use the shared `AuthorBio` component)
3. `CostRangeBox` populated with real low/avg/high figures
4. Table of contents (auto-generated from H2s via `TableOfContents`)
5. Body sections (H2s) — for guides: "What Drives the Cost," "Cost by [Size/Material/Type]," "Repair vs. Replace" (where relevant), "Ways to Save," "Financing/Paying for It." For comparison-table/decision-table/data-table formats, lead with the interactive component immediately after the cost box, then support it with explanatory prose.
6. The relevant interactive component wired to real data (`CostCalculator`, `ComparisonTable`, `RepairVsReplaceWidget`, or `HouseholdBillTable` per §4.5).
7. FAQ section (4–6 real questions, matching the "in their own words" user-research questions from `BUILD_PLAN.md` §2 where relevant to the topic) rendered via `FAQAccordion`.
8. `LeadGenCTA` module.
9. `RelatedArticles` (same pillar ×3, one cross-pillar link).
10. One-sentence methodology note + link to `/methodology/` ("Cost data sourced from [X]; see our full methodology.").

### 4.5 Wire the interactive components to real logic, not decoration

- `RepairVsReplaceWidget` (used on the 6 Template-A articles: `roof-repair-vs-replacement`, `hvac-repair-vs-replace`, `furnace-repair-vs-replace`, `ac-repair-vs-replace`, `refrigerator-repair-vs-replace`, `garage-door-repair-vs-replace`): implement the real "$5,000 Rule"-style logic — accept repair cost estimate + unit age (or % of replacement cost as a simpler fallback) as inputs, output a plain-language recommendation.
- `HouseholdBillTable` (used on `average-electric-bill-by-household-size`, `average-water-bill-by-household-size`): populate with a real household-size-segmented data table (1 person through 5+, apartment vs. house), sourced or clearly labeled as an estimate per §4.2's rule.
- `CostCalculator`: for every `format: "calculator"` article, configure real input fields relevant to that specific project (square footage, material tier, region multiplier) with a real formula derived from the article's own stated cost-per-unit figures — the calculator's output must always be consistent with the prose cost range stated in the same article.
- `ComparisonTable`: populate with real side-by-side rows (cost, lifespan, pros, cons) — no "Lorem ipsum" or generic placeholder rows.

---

## 5. Flesh out the required trust/legal pages

These currently exist as thin stubs — write real content for each:
- `/about/` — a real editorial mission statement and a named point of contact/editorial identity (do not present a fictional large team; a small, honestly-described operation is fine and more trustworthy than a fake "our team of 50 experts").
- `/methodology/` — this is the most important trust page on the site. Explain concretely: where base cost data comes from, how ranges are built (low/avg/high and what drives movement within the range), how often pages are reviewed/updated, and an explicit statement that figures are national averages that vary by region. Every article links here — it must actually deliver on that promise.
- `/editorial-guidelines/` — review cadence, correction policy, how sources are chosen.
- `/contact/` — a real, working contact method (form or email).
- `/privacy-policy/` and `/terms/` — standard content; adjust for AdSense's required disclosures (cookie/ad-personalization notice) since this site will run AdSense per `BUILD_PLAN.md`.
- `/calculators/` — index page linking to every interactive calculator on the site.

---

## 6. Technical SEO checklist (verify every item before considering the build done)

- [ ] `next.config.mjs` matches §1 exactly; `npm run build` produces a working `out/` directory with no errors.
- [ ] `public/.nojekyll` exists and survives the export.
- [ ] `src/app/sitemap.ts` emits absolute URLs using `SITE_URL` from `src/lib/site.ts` (includes the `/HomeCostGuide` path) for all 7 pillar pages, all 50 articles, and all static pages — verify the generated `out/sitemap.xml` after build actually contains correct, resolvable absolute URLs (open the file and check).
- [ ] `src/app/robots.ts` points its `sitemap` field at `${SITE_URL}/sitemap.xml` and allows all crawling.
- [ ] Every page has a unique `<title>` and meta description via `generateMetadata()` — no two pages share the default layout title.
- [ ] Canonical `<link rel="canonical">` on every page pointing to its own absolute `SITE_URL`-based URL.
- [ ] Open Graph (`og:title`, `og:description`, `og:url`, `og:type`) and Twitter card meta tags on every article and pillar page.
- [ ] JSON-LD: `Article` + `FAQPage` + `BreadcrumbList` on every article page; `WebSite` + `ItemList` on homepage; `BreadcrumbList` on pillar pages. Verify with Google's Rich Results Test format mentally (correct required fields present) since live testing isn't possible pre-deploy.
- [ ] A real favicon set (`favicon.ico`, apple touch icon, and a `site.webmanifest`) — not the default Next.js icon.
- [ ] All images have descriptive `alt` text; since `images.unoptimized: true` is required for static export, use appropriately pre-sized/compressed source images rather than relying on Next's optimizer.
- [ ] No broken internal links anywhere — every `Link href` must resolve to a real route given the 7 pillars × 50 articles actually defined in `content.ts`. Cross-check every `RelatedArticles` and pillar-page grid link programmatically (e.g., a small script or manual pass) rather than assuming.
- [ ] Run a final grep across `src/content` and `src/app` for leftover placeholder tokens: `{{`, `TODO`, `Lorem ipsum`, `TBD` — zero matches allowed.
- [ ] Run a grep for the AI-tell phrases listed in §4.3 ("In today's", "In conclusion", "It's important to note", "Whether you're") across `src/content/articles/*.mdx` — zero matches allowed.

---

## 7. Build order

1. Fix the `layout.tsx` encoding bug (§0).
2. Implement `next.config.mjs`, `src/lib/site.ts`, and update `sitemap.ts`/`robots.ts` (§1).
3. Add `.github/workflows/deploy.yml` and `public/.nojekyll` (§2).
4. Add `generateStaticParams` + `generateMetadata` to both dynamic route files and every static page (§1.2).
5. Rebuild the homepage per §3's exact section spec, and restyle shared components (`CostRangeBox`, `ComparisonTable`, `PillarCard`, `ArticleCard`, `Nav`, `Footer`) to match the new color/typography system so the whole site is visually consistent.
6. Write all 50 real articles per §4, wiring each to its correct interactive component with real logic/data (§4.5).
7. Flesh out the 6 trust/legal pages (§5).
8. Add real favicon/manifest assets.
9. Run `npm run build` locally; fix all errors; open `out/sitemap.xml` and `out/robots.txt` to manually verify correctness.
10. Run every checklist item in §6 explicitly; fix any failures.
11. Commit and push to `main` — this triggers the GitHub Actions workflow automatically. In your final summary, remind the human to confirm **Settings → Pages → Source → GitHub Actions** is selected in the repo settings (one-time manual step you cannot perform via git).
12. In your final summary to the human, list: (a) any cost figures you were unable to verify with a live source and had to present as a clearly-labeled estimate, (b) any judgment calls you made where this prompt was ambiguous, (c) confirmation that all 50 articles are complete with no placeholders remaining.
