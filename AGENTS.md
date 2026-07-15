# HomeCostGuide — Agent System & Project Rules

## Agent Roles

This project uses three specialized OpenCode agents that work together:

| Agent | File | Responsibility |
|-------|------|----------------|
| **Planner** | `.opencode/agents/planner.md` | Analyze tasks, inspect project, create step-by-step plans — NEVER edits files |
| **Coder** | `.opencode/agents/coder.md` | Implements plans, edits/creates files, fixes bugs, adds features |
| **Reviewer** | `.opencode/agents/reviewer.md` | Inspects changes for bugs, SEO, performance, security — NEVER modifies files |

## Shared Project Rules

These rules apply to ALL agents at all times:

### General
- Never delete files without explicit permission.
- Never overwrite working features unnecessarily.
- Always preserve existing URLs and SEO value.
- Keep code clean, maintainable, and optimized.
- Explain important changes in commits.
- Avoid adding unnecessary dependencies.
- Check existing code before modifying it.
- Prefer simple solutions over complicated ones.

### Website / SEO
- Prioritize SEO in all decisions.
- Keep pages fast and mobile-friendly.
- Avoid duplicate content.
- Use proper semantic HTML (`<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`).
- Maintain good internal linking — no orphan pages.
- Do not remove metadata, schema markup, sitemap, `robots.txt`, or other SEO-critical files without a documented reason.
- Every page must have a unique `<title>` and meta description.
- Preserve JSON-LD structured data patterns.

### Content
- The 50 MDX article files (`src/content/articles/*.mdx`) are the site's core content — do not rewrite or truncate them without a content-specific task.
- Cost figures come from published sources (HomeGuide, Angi, Fixr, etc.) — do not invent or modify cost data.
- Article metadata lives in `src/lib/content.ts` — keep it in sync with MDX files.

### Architecture
- Next.js 14 App Router with static export (`output: "export"`).
- Tailwind CSS with custom design tokens in `tailwind.config.ts`.
- Icons via `lucide-react`.
- Fonts via `next/font/google` (Inter + Source Serif 4).
- Do not add server routes, API routes, or dynamic features that break static export.

### Workflow
1. When given a task, the **Planner** first analyzes it and produces a plan.
2. The **Coder** implements the plan.
3. The **Reviewer** inspects the changes and reports any issues.
4. The **Coder** addresses review feedback before marking done.

## Project Structure

```
project/
├── AGENTS.md                    # This file
├── .opencode/agents/
│   ├── planner.md               # Planner agent
│   ├── coder.md                 # Coder agent
│   └── reviewer.md              # Reviewer agent
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout (fonts, nav, footer)
│   │   ├── page.tsx             # Homepage
│   │   ├── not-found.tsx        # 404 page
│   │   ├── robots.ts            # robots.txt generation
│   │   ├── sitemap.ts           # sitemap.xml generation
│   │   ├── [pillar]/            # Pillar category pages
│   │   ├── [pillar]/[article]/  # Article pages
│   │   ├── about/
│   │   ├── calculators/
│   │   ├── contact/
│   │   ├── editorial-guidelines/
│   │   ├── methodology/
│   │   ├── privacy-policy/
│   │   └── terms/
│   ├── components/              # Shared UI components
│   ├── content/
│   │   └── articles/            # 50 MDX article files
│   └── lib/
│       ├── content.ts           # Pillars, articles, helpers
│       └── site.ts              # SITE_URL constant
├── prompts/                     # Build/design prompt archives
├── public/                      # Static assets, ads.txt, .nojekyll
├── tailwind.config.ts           # Design tokens
└── next.config.mjs              # Static export config
```
