export interface Pillar {
  slug: string;
  name: string;
  description: string;
  relatedPillars: string[];
}

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
}

export interface AffiliateLink {
  name: string;
  url: string;
  description: string;
  relevantPillars: string[];
}

export const pillars: Pillar[] = [
  {
    slug: "roofing-exterior",
    name: "Roofing & Exterior",
    description: "Cost guides for roofing, siding, gutters, driveways, decks, fencing, and exterior painting. Get accurate pricing for your home's exterior projects.",
    relatedPillars: ["home-maintenance", "hvac-energy"],
  },
  {
    slug: "hvac-energy",
    name: "HVAC & Energy",
    description: "Heating, cooling, insulation, solar, and utility bill guides. Find out what it really costs to keep your home comfortable and energy-efficient.",
    relatedPillars: ["interior-renovation", "plumbing"],
  },
  {
    slug: "plumbing",
    name: "Plumbing & Water Systems",
    description: "Water heater replacement, repiping, sewer and septic costs, and water bill guides. Everything you need to budget for plumbing work.",
    relatedPillars: ["kitchen-bath", "home-maintenance"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    description: "Panel upgrades, rewiring, generators, EV chargers, and lighting costs. Know what electricians charge before you hire.",
    relatedPillars: ["kitchen-bath", "hvac-energy"],
  },
  {
    slug: "kitchen-bath",
    name: "Kitchen & Bathroom Remodeling",
    description: "Kitchen remodels, bathroom remodels, cabinets, and countertop costs. Plan your dream renovation with real-world pricing.",
    relatedPillars: ["interior-renovation", "electrical"],
  },
  {
    slug: "interior-renovation",
    name: "Flooring, Painting & Interior Renovation",
    description: "Flooring, interior painting, basement finishing, drywall, and home addition costs. Budget for your interior improvement projects.",
    relatedPillars: ["kitchen-bath", "hvac-energy"],
  },
  {
    slug: "home-maintenance",
    name: "Home Maintenance & Repair Decisions",
    description: "Appliances, mold, pest control, tree removal, insurance, and repair-vs-replace guides. Make smarter home maintenance decisions.",
    relatedPillars: ["roofing-exterior", "plumbing"],
  },
];

export const articles: Article[] = [
  { id: 1, title: "Roof Replacement Cost: 2026 Price Guide by Size & Material", slug: "roof-replacement-cost", pillar: "roofing-exterior", targetKeyword: "roof replacement cost", intent: "COMM", difficulty: "High", format: "calculator", priorityTier: "A", estVolume: "40K/mo" },
  { id: 2, title: "Roof Repair vs. Replacement: How to Decide", slug: "roof-repair-vs-replacement", pillar: "roofing-exterior", targetKeyword: "roof repair vs replacement", intent: "COMM", difficulty: "Med", format: "decision-table", priorityTier: "A", estVolume: "3K/mo" },
  { id: 3, title: "HVAC Repair vs. Replace: The $5,000 Rule Explained", slug: "hvac-repair-vs-replace", pillar: "hvac-energy", targetKeyword: "hvac repair vs replace calculator", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "A", estVolume: "4K/mo" },
  { id: 4, title: "How Much Does a New HVAC System Cost? (2026)", slug: "new-hvac-system-cost", pillar: "hvac-energy", targetKeyword: "cost to install a new hvac system", intent: "COMM", difficulty: "Med-High", format: "calculator", priorityTier: "A", estVolume: "15K/mo" },
  { id: 5, title: "Cost to Replace a Water Heater (Tank vs. Tankless)", slug: "cost-to-replace-water-heater", pillar: "plumbing", targetKeyword: "cost to replace water heater", intent: "COMM", difficulty: "Med", format: "comparison-table", priorityTier: "A", estVolume: "20K/mo" },
  { id: 6, title: "Average Kitchen Remodel Cost: 2026 Budget Breakdown", slug: "average-kitchen-remodel-cost", pillar: "kitchen-bath", targetKeyword: "average cost of kitchen remodel", intent: "COMM", difficulty: "High", format: "calculator", priorityTier: "A", estVolume: "30K/mo" },
  { id: 7, title: "Bathroom Remodel Cost by Size (Half, Full, Primary)", slug: "bathroom-remodel-cost-by-size", pillar: "kitchen-bath", targetKeyword: "cost to remodel a bathroom", intent: "COMM", difficulty: "Med-High", format: "calculator", priorityTier: "A", estVolume: "18K/mo" },
  { id: 8, title: "Cost to Finish a Basement (With & Without a Bathroom)", slug: "cost-to-finish-a-basement", pillar: "interior-renovation", targetKeyword: "cost to finish a basement", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "A", estVolume: "12K/mo" },
  { id: 9, title: "Is It Worth It to Replace Your Windows?", slug: "is-it-worth-it-to-replace-windows", pillar: "home-maintenance", targetKeyword: "is it worth it to replace windows", intent: "COMM", difficulty: "Low-Med", format: "decision-table", priorityTier: "A", estVolume: "2K/mo" },
  { id: 10, title: "Cost to Repipe a House: PEX vs. Copper", slug: "cost-to-repipe-a-house-pex-vs-copper", pillar: "plumbing", targetKeyword: "cost to repipe a house with pex", intent: "COMM", difficulty: "Low", format: "comparison-table", priorityTier: "A", estVolume: "3K/mo" },
  { id: 11, title: "Cost to Replace an Electrical Panel (100A vs. 200A)", slug: "cost-to-replace-electrical-panel", pillar: "electrical", targetKeyword: "cost to replace electrical panel", intent: "COMM", difficulty: "Low-Med", format: "comparison-table", priorityTier: "A", estVolume: "8K/mo" },
  { id: 12, title: "Average Utility Bill by Household Size: Electric", slug: "average-electric-bill-by-household-size", pillar: "hvac-energy", targetKeyword: "average electric bill for [household size]", intent: "INFO", difficulty: "Low", format: "data-table", priorityTier: "A", estVolume: "25K/mo" },
  { id: 13, title: "Cost to Install Solar Panels (With & Without Battery)", slug: "cost-to-install-solar-panels", pillar: "hvac-energy", targetKeyword: "cost to install solar panels", intent: "COMM", difficulty: "Med-High", format: "calculator", priorityTier: "A", estVolume: "15K/mo" },
  { id: 14, title: "Furnace Repair vs. Replace: Cost & Decision Guide", slug: "furnace-repair-vs-replace", pillar: "hvac-energy", targetKeyword: "furnace repair vs replace", intent: "COMM", difficulty: "Low", format: "decision-table", priorityTier: "A", estVolume: "2K/mo" },
  { id: 15, title: "Mold Remediation Cost by Square Footage", slug: "mold-remediation-cost-by-square-footage", pillar: "home-maintenance", targetKeyword: "mold remediation cost per square foot", intent: "COMM", difficulty: "Low-Med", format: "calculator", priorityTier: "A", estVolume: "5K/mo" },
  { id: 16, title: "Cost to Replace Windows (Per Window & Whole House)", slug: "cost-to-replace-windows", pillar: "roofing-exterior", targetKeyword: "cost to replace windows", intent: "COMM", difficulty: "High", format: "calculator", priorityTier: "B", estVolume: "22K/mo" },
  { id: 17, title: "Cost to Paint a House: Interior vs. Exterior", slug: "cost-to-paint-a-house", pillar: "interior-renovation", targetKeyword: "cost to paint a house", intent: "COMM", difficulty: "Med", format: "comparison-table", priorityTier: "B", estVolume: "14K/mo" },
  { id: 18, title: "Cost to Replace Flooring by Type (LVP, Hardwood, Tile, Carpet)", slug: "cost-to-replace-flooring-by-type", pillar: "interior-renovation", targetKeyword: "cost to replace flooring per square foot", intent: "COMM", difficulty: "Med", format: "comparison-table", priorityTier: "B", estVolume: "10K/mo" },
  { id: 19, title: "Cost to Install a Fence (By Material & Length)", slug: "cost-to-install-a-fence", pillar: "roofing-exterior", targetKeyword: "cost to install a fence", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "B", estVolume: "12K/mo" },
  { id: 20, title: "Cost to Remove a Tree (and Stump Grinding)", slug: "cost-to-remove-a-tree", pillar: "home-maintenance", targetKeyword: "cost to remove a tree", intent: "COMM", difficulty: "Low-Med", format: "calculator", priorityTier: "B", estVolume: "9K/mo" },
  { id: 21, title: "Average Cost of Homeowners Insurance (What Drives It Up)", slug: "average-cost-of-homeowners-insurance", pillar: "home-maintenance", targetKeyword: "average cost of homeowners insurance", intent: "INFO", difficulty: "High", format: "data-table", priorityTier: "B", estVolume: "60K/mo" },
  { id: 22, title: "Cost to Install Attic Insulation", slug: "cost-to-install-attic-insulation", pillar: "hvac-energy", targetKeyword: "cost to install attic insulation", intent: "COMM", difficulty: "Low", format: "calculator", priorityTier: "B", estVolume: "6K/mo" },
  { id: 23, title: "AC Repair vs. Replace: When to Stop Paying for Repairs", slug: "ac-repair-vs-replace", pillar: "hvac-energy", targetKeyword: "ac repair vs replace", intent: "COMM", difficulty: "Med", format: "decision-table", priorityTier: "B", estVolume: "4K/mo" },
  { id: 24, title: "Cost to Install a Generator (Standby vs. Portable)", slug: "cost-to-install-a-generator", pillar: "electrical", targetKeyword: "cost to install a generator", intent: "COMM", difficulty: "Low-Med", format: "comparison-table", priorityTier: "B", estVolume: "5K/mo" },
  { id: 25, title: "Refrigerator Repair vs. Replace: The Real Cost Math", slug: "refrigerator-repair-vs-replace", pillar: "home-maintenance", targetKeyword: "is it worth it to replace a refrigerator", intent: "COMM", difficulty: "Low", format: "decision-table", priorityTier: "B", estVolume: "3K/mo" },
  { id: 26, title: "Cost to Install an EV Charger at Home", slug: "cost-to-install-ev-charger", pillar: "electrical", targetKeyword: "cost to install ev charger", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "B", estVolume: "8K/mo" },
  { id: 27, title: "Gutter Installation & Replacement Cost", slug: "gutter-installation-cost", pillar: "roofing-exterior", targetKeyword: "gutter installation cost", intent: "COMM", difficulty: "Low-Med", format: "calculator", priorityTier: "B", estVolume: "7K/mo" },
  { id: 28, title: "Metal Roof vs. Asphalt Shingle Roof: Cost & Lifespan Compared", slug: "metal-roof-vs-asphalt-shingle", pillar: "roofing-exterior", targetKeyword: "metal roof vs asphalt shingle cost", intent: "COMM", difficulty: "Med", format: "comparison-table", priorityTier: "B", estVolume: "4K/mo" },
  { id: 29, title: "Cost to Build a Deck (By Material & Size)", slug: "cost-to-build-a-deck", pillar: "roofing-exterior", targetKeyword: "cost to build a deck", intent: "COMM", difficulty: "Med-High", format: "calculator", priorityTier: "B", estVolume: "18K/mo" },
  { id: 30, title: "Average Water Bill by Household Size", slug: "average-water-bill-by-household-size", pillar: "plumbing", targetKeyword: "average water bill for [household size]", intent: "INFO", difficulty: "Low", format: "data-table", priorityTier: "B", estVolume: "15K/mo" },
  { id: 31, title: "Cost to Repair vs. Replace a Garage Door", slug: "garage-door-repair-vs-replace", pillar: "home-maintenance", targetKeyword: "garage door repair vs replace", intent: "COMM", difficulty: "Low", format: "decision-table", priorityTier: "B", estVolume: "3K/mo" },
  { id: 32, title: "Cost to Install a Whole-House Generator vs. Battery Backup", slug: "generator-vs-battery-backup-cost", pillar: "electrical", targetKeyword: "generator vs battery backup cost", intent: "COMM", difficulty: "Low", format: "comparison-table", priorityTier: "B", estVolume: "2K/mo" },
  { id: 33, title: "Cost to Remodel a Kitchen Without New Appliances", slug: "kitchen-remodel-cost-without-appliances", pillar: "kitchen-bath", targetKeyword: "kitchen remodel cost without appliances", intent: "COMM", difficulty: "Low", format: "guide", priorityTier: "B", estVolume: "4K/mo" },
  { id: 34, title: "Small Bathroom Remodel Cost (Under 40 Sq Ft)", slug: "small-bathroom-remodel-cost", pillar: "kitchen-bath", targetKeyword: "small bathroom remodel cost", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "B", estVolume: "6K/mo" },
  { id: 35, title: "Cost to Replace a Septic Tank or Repair a Sewer Line", slug: "sewer-line-repair-cost", pillar: "plumbing", targetKeyword: "sewer line repair cost", intent: "COMM", difficulty: "Med", format: "comparison-table", priorityTier: "B", estVolume: "6K/mo" },
  { id: 36, title: "Cost to Add a Bathroom to a Basement", slug: "cost-to-add-bathroom-to-basement", pillar: "interior-renovation", targetKeyword: "cost to finish a basement and add a bathroom", intent: "COMM", difficulty: "Low", format: "guide", priorityTier: "C", estVolume: "2K/mo" },
  { id: 37, title: "Cost to Remove and Install New Attic Insulation", slug: "remove-and-install-attic-insulation", pillar: "hvac-energy", targetKeyword: "cost to remove and install attic insulation", intent: "COMM", difficulty: "Low", format: "guide", priorityTier: "C", estVolume: "1.5K/mo" },
  { id: 38, title: "Is It Worth It to Replace Your Garage Door Before Selling?", slug: "garage-door-worth-it-before-selling", pillar: "home-maintenance", targetKeyword: "is it worth replacing garage door before selling", intent: "COMM", difficulty: "Low", format: "guide", priorityTier: "C", estVolume: "1K/mo" },
  { id: 39, title: "Cost to Install a Water Softener", slug: "cost-to-install-water-softener", pillar: "plumbing", targetKeyword: "cost to install a water softener", intent: "COMM", difficulty: "Low-Med", format: "calculator", priorityTier: "C", estVolume: "5K/mo" },
  { id: 40, title: "Cost to Replace Interior Doors", slug: "cost-to-replace-interior-doors", pillar: "interior-renovation", targetKeyword: "cost to replace interior doors", intent: "COMM", difficulty: "Low", format: "calculator", priorityTier: "C", estVolume: "6K/mo" },
  { id: 41, title: "Cost to Repair vs. Replace Drywall (Water/Mold Damage)", slug: "drywall-repair-vs-replace-cost", pillar: "interior-renovation", targetKeyword: "drywall repair vs replace cost", intent: "COMM", difficulty: "Low", format: "decision-table", priorityTier: "C", estVolume: "3K/mo" },
  { id: 42, title: "Cost to Install Central Air in a House Without Ductwork", slug: "cost-to-install-central-air-without-ducts", pillar: "hvac-energy", targetKeyword: "cost to install central air without ducts", intent: "COMM", difficulty: "Med", format: "guide", priorityTier: "C", estVolume: "4K/mo" },
  { id: 43, title: "Cost to Replace a Driveway (Asphalt vs. Concrete vs. Pavers)", slug: "cost-to-replace-a-driveway", pillar: "roofing-exterior", targetKeyword: "cost to replace a driveway", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "C", estVolume: "10K/mo" },
  { id: 44, title: "Termite & Pest Damage Repair Cost", slug: "termite-damage-repair-cost", pillar: "home-maintenance", targetKeyword: "termite damage repair cost", intent: "COMM", difficulty: "Low-Med", format: "calculator", priorityTier: "C", estVolume: "5K/mo" },
  { id: 45, title: "Cost to Upgrade a Home to 200-Amp Electrical Service", slug: "cost-to-upgrade-to-200-amp-panel", pillar: "electrical", targetKeyword: "cost to upgrade to 200 amp panel", intent: "COMM", difficulty: "Low", format: "guide", priorityTier: "C", estVolume: "4K/mo" },
  { id: 46, title: "Cost to Replace Cabinets (Reface vs. Full Replace)", slug: "cabinet-refacing-vs-replacement-cost", pillar: "kitchen-bath", targetKeyword: "cabinet refacing vs replacement cost", intent: "COMM", difficulty: "Low", format: "comparison-table", priorityTier: "C", estVolume: "3K/mo" },
  { id: 47, title: "Cost to Replace Countertops (Laminate vs. Quartz vs. Granite)", slug: "cost-to-replace-countertops", pillar: "kitchen-bath", targetKeyword: "cost to replace countertops", intent: "COMM", difficulty: "Med", format: "calculator", priorityTier: "C", estVolume: "8K/mo" },
  { id: 48, title: "How Much Value Does a Deck/Patio/Pool Add to Your Home?", slug: "how-much-value-does-a-pool-add", pillar: "home-maintenance", targetKeyword: "how much value does a pool add to your home", intent: "INFO", difficulty: "Low", format: "data-table", priorityTier: "C", estVolume: "3K/mo" },
  { id: 49, title: "Cost to Reface vs. Replace Kitchen Cabinets (ROI Breakdown)", slug: "is-a-kitchen-remodel-worth-it", pillar: "kitchen-bath", targetKeyword: "is a kitchen remodel worth it", intent: "COMM", difficulty: "Low-Med", format: "guide", priorityTier: "C", estVolume: "4K/mo" },
  { id: 50, title: "Home Maintenance Cost Calculator: What to Budget Per Year", slug: "annual-home-maintenance-cost-calculator", pillar: "home-maintenance", targetKeyword: "annual home maintenance cost calculator", intent: "INFO", difficulty: "Low", format: "calculator", priorityTier: "C", estVolume: "6K/mo" },
];

export const affiliateLinks: AffiliateLink[] = [
  { name: "Angi Leads", url: "https://www.angi.com/", description: "Find local home service pros", relevantPillars: ["roofing-exterior", "hvac-energy", "plumbing", "electrical", "home-maintenance"] },
  { name: "Home Depot", url: "https://www.homedepot.com/", description: "DIY materials and tools", relevantPillars: ["roofing-exterior", "hvac-energy", "interior-renovation", "kitchen-bath"] },
  { name: "Amazon Associates", url: "https://www.amazon.com/", description: "Tools and hardware", relevantPillars: ["home-maintenance", "hvac-energy", "plumbing"] },
  { name: "Policygenius", url: "https://www.policygenius.com/", description: "Homeowners insurance comparison", relevantPillars: ["home-maintenance"] },
  { name: "SoFi Home Improvement Loans", url: "https://www.sofi.com/home-improvement-loans/", description: "Home improvement financing", relevantPillars: ["kitchen-bath", "interior-renovation", "roofing-exterior"] },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getArticlesByPillar(pillarSlug: string): Article[] {
  return articles.filter((a) => a.pillar === pillarSlug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByTier(tier: "A" | "B" | "C"): Article[] {
  return articles.filter((a) => a.priorityTier === tier);
}

export function getRelatedArticles(article: Article, count: number = 3): Article[] {
  return articles
    .filter((a) => a.pillar === article.pillar && a.slug !== article.slug)
    .slice(0, count);
}
