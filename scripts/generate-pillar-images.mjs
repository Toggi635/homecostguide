import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "..", "public", "pillar-images");
fs.mkdirSync(dir, { recursive: true });

const pillars = [
  { slug: "roofing-exterior", name: "Roofing & Exterior", accent: "#B5651D", count: "6 guides" },
  { slug: "hvac-energy", name: "HVAC & Energy", accent: "#3F6E52", count: "9 guides" },
  { slug: "plumbing", name: "Plumbing & Water", accent: "#3F6E52", count: "5 guides" },
  { slug: "electrical", name: "Electrical", accent: "#B5651D", count: "5 guides" },
  { slug: "kitchen-bath", name: "Kitchen & Bath", accent: "#B5651D", count: "7 guides" },
  { slug: "interior-renovation", name: "Interior Renovation", accent: "#3F6E52", count: "6 guides" },
  { slug: "home-maintenance", name: "Home Maintenance", accent: "#6B6459", count: "12 guides" },
];

for (const p of pillars) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="1200" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FAF7F2" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="400" fill="#FAF7F2"/>
  <rect width="1200" height="400" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${p.accent}"/>
  <circle cx="950" cy="80" r="250" fill="${p.accent}" opacity="0.04"/>
  <circle cx="100" cy="350" r="200" fill="${p.accent}" opacity="0.03"/>
  <text x="80" y="160" font-family="Georgia,'Times New Roman',serif" font-size="38" font-weight="700" fill="#1C2B24">${p.name}</text>
  <text x="80" y="210" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="18" fill="#6B6459">Real cost data, sourced pricing, and expert guides</text>
  <text x="80" y="240" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" fill="#6B6459">Compare prices before you hire a contractor</text>
  <rect x="80" y="275" width="180" height="40" rx="20" fill="${p.accent}" opacity="0.1"/>
  <text x="170" y="301" text-anchor="middle" font-family="system-ui,Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="${p.accent}">Browse ${p.count}</text>
  <text x="1140" y="380" text-anchor="end" font-family="Georgia,'Times New Roman',serif" font-size="14" font-weight="600" fill="${p.accent}">HomeCostGuide</text>
  <rect x="250" y="80" width="850" height="270" rx="16" fill="${p.accent}" opacity="0.03"/>
</svg>`;
  fs.writeFileSync(path.join(dir, `${p.slug}.svg`), svg, "utf8");
  console.log(`Created: ${p.slug}.svg`);
}
