# HomeCostGuide — Functional Site Fix Prompt (v2, for the executing AI agent)

## Context: what went wrong before

Two previous passes on this repo (`github.com/Toggi635/HomeCostGuide`) left it in a broken state:
1. A first agent wrote article content but never implemented GitHub Pages static-export config, `.nojekyll`, or a deploy workflow — resulting in a 404 because the repo root had no `index.html` at all (GitHub Pages was serving raw Next.js source files).
2. A follow-up pass fixed the Next.js export config (`next.config.mjs` now has `output: "export"`, `basePath: "/HomeCostGuide"`, etc.), added `.nojekyll`, and added a GitHub Actions workflow — and confirmed via a local `npm run build` that the site compiles into 70 real routes with working HTML/CSS/JS. **But the live URL (`https://toggi635.github.io/HomeCostGuide/`) is still returning 404 as of this writing.**

**The most likely remaining cause, which you must check FIRST before changing any code:** GitHub Pages has a repo setting at **Settings → Pages → Build and deployment → Source** that must be set to **"GitHub Actions"**, not **"Deploy from a branch."** If it's still set to "Deploy from a branch," the Actions workflow will run and succeed but its output will never actually get served — GitHub Pages will keep trying to serve raw branch content instead. You (the agent) most likely cannot change this setting yourself since it requires the GitHub web UI, not a git operation — if you have no way to change it, **state this explicitly and clearly as the #1 required manual action in your final summary**, don't bury it. If you do have GitHub API/CLI access in your environment, set it via `gh api` or the GitHub REST API `PATCH /repos/{owner}/{repo}/pages` with `build_type: "workflow"`.

Do not skip verifying this. A perfectly correct Next.js build is useless if GitHub Pages isn't configured to serve the Actions artifact.

## Your job in this pass, in priority order

1. **Verify and fix the deploy pipeline until the live site actually works** (§1).
2. **Add AdSense placeholder wiring** — clearly fake/placeholder IDs that don't error, ready to swap for real ones later (§2).
3. **Strip all affiliate/lead-gen functionality** — the site owner does not want affiliate links yet (§3).
4. **Fix remaining text-encoding bugs** (§4).
5. **Run a full functional QA pass** and report back concretely (§5).

Read this entire document before making changes. Do not ask the human follow-up questions — everything you need is here.

---

## 1. Make the live deployment actually work

Do these in order, verifying each step before moving to the next:

1. **Confirm `next.config.mjs`** has exactly:
   ```js
   output: "export",
   trailingSlash: true,
   basePath: isProd ? "/HomeCostGuide" : "",
   assetPrefix: isProd ? "/HomeCostGuide/" : "",
   images: { unoptimized: true },
   ```
   (where `isProd = process.env.NODE_ENV === "production"`). This should already be present — if it's not, something got reverted; re-add it.

2. **Run `npm ci && npm run build` locally** (or in your sandboxed environment) with `NODE_ENV=production`. Confirm:
   - Build completes with no errors.
   - An `out/` directory is produced containing `index.html` at its root, a `_next/` folder, and one folder per route (e.g. `out/roofing-exterior/roof-replacement-cost/index.html`).
   - Open `out/index.html` in a text viewer and confirm it contains real rendered HTML (a `<h1>`, nav links, etc.) — not an error page or blank shell.
   - Open `out/sitemap.xml` and confirm every `<loc>` starts with `https://toggi635.github.io/HomeCostGuide/`.
   - Confirm `out/.nojekyll` exists (empty file is fine — it just needs to exist).

3. **Confirm `.github/workflows/deploy.yml` exists** and matches this exactly (recreate it if missing or different):
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
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: "npm"
         - run: npm ci
         - run: npm run build
           env:
             NODE_ENV: production
         - run: touch ./out/.nojekyll
         - uses: actions/configure-pages@v5
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

4. **Check whether you have GitHub API/CLI access.** If yes: verify and, if necessary, set the Pages build source to Actions:
   ```
   gh api -X PUT repos/Toggi635/HomeCostGuide/pages -f build_type=workflow
   ```
   or check current status with `gh api repos/Toggi635/HomeCostGuide/pages`. If the repo has no Pages site created yet, create one pointed at GitHub Actions:
   ```
   gh api -X POST repos/Toggi635/HomeCostGuide/pages -f build_type=workflow
   ```
   If you have no such access, **do not silently skip this** — flag it as the top item in your final report with the exact manual steps (Settings → Pages → Source → GitHub Actions).

5. **Check whether the most recent Actions run succeeded.** If you have `gh` access: `gh run list --repo Toggi635/HomeCostGuide` and `gh run view <run-id> --repo Toggi635/HomeCostGuide --log-failed` for any failure. Fix any build failures found (e.g., missing env vars, lint errors treated as build errors, MDX parse errors) and push again.

6. **After pushing any fix, wait for the workflow to complete, then fetch the live URL** (`https://toggi635.github.io/HomeCostGuide/`) and confirm it returns HTTP 200 with real HTML content (not 404, not a blank page). Also spot-check 2–3 article URLs (e.g. `https://toggi635.github.io/HomeCostGuide/roofing-exterior/roof-replacement-cost/`) and the sitemap URL directly. Do not report success until you've actually confirmed a real 200 response with visible content — "the build succeeded locally" is not sufficient proof the site is live and functional.

---

## 2. AdSense — placeholders only, must not break the build

The site is not applying for/using AdSense yet, but the site owner wants the wiring ready to flip on later without another code change.

1. **Environment variable placeholder.** Add a `.env.example` file (commit this; do NOT commit a real `.env.local` with secrets) containing:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-0000000000000000
   ```
   Confirm `.env.local` is in `.gitignore` (it already should be) so nobody accidentally commits a real ID later.

2. **`AdSlot.tsx` component** already has placeholder-aware logic (renders a labeled gray placeholder box when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` isn't set, and a real `<div data-ad-slot>` when it is). Keep this behavior, but:
   - Fix the mangled encoding in the placeholder labels — they currently render literal `�?"` garbage characters instead of an em dash. Replace every `"Advertisement �?" After Intro"`-style string with a clean ASCII-safe separator, e.g. `"Advertisement — After Intro"` using a real em-dash character (U+2014) saved as proper UTF-8, or just use a plain hyphen (`"Advertisement - After Intro"`) if you can't guarantee your editor/environment preserves UTF-8 correctly — a plain hyphen is safer than a re-broken em dash.
   - The component must render a harmless, visually clear placeholder box (not an error, not a blank space, not a console error) when the env var is unset, which is the expected state for now.

3. **AdSense verification script placeholder in `<head>`.** In `src/app/layout.tsx`, add the standard AdSense loader script, but gated so it only injects when the env var is set to a non-placeholder value (skip loading a broken script tag when the ID is still the example placeholder):
   ```tsx
   const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
   const isRealAdsenseId = adsenseId && adsenseId !== "ca-pub-0000000000000000";
   ```
   and conditionally render (inside the `<head>` via `next/script` or a raw `<script>` in the root layout — static export supports this fine):
   ```tsx
   {isRealAdsenseId && (
     <script
       async
       src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
       crossOrigin="anonymous"
     />
   )}
   ```

4. **`public/ads.txt` placeholder.** Create `public/ads.txt` with a clearly commented placeholder line so the file exists and is served (AdSense checks for this at the domain root), e.g.:
   ```
   # Placeholder ads.txt — replace with your real AdSense publisher line before going live.
   # Format: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
   Do not put a fake/wrong real-looking entry that could be mistaken for live — keep it obviously a placeholder via the comment.

5. Confirm the build still succeeds with no `NEXT_PUBLIC_ADSENSE_CLIENT_ID` set at all (the default/no-env-var state) — this must be a fully valid, non-broken state, since that's how the site will run today.

---

## 3. Remove affiliate functionality — no affiliates for now

The site owner explicitly does not want any affiliate program integrated yet. Do the following:

1. **`LeadGenCTA.tsx`**: this component currently says *"We may earn a commission if you hire through our partner links. See our disclosure"* and accepts an `affiliateUrl` prop defaulting to `"#"`. Since there is no real affiliate program yet, **remove the commission-disclosure line entirely** and **remove the `affiliateUrl` prop** (or repurpose the component into a neutral, non-monetized module for now — see option below). Two acceptable approaches, pick one:
   - **Option A (recommended):** Rename/repurpose it into a neutral `FindAProCTA` (or similar) component that just says something like "Ready to start your project? Get quotes from a few local contractors before you commit — pricing can vary more than people expect for the same job." with a plain, non-affiliate `mailto:` or internal link (e.g. link to `/methodology/` or nothing at all — just informational, no outbound CTA button), and update every article/MDX file that references `LeadGenCTA` to use the new component name.
   - **Option B:** Keep the component name and structure but strip the affiliate-specific copy/props and hardcode it as an inert, non-linking informational box for now.
   Whichever you choose, grep the whole codebase for `LeadGenCTA` and `affiliateUrl` afterward and make sure nothing references the old affiliate-flavored version.

2. **`BUILD_PLAN.md` and `PRODUCTION_PROMPT.md`** reference a "Monetization Plan" with 5 affiliate programs and a lead-gen CTA pattern. Leave those planning documents as historical record (do not delete them), but add a short note at the top of the "Monetization Plan" section in `BUILD_PLAN.md` stating: *"Affiliate integrations are intentionally deferred — not part of the current build. AdSense-only for now."* so future readers of that doc aren't misled into thinking affiliates are live.

3. Confirm there is no `affiliate-links.ts`/`affiliate-links.json` config file anywhere in `src/` (there currently isn't one — keep it that way, do not add one in this pass).

4. Check every one of the 50 MDX article files for any hardcoded affiliate-style link, tracking parameter, or "may earn a commission" disclosure text that might have been written into the article body itself (not just the shared component) during the earlier content-writing pass, and remove/neutralize any you find.

---

## 4. Fix remaining text-encoding bugs

A mangled em-dash artifact (`�?"`) — caused by a bad UTF-8/Windows-1252 round-trip at some point in this repo's history — has shown up in at least two files so far (`layout.tsx`, already fixed; `AdSlot.tsx`, fix in §2). **Grep the entire codebase for this exact byte pattern and any other obvious mangled-encoding artifacts** (`�`, `Ã¢`, `â€"`, `?"` immediately after a letter with no space) across `src/`, `*.md`, and `*.mdx` files, and fix every occurrence to a clean, correct character (prefer a plain hyphen `-` over a re-attempted em dash if you're not 100% sure your tool will save proper UTF-8).

---

## 5. Functional QA — do not report done until you've verified all of this

- [ ] `npm run build` succeeds locally with zero errors and zero unresolved MDX/placeholder tokens (`{{`, `TODO`, `Lorem ipsum` — zero matches across `src/content`).
- [ ] `out/index.html`, `out/sitemap.xml`, `out/robots.txt`, and at least 3 sampled article `index.html` files exist and contain real, non-empty, rendered content (open and read them, don't just check file existence).
- [ ] The live URL `https://toggi635.github.io/HomeCostGuide/` returns HTTP 200 with real visible content when fetched — not 404, not a blank page, not raw source code.
- [ ] At least 3 sampled live article URLs return 200 with real content.
- [ ] The live sitemap URL (`https://toggi635.github.io/HomeCostGuide/sitemap.xml`) is reachable and lists correct absolute URLs.
- [ ] With no `NEXT_PUBLIC_ADSENSE_CLIENT_ID` set, the site builds and runs cleanly, showing placeholder ad boxes with clean (non-mangled) text and no console errors.
- [ ] No component, article, or page references affiliate links, affiliate disclosures, or commission language anywhere in the codebase (`grep -ri "commission\|affiliate" src/` returns nothing, or only the intentionally-neutral note added to `BUILD_PLAN.md` in §3.2).
- [ ] No mangled-encoding artifacts remain anywhere (`grep` confirms zero matches).
- [ ] Final report to the human explicitly states: (a) whether the Pages source setting is confirmed set to GitHub Actions or whether the human must do it manually, (b) the exact live URL you verified is working (with the HTTP status you observed), and (c) anything you could not verify due to lack of access (e.g., no `gh` CLI/API token available) so the human knows exactly what to check themselves.
