# HomeCostGuide — Design & Frontend Polish Prompt (v3, for the executing AI agent)

## Context

The site currently builds and (once GitHub Pages is configured correctly per `FUNCTIONAL_SITE_PROMPT.md`) deploys, but it is visually unfinished: raw default Tailwind classes (`bg-blue-600`, `rounded-lg`, `shadow-sm`) with no actual design system, no custom typography, no icons, no hover/motion polish, and a plain-block layout in places. The site owner's exact complaint: it "looks like shit." This prompt is the complete, self-contained fix. Read it fully before writing code. Do not ask follow-up questions.

**Do not touch, and do not re-litigate:** content (the 50 MDX articles), the GitHub Pages deploy config (`next.config.mjs`, `.github/workflows/deploy.yml`), the AdSense placeholder wiring, or the "no affiliates yet" decision from previous passes. This pass is CSS/layout/component-visual only, plus adding an icon library and Google Fonts. If you find yourself editing article content or deploy config, stop — that's out of scope here.

**One exception:** the homepage (`src/app/page.tsx`) content/structure DOES need real layout changes as part of this pass (hero section, card layout, etc.) — the actual text/copy can stay close to what's there, but the section structure needs rebuilding per §5 below.

---

## 0. Design tokens — final decision, implement exactly this (do not pick your own palette)

**Color palette (4 colors max, as required):**
- `ink` (primary text/dark UI): `#1C2B24` — deep charcoal-forest, use for headings, nav text, footer background.
- `paper` (background): `#FAF7F2` — warm off-white, use as the page background instead of pure white.
- `rust` (primary accent — links, CTAs, price highlights, active nav state): `#B5651D` — burnt terracotta.
- `forest` (secondary accent — success states, "good deal" price framing, secondary buttons): `#3F6E52` — muted forest green.
- Neutral grays for borders/muted text only (`#E7E2D9` warm-gray border, `#6B6459` warm-gray muted text) — do not use Tailwind's default cool `gray-*` scale, it clashes with the warm palette above.

**Typography:**
- Headings (`h1`–`h3`): **`"Source Serif 4"`** (Google Font) — serif, editorial, trustworthy.
- Body/UI/nav/buttons/tables: **`"Inter"`** (already installed) — keep for body copy, but stop using it for headings.
- Load `Source Serif 4` via `next/font/google` in `src/app/layout.tsx` alongside the existing Inter loader, expose both as CSS variables, and wire them into Tailwind's `fontFamily` theme (see §1).
- Base body font size `16px`/`1rem`, line-height `1.7` for article prose specifically (readability for long-form cost guides), `1.5` for UI chrome.

**Spacing/shape system:**
- Border radius: standard `0.75rem` (`rounded-xl`) for cards, `0.5rem` (`rounded-lg`) for buttons/inputs — pick ONE consistent scale and use it everywhere, not a mix of `rounded-md`/`rounded-lg`/`rounded-2xl` at random (an actual bug in the current code).
- Shadows: use a soft, warm-tinted shadow, not Tailwind's default cool gray shadow. Add a custom shadow token (see §1) rather than plain `shadow-sm`/`shadow-md`.

---

## 1. Implement the design tokens in Tailwind + fonts in the root layout

**Install dependencies:**
```
npm install lucide-react
```

**`tailwind.config.ts`** — extend the theme (do not replace the whole file, extend it):
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C2B24",
        paper: "#FAF7F2",
        rust: { DEFAULT: "#B5651D", dark: "#945116" },
        forest: { DEFAULT: "#3F6E52", dark: "#325940" },
        line: "#E7E2D9",
        muted: "#6B6459",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgb(28 43 36 / 0.06), 0 1px 2px 0 rgb(28 43 36 / 0.04)",
        card: "0 4px 16px 0 rgb(28 43 36 / 0.08)",
        lift: "0 12px 24px -4px rgb(28 43 36 / 0.16)",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
```

**`src/app/layout.tsx`** — add the second font and wire both as CSS variables:
```tsx
import { Inter, Source_Serif_4 } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", weight: ["500", "600", "700"] });
```
Apply both variable classNames to `<body>` (e.g. `className={`${inter.variable} ${sourceSerif.variable} font-sans bg-paper text-ink`}`). Set `bg-paper text-ink` on the body as the new global background/text color, replacing the default white/gray.

**`src/app/globals.css`** — replace the placeholder `--color-primary` variables (unused leftovers from before Tailwind theme tokens existed) with real base styles:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1, h2, h3 {
    font-family: var(--font-source-serif);
    letter-spacing: -0.01em;
  }
  body {
    font-family: var(--font-inter);
  }
}

@layer utilities {
  .prose-article {
    line-height: 1.75;
  }
}
```

---

## 2. Navigation bar — logo + menu, sticky, with real hover states

Rebuild `src/components/Nav.tsx`:
- Sticky header (`sticky top-0 z-50`), `bg-paper/95 backdrop-blur-sm border-b border-line`.
- Left: a real logo lockup — a small `lucide-react` `<Home />` or `<Calculator />` icon inside a `rust`-colored rounded square (e.g. `bg-rust text-white rounded-lg p-1.5`), next to the wordmark "HomeCostGuide" in `font-serif font-semibold text-ink text-lg`. Do not just render plain text with no mark.
- Right: horizontal menu for the 7 pillars + Calculators + About, each as a `text-sm font-medium text-ink/70 hover:text-rust transition-colors` link, with the current/active route (if determinable via `usePathname`) shown in `text-rust`.
- On mobile (`<768px`): collapse the pillar links into a hamburger menu (a simple client-component toggle using `lucide-react`'s `Menu`/`X` icons is fine — this is the one place a small `"use client"` component is justified since GitHub Pages static export fully supports client components, they just don't SSR-fetch data).
- Add a 1px bottom border using the `line` color token instead of default gray.

---

## 3. Hero section — real headline, gradient/visual treatment, clear CTA

Rebuild the top of `src/app/page.tsx`:
- NOT centered — asymmetric two-column layout on desktop (`lg:grid lg:grid-cols-2 lg:gap-12 items-center`), stacked on mobile.
- Left column: `<h1>` in `font-serif text-4xl md:text-5xl font-semibold text-ink leading-tight` with the existing headline copy; a sub-headline in `text-lg text-muted`; a **functional** search input (filters the article list client-side — small client component) styled with `rounded-btn border border-line bg-white px-4 py-3 shadow-soft focus:ring-2 focus:ring-rust/40 focus:border-rust outline-none`, with a `lucide-react` `<Search />` icon inside it (not just a raw SVG path pasted inline like the current code has); a primary CTA button (see §8 for the shared button style) linking to the top Tier-A article or `/calculators/`.
- Right column: **do not use a stock photo.** Use a subtle brand-colored gradient/graphic panel instead — e.g. a `rounded-card` panel with a soft diagonal gradient from `forest/10` to `rust/10` over `paper`, containing a short "Recently updated cost guides" list (3–4 real articles with their price range shown inline, each row with a small colored dot or icon per pillar) rendered as a clean list, not photos. This gives visual weight to the hero without resorting to generic stock imagery or 3D blob illustrations.
- Add a subtle `animate-fade-up` entrance on the hero text (respecting `prefers-reduced-motion` — wrap the animation utility in a `motion-safe:` variant, e.g. `motion-safe:animate-fade-up`).

---

## 4. Cards — articles, pillars, tools

Rebuild `ArticleCard.tsx` and `PillarCard.tsx` (and apply the same pattern anywhere else cards are used, e.g. the calculators index):
- Base card style: `bg-white border border-line rounded-card p-5 shadow-soft transition-all duration-200`.
- Hover state (see §9 for full hover spec): `hover:shadow-lift hover:-translate-y-0.5 hover:border-rust/40`.
- `ArticleCard` layout: pillar tag (small colored pill, `bg-forest/10 text-forest text-xs font-medium px-2 py-0.5 rounded-full` — pick per-pillar tag colors from the 4-color system, don't invent a 5th/6th color, alternate between `rust` and `forest` tints) + title in `font-serif text-base font-semibold text-ink` + a visible price-range snippet in `text-rust font-medium text-sm` (e.g. "$7,500–$14,000") pulled from the article's cost data so cards are informative at a glance, not just a title.
- `PillarCard` layout: a `lucide-react` icon per pillar (pick one relevant icon per pillar — e.g. `Home` for Roofing & Exterior, `Wind`/`Thermometer` for HVAC & Energy, `Droplet` for Plumbing, `Zap` for Electrical, `UtensilsCrossed` for Kitchen & Bath, `Paintbrush` for Interior Renovation, `Wrench` for Home Maintenance) inside a small `rounded-lg` tinted-background icon badge, the pillar name in `font-serif font-semibold`, the description text, and an article-count chip.
- Use CSS Grid for card layouts (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`) — this already exists in some places, keep it, just apply the new card styling inside.

---

## 5. Homepage section rebuild (Flexbox/Grid throughout, not plain stacked blocks)

Rebuild `src/app/page.tsx` section-by-section using Grid/Flexbox layouts (no bare stacked `<div>`/`<section>` blocks with no layout system applied):
1. Hero (§3).
2. "Browse by Category" — grid of 7 `PillarCard`s.
3. "Most-Searched Cost Guides" — grid of `ArticleCard`s for the Tier-A articles, in a responsive grid, each card showing its price range per §4.
4. "How We Calculate Costs" trust module — a flex row (icon + text) with 3 short trust markers side-by-side on desktop (`flex flex-col md:flex-row gap-6`), each with a small `lucide-react` icon (`BadgeCheck`, `RefreshCw`, `FileText` or similar), not a wall of plain text.
5. Flagship calculator callout — a distinct bordered panel (not the current flat `bg-blue-600` block), styled with the `forest` accent instead of blue, with a `Calculator` icon.
6. Footer — already grid-based, just restyle colors/spacing to match the new token system (§0).

---

## 6. Typography pass across article/pillar pages

- Article body text (inside the MDX render area) should get the `.prose-article` line-height and use `font-sans`, while all headings inside articles automatically pick up `font-serif` from the global `h1,h2,h3` rule in §1.
- Increase heading size hierarchy contrast: article `h1` should be visibly larger/heavier than `h2`, which should be visibly larger than `h3` — audit current MDX rendering (likely using default Tailwind Typography sizes or unstyled browser defaults) and correct if the hierarchy is flat.
- `CostRangeBox` should use `font-serif` for the actual dollar figures (numbers get the trust/weight treatment) and `font-sans` for labels.

---

## 7. Responsive design

- Every layout built in this pass must be checked at three widths: **375px** (mobile), **768px** (tablet), **1280px+** (desktop). Use Tailwind's `sm:`/`md:`/`lg:` breakpoints consistently — the codebase already does this in places, extend the same convention, don't introduce a different breakpoint system.
- Nav collapses to hamburger below `md`.
- Hero goes single-column below `lg`.
- Card grids go to 1 column below `sm`, 2 at `sm`, 3 at `lg`.
- No horizontal overflow/scroll at 375px anywhere — check the cost tables/comparison tables specifically (wrap wide tables in `overflow-x-auto` on mobile rather than letting them break layout).

---

## 8. Shared button component (new)

Create `src/components/Button.tsx` — a single shared button component used everywhere a CTA currently exists as ad-hoc `<a>`/`<button>` markup (hero CTA, flagship calculator callout, 404 page "Go Home", any remaining CTA in article templates):
```tsx
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-btn px-5 py-2.5 text-sm font-medium transition-all duration-150";
  const variants = {
    primary: "bg-rust text-white hover:bg-rust-dark shadow-soft hover:shadow-card hover:-translate-y-0.5",
    secondary: "bg-forest text-white hover:bg-forest-dark shadow-soft hover:shadow-card hover:-translate-y-0.5",
    ghost: "bg-transparent text-ink border border-line hover:border-rust hover:text-rust",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
```
Replace every existing ad-hoc CTA button/link across the homepage, 404 page, and article template with this component for visual consistency.

---

## 9. Hover effects & motion — apply consistently, not just on buttons

- Cards: `hover:shadow-lift hover:-translate-y-0.5` (already specified in §4) — apply to `ArticleCard`, `PillarCard`, and any calculator/tool index cards.
- Buttons: `hover:-translate-y-0.5` + shadow increase (§8) + color darken.
- Nav links: `hover:text-rust` color transition only (no movement on nav links — movement on every hover everywhere reads as noisy).
- All transitions: `transition-all duration-150` to `duration-200` range — keep it snappy, not sluggish (avoid anything above ~300ms for hover states).
- Respect `prefers-reduced-motion`: any transform-based hover/entrance animation should be wrapped in `motion-safe:` where it's decorative (entrance fades); simple color transitions don't need this since they're not motion-sickness triggers.

---

## 10. Icons — Lucide only, used functionally not decoratively-random

- Use `lucide-react` exclusively (already specified for install in §1) — do not mix in Font Awesome or another icon set, and do not use raw inline SVG paths pasted into JSX (the current search-icon SVG in the homepage is exactly this anti-pattern — replace it with `<Search />` from lucide).
- Icon usage map (use these specific icons, don't pick arbitrarily so the visual language stays consistent):
  - Nav logo mark: `Home` or `Calculator`.
  - Search input: `Search`.
  - Mobile menu toggle: `Menu` / `X`.
  - Pillar cards: per-pillar icon list from §4.
  - Trust module: `BadgeCheck`, `RefreshCw`, `FileText`.
  - Flagship calculator callout: `Calculator`.
  - FAQ accordion expand/collapse (check `FAQAccordion.tsx` — if it currently uses a raw `+`/`-` character or inline SVG, replace with `ChevronDown` that rotates on open via a `transition-transform` + conditional `rotate-180` class).
  - Repair-vs-replace widget: `Wrench` (repair) / `RefreshCw` (replace) as small inline indicators on each option.
- Icons should be sized consistently per context (`size={18}` or `size={20}` for inline/nav icons, `size={24}`–`28` for card/badge icons) — don't leave default 24px everywhere with no consideration of context.

---

## 11. QA checklist — verify before reporting done

- [ ] `npm run build` succeeds with zero errors after adding `lucide-react` and the font/Tailwind changes.
- [ ] Visually confirm (open the built `out/` pages in a browser, or `npm run dev` locally) that: headings render in the serif font, body text in Inter, background is the warm off-white (not pure white), links/buttons are terracotta (not blue), nav is sticky with a visible logo mark.
- [ ] Homepage hero is a two-column asymmetric layout on desktop, single column on mobile, with a functional (not decorative/dead) search input.
- [ ] All card grids use CSS Grid and collapse correctly at 375px/768px/1280px with no horizontal overflow anywhere on the page.
- [ ] Every card and button has a visible, smooth hover state (shadow lift + slight upward translate on cards/buttons; color-only on nav links).
- [ ] No raw inline SVG path icons remain where a `lucide-react` icon would do the job — grep for `<svg` usage across `src/components` and `src/app` and confirm each remaining instance is either a `lucide-react`-rendered icon or something with no lucide equivalent.
- [ ] Only the 4 palette colors (plus the 2 warm-neutral border/muted-text tones) are used anywhere in the UI — grep for `blue-`, `indigo-`, `gray-` Tailwind classes across `src/` and replace any remaining default-Tailwind-color usage with the new tokens (`ink`, `paper`, `rust`, `forest`, `line`, `muted`).
- [ ] `prefers-reduced-motion` is respected on entrance/transform animations (`motion-safe:` prefix present where required).
- [ ] Report back: a short list of every file you touched, and confirmation that the build was visually spot-checked (not just compiled) at all three breakpoints.
