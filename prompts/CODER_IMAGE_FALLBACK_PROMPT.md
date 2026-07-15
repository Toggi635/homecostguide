# CODER TASK: Defensive Image Fallback + Social-Preview Cache Fix (Diagnosis-First)

## Context

The site owner reported some images showing only clipped alt text (e.g. "...National average cost range illustratio" cut off mid-word) instead of the actual image. This is the classic symptom of a browser rendering a **cached social-preview object with no image**, clipped by a parent element with `overflow: hidden` (the `<figure>` wrapper in `src/app/[pillar]/[article]/page.tsx`).

## Diagnosis already completed — do not re-audit

The following has already been verified as fact. Do not re-check these:

1. All 150 article illustration image URLs (50 articles × hero/cost/format.svg) return HTTP 200 live, with correct `Content-Type: image/svg+xml`, and are well-formed SVG.
2. `og-default.png`, `icon.png`, `logo.png` all return HTTP 200 with correct `Content-Type: image/png`.
3. The homepage's rendered `og:image` meta tag correctly resolves through `metadataBase` (in `src/app/layout.tsx`) to `https://toggi635.github.io/homecostguide/og-default.png` — basePath is correctly preserved.
4. All three `<img>` elements in `src/app/[pillar]/[article]/page.tsx` (lines 148, 172, 205) already use the correct `${ASSET_PATH}/article-images/${article.slug}/...svg` pattern, where `ASSET_PATH` (line 61) is `process.env.NODE_ENV === "production" ? "/homecostguide" : ""` — this is correct and lowercase.
5. A full repo-wide grep of `src/` for raw unprefixed asset paths (`src="/`, CSS `background-image`/`url(`, and any `http-equiv`/CSP/Referrer-Policy meta tags) returned **zero matches**. There is no hidden unprefixed-path bug and no restrictive CSP/Referrer-Policy interfering with image loads.
6. `next.config.mjs`'s `basePath`/`assetPrefix` and `src/lib/site.ts`'s `SITE_URL` are correct and must NOT be touched.

## Conclusion

**There is no code bug causing images to fail to load right now.** The reported symptom is almost certainly a **stale cached social-media link-preview** (most likely Facebook's Sharing Debugger cache, which can persist for weeks) from before this site had `og:image`/canonical/icon tags, or before the article hero images existed. Do NOT attempt to "fix" the image-loading code as if something is currently broken — nothing is. Your job is:

1. Add ONE defensive improvement (described below) so that IF an image ever genuinely fails to load in the future, it degrades gracefully instead of showing clipped alt text.
2. That's the only code change. Do not touch anything else.

## Hard constraints

- Do **NOT** touch `next.config.mjs`'s `basePath`/`assetPrefix` or `src/lib/site.ts`'s `SITE_URL`.
- Do **NOT** re-introduce a top-level `"use client"` directive in `src/app/[pillar]/[article]/page.tsx` — it was deliberately kept as a server component. Isolate any interactivity into a small new child component, following the exact same pattern already used for `src/components/HomeSearch.tsx` (a small `"use client"` wrapper imported into a server component).
- Do **NOT** touch the 50 MDX article files.
- Do **NOT** add new npm dependencies.
- Do **NOT** change visual design beyond what's strictly needed for the fallback behavior (no restyle of existing working images).
- Do **NOT** fabricate a code bug elsewhere to "fix" — if you don't find one, don't invent one.

## Code change — the only change to make

### Step 1 — Create `src/components/ArticleImage.tsx`

```tsx
"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
}

export default function ArticleImage({ src, alt, width, height, className, loading }: ArticleImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full flex flex-col items-center justify-center gap-2 bg-paper text-muted py-10"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <ImageOff size={28} className="opacity-50" />
        <span className="text-xs text-center px-4">Image unavailable</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
```

Note: `lucide-react` is already a project dependency (used elsewhere, e.g. `Nav.tsx`), so `ImageOff` is available with no new dependency added.

### Step 2 — Update `src/app/[pillar]/[article]/page.tsx`

Add the import near the other component imports (after the `AuthorBio` import, alphabetical placement doesn't matter — just group with other component imports):

```tsx
import ArticleImage from "@/components/ArticleImage";
```

Replace each of the three `<img>` elements (the hero at line ~145-155, the cost chart at ~169-179, and the format overview at ~202-212) with `<ArticleImage>`, keeping the exact same `<figure>` wrapper, exact same `className`, `alt` text, `width`/`height`, and `loading` values — only swap the `<img ...>` tag itself (and remove the now-unused `{/* eslint-disable-next-line @next/next/no-img-element */}` comment lines, since `ArticleImage` internally handles that).

**Hero image** (currently lines 145–155):
```tsx
<figure className="my-6 rounded-card overflow-hidden border border-line">
  <ArticleImage
    src={`${ASSET_PATH}/article-images/${article.slug}/hero.svg`}
    alt={`${article.title} - National average cost range illustration`}
    width={1200}
    height={630}
    className="w-full h-auto"
    loading="eager"
  />
</figure>
```

**Cost chart image** (currently lines 169–179):
```tsx
<figure className="my-8 rounded-card overflow-hidden border border-line">
  <ArticleImage
    src={`${ASSET_PATH}/article-images/${article.slug}/cost.svg`}
    alt={`Cost range visualization for ${article.targetKeyword}: ${article.costLow} to ${article.costHigh}`}
    width={800}
    height={500}
    className="w-full h-auto"
    loading="lazy"
  />
</figure>
```

**Format overview image** (currently lines 202–212):
```tsx
<figure className="my-8 rounded-card overflow-hidden border border-line">
  <ArticleImage
    src={`${ASSET_PATH}/article-images/${article.slug}/format.svg`}
    alt={`${article.targetKeyword} cost guide overview`}
    width={800}
    height={500}
    className="w-full h-auto"
    loading="lazy"
  />
</figure>
```

Do not change anything else in this file — no other lines, no other logic.

## Why this approach

- `onError` requires a Client Component in React/Next.js; isolating it into `ArticleImage.tsx` (mirroring the existing `HomeSearch.tsx` pattern) means `src/app/[pillar]/[article]/page.tsx` stays a server component (needed for `generateStaticParams`/`generateMetadata` and for MDX server rendering).
- On failure, the `<figure overflow-hidden>` wrapper now contains a deliberately sized placeholder box (using `aspectRatio` to match the image's intended dimensions, so layout doesn't shift), not raw clipped alt text — this fully resolves the reported visual symptom for any genuine future failure.
- This does not change the visual result at all when images load successfully (the normal case, verified as 150/150 working) — the placeholder path is dead code until a real failure occurs.

## What you must NOT do

- Do not modify `ASSET_PATH`, `next.config.mjs`, or `src/lib/site.ts`.
- Do not add a CSP or Referrer-Policy meta tag — none currently exists and none is needed; do not add one speculatively.
- Do not attempt to force cache invalidation in code (e.g., do not add cache-busting query params to the image `src` — that would defeat legitimate CDN caching and is not the right layer to fix a social-crawler cache issue).

## Operational steps for the site owner (documentation only — not code, but include this verbatim in your final report so the site owner has it)

To force social platforms to drop their stale cached preview and re-scrape the current (correct) OG tags:

**Facebook / Instagram / Threads:**
1. Go to https://developers.facebook.com/tools/debug/
2. Paste the exact URL (e.g. `https://toggi635.github.io/homecostguide/`, and separately the specific article URL that showed the bug).
3. Click "Debug", then click **"Scrape Again"** (this forces Facebook to discard its cache and re-fetch the current OG tags/image).
4. Repeat for at least one article URL, e.g. `https://toggi635.github.io/homecostguide/home-maintenance/home-maintenance-cost-calculator/` (adjust to the actual affected slug).

**Twitter / X:**
1. Twitter's public Card Validator was deprecated, but re-sharing/re-posting the link on X (or waiting ~7 days for its cache to expire) typically resolves it. There is no reliable public manual re-scrape tool anymore; note this limitation to the site owner.

**LinkedIn:**
1. Go to https://www.linkedin.com/post-inspect/
2. Paste the URL and click "Inspect". This forces LinkedIn to re-fetch and re-cache the OG tags/image immediately.

**Discord / Slack:**
1. Neither has a public manual re-scrape tool. Share the URL with a cache-busting query string appended once (e.g. `?v=2`) to force a fresh fetch under a new cache key — this doesn't fix the old cached link but ensures any *newly shared* link works. The old previously-shared message's preview will remain stale until that platform's own cache naturally expires.

## Verification checklist — run before considering this done

1. Run `npm run build` and confirm zero errors/warnings introduced by this change.
2. Confirm `src/app/[pillar]/[article]/page.tsx` has NO top-level `"use client"` directive (grep the top of the file).
3. Confirm `src/components/ArticleImage.tsx` has `"use client"` as its first line.
4. Confirm all three `<img>` usages in the article page were replaced with `<ArticleImage>`, with identical `src`/`alt`/`width`/`height`/`className`/`loading` values preserved from the original (diff against the versions shown above).
5. Grep the repo for `no-img-element` to confirm the eslint-disable comments were removed from the article page (they're no longer needed there) but confirm `ArticleImage.tsx` itself doesn't need one either (it's fine either way — `ArticleImage.tsx`'s internal `<img>` should keep its own eslint-disable comment; only the two-line comment+img pairs inside the article page's three figures should be removed since the img tag itself is gone from that file).
6. Confirm `lucide-react`'s `ImageOff` icon exists in the installed version (check `node_modules/lucide-react` or just trust the build to fail loudly if not — if the build fails on this import, substitute any other already-used lucide icon, e.g. `ImageIcon`, and note the substitution in your report).
7. Visually confirm (by reading final file contents, since no browser is available) that on the success path (image loads), rendered output is pixel-identical to before — same className, same figure wrapper, same dimensions.

## Final report format

Structure your final report in these four sections:

**1. Files changed** — list every file created/modified (`src/components/ArticleImage.tsx` created; `src/app/[pillar]/[article]/page.tsx` modified).

**2. Improvements added** — plain-English: defensive image-load fallback preventing clipped-alt-text display on any future genuine image failure; no visual change on the success path.

**3. Remaining issues** — explicitly state: no code bug was found causing the originally reported symptom; the root cause is assessed as stale social-crawler cache (most likely Facebook), which is an operational fix, not a code fix, and is outside the scope of a repo change.

**4. Recommended next steps requiring site-owner action**:
   - Run the Facebook Sharing Debugger "Scrape Again" step (and LinkedIn Post Inspector) on the homepage and at least one affected article URL, per the operational steps above.
   - If the issue persists after re-scraping on a specific platform after 24–48 hours, capture a screenshot of exactly which platform/app is showing the broken preview and re-open with that detail — the current evidence doesn't point to a code fix, but confirming the exact platform would let us investigate that platform's specific crawler behavior further if needed.
   - Consider that if this was reported from a live production page view (not a shared-link preview), it's worth getting the exact browser/device/URL from the site owner, since ad blockers or aggressive privacy extensions can occasionally interfere with `<img>` rendering in ways that wouldn't show up in a direct `curl`/`fetch` check — this hasn't been observed yet but isn't fully ruled out without that detail.
