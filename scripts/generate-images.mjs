import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "article-images");

const ARTICLES = [
  { id:1, slug:"roof-replacement-cost", pillar:"roofing-exterior", title:"Roof Replacement Cost: 2026 Price Guide by Size & Material", keyword:"roof replacement cost", costLow:"$5,700", costAvg:"$10,800", costHigh:"$16,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"calculator" },
  { id:2, slug:"roof-repair-vs-replacement", pillar:"roofing-exterior", title:"Roof Repair vs. Replacement: How to Decide", keyword:"roof repair vs replacement", costLow:"$350", costAvg:"$850", costHigh:"$1,500", costUnit:" for repair", costSource:"Angi 2026", format:"decision-table" },
  { id:3, slug:"hvac-repair-vs-replace", pillar:"hvac-energy", title:"HVAC Repair vs. Replace: The $5,000 Rule Explained", keyword:"hvac repair vs replace calculator", costLow:"$150", costAvg:"$500", costHigh:"$3,000", costUnit:" for repair", costSource:"HVAC Pricing Guide 2026", format:"calculator" },
  { id:4, slug:"new-hvac-system-cost", pillar:"hvac-energy", title:"How Much Does a New HVAC System Cost? (2026)", keyword:"cost to install a new hvac system", costLow:"$8,000", costAvg:"$11,500", costHigh:"$15,000", costUnit:"", costSource:"ConsumerAffairs 2026 & 5Estimates", format:"calculator" },
  { id:5, slug:"cost-to-replace-water-heater", pillar:"plumbing", title:"Cost to Replace a Water Heater (Tank vs. Tankless)", keyword:"cost to replace water heater", costLow:"$600", costAvg:"$1,800", costHigh:"$3,100", costUnit:" for tank", costSource:"HomeGuide 2026 & NerdWallet 2026", format:"comparison-table" },
  { id:6, slug:"average-kitchen-remodel-cost", pillar:"kitchen-bath", title:"Average Kitchen Remodel Cost: 2026 Budget Breakdown", keyword:"average cost of kitchen remodel", costLow:"$15,000", costAvg:"$27,000", costHigh:"$45,000", costUnit:"", costSource:"Fixr 2026 & Remodeling Magazine 2025", format:"calculator" },
  { id:7, slug:"bathroom-remodel-cost-by-size", pillar:"kitchen-bath", title:"Bathroom Remodel Cost by Size (Half, Full, Primary)", keyword:"cost to remodel a bathroom", costLow:"$6,500", costAvg:"$12,000", costHigh:"$25,000", costUnit:"", costSource:"Angi 2026 & This Old House 2026", format:"calculator" },
  { id:8, slug:"cost-to-finish-a-basement", pillar:"interior-renovation", title:"Cost to Finish a Basement (With & Without a Bathroom)", keyword:"cost to finish a basement", costLow:"$15,000", costAvg:"$32,000", costHigh:"$75,000", costUnit:"", costSource:"HomeGuide 2026", format:"calculator" },
  { id:9, slug:"is-it-worth-it-to-replace-windows", pillar:"home-maintenance", title:"Is It Worth It to Replace Your Windows?", keyword:"is it worth it to replace windows", costLow:"$400", costAvg:"$775", costHigh:"$1,300", costUnit:" per window", costSource:"This Old House 2026", format:"decision-table" },
  { id:10, slug:"cost-to-repipe-a-house-pex-vs-copper", pillar:"plumbing", title:"Cost to Repipe a House: PEX vs. Copper", keyword:"cost to repipe a house with pex", costLow:"$4,000", costAvg:"$7,500", costHigh:"$15,000", costUnit:" for PEX", costSource:"Angi 2026", format:"comparison-table" },
  { id:11, slug:"cost-to-replace-electrical-panel", pillar:"electrical", title:"Cost to Replace an Electrical Panel (100A vs. 200A)", keyword:"cost to replace electrical panel", costLow:"$1,200", costAvg:"$2,500", costHigh:"$4,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"comparison-table" },
  { id:12, slug:"average-electric-bill-by-household-size", pillar:"hvac-energy", title:"Average Utility Bill by Household Size: Electric", keyword:"average electric bill by household size", costLow:"$100", costAvg:"$150", costHigh:"$250", costUnit:"/month", costSource:"BLS Consumer Expenditure Survey 2025", format:"data-table" },
  { id:13, slug:"cost-to-install-solar-panels", pillar:"hvac-energy", title:"Cost to Install Solar Panels (With & Without Battery)", keyword:"cost to install solar panels", costLow:"$15,000", costAvg:"$25,000", costHigh:"$35,000", costUnit:" after credits", costSource:"EnergySage 2026", format:"calculator" },
  { id:14, slug:"furnace-repair-vs-replace", pillar:"hvac-energy", title:"Furnace Repair vs. Replace: Cost & Decision Guide", keyword:"furnace repair vs replace", costLow:"$100", costAvg:"$500", costHigh:"$1,500", costUnit:" for repair", costSource:"HVAC Pricing Guide 2026", format:"decision-table" },
  { id:15, slug:"mold-remediation-cost-by-square-footage", pillar:"home-maintenance", title:"Mold Remediation Cost by Square Footage", keyword:"mold remediation cost per square foot", costLow:"$1,500", costAvg:"$4,500", costHigh:"$8,000", costUnit:"", costSource:"Angi 2026 & HomeGuide 2026", format:"calculator" },
  { id:16, slug:"cost-to-replace-windows", pillar:"roofing-exterior", title:"Cost to Replace Windows (Per Window & Whole House)", keyword:"cost to replace windows", costLow:"$400", costAvg:"$775", costHigh:"$1,300", costUnit:" per window", costSource:"This Old House 2026", format:"calculator" },
  { id:17, slug:"cost-to-paint-a-house", pillar:"interior-renovation", title:"Cost to Paint a House: Interior vs. Exterior", keyword:"cost to paint a house", costLow:"$1,500", costAvg:"$3,500", costHigh:"$6,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"comparison-table" },
  { id:18, slug:"cost-to-replace-flooring-by-type", pillar:"interior-renovation", title:"Cost to Replace Flooring by Type (LVP, Hardwood, Tile, Carpet)", keyword:"cost to replace flooring per square foot", costLow:"$3", costAvg:"$8", costHigh:"$15", costUnit:"/sq ft", costSource:"HomeGuide 2026 & Fixr 2026", format:"comparison-table" },
  { id:19, slug:"cost-to-install-a-fence", pillar:"roofing-exterior", title:"Cost to Install a Fence (By Material & Length)", keyword:"cost to install a fence", costLow:"$1,500", costAvg:"$3,500", costHigh:"$8,000", costUnit:"", costSource:"HomeGuide 2026 & Fixr 2026", format:"calculator" },
  { id:20, slug:"cost-to-remove-a-tree", pillar:"home-maintenance", title:"Cost to Remove a Tree (and Stump Grinding)", keyword:"cost to remove a tree", costLow:"$200", costAvg:"$700", costHigh:"$2,000", costUnit:"", costSource:"Angi 2026 & HomeGuide 2026", format:"calculator" },
  { id:21, slug:"average-cost-of-homeowners-insurance", pillar:"home-maintenance", title:"Average Cost of Homeowners Insurance (What Drives It Up)", keyword:"average cost of homeowners insurance", costLow:"$1,000", costAvg:"$1,500", costHigh:"$3,000", costUnit:"/year", costSource:"NAIC 2024 & Bankrate 2026", format:"data-table" },
  { id:22, slug:"cost-to-install-attic-insulation", pillar:"hvac-energy", title:"Cost to Install Attic Insulation", keyword:"cost to install attic insulation", costLow:"$1,500", costAvg:"$3,500", costHigh:"$6,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"calculator" },
  { id:23, slug:"ac-repair-vs-replace", pillar:"hvac-energy", title:"AC Repair vs. Replace: When to Stop Paying for Repairs", keyword:"ac repair vs replace", costLow:"$150", costAvg:"$400", costHigh:"$3,000", costUnit:" for repair", costSource:"HVAC Pricing Guide 2026", format:"decision-table" },
  { id:24, slug:"cost-to-install-a-generator", pillar:"electrical", title:"Cost to Install a Generator (Standby vs. Portable)", keyword:"cost to install a generator", costLow:"$500", costAvg:"$3,500", costHigh:"$8,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"comparison-table" },
  { id:25, slug:"refrigerator-repair-vs-replace", pillar:"home-maintenance", title:"Refrigerator Repair vs. Replace: The Real Cost Math", keyword:"is it worth it to replace a refrigerator", costLow:"$150", costAvg:"$400", costHigh:"$1,000", costUnit:" for repair", costSource:"Angi 2026 & Fixr 2026", format:"decision-table" },
  { id:26, slug:"cost-to-install-ev-charger", pillar:"electrical", title:"Cost to Install an EV Charger at Home", keyword:"cost to install ev charger", costLow:"$500", costAvg:"$1,500", costHigh:"$2,500", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"calculator" },
  { id:27, slug:"gutter-installation-cost", pillar:"roofing-exterior", title:"Gutter Installation & Replacement Cost", keyword:"gutter installation cost", costLow:"$1,000", costAvg:"$2,500", costHigh:"$5,000", costUnit:"", costSource:"HomeGuide 2026 & Fixr 2026", format:"calculator" },
  { id:28, slug:"metal-roof-vs-asphalt-shingle", pillar:"roofing-exterior", title:"Metal Roof vs. Asphalt Shingle Roof: Cost & Lifespan Compared", keyword:"metal roof vs asphalt shingle cost", costLow:"$5,700", costAvg:"$12,000", costHigh:"$25,000", costUnit:"", costSource:"HomeGuide 2026", format:"comparison-table" },
  { id:29, slug:"cost-to-build-a-deck", pillar:"roofing-exterior", title:"Cost to Build a Deck (By Material & Size)", keyword:"cost to build a deck", costLow:"$3,500", costAvg:"$7,500", costHigh:"$15,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"calculator" },
  { id:30, slug:"average-water-bill-by-household-size", pillar:"plumbing", title:"Average Water Bill by Household Size", keyword:"average water bill by household size", costLow:"$35", costAvg:"$75", costHigh:"$150", costUnit:"/month", costSource:"EPA WaterSense 2025", format:"data-table" },
  { id:31, slug:"garage-door-repair-vs-replace", pillar:"home-maintenance", title:"Cost to Repair vs. Replace a Garage Door", keyword:"garage door repair vs replace", costLow:"$150", costAvg:"$350", costHigh:"$1,000", costUnit:" for repair", costSource:"HomeGuide 2026 & Angi 2026", format:"decision-table" },
  { id:32, slug:"generator-vs-battery-backup-cost", pillar:"electrical", title:"Cost to Install a Whole-House Generator vs. Battery Backup", keyword:"generator vs battery backup cost", costLow:"$500", costAvg:"$5,000", costHigh:"$15,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"comparison-table" },
  { id:33, slug:"kitchen-remodel-cost-without-appliances", pillar:"kitchen-bath", title:"Cost to Remodel a Kitchen Without New Appliances", keyword:"kitchen remodel cost without appliances", costLow:"$10,000", costAvg:"$20,000", costHigh:"$35,000", costUnit:"", costSource:"Fixr 2026 & HomeGuide 2026", format:"guide" },
  { id:34, slug:"small-bathroom-remodel-cost", pillar:"kitchen-bath", title:"Small Bathroom Remodel Cost (Under 40 Sq Ft)", keyword:"small bathroom remodel cost", costLow:"$4,500", costAvg:"$7,500", costHigh:"$12,000", costUnit:"", costSource:"Badeloft 2026 & Angi 2026", format:"calculator" },
  { id:35, slug:"sewer-line-repair-cost", pillar:"plumbing", title:"Cost to Replace a Septic Tank or Repair a Sewer Line", keyword:"sewer line repair cost", costLow:"$2,500", costAvg:"$6,000", costHigh:"$12,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"comparison-table" },
  { id:36, slug:"cost-to-add-bathroom-to-basement", pillar:"interior-renovation", title:"Cost to Add a Bathroom to a Basement", keyword:"cost to finish a basement and add a bathroom", costLow:"$5,000", costAvg:"$12,000", costHigh:"$25,000", costUnit:"", costSource:"HomeGuide 2026 & Fixr 2026", format:"guide" },
  { id:37, slug:"remove-and-install-attic-insulation", pillar:"hvac-energy", title:"Cost to Remove and Install New Attic Insulation", keyword:"cost to remove and install attic insulation", costLow:"$2,000", costAvg:"$4,500", costHigh:"$8,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"guide" },
  { id:38, slug:"garage-door-worth-it-before-selling", pillar:"home-maintenance", title:"Is It Worth It to Replace Your Garage Door Before Selling?", keyword:"is it worth replacing garage door before selling", costLow:"$800", costAvg:"$1,500", costHigh:"$3,000", costUnit:"", costSource:"Remodeling Magazine 2025", format:"guide" },
  { id:39, slug:"cost-to-install-water-softener", pillar:"plumbing", title:"Cost to Install a Water Softener", keyword:"cost to install a water softener", costLow:"$500", costAvg:"$1,500", costHigh:"$3,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"calculator" },
  { id:40, slug:"cost-to-replace-interior-doors", pillar:"interior-renovation", title:"Cost to Replace Interior Doors", keyword:"cost to replace interior doors", costLow:"$100", costAvg:"$350", costHigh:"$800", costUnit:" per door", costSource:"HomeGuide 2026 & Fixr 2026", format:"calculator" },
  { id:41, slug:"drywall-repair-vs-replace-cost", pillar:"interior-renovation", title:"Cost to Repair vs. Replace Drywall (Water/Mold Damage)", keyword:"drywall repair vs replace cost", costLow:"$200", costAvg:"$600", costHigh:"$1,500", costUnit:" per room", costSource:"HomeGuide 2026 & Angi 2026", format:"decision-table" },
  { id:42, slug:"cost-to-install-central-air-without-ducts", pillar:"hvac-energy", title:"Cost to Install Central Air in a House Without Ductwork", keyword:"cost to install central air without ducts", costLow:"$6,000", costAvg:"$12,000", costHigh:"$20,000", costUnit:"", costSource:"HomeGuide 2026", format:"guide" },
  { id:43, slug:"cost-to-replace-a-driveway", pillar:"roofing-exterior", title:"Cost to Replace a Driveway (Asphalt vs. Concrete vs. Pavers)", keyword:"cost to replace a driveway", costLow:"$3,000", costAvg:"$6,000", costHigh:"$12,000", costUnit:"", costSource:"HomeGuide 2026 & Fixr 2026", format:"calculator" },
  { id:44, slug:"termite-damage-repair-cost", pillar:"home-maintenance", title:"Termite & Pest Damage Repair Cost", keyword:"termite damage repair cost", costLow:"$500", costAvg:"$3,000", costHigh:"$8,000", costUnit:"", costSource:"Angi 2026 & HomeGuide 2026", format:"calculator" },
  { id:45, slug:"cost-to-upgrade-to-200-amp-panel", pillar:"electrical", title:"Cost to Upgrade a Home to 200-Amp Electrical Service", keyword:"cost to upgrade to 200 amp panel", costLow:"$1,500", costAvg:"$2,500", costHigh:"$4,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"guide" },
  { id:46, slug:"cabinet-refacing-vs-replacement-cost", pillar:"kitchen-bath", title:"Cost to Replace Cabinets (Reface vs. Full Replace)", keyword:"cabinet refacing vs replacement cost", costLow:"$1,500", costAvg:"$5,000", costHigh:"$15,000", costUnit:"", costSource:"HomeGuide 2026 & Fixr 2026", format:"comparison-table" },
  { id:47, slug:"cost-to-replace-countertops", pillar:"kitchen-bath", title:"Cost to Replace Countertops (Laminate vs. Quartz vs. Granite)", keyword:"cost to replace countertops", costLow:"$2,000", costAvg:"$4,500", costHigh:"$10,000", costUnit:"", costSource:"HomeGuide 2026 & Angi 2026", format:"calculator" },
  { id:48, slug:"how-much-value-does-a-pool-add", pillar:"home-maintenance", title:"How Much Value Does a Deck/Patio/Pool Add to Your Home?", keyword:"how much value does a pool add to your home", costLow:"$30,000", costAvg:"$55,000", costHigh:"$80,000", costUnit:"", costSource:"Remodeling Magazine 2025", format:"data-table" },
  { id:49, slug:"is-a-kitchen-remodel-worth-it", pillar:"kitchen-bath", title:"Cost to Reface vs. Replace Kitchen Cabinets (ROI Breakdown)", keyword:"is a kitchen remodel worth it", costLow:"$27,000", costAvg:"$45,000", costHigh:"$79,000", costUnit:"", costSource:"Remodeling Magazine 2025", format:"guide" },
  { id:50, slug:"annual-home-maintenance-cost-calculator", pillar:"home-maintenance", title:"Home Maintenance Cost Calculator: What to Budget Per Year", keyword:"annual home maintenance cost calculator", costLow:"$2,000", costAvg:"$4,500", costHigh:"$8,000", costUnit:"/year", costSource:"Angi 2026", format:"calculator" },
];

const PILLARS = {
  "roofing-exterior": {
    name: "Roofing & Exterior",
    bg: "#FAF7F2",
    accent1: "#B5651D",
    accent2: "#945116",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<path d="M400 160 L600 80 L800 160 L800 400 L400 400 Z" fill="#B5651D" opacity="0.15"/><path d="M420 170 L600 100 L780 170 L780 390 L420 390 Z" fill="#B5651D" opacity="0.08"/><line x1="600" y1="100" x2="600" y2="390" stroke="#B5651D" stroke-width="2" opacity="0.2"/><rect x="540" y="280" width="120" height="110" fill="#FAF7F2" stroke="#B5651D" stroke-width="1.5" rx="4"/><rect x="560" y="300" width="80" height="8" fill="#B5651D" opacity="0.3" rx="2"/><rect x="560" y="316" width="60" height="6" fill="#B5651D" opacity="0.2" rx="2"/><rect x="560" y="330" width="70" height="6" fill="#B5651D" opacity="0.2" rx="2"/><rect x="560" y="352" width="40" height="8" fill="#3F6E52" opacity="0.4" rx="1"/>`
  },
  "hvac-energy": {
    name: "HVAC & Energy",
    bg: "#FAF7F2",
    accent1: "#3F6E52",
    accent2: "#325940",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<rect x="520" y="200" width="160" height="180" rx="12" fill="#3F6E52" opacity="0.12" stroke="#3F6E52" stroke-width="1.5"/><rect x="540" y="220" width="120" height="30" rx="4" fill="#3F6E52" opacity="0.2"/><rect x="540" y="260" width="120" height="20" rx="2" fill="#3F6E52" opacity="0.1"/><circle cx="600" cy="340" r="25" fill="none" stroke="#B5651D" stroke-width="3"/><path d="M600 315 L600 365 M575 340 L625 340" stroke="#B5651D" stroke-width="3"/><path d="M540 160 Q540 140 560 140 L640 140 Q660 140 660 160 L660 200 L540 200 Z" fill="#3F6E52" opacity="0.15"/><path d="M556 160 L556 195 M600 160 L600 195 M644 160 L644 195" stroke="#3F6E52" stroke-width="1.5" opacity="0.3"/>`
  },
  plumbing: {
    name: "Plumbing & Water Systems",
    bg: "#FAF7F2",
    accent1: "#3F6E52",
    accent2: "#325940",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<path d="M560 180 Q540 200 540 240 Q540 280 560 300 L580 320 Q590 330 590 350 L590 390" stroke="#3F6E52" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M640 180 Q660 200 660 240 Q660 280 640 300 L620 320 Q610 330 610 350 L610 390" stroke="#3F6E52" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="550" y="150" width="100" height="40" rx="6" fill="#3F6E52" opacity="0.15" stroke="#3F6E52" stroke-width="1.5"/><circle cx="565" cy="395" r="6" fill="#3F6E52" opacity="0.3"/><circle cx="635" cy="395" r="6" fill="#3F6E52" opacity="0.3"/><circle cx="560" cy="260" r="4" fill="#B5651D" opacity="0.5"/><circle cx="640" cy="260" r="4" fill="#B5651D" opacity="0.5"/>`
  },
  electrical: {
    name: "Electrical",
    bg: "#FAF7F2",
    accent1: "#B5651D",
    accent2: "#945116",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<path d="M580 140 L560 240 L590 240 L540 360 L620 240 L590 240 L630 140 Z" fill="#B5651D" opacity="0.15" stroke="#B5651D" stroke-width="1.5" stroke-linejoin="round"/><rect x="530" y="370" width="140" height="30" rx="4" fill="#B5651D" opacity="0.08" stroke="#B5651D" stroke-width="1"/><circle cx="600" cy="385" r="5" fill="#B5651D" opacity="0.4"/><line x1="600" y1="360" x2="600" y2="370" stroke="#B5651D" stroke-width="2"/><circle cx="600" cy="190" r="40" fill="none" stroke="#B5651D" stroke-width="1.5" opacity="0.2"/>`
  },
  "kitchen-bath": {
    name: "Kitchen & Bathroom",
    bg: "#FAF7F2",
    accent1: "#B5651D",
    accent2: "#945116",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<rect x="530" y="200" width="140" height="180" rx="8" fill="#B5651D" opacity="0.08" stroke="#B5651D" stroke-width="1.5"/><rect x="545" y="215" width="110" height="15" rx="3" fill="#B5651D" opacity="0.15"/><rect x="545" y="240" width="110" height="50" rx="4" fill="#FAF7F2" stroke="#B5651D" stroke-width="1"/><circle cx="600" cy="290" r="20" fill="none" stroke="#B5651D" stroke-width="1.5"/><line x1="590" y1="290" x2="610" y2="290" stroke="#B5651D" stroke-width="2"/><line x1="600" y1="280" x2="600" y2="300" stroke="#B5651D" stroke-width="2"/><rect x="545" y="320" width="110" height="8" rx="2" fill="#B5651D" opacity="0.2"/><rect x="545" y="336" width="80" height="8" rx="2" fill="#B5651D" opacity="0.2"/><rect x="545" y="352" width="95" height="8" rx="2" fill="#B5651D" opacity="0.2"/>`
  },
  "interior-renovation": {
    name: "Interior Renovation",
    bg: "#FAF7F2",
    accent1: "#3F6E52",
    accent2: "#325940",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<rect x="520" y="180" width="160" height="200" rx="6" fill="#3F6E52" opacity="0.06" stroke="#3F6E52" stroke-width="1.5"/><rect x="540" y="200" width="50" height="50" rx="3" fill="#B5651D" opacity="0.12"/><rect x="600" y="200" width="60" height="50" rx="3" fill="#B5651D" opacity="0.08"/><rect x="540" y="260" width="50" height="50" rx="3" fill="#B5651D" opacity="0.08"/><rect x="600" y="260" width="60" height="50" rx="3" fill="#B5651D" opacity="0.12"/><rect x="540" y="320" width="120" height="40" rx="3" fill="#B5651D" opacity="0.06"/><rect x="545" y="335" width="30" height="6" rx="2" fill="#3F6E52" opacity="0.3"/><rect x="585" y="335" width="30" height="6" rx="2" fill="#3F6E52" opacity="0.3"/>`
  },
  "home-maintenance": {
    name: "Home Maintenance",
    bg: "#FAF7F2",
    accent1: "#6B6459",
    accent2: "#1C2B24",
    accent3: "#E7E2D9",
    text: "#1C2B24",
    muted: "#6B6459",
    iconPaths: `<circle cx="580" cy="240" r="35" fill="none" stroke="#6B6459" stroke-width="3"/><circle cx="580" cy="240" r="12" fill="#6B6459" opacity="0.2"/><rect x="610" y="260" width="40" height="12" rx="3" fill="#6B6459" transform="rotate(45 630 266)"/><rect x="525" y="370" width="150" height="25" rx="4" fill="#B5651D" opacity="0.1" stroke="#B5651D" stroke-width="1"/><rect x="535" y="378" width="40" height="9" rx="2" fill="#B5651D" opacity="0.3"/><circle cx="560" cy="300" r="50" fill="none" stroke="#3F6E52" stroke-width="1" opacity="0.15"/>`
  }
};

function pill(slug) { return PILLARS[slug] || PILLARS["home-maintenance"]; }

function escapeXml(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function wrapText(ctx, text, maxWidth) {
  if (text.length <= maxWidth) return [text];
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (t.length > maxWidth && line) { lines.push(line); line = w; }
    else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function generateHero(a) {
  const p = pill(a.pillar);
  const titleLines = wrapText(null, a.title, 48);
  const titleY = titleLines.length <= 2 ? 370 : 350;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.accent1}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${p.bg}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${p.accent1}"/>
      <stop offset="100%" stop-color="${p.accent2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${p.bg}"/>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#band)"/>
  <circle cx="1050" cy="100" r="300" fill="${p.accent1}" opacity="0.03"/>
  <circle cx="100" cy="500" r="250" fill="${p.accent2}" opacity="0.03"/>
  <rect x="40" y="40" width="380" height="500" rx="16" fill="${p.accent1}" opacity="0.04"/>
  ${p.iconPaths}
  <text x="600" y="${titleY - (titleLines.length > 1 ? 20 : 0)}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="${titleLines.length <= 2 ? 34 : 28}" font-weight="700" fill="${p.text}">${titleLines.map((l,i) => `<tspan x="600" dy="${i===0?0:36}">${escapeXml(l)}</tspan>`).join("")}</text>
  <text x="600" y="${titleY + 60 + (titleLines.length > 2 ? 10 : 0)}" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="18" fill="${p.muted}">National Average Cost</text>
  <rect x="${600 - 140}" y="${titleY + 75 + (titleLines.length > 2 ? 10 : 0)}" width="280" height="50" rx="25" fill="${p.accent1}" opacity="0.12"/>
  <text x="600" y="${titleY + 108 + (titleLines.length > 2 ? 10 : 0)}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.accent1}">${escapeXml(a.costLow)} — ${escapeXml(a.costHigh)}${escapeXml(a.costUnit)}</text>
  <rect x="0" y="590" width="1200" height="40" fill="${p.accent1}" opacity="0.04"/>
  <text x="40" y="616" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.muted}">${escapeXml(p.name)}</text>
  <text x="1140" y="616" text-anchor="end" font-family="Georgia,'Times New Roman',serif" font-size="15" font-weight="600" fill="${p.accent1}">HomeCostGuide</text>
  <text x="600" y="616" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" fill="${p.muted}">Source: ${escapeXml(a.costSource)}</text>
</svg>`;
}

function generateCostVisual(a) {
  const p = pill(a.pillar);
  function val(s) { return Number(s.replace(/[^0-9.]/g,"")); }
  const lv = val(a.costLow);
  const av = val(a.costAvg);
  const hv = val(a.costHigh);
  const maxV = Math.max(hv, 1);
  const lPct = (lv / maxV) * 80;
  const aPct = (av / maxV) * 80;
  const hPct = (hv / maxV) * 80;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="${p.bg}"/>
  <rect x="0" y="0" width="800" height="6" fill="${p.accent1}" opacity="0.3"/>
  <text x="400" y="50" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="24" font-weight="700" fill="${p.text}">National Average ${escapeXml(a.keyword)}</text>
  <text x="400" y="78" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="${p.muted}">Cost range based on national contractor pricing data</text>
  <g transform="translate(100, 130)">
    <rect x="0" y="0" width="${lPct * 6}" height="36" rx="6" fill="${p.accent1}" opacity="0.2"/>
    <rect x="0" y="50" width="${aPct * 6}" height="36" rx="6" fill="${p.accent1}" opacity="0.35"/>
    <rect x="0" y="100" width="${hPct * 6}" height="36" rx="6" fill="${p.accent1}" opacity="0.5"/>
    <text x="-10" y="24" text-anchor="end" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.text}">Low</text>
    <text x="${lPct * 6 + 12}" y="24" font-family="Georgia,'Times New Roman',serif" font-size="18" font-weight="700" fill="${p.accent1}">${escapeXml(a.costLow)}</text>
    <text x="-10" y="74" text-anchor="end" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.text}">Average</text>
    <text x="${aPct * 6 + 12}" y="74" font-family="Georgia,'Times New Roman',serif" font-size="18" font-weight="700" fill="${p.accent1}">${escapeXml(a.costAvg)}</text>
    <text x="-10" y="124" text-anchor="end" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.text}">High</text>
    <text x="${hPct * 6 + 12}" y="124" font-family="Georgia,'Times New Roman',serif" font-size="18" font-weight="700" fill="${p.accent1}">${escapeXml(a.costHigh)}</text>
  </g>
  <line x1="100" y1="270" x2="700" y2="270" stroke="${p.accent3}" stroke-width="1"/>
  <circle cx="100" cy="270" r="6" fill="${p.accent1}" opacity="0.2"/>
  <circle cx="${100 + ((av - lv) / (hv - lv || 1)) * 600}" cy="270" r="8" fill="${p.accent1}"/>
  <circle cx="700" cy="270" r="6" fill="${p.accent1}" opacity="0.2"/>
  <text x="100" y="295" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">${escapeXml(a.costLow)}</text>
  <text x="${100 + ((av - lv) / (hv - lv || 1)) * 600}" y="295" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" font-weight="600" fill="${p.accent1}">AVG ${escapeXml(a.costAvg)}</text>
  <text x="700" y="295" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">${escapeXml(a.costHigh)}</text>
  <text x="400" y="420" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">${escapeXml(a.costUnit ? "Per unit: "+a.costUnit : "")}</text>
  <rect x="180" y="440" width="440" height="30" rx="15" fill="${p.accent1}" opacity="0.06"/>
  <text x="400" y="460" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Source: ${escapeXml(a.costSource)}</text>
</svg>`;
}

function generateFormatVisual(a) {
  const p = pill(a.pillar);
  const fm = a.format;
  if (fm === "calculator") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="${p.bg}"/>
  <rect x="0" y="0" width="800" height="6" fill="${p.accent1}" opacity="0.3"/>
  <text x="400" y="50" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.text}">Estimate Your ${escapeXml(a.keyword)}</text>
  <text x="400" y="78" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="${p.muted}">Use our interactive calculator for a personalized quote</text>
  <rect x="200" y="120" width="400" height="280" rx="12" fill="white" stroke="${p.accent3}" stroke-width="1.5"/>
  <rect x="200" y="120" width="400" height="45" rx="12" fill="${p.accent1}" opacity="0.08"/>
  <text x="400" y="149" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Project Cost Calculator</text>
  <text x="240" y="200" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.muted}">Project scope</text>
  <rect x="240" y="210" width="320" height="36" rx="6" fill="${p.accent1}" opacity="0.06" stroke="${p.accent3}" stroke-width="1"/>
  <text x="260" y="233" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.muted}">Average-sized ${escapeXml(p.name)} project</text>
  <text x="240" y="280" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.muted}">Your estimated cost</text>
  <rect x="240" y="290" width="320" height="50" rx="8" fill="${p.accent1}" opacity="0.08"/>
  <text x="400" y="322" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.accent1}">${escapeXml(a.costLow)} — ${escapeXml(a.costHigh)}</text>
  <text x="400" y="380" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Adjust scope, size, and location for a precise estimate</text>
  <rect x="310" y="420" width="180" height="40" rx="20" fill="${p.accent1}" opacity="0.12"/>
  <text x="400" y="446" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.accent1}">Use Free Calculator</text>
</svg>`;
  }
  if (fm === "comparison-table") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="${p.bg}"/>
  <rect x="0" y="0" width="800" height="6" fill="${p.accent1}" opacity="0.3"/>
  <text x="400" y="50" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.text}">${escapeXml(a.keyword)}</text>
  <text x="400" y="78" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="${p.muted}">Compare costs, features, and ROI at a glance</text>
  <rect x="120" y="110" width="260" height="280" rx="10" fill="white" stroke="${p.accent3}" stroke-width="1.5"/>
  <rect x="120" y="110" width="260" height="50" rx="10" fill="${p.accent1}" opacity="0.08"/>
  <text x="250" y="142" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Option A</text>
  <circle cx="250" cy="195" r="30" fill="${p.accent1}" opacity="0.06"/>
  <text x="250" y="200" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="28" fill="${p.accent1}">$$</text>
  <text x="250" y="250" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="18" font-weight="700" fill="${p.accent1}">${escapeXml(a.costLow)}</text>
  <text x="250" y="340" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.muted}">Lower upfront cost</text>
  <rect x="420" y="110" width="260" height="280" rx="10" fill="white" stroke="${p.accent1}" stroke-width="2"/>
  <rect x="420" y="110" width="260" height="50" rx="10" fill="${p.accent1}" opacity="0.12"/>
  <text x="550" y="142" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Option B</text>
  <circle cx="550" cy="195" r="30" fill="${p.accent1}" opacity="0.06"/>
  <text x="550" y="200" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="28" fill="${p.accent1}">$$$</text>
  <text x="550" y="250" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="18" font-weight="700" fill="${p.accent1}">${escapeXml(a.costAvg)}</text>
  <text x="550" y="340" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.muted}">Better long-term value</text>
  <text x="400" y="440" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Source: ${escapeXml(a.costSource)}</text>
</svg>`;
  }
  if (fm === "decision-table") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="${p.bg}"/>
  <rect x="0" y="0" width="800" height="6" fill="${p.accent1}" opacity="0.3"/>
  <text x="400" y="50" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.text}">Repair or Replace? Make the Right Call</text>
  <text x="400" y="78" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="${p.muted}">Our decision guide helps you choose based on real cost data</text>
  <rect x="300" y="110" width="200" height="55" rx="27" fill="${p.accent1}" opacity="0.1" stroke="${p.accent1}" stroke-width="1.5"/>
  <text x="400" y="144" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Your Situation</text>
  <line x1="400" y1="165" x2="400" y2="205" stroke="${p.accent1}" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="400,210 393,200 407,200" fill="${p.accent1}"/>
  <rect x="140" y="210" width="220" height="55" rx="8" fill="${p.accent1}" opacity="0.08" stroke="${p.accent1}" stroke-width="1"/>
  <text x="250" y="244" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.text}">Repair</text>
  <line x1="250" y1="265" x2="250" y2="295" stroke="${p.accent1}" stroke-width="2"/>
  <polygon points="250,300 243,290 257,290" fill="${p.accent1}"/>
  <rect x="150" y="300" width="200" height="55" rx="8" fill="${p.accent1}" opacity="0.06"/>
  <text x="250" y="326" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" fill="${p.muted}">Cost: ${escapeXml(a.costLow)}</text>
  <text x="250" y="344" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Best for minor issues</text>
  <line x1="400" y1="210" x2="540" y2="210" stroke="${p.accent1}" stroke-width="2"/>
  <polygon points="545,210 535,203 535,217" fill="${p.accent1}"/>
  <rect x="440" y="210" width="220" height="55" rx="8" fill="${p.accent1}" opacity="0.15" stroke="${p.accent1}" stroke-width="1.5"/>
  <text x="550" y="244" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.text}">Replace</text>
  <line x1="550" y1="265" x2="550" y2="295" stroke="${p.accent1}" stroke-width="2"/>
  <polygon points="550,300 543,290 557,290" fill="${p.accent1}"/>
  <rect x="450" y="300" width="200" height="55" rx="8" fill="${p.accent1}" opacity="0.1"/>
  <text x="550" y="326" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" fill="${p.muted}">Cost: ${escapeXml(a.costHigh)}</text>
  <text x="550" y="344" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Best for major/older systems</text>
  <text x="400" y="420" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" font-weight="600" fill="${p.accent1}">Factor age, condition, and repair frequency</text>
</svg>`;
  }
  if (fm === "data-table") {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="${p.bg}"/>
  <rect x="0" y="0" width="800" height="6" fill="${p.accent1}" opacity="0.3"/>
  <text x="400" y="50" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.text}">${escapeXml(a.keyword)}</text>
  <text x="400" y="78" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="${p.muted}">Data sourced from national surveys and published research</text>
  <rect x="160" y="110" width="480" height="240" rx="8" fill="white" stroke="${p.accent3}" stroke-width="1"/>
  <rect x="160" y="110" width="480" height="40" rx="8" fill="${p.accent1}" opacity="0.08"/>
  <text x="400" y="136" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" font-weight="600" fill="${p.text}">Average Cost Data</text>
  <line x1="160" y1="150" x2="640" y2="150" stroke="${p.accent3}" stroke-width="1"/>
  <line x1="420" y1="110" x2="420" y2="350" stroke="${p.accent3}" stroke-width="1"/>
  <text x="290" y="185" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" font-weight="600" fill="${p.muted}">Category</text>
  <text x="530" y="185" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" font-weight="600" fill="${p.muted}">Cost</text>
  <line x1="160" y1="195" x2="640" y2="195" stroke="${p.accent3}" stroke-width="0.5"/>
  <text x="290" y="220" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.text}">Low range</text>
  <text x="530" y="220" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="16" font-weight="600" fill="${p.accent1}">${escapeXml(a.costLow)}</text>
  <line x1="160" y1="235" x2="640" y2="235" stroke="${p.accent3}" stroke-width="0.5"/>
  <text x="290" y="260" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.text}">Average</text>
  <text x="530" y="260" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="16" font-weight="600" fill="${p.accent1}">${escapeXml(a.costAvg)}</text>
  <line x1="160" y1="275" x2="640" y2="275" stroke="${p.accent3}" stroke-width="0.5"/>
  <text x="290" y="300" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="13" fill="${p.text}">High range</text>
  <text x="530" y="300" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="16" font-weight="600" fill="${p.accent1}">${escapeXml(a.costHigh)}</text>
  <line x1="160" y1="315" x2="640" y2="315" stroke="${p.accent3}" stroke-width="0.5"/>
  <text x="400" y="340" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">${escapeXml(a.costUnit || "")}</text>
  <text x="400" y="420" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Source: ${escapeXml(a.costSource)}</text>
</svg>`;
  }
  // guide -- default / guide format
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="${p.bg}"/>
  <rect x="0" y="0" width="800" height="6" fill="${p.accent1}" opacity="0.3"/>
  <text x="400" y="50" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="22" font-weight="700" fill="${p.text}">Complete Guide: ${escapeXml(a.keyword)}</text>
  <text x="400" y="78" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="${p.muted}">Step-by-step pricing breakdown for informed decisions</text>
  <g transform="translate(100, 120)">
    <circle cx="50" cy="30" r="24" fill="${p.accent1}" opacity="0.1"/>
    <text x="50" y="36" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="${p.accent1}">1</text>
    <text x="90" y="36" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Evaluate your project scope</text>
    <text x="90" y="56" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" fill="${p.muted}">Assess size, materials, and complexity</text>
    <line x1="50" y1="54" x2="50" y2="100" stroke="${p.accent3}" stroke-width="1.5" stroke-dasharray="4,3"/>
    <circle cx="50" cy="110" r="24" fill="${p.accent1}" opacity="0.1"/>
    <text x="50" y="116" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="${p.accent1}">2</text>
    <text x="90" y="116" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Compare material & labor costs</text>
    <text x="90" y="136" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" fill="${p.muted}">Get quotes from multiple contractors</text>
    <line x1="50" y1="134" x2="50" y2="180" stroke="${p.accent3}" stroke-width="1.5" stroke-dasharray="4,3"/>
    <circle cx="50" cy="190" r="24" fill="${p.accent1}" opacity="0.1"/>
    <text x="50" y="196" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="${p.accent1}">3</text>
    <text x="90" y="196" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="${p.text}">Plan your budget</text>
    <text x="90" y="216" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="12" fill="${p.muted}">Budget range: ${escapeXml(a.costLow)} — ${escapeXml(a.costHigh)}</text>
  </g>
  <text x="400" y="420" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="11" fill="${p.muted}">Source: ${escapeXml(a.costSource)}</text>
</svg>`;
}

console.log("Generating article images...");
let count = 0;
for (const a of ARTICLES) {
  const dir = path.join(OUT, a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "hero.svg"), generateHero(a));
  fs.writeFileSync(path.join(dir, "cost.svg"), generateCostVisual(a));
  fs.writeFileSync(path.join(dir, "format.svg"), generateFormatVisual(a));
  count++;
  if (count % 10 === 0) console.log(`  ${count}/${ARTICLES.length} articles done`);
}
console.log(`Done! Generated ${count * 3} images across ${count} articles.`);
