# HomeCostGuide — 50-Article Launch Build Plan

**Status of figures:** Every cost figure below is tagged `[R]` (found in live research this session — competitor pages or Google Autocomplete) or `[E]` (my estimate, not verified against a keyword tool or Ahrefs). No Ahrefs/GSC/Google Trends API access was available in this environment, so backlink strength and search volumes are `[E]` unless stated otherwise. Treat all `[E]` numbers as directional, not authoritative — verify with Google Keyword Planner / Ahrefs / Semrush before committing budget.

**Research method actually used (in priority order attempted):**
1. Google Autocomplete (`suggestqueries.google.com/complete/search`) — **worked**, used for all long-tail phrasing below. This is real autocomplete data `[R]`.
2. Google Search direct fetch — blocked (JS/consent wall). Not usable.
3. Bing direct fetch — returned localized/irrelevant results. Not usable.
4. DuckDuckGo HTML SERP (`duckduckgo.com/html`) — **worked**, used as SERP proxy `[R]`. Ranking order differs from Google but the *set* of competing domains and their published cost figures is real and useful.
5. Direct competitor page fetches (Fixr, Angi, Bob Vila, HomeGuide, homebuddy, etc. via DDG links) — **worked for Fixr**, others 403/404'd directly but their cost figures were visible in DDG snippets `[R]`.
6. Google Trends — no usable fetch path found; seasonality claims below are `[E]` based on general industry knowledge (HVAC/roofing storm damage, heating season, etc.), not pulled trend data.
7. Ahrefs — no access; competitor strength is inferred qualitatively from SERP composition, not DR/RD numbers.
8. Reddit/Quora — not separately queried; "reddit" appearing as an autocomplete suffix (e.g., "mold remediation cost reddit," "cost to remodel a bathroom reddit") is itself `[R]` evidence that users seek anecdotal/real pricing there, used as a content-angle signal.

---

## 1. Market Opportunity

- **Demand:** High and evergreen. Every seed query tested ("cost to replace X," "average cost of X," "X repair vs replace," "average [utility] bill for X") returned a full page of Google Autocomplete suggestions `[R]`, indicating sustained query volume across roofing, HVAC, plumbing, electrical, remodeling, and utilities. This is a mature, non-trending niche — it doesn't spike and disappear like a fad topic.
- **Competition level:** High at head terms, winnable at long-tail. DDG SERPs for "how much does it cost to replace a roof" and "average cost of kitchen remodel" `[R]` show a mix of:
  - Tier 1 authority sites: Angi, Bob Vila, Forbes Home, This Old House, HomeGuide, HGTV, NerdWallet — these dominate the exact head-term phrasing.
  - Tier 2 pure-play cost-calculator sites with modest authority: Homewyse, Fixr, InchCalculator, HomeBuddy, PickHVAC, HVACCalculatorHub, RoofingCalc, LatestCost, HomeCostReport — many of these are small, narrowly-focused sites that rank well purely on topical depth + calculator utility, not domain-wide authority. **This is the single most important competitive finding**: a small, focused site with real calculators and clear data can compete in this niche without a huge backlink profile, because Google is rewarding utility (calculators, tables) and topical focus over raw domain size for this query type `[R]`.
  - This confirms the 50-article, calculator-forward strategy is realistic, provided each article ships with a genuine interactive/tabular tool, not just prose.
- **AdSense RPM range:** `[E]` — Home improvement/finance-adjacent content typically sees **$15–$40 RPM** in the US, higher than general blog content (~$5–$15) because of high advertiser competition from home-service and financial-services verticals (roofing, HVAC, insurance, loans). This is an industry-standard estimate for this content category, not measured for this specific site — actual RPM will depend heavily on US-vs-global traffic mix and page-level ad density.
- **Affiliate potential:** Strong but indirect. This niche doesn't sell physical products at high AOV; the money is in **lead-gen for local pros** (highest $/click, e.g. Angi/Thumbtack style affiliate or CPL networks), **tool/product affiliate** (Home Depot/Lowe's/Amazon for DIY-adjacent items: insulation, paint, water heaters, smart thermostats), and **financial affiliate** (home equity loans, home warranty, homeowners insurance comparison — all appeared in autocomplete as real demand `[R]`).
- **Realistic launch framing:** With 50 articles, do not expect to outrank Angi/Forbes Home on head terms in year one. The realistic win condition is (a) long-tail and comparison queries where Tier 1 sites publish thin/generic content, and (b) queries where a genuine calculator outperforms a static number.

## 2. User Research

**Who's searching (inferred from query patterns, not a formal survey):**
- Homeowners facing an unexpected failure (water heater died, HVAC won't turn on) — urgent, bottom-of-funnel, wants a number *now* and a repair-vs-replace answer.
- Renovation planners (kitchen/bath/basement) — top-of-funnel, budgeting months ahead, wants ranges + what drives cost up/down.
- First-time buyers / pre-purchase — wants to know "what will this house cost me to maintain," ties to insurance and utility-bill queries.
- Sellers — wants to know which repairs/upgrades are "worth it" before listing (matches the Redfin content appearing in SERPs `[R]`).
- DIY-curious — "cost to install X yourself," "diy" appearing repeatedly in autocomplete `[R]`.

**Top 10 recurring questions/frustrations, in their own words (drawn directly from Autocomplete `[R]` and DDG snippet language `[R]`):**
1. "How much does it cost to replace a roof / water heater / [system]?" — wants a straight number, distrusts vague "it depends."
2. "[System] repair vs replace" — the #1 recurring decision-paralysis pattern (roof, HVAC, windows all showed this exact pattern `[R]`).
3. "Is it worth it to replace [X]?" / "is [X] worth it before selling" — ROI anxiety, especially windows, roofs (appeared verbatim `[R]`).
4. "Cost to [do X] myself" / "diy" — trying to avoid labor cost, wants a labor-vs-DIY breakdown.
5. "[X] cost reddit" — explicitly distrusts vendor-published averages, wants real people's real invoices (appeared for bathroom remodel, mold remediation `[R]`).
6. "[X] cost per square foot" / "cost calculator" / "homewyse" — wants to plug in their own numbers, not read someone else's average.
7. "Average [utility] bill for [household size/apartment type]" — budgeting before a move, wants a number matched to their exact situation, not a national average.
8. "[X] cost in [state/city]" — knows national averages are useless for their market (appeared for insurance, repiping, basement finishing `[R]`).
9. "Cost to remove/replace and [related task]" e.g. "finish a basement and add a bathroom," "remove and install attic insulation" — the real project is a bundle, not a single line item, and generic guides miss the bundled cost.
10. "[X] cost 2025/2026" — explicitly wants current-year pricing, distrusts stale content (recency intent shows up constantly `[R]`).

## 3. Content Pillars (7)

Every one of the 50 articles maps to exactly one pillar. Pillar pages themselves are category hub pages (see Site Structure).

| # | Pillar | Slug | Covers |
|---|--------|------|--------|
| 1 | Roofing & Exterior | `/roofing-exterior/` | Roofing, siding, gutters, driveway, decks, fencing, exterior painting |
| 2 | HVAC & Energy | `/hvac-energy/` | Heating, cooling, insulation, solar, utility bills, weatherproofing |
| 3 | Plumbing & Water Systems | `/plumbing/` | Water heaters, repiping, sewer/septic, leaks, water bills |
| 4 | Electrical | `/electrical/` | Panel upgrades, rewiring, generators, EV chargers, lighting |
| 5 | Kitchen & Bathroom Remodeling | `/kitchen-bath/` | Kitchen remodels, bathroom remodels, cabinets, countertops |
| 6 | Flooring, Painting & Interior Renovation | `/interior-renovation/` | Flooring, interior painting, basements, drywall, additions |
| 7 | Home Maintenance & Repair Decisions | `/home-maintenance/` | Appliance repair/replace, mold, pest, tree removal, insurance, general "worth it" decisions |

## 4. Keyword Map (Primary + Long-Tail per Pillar)

Intent legend: **INFO** = informational/budgeting, **COMM** = commercial investigation (comparing options/prices), **TRANS** = ready to hire/buy.

### Pillar 1 — Roofing & Exterior
- Primary: `roof replacement cost` (COMM) `[R: autocomplete confirmed]`
- Long-tail: `cost to replace a roof on a 2000 sq ft house` (COMM) `[R]`, `roof repair vs replacement` (COMM) `[R]`, `metal roof cost vs asphalt shingle cost` (COMM) `[E]`, `cost to install a fence per foot` (COMM) `[R]`, `cost to paint a house exterior` (COMM) `[R]`, `gutter installation cost` (COMM) `[E]`

### Pillar 2 — HVAC & Energy
- Primary: `hvac replacement cost` (COMM) `[E, pattern confirmed via "hvac repair vs replace" R]`
- Long-tail: `hvac repair vs replace` (COMM) `[R]`, `cost to install solar panels` (COMM) `[R]`, `cost to install attic insulation` (COMM) `[R]`, `average electric bill for 3 bedroom house` (INFO) `[R]`, `furnace repair vs replace` (COMM) `[R]`

### Pillar 3 — Plumbing & Water Systems
- Primary: `cost to replace water heater` (COMM) `[R]`
- Long-tail: `tankless vs tank water heater cost` (COMM) `[R, derived from "cost to replace water heater with tankless"]`, `cost to repipe a house with pex vs copper` (COMM) `[R]`, `average water bill for family of 4` (INFO) `[R]`, `sewer line repair cost` (COMM) `[E]`

### Pillar 4 — Electrical
- Primary: `cost to replace electrical panel` (COMM) `[R]`
- Long-tail: `cost to upgrade to 200 amp panel` (COMM) `[R]`, `cost to install a generator` (COMM) `[E, pattern from "how much value does a generac add"]` `[R]`, `cost to install ev charger` (COMM) `[E]`

### Pillar 5 — Kitchen & Bathroom Remodeling
- Primary: `average cost of kitchen remodel` (COMM) `[R]`
- Long-tail: `cost to remodel a bathroom` (COMM) `[R]`, `cost to remodel a bathroom per square foot` (COMM) `[R]`, `kitchen remodel cost without appliances` (COMM) `[R]`, `small bathroom remodel cost` (COMM) `[E]`

### Pillar 6 — Flooring, Painting & Interior Renovation
- Primary: `cost to finish a basement` (COMM) `[R]`
- Long-tail: `cost to finish a basement and add a bathroom` (COMM) `[R]`, `cost to replace flooring per square foot` (COMM) `[R]`, `cost to paint a house interior` (COMM) `[R]`, `cost to replace flooring with luxury vinyl plank` (COMM) `[R]`

### Pillar 7 — Home Maintenance & Repair Decisions
- Primary: `is it worth it to replace [X]` pattern (COMM) `[R]`
- Long-tail: `mold remediation cost per square foot` (COMM) `[R]`, `cost to remove a tree stump` (COMM) `[R]`, `average cost of homeowners insurance` (INFO) `[R]`, `refrigerator repair vs replace` (COMM) `[E, pattern confirmed by "is it worth it to replace a refrigerator compressor" R]`

---

## 5. The 50 Articles — Ranked by Priority

Ranking logic: **Tier A (1–15)** = highest-confidence demand (repeated autocomplete confirmation, bundled with a clear repair-vs-replace or calculator angle, moderate competition). **Tier B (16–35)** = strong secondary demand, slightly narrower or more competitive. **Tier C (36–50)** = long-tail/differentiators that round out pillar coverage and feed internal linking, lower individual volume but low difficulty and high topical-relevance value.

Difficulty reasoning is qualitative (no DR data): **Low** = SERP has thin/generic competitors or is dominated by non-optimized calculator sites; **Med** = SERP has 1–3 Tier-1 sites but they're generic, not comparison-format; **High** = SERP fully dominated by Angi/Forbes Home/Bob Vila/This Old House with deep, current, calculator-backed content `[R for High-flag pages: roof replacement, kitchen remodel — confirmed multiple Tier-1s ranking]`.

| # | Title | Target Keyword | Est. Volume | Intent | Pillar | Difficulty (reasoning) | Format |
|---|-------|-----------------|-------------|--------|--------|------------------------|--------|
| 1 | Roof Replacement Cost: 2026 Price Guide by Size & Material | roof replacement cost | 40K/mo `[E]` | COMM | Roofing | High — Fixr/Angi/This Old House/HomeGuide all rank with deep content `[R]` | Guide + Calculator |
| 2 | Roof Repair vs. Replacement: How to Decide | roof repair vs replacement | 3K/mo `[E]` | COMM | Roofing | Med — competitors exist but mostly thin "signs" listicles | Guide + Comparison Table |
| 3 | HVAC Repair vs. Replace: The $5,000 Rule Explained | hvac repair vs replace calculator | 4K/mo `[E]` | COMM | HVAC | Med — several niche calculator sites rank (hvaccalculatorhub, hvacprojectcost) but no dominant Tier-1 `[R]` | Calculator + Guide |
| 4 | How Much Does a New HVAC System Cost? (2026) | cost to install a new hvac system | 15K/mo `[E]` | COMM | HVAC | Med-High | Guide + Calculator |
| 5 | Cost to Replace a Water Heater (Tank vs. Tankless) | cost to replace water heater | 20K/mo `[E]` | COMM | Plumbing | Med — SERP has mix of small niche sites, no single dominant page `[R]` | Guide + Comparison Table |
| 6 | Average Kitchen Remodel Cost: 2026 Budget Breakdown | average cost of kitchen remodel | 30K/mo `[E]` | COMM | Kitchen & Bath | High — Angi/Bob Vila/Forbes Home/HomeGuide/HGTV all rank `[R]` | Guide + Calculator |
| 7 | Bathroom Remodel Cost by Size (Half, Full, Primary) | cost to remodel a bathroom | 18K/mo `[E]` | COMM | Kitchen & Bath | Med-High | Guide + Calculator |
| 8 | Cost to Finish a Basement (With & Without a Bathroom) | cost to finish a basement | 12K/mo `[E]` | COMM | Interior Renovation | Med — long-tail variant "and add a bathroom" repeatedly surfaced, under-served `[R]` | Guide + Calculator |
| 9 | Is It Worth It to Replace Your Windows? | is it worth it to replace windows | 2K/mo `[E]` | COMM | Home Maintenance | Low-Med — SERP is mostly generic advice, no strong cost-focused comparison page `[R]` | Guide + Decision Table |
| 10 | Cost to Repipe a House: PEX vs. Copper | cost to repipe a house with pex | 3K/mo `[E]` | COMM | Plumbing | Low — SERP is sparse/thin `[R]` | Comparison Table + Guide |
| 11 | Cost to Replace an Electrical Panel (100A vs. 200A) | cost to replace electrical panel | 8K/mo `[E]` | COMM | Electrical | Low-Med — SERP thin, mostly contractor sites `[R]` | Guide + Comparison Table |
| 12 | Average Utility Bill by Household Size: Electric | average electric bill for [household size] | 25K/mo combined `[E]` | INFO | HVAC/Energy | Low — dominated by apartment-listing sites, not cost-methodology content `[R]` | Data Table + Calculator |
| 13 | Cost to Install Solar Panels (With & Without Battery) | cost to install solar panels | 15K/mo `[E]` | COMM | HVAC/Energy | Med-High — competitive but many pages outdated on incentives | Guide + Calculator |
| 14 | Furnace Repair vs. Replace: Cost & Decision Guide | furnace repair vs replace | 2K/mo `[E]` | COMM | HVAC | Low — single generic autocomplete hit, thin SERP `[R]` | Guide + Decision Table |
| 15 | Mold Remediation Cost by Square Footage | mold remediation cost per square foot | 5K/mo `[E]` | COMM | Home Maintenance | Low-Med | Guide + Calculator |
| 16 | Cost to Replace Windows (Per Window & Whole House) | cost to replace windows | 22K/mo `[E]` | COMM | Roofing/Exterior | High | Guide + Calculator |
| 17 | Cost to Paint a House: Interior vs. Exterior | cost to paint a house | 14K/mo `[E]` | COMM | Interior Renovation | Med | Guide + Comparison Table |
| 18 | Cost to Replace Flooring by Type (LVP, Hardwood, Tile, Carpet) | cost to replace flooring per square foot | 10K/mo `[E]` | COMM | Interior Renovation | Med | Guide + Comparison Table |
| 19 | Cost to Install a Fence (By Material & Length) | cost to install a fence | 12K/mo `[E]` | COMM | Roofing/Exterior | Med | Guide + Calculator |
| 20 | Cost to Remove a Tree (and Stump Grinding) | cost to remove a tree | 9K/mo `[E]` | COMM | Home Maintenance | Low-Med | Guide + Calculator |
| 21 | Average Cost of Homeowners Insurance (What Drives It Up) | average cost of homeowners insurance | 60K/mo `[E]` | INFO | Home Maintenance | High — insurance comparison sites dominate | Guide + Data Table |
| 22 | Cost to Install Attic Insulation | cost to install attic insulation | 6K/mo `[E]` | COMM | HVAC/Energy | Low | Guide + Calculator |
| 23 | AC Repair vs. Replace: When to Stop Paying for Repairs | ac repair vs replace | 4K/mo `[E]` | COMM | HVAC | Med | Guide + Decision Table |
| 24 | Cost to Install a Generator (Standby vs. Portable) | cost to install a generator | 5K/mo `[E]` | COMM | Electrical | Low-Med | Guide + Comparison Table |
| 25 | Refrigerator Repair vs. Replace: The Real Cost Math | is it worth it to replace a refrigerator | 3K/mo `[E]` | COMM | Home Maintenance | Low `[R: pattern confirmed]` | Guide + Decision Table |
| 26 | Cost to Install an EV Charger at Home | cost to install ev charger | 8K/mo `[E]` | COMM | Electrical | Med | Guide + Calculator |
| 27 | Gutter Installation & Replacement Cost | gutter installation cost | 7K/mo `[E]` | COMM | Roofing/Exterior | Low-Med | Guide + Calculator |
| 28 | Metal Roof vs. Asphalt Shingle Roof: Cost & Lifespan Compared | metal roof vs asphalt shingle cost | 4K/mo `[E]` | COMM | Roofing/Exterior | Med | Comparison Table |
| 29 | Cost to Build a Deck (By Material & Size) | cost to build a deck | 18K/mo `[E]` | COMM | Roofing/Exterior | Med-High | Guide + Calculator |
| 30 | Average Water Bill by Household Size | average water bill for [household size] | 15K/mo combined `[E]` | INFO | Plumbing | Low `[R]` | Data Table + Calculator |
| 31 | Cost to Repair vs. Replace a Garage Door | garage door repair vs replace | 3K/mo `[E]` | COMM | Home Maintenance | Low | Guide + Decision Table |
| 32 | Cost to Install a Whole-House Generator vs. Battery Backup | generator vs battery backup cost | 2K/mo `[E]` | COMM | Electrical | Low | Comparison Table |
| 33 | Cost to Remodel a Kitchen Without New Appliances | kitchen remodel cost without appliances | 4K/mo `[E]` | COMM | Kitchen & Bath | Low `[R: exact autocomplete phrase]` | Guide |
| 34 | Small Bathroom Remodel Cost (Under 40 Sq Ft) | small bathroom remodel cost | 6K/mo `[E]` | COMM | Kitchen & Bath | Med | Guide + Calculator |
| 35 | Cost to Replace a Septic Tank or Repair a Sewer Line | sewer line repair cost | 6K/mo `[E]` | COMM | Plumbing | Med | Guide + Comparison Table |
| 36 | Cost to Add a Bathroom to a Basement | cost to finish a basement and add a bathroom | 2K/mo `[E]` | COMM | Interior Renovation | Low `[R: exact autocomplete phrase]` | Guide |
| 37 | Cost to Remove and Install New Attic Insulation | cost to remove and install attic insulation | 1.5K/mo `[E]` | COMM | HVAC/Energy | Low `[R: exact autocomplete phrase]` | Guide |
| 38 | Is It Worth It to Replace Your Garage Door Before Selling? | is it worth replacing garage door before selling | 1K/mo `[E]` | COMM | Home Maintenance | Low | Guide |
| 39 | Cost to Install a Water Softener | cost to install a water softener | 5K/mo `[E]` | COMM | Plumbing | Low-Med | Guide + Calculator |
| 40 | Cost to Replace Interior Doors | cost to replace interior doors | 6K/mo `[E]` | COMM | Interior Renovation | Low | Guide + Calculator |
| 41 | Cost to Repair vs. Replace Drywall (Water/Mold Damage) | drywall repair vs replace cost | 3K/mo `[E]` | COMM | Interior Renovation | Low | Guide + Decision Table |
| 42 | Cost to Install Central Air in a House Without Ductwork | cost to install central air without ducts | 4K/mo `[E]` | COMM | HVAC | Med | Guide |
| 43 | Cost to Replace a Driveway (Asphalt vs. Concrete vs. Pavers) | cost to replace a driveway | 10K/mo `[E]` | COMM | Roofing/Exterior | Med | Comparison Table + Calculator |
| 44 | Termite & Pest Damage Repair Cost | termite damage repair cost | 5K/mo `[E]` | COMM | Home Maintenance | Low-Med | Guide + Calculator |
| 45 | Cost to Upgrade a Home to 200-Amp Electrical Service | cost to upgrade to 200 amp panel | 4K/mo `[E]` | COMM | Electrical | Low `[R: exact autocomplete phrase]` | Guide |
| 46 | Cost to Replace Cabinets (Reface vs. Full Replace) | cabinet refacing vs replacement cost | 3K/mo `[E]` | COMM | Kitchen & Bath | Low | Comparison Table |
| 47 | Cost to Replace Countertops (Laminate vs. Quartz vs. Granite) | cost to replace countertops | 8K/mo `[E]` | COMM | Kitchen & Bath | Med | Comparison Table + Calculator |
| 48 | How Much Value Does a Deck/Patio/Pool Add to Your Home? | how much value does a pool add to your home | 3K/mo `[E]` | INFO | Home Maintenance | Low `[R: exact autocomplete phrase]` | Guide + Data Table |
| 49 | Cost to Reface vs. Replace Kitchen Cabinets (ROI Breakdown) | is a kitchen remodel worth it | 4K/mo `[E]` | COMM | Kitchen & Bath | Low-Med | Guide |
| 50 | Home Maintenance Cost Calculator: What to Budget Per Year | annual home maintenance cost calculator | 6K/mo `[E]` | INFO | Home Maintenance | Low | Calculator (flagship tool, links to all pillars) |

**Cuts made to stay at 50:** No state-by-state matrices (50-state roofing cost, 50-state insurance cost, etc.) — explicitly out of scope per constraints. No duplicate "cost to install X" for every single appliance — only appliances with a clear repair-vs-replace decision angle made the list (fridge, garage door — not e.g. toaster-tier items). No pure "best contractor" or "best product" listicles — those are lead-gen/affiliate plays better handled as page *sections*, not standalone articles, given the 50-article budget.

## 6. Programmatic SEO (2 templates max, as required)

**Template A — "[System] Repair vs. Replace: Cost Comparison"**
Applied to the 6 highest-value systems where autocomplete confirmed real "repair vs replace" search behavior `[R]`: HVAC, Furnace, AC, Water Heater (as tank vs tankless framing), Windows, Refrigerator, Garage Door. (Articles #2, #3, #14, #23, #25, #31 in the table above already use this template — no separate programmatic build needed beyond applying one consistent page layout/schema to those 6.)
- URL pattern: `/[pillar]/[system]-repair-vs-replace/`
- Shared template elements: cost-of-repair box, cost-of-replace box, a decision calculator (age × repair cost × %-of-replacement-cost rule), a "signs you need to replace" list, FAQ block.
- This is a **layout template reused across 6 articles**, not a keyword-matrix expansion — stays within the 50-article budget.

**Template B — "Average [Utility] Bill by Household Size"**
Applied to 3 utilities where autocomplete confirmed household-size-segmented demand `[R]`: Electric, Water, (optionally Gas as a future 51st+ article, not in initial 50 — Gas dropped to stay at budget; Electric and Water are #12 and #30).
- URL pattern: `/hvac-energy/average-electric-bill-by-household-size/`, `/plumbing/average-water-bill-by-household-size/`
- Shared template: a data table segmented by household size (1–5+ people) and dwelling type (apartment/house), a short methodology note, a simple bill-estimator calculator, links to related repair/efficiency articles.

**Explicitly not doing:** a 50-state cost matrix, a per-city matrix, or a per-brand appliance matrix. All three were visible as *possible* expansions in autocomplete (e.g., "average cost of homeowners insurance in florida/ohio/texas..." `[R]`) but would blow the 50-article budget and are flagged here as a **Phase 2 expansion opportunity**, not part of this launch set.

## 7. Site Structure

**Homepage (`/`)**
- Hero with search/calculator entry point ("What do you want to know the cost of?")
- Featured/flagship calculator (Article #50) linked prominently
- 7 pillar cards (Roofing & Exterior, HVAC & Energy, Plumbing, Electrical, Kitchen & Bath, Interior Renovation, Home Maintenance)
- "Most searched costs" module — top 8 articles by priority tier A
- Trust strip: "How We Calculate Costs" link, last-updated badges, methodology link

**Primary Nav:** Home | Roofing & Exterior | HVAC & Energy | Plumbing | Electrical | Kitchen & Bath | Interior Renovation | Home Maintenance | Calculators | About

**Category/Pillar pages** (`/[pillar-slug]/`): intro paragraph (150–250 words, unique, not boilerplate), grid of all articles in that pillar with cost-range preview cards, a pillar-level FAQ (aggregated from article FAQs), breadcrumb, internal links to the 1–2 related pillars (e.g., HVAC ↔ Energy/Utilities, Kitchen&Bath ↔ Interior Renovation).

**URL pattern for articles:** `/[pillar-slug]/[article-slug]/` — flat, one level deep, no `/blog/` prefix (matches competitor convention seen at Fixr/Angi/HomeGuide `[R]`, and keeps cost-guide pages feeling like reference/utility pages, not blog posts).

**Required non-article pages (trust-critical for cost content):**
- `/about/` — who runs the site, why readers should trust the numbers.
- `/methodology/` (a.k.a. "How We Calculate Costs") — **critical for this niche**. Must explain: where base cost data comes from (cite named sources: RSMeans-style industry data, contractor surveys, published averages from Angi/HomeAdvisor-style aggregators, BLS CPI data for utilities), how ranges are built (low/avg/high), how often pages are updated, and that figures are national averages that vary by region — this directly addresses the E-E-A-T gap and the "reddit"/distrust signal found in research `[R]`.
- `/editorial-guidelines/` — review cadence, correction policy.
- `/contact/`
- `/privacy-policy/` and `/terms/` (required for AdSense approval)
- `/calculators/` — index page listing every interactive calculator on the site (aggregates the calculator half of Template A/B plus flagship #50).

## 8. SEO Execution

**On-page/technical checklist (per article):**
- H1 = target keyword phrased naturally; one H1 only.
- First 100 words must contain a direct, specific number/range (matches the "wants a number now" frustration from research).
- Cost table above the fold where possible (matches Fixr/HomeGuide pattern that ranks well `[R]`).
- "Last updated: [Month Year]" visible near the top — recency intent was a strong autocomplete signal `[R]`.
- Minimum 1 calculator or interactive table per Tier A/B article (per competitive finding that utility > pure prose in this niche).
- FAQ section built from real PAA-style questions (repair vs replace, DIY vs pro, financing, ROI/resale) — pulls straight from the 10 recurring user questions in Section 2.
- Author bio box with named author + credentials on every article (E-E-A-T; matches Fixr's visible author-bio pattern `[R]`).
- Internal links: every article links to (a) its pillar page, (b) 2–3 sibling articles in the same pillar, (c) at least 1 cross-pillar link where a natural bundle exists (e.g., Kitchen Remodel → Cabinet Refacing → Countertops; Basement Finishing → Mold Remediation; HVAC Replace → Attic Insulation).
- Canonical tags, clean breadcrumbs, no orphan pages — every article must be reachable from its pillar page and the sitemap.

**Schema by content type:**
- Article pages: `Article` + `FAQPage` (from the FAQ block) + `BreadcrumbList`.
- Any page with a cost table: add `Product`/`AggregateOffer`-style low/high pricing is not appropriate (not literal products) — instead use `FAQPage` for cost-range Q&A and plain `Article` schema; avoid schema spam.
- Calculator pages: `WebApplication` schema optional if calculator is substantial enough to be its own page.
- Author pages (if built out): `Person` schema.
- Homepage/pillar pages: `WebSite` + `BreadcrumbList` + `ItemList` for the article grid.

**Internal linking rules between pillars:**
- Every pillar page must link to at least 2 other pillar pages where a real project overlap exists (Kitchen&Bath ↔ Electrical [rewiring during remodel], HVAC&Energy ↔ Interior Renovation [insulation/basement], Roofing&Exterior ↔ Home Maintenance [storm damage/insurance]).
- No more than 2 clicks from homepage to any article (Home → Pillar → Article).

**E-E-A-T signals to build in:**
- Named author(s) with a credible home-improvement/finance background bio, reused consistently (not fake AI personas — use a real or clearly-disclosed editorial identity).
- `/methodology/` page linked from every article's cost table ("See how we calculate this →").
- Visible "reviewed/updated" dates and a changelog approach for major repricing.
- Cite real data ranges from named public sources in the methodology page (do not present `[E]` estimates in this plan as if they were sourced — once real data is gathered during content production, distinguish "industry average from [source]" vs "HomeCostGuide estimate" directly in article copy, mirroring how this plan tags `[R]`/`[E]`).

## 9. Monetization Plan

- **AdSense placement by page type:**
  - Article pages: 1 unit after intro/first cost table, 1 in-content unit after ~40% scroll, 1 unit before FAQ, optional sticky sidebar unit on desktop. Avoid stacking units around the calculator itself (bad UX, risk of invalid clicks).
  - Pillar pages: 1 unit below intro, 1 unit mid-grid.
  - Calculator pages: place ads around, never inside, the calculator UI.
  - Homepage: light ad load (1 unit max) — prioritize internal navigation/trust for a new site's first impression.
- **Affiliate programs that fit this niche** (`[E]` — verify current program availability/terms before integrating):
  1. **Angi Leads / Networx / Modernize-style home-service lead-gen** — pay per lead for "find a pro" CTAs on high-intent pages (roofing, HVAC, plumbing, electrical). Best fit for Tier A articles.
  2. **Home Depot / Lowe's affiliate** — for DIY-adjacent articles (insulation, paint, fencing, water softeners) where a reader might buy materials directly.
  3. **Amazon Associates** — for small hardware/tools mentioned in DIY sections (paint sprayers, smart thermostats, water leak sensors).
  4. **Policygenius-style homeowners insurance comparison affiliate** — fits Article #21 directly.
  5. **SoFi/LightStream-style home-improvement loan or home-equity affiliate** — fits any high-cost remodel article (#6, #7, #8) as a "how to pay for it" section.
- **Lead-gen angle:** The strongest monetization fit here is not display ads alone — it's a "Get quotes from local pros" module (styled like Fixr's `[R]`) embedded contextually after every cost table, feeding a lead-gen affiliate/CPL partner. This single UI pattern, reused across all 50 articles, is likely the highest-RPM element on the site once traffic materializes.

## 10. Final Build Prompt (self-contained — hand this section alone to the coding AI)

---
**BUILD PROMPT START**

Build "HomeCostGuide," a content-driven SEO website in [specify stack: default to Next.js 14 (App Router) + TypeScript + Tailwind CSS + MDX for articles unless the user specifies otherwise] with the following exact structure. Do not ask follow-up questions — make reasonable defaults where unspecified and note them in a build log.

**1. Global structure**
- Pages: Home (`/`), 7 pillar pages, 50 article pages, `/about/`, `/methodology/`, `/editorial-guidelines/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/calculators/` (index).
- Nav: Home | Roofing & Exterior | HVAC & Energy | Plumbing | Electrical | Kitchen & Bath | Interior Renovation | Home Maintenance | Calculators | About.
- Footer: sitemap links to all 7 pillars, legal pages, methodology, contact.

**2. Pillars (slug → name):**
1. `roofing-exterior` → Roofing & Exterior
2. `hvac-energy` → HVAC & Energy
3. `plumbing` → Plumbing & Water Systems
4. `electrical` → Electrical
5. `kitchen-bath` → Kitchen & Bathroom Remodeling
6. `interior-renovation` → Flooring, Painting & Interior Renovation
7. `home-maintenance` → Home Maintenance & Repair Decisions

Each pillar page at `/[pillar-slug]/` renders: H1 (pillar name), 150–250 word intro, a card grid of every article assigned to that pillar (title, one-line cost-range teaser, link), an aggregated FAQ section, breadcrumb, and 2 contextual links to related pillars.

**3. Articles**
Create 50 article pages at `/[pillar-slug]/[article-slug]/` using the exact 50 titles/keywords/pillars from Section 5 of this plan (reproduce that table as the content data source — store it as a structured data file, e.g. `content/articles.json` or `.ts`, with fields: `title, slug, pillar, targetKeyword, intent, difficulty, format, priorityTier`). Each article page template must render, in this order:
1. Breadcrumb (Home / Pillar / Article)
2. H1 = article title
3. "Last updated: [date]" badge
4. Author byline (name + short credential, linking to a shared author bio component)
5. A prominent cost-range summary box (national average + low–high range) — content to be filled in during the content-writing phase, not this build phase; use clearly labeled placeholder data (`{{COST_LOW}}, {{COST_AVG}}, {{COST_HIGH}}`) so it's obvious what must be replaced with real researched numbers before publish.
6. Table of contents (auto-generated from H2s)
7. Body content area (MDX/rich text)
8. At least one interactive calculator or comparison table component (see Component list below) matched to the article's `format` field (`guide`, `calculator`, `comparison-table`, `decision-table`, `data-table`)
9. FAQ accordion block with `FAQPage` schema
10. "Get quotes from local pros" CTA module (lead-gen placeholder, configurable affiliate link)
11. Related articles module (same pillar, 3 items) + 1 cross-pillar related link
12. Link to `/methodology/`

**4. Required components to build**
- `CostRangeBox` — displays low/avg/high with a visual bar.
- `CostCalculator` — generic reusable calculator shell accepting configurable input fields (sliders/dropdowns: e.g., square footage, material tier, region multiplier) and a formula prop, outputting an estimated range. Used for Tier A/B "Calculator" format articles.
- `ComparisonTable` — side-by-side cost/lifespan/pros-cons table for `comparison-table` format articles (e.g., PEX vs copper, metal vs asphalt).
- `DecisionTable` / `RepairVsReplaceWidget` — implements Template A: input fields for repair cost estimate + unit age, outputs a repair/replace recommendation using a simple rule (e.g., if repair cost > 50% of replacement cost, recommend replace). Reused across the 6 Template-A articles (#2, #3, #14, #23, #25, #31).
- `HouseholdBillTable` — implements Template B: a data table keyed by household size (1–5+) and dwelling type, plus a simple bill estimator. Reused across the 2 Template-B articles (#12, #30).
- `FAQAccordion` — renders FAQ schema automatically from an array of Q/A pairs.
- `AuthorBio`, `Breadcrumbs`, `TableOfContents`, `RelatedArticles`, `LeadGenCTA`, `AdSlot` (configurable placement: `after-intro`, `mid-content`, `pre-faq`, `sidebar`).
- `PillarCard`, `ArticleCard` for grid listings.

**5. Schema/SEO**
- Implement `Article`, `FAQPage`, and `BreadcrumbList` JSON-LD on every article page.
- Implement `WebSite` + `ItemList` JSON-LD on homepage and pillar pages.
- Generate a single `sitemap.xml` covering all pages.
- Generate `robots.txt` allowing all crawl, pointing to the sitemap.
- Every page must have a unique `<title>` and meta description (use `targetKeyword` + pillar as the basis).
- Implement canonical tags on every page.

**6. Data/content separation**
- Store the 50-article metadata (title, slug, pillar, keyword, intent, difficulty, format, priorityTier) in a single structured file as described above — this drives navigation, sitemap generation, and related-article logic.
- Article body content itself should live in individual MDX files (or CMS entries) named by slug, imported/rendered by the shared article template — do NOT hardcode article prose into the template component.
- Do not invent specific cost figures in the template/build phase — leave clearly marked placeholders as described in step 3.5. Real figures must come from a dedicated content-research pass per article, following the sourced-vs-estimate labeling convention established in this plan (cite the specific source for every number used, or label it "HomeCostGuide estimate").

**7. Monetization scaffolding**
- Build an `AdSlot` component with placement variants as listed in step 4, wired to accept an AdSense client/slot ID via environment variable/config (do not hardcode publisher IDs).
- Build `LeadGenCTA` as a configurable component accepting a partner name + affiliate/tracking URL via config, not hardcoded, so it can be swapped per pillar (e.g., different lead-gen partner for HVAC vs Kitchen&Bath) if needed later.
- Add an affiliate-link config file (`content/affiliate-links.ts` or similar) with entries for the 5 affiliate programs listed in Section 9 of this plan, referenced by relevant articles.

**8. Build order**
1. Scaffold project (framework, Tailwind, MDX support, base layout, nav, footer).
2. Build shared components (step 4 list).
3. Build article metadata file with all 50 entries + pillar metadata (7 entries).
4. Build article page template wired to metadata + MDX content loader.
5. Build pillar page template.
6. Build homepage.
7. Build the 6 required non-article pages (About, Methodology, Editorial Guidelines, Contact, Privacy, Terms) and the Calculators index.
8. Wire up JSON-LD schema across all templates.
9. Generate sitemap.xml and robots.txt.
10. Add AdSlot and LeadGenCTA scaffolding with placeholder/env-based config.
11. Create 50 placeholder MDX files (one per article slug) with the standard section skeleton (H2s matching the checklist in Section 8 of this plan) and clearly marked cost-figure placeholders, ready for a subsequent content-writing pass.
12. Run a build/lint pass; confirm every one of the 50 article slugs resolves, every pillar page lists the correct articles, sitemap includes all pages, and no broken internal links exist.

Do not write final article prose or real cost figures as part of this build — that is a separate content-production phase. This build phase's job is the complete site skeleton, components, schema, navigation, and 50 placeholder pages ready to receive researched content.

**BUILD PROMPT END**
---

## Summary of what to do next (outside this document)
1. Verify `[E]`-tagged search volumes with a real keyword tool before finalizing paid/organic effort allocation.
2. Run this plan's Section 10 prompt through your coding AI to scaffold the site.
3. Commission/write the 50 articles' real content, replacing cost placeholders with sourced figures, explicitly citing sources per the methodology page's own stated standard.
4. Apply for AdSense once ~15–20 articles are live with real content (thin/placeholder content will fail review).
