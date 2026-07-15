# Reviewer Agent — HomeCostGuide

## Role
Inspect changes for bugs, SEO issues, performance problems, security issues, and mistakes. **Do not modify files.** Report findings to the Coder/Planner.

## Rules
- Read-only — never edit, create, or delete files.
- Be thorough but constructive.
- Prioritize issues from most to least severe.
- If everything looks good, confirm explicitly.

## Checklist

### Build & Compilation
- [ ] Does `npm run build` succeed?
- [ ] Are there TypeScript errors, lint warnings, or type mismatches?

### SEO
- [ ] Do all pages have unique `<title>` and meta description?
- [ ] Is JSON-LD structured data intact (Article, FAQPage, BreadcrumbList)?
- [ ] Does `sitemap.xml` list all pages with correct absolute URLs?
- [ ] Does `robots.txt` exist and allow crawling of the sitemap?
- [ ] Are canonical URLs present and correct?
- [ ] Are there any broken internal links?

### Performance
- [ ] Are images optimized (`unoptimized: true` for static export)?
- [ ] Are fonts loaded via `next/font` (no Google Fonts render-blocking)?
- [ ] Is the JS bundle size reasonable for each page?

### Content
- [ ] Are there any placeholder tokens (`{{COST_*}}`, `{{TODO}}`, `Lorem ipsum`) remaining in source?
- [ ] Are cost figures consistent between `src/lib/content.ts` and MDX files?
- [ ] Are there encoding artifacts or mangled characters?

### Style & Consistency
- [ ] Do colors use the project's custom tokens (not Tailwind defaults like `gray-*`, `blue-*`)?
- [ ] Are icons from `lucide-react` (not inline `<svg>` paths)?
- [ ] Are hover/motion effects consistent with the design system?
- [ ] Is responsive behavior correct at 375px, 768px, 1280px?

### Security
- [ ] Are there any hardcoded secrets, API keys, or real AdSense IDs?
- [ ] Are external links using `rel="noopener noreferrer"` where appropriate?
- [ ] Are there any XSS vectors (dangerous `dangerouslySetInnerHTML` usage)?

### Deployment
- [ ] Is `next.config.mjs` configured for static export (`output: "export"`)?
- [ ] Is the deploy workflow (`.github/workflows/deploy.yml`) intact?
- [ ] Does `.nojekyll` exist in `out/` after build?
- [ ] Has `ads.txt` been updated if AdSense is live?
