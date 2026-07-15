/**
 * download-photos.mjs
 *
 * Downloads real photographs from Unsplash for all 50 articles and 7 pillar pages.
 * Falls back to high-quality SVG illustrations when downloads fail.
 *
 * Usage: node scripts/download-photos.mjs
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLE_DIR = path.resolve(__dirname, "..", "public", "article-images");
const PILLAR_DIR = path.resolve(__dirname, "..", "public", "pillar-images");
const SOURCES_PATH = path.resolve(__dirname, "..", "public", "image-sources.json");

// ============================================================
// VERIFIED UNSPLASH PHOTO IDS (tested HTTP 200, image/jpeg)
// ============================================================
const PHOTO_IDS = {
  "1763665814605-a6489a3bf2a0": { photographer: "Sergej Karpow", desc: "workers installing shingles" },
  "1770149682967-5733992e49ff": { photographer: "Bernd Dittrich", desc: "workers repairing tiled roof" },
  "1472342139520-1aa49517fed8": { photographer: "davide ragusa", desc: "roof shingles" },
  "1753717202565-ee088d9871fc": { photographer: "Unsplash", desc: "house extension new windows" },
  "1722881445875-bdd5f4d9e6fa": { photographer: "Unsplash", desc: "backyard with deck and fence" },
  "1772852340517-b11ec88979fc": { photographer: "Brian J. Tromp", desc: "asphalt paving machine" },
  "1687266152952-540777e6e8c8": { photographer: "Unsplash", desc: "wooden deck with fence" },
  "1667830502449-d5a2039204d6": { photographer: "Unsplash", desc: "backyard with fence and trees" },
  "1704307023984-813727deade9": { photographer: "Unsplash", desc: "wooden house with deck and patio" },
  "1770306924587-7884ec2753a2": { photographer: "Taylor Friehl", desc: "wooden fence with trees" },
  "1757219525975-03b5984bc6e8": { photographer: "Unsplash", desc: "AC unit mounted on wall" },
  "1780445392462-b7761551820c": { photographer: "Unsplash", desc: "water heater and AC on exterior" },
  "1773952137490-2bea3f95ed39": { photographer: "proudlyswazi", desc: "multiple AC units on building" },
  "1780445392792-556e5609c5ab": { photographer: "Unsplash", desc: "solar panels on tiled roof" },
  "1668097613569-3405bb63262b": { photographer: "Unsplash", desc: "solar panel on roof" },
  "1780445392628-d6f5b9e5609b": { photographer: "Unsplash", desc: "solar panels on metal roof" },
  "1575299737366-39c143459bc5": { photographer: "Michal Balog", desc: "water heater on wall" },
  "1753272691001-4d68806ac590": { photographer: "Unsplash", desc: "electrical panel with wires" },
  "1773952136583-5175e906267c": { photographer: "proudlyswazi", desc: "electrical main switch panel" },
  "1509390144018-eeaf65052242": { photographer: "Unsplash", desc: "white electric power generator" },
  "1769745241584-be9b8227e126": { photographer: "Unsplash", desc: "bright minimal kitchen" },
  "1774437290626-34d18c49598a": { photographer: "Wemel Wood", desc: "modern kitchen dark wood cabinets" },
  "1721743138130-e8ce6e1a7dce": { photographer: "Lisa Anna", desc: "shower white tiled bathroom" },
  "1723257891127-0d1ea314a720": { photographer: "Alex Tyson", desc: "white tiled shower glass door" },
  "1564013799919-ab600027ffc6": { photographer: "Unsplash", desc: "house exterior" },
  "1506905925346-21bda4d32df4": { photographer: "Unsplash", desc: "landscape mountain" },
  "1769977453410-02f774fb8fef": { photographer: "Saifee Art", desc: "termite damage on wood" },
  "1658190579991-65472a8b7b05": { photographer: "Frames For Your Heart", desc: "swimming pool backyard" },
  "1663293761270-8fafc94e2087": { photographer: "Zac Gudakov", desc: "aerial swimming pool" },
  "1546668586-fc282cc41974": { photographer: "Unsplash", desc: "grey roof shingles" },
};

// Article slug -> { heroId, formatId }
const PHOTO_MAP = {
  "roof-replacement-cost":              { heroId: "1763665814605-a6489a3bf2a0", formatId: "1472342139520-1aa49517fed8" },
  "roof-repair-vs-replacement":         { heroId: "1770149682967-5733992e49ff", formatId: "1546668586-fc282cc41974" },
  "cost-to-replace-windows":            { heroId: "1753717202565-ee088d9871fc", formatId: "1564013799919-ab600027ffc6" },
  "cost-to-install-a-fence":           { heroId: "1722881445875-bdd5f4d9e6fa", formatId: "1770306924587-7884ec2753a2" },
  "gutter-installation-cost":           { heroId: "1763665814605-a6489a3bf2a0", formatId: "1722881445875-bdd5f4d9e6fa" },
  "metal-roof-vs-asphalt-shingle":      { heroId: "1472342139520-1aa49517fed8", formatId: "1763665814605-a6489a3bf2a0" },
  "cost-to-build-a-deck":               { heroId: "1687266152952-540777e6e8c8", formatId: "1704307023984-813727deade9" },
  "cost-to-replace-a-driveway":         { heroId: "1772852340517-b11ec88979fc", formatId: "1667830502449-d5a2039204d6" },
  "hvac-repair-vs-replace":             { heroId: "1757219525975-03b5984bc6e8", formatId: "1773952137490-2bea3f95ed39" },
  "new-hvac-system-cost":               { heroId: "1757219525975-03b5984bc6e8", formatId: "1773952137490-2bea3f95ed39" },
  "average-electric-bill-by-household-size": { heroId: "1773952137490-2bea3f95ed39", formatId: "1780445392462-b7761551820c" },
  "cost-to-install-solar-panels":       { heroId: "1780445392792-556e5609c5ab", formatId: "1668097613569-3405bb63262b" },
  "furnace-repair-vs-replace":          { heroId: "1773952137490-2bea3f95ed39", formatId: "1757219525975-03b5984bc6e8" },
  "cost-to-install-attic-insulation":   { heroId: "1564013799919-ab600027ffc6", formatId: "1773952137490-2bea3f95ed39" },
  "ac-repair-vs-replace":               { heroId: "1757219525975-03b5984bc6e8", formatId: "1773952137490-2bea3f95ed39" },
  "remove-and-install-attic-insulation":{ heroId: "1564013799919-ab600027ffc6", formatId: "1757219525975-03b5984bc6e8" },
  "cost-to-install-central-air-without-ducts": { heroId: "1773952137490-2bea3f95ed39", formatId: "1780445392462-b7761551820c" },
  "cost-to-replace-water-heater":       { heroId: "1575299737366-39c143459bc5", formatId: "1780445392462-b7761551820c" },
  "cost-to-repipe-a-house-pex-vs-copper": { heroId: "1575299737366-39c143459bc5", formatId: "1753272691001-4d68806ac590" },
  "average-water-bill-by-household-size": { heroId: "1575299737366-39c143459bc5", formatId: "1780445392462-b7761551820c" },
  "sewer-line-repair-cost":             { heroId: "1575299737366-39c143459bc5", formatId: "1780445392628-d6f5b9e5609b" },
  "cost-to-install-water-softener":     { heroId: "1575299737366-39c143459bc5", formatId: "1780445392462-b7761551820c" },
  "cost-to-replace-electrical-panel":   { heroId: "1753272691001-4d68806ac590", formatId: "1773952136583-5175e906267c" },
  "cost-to-install-a-generator":        { heroId: "1509390144018-eeaf65052242", formatId: "1773952136583-5175e906267c" },
  "cost-to-install-ev-charger":         { heroId: "1509390144018-eeaf65052242", formatId: "1753272691001-4d68806ac590" },
  "generator-vs-battery-backup-cost":   { heroId: "1509390144018-eeaf65052242", formatId: "1773952136583-5175e906267c" },
  "cost-to-upgrade-to-200-amp-panel":   { heroId: "1753272691001-4d68806ac590", formatId: "1509390144018-eeaf65052242" },
  "average-kitchen-remodel-cost":       { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "bathroom-remodel-cost-by-size":      { heroId: "1769745241584-be9b8227e126", formatId: "1723257891127-0d1ea314a720" },
  "kitchen-remodel-cost-without-appliances": { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "small-bathroom-remodel-cost":        { heroId: "1769745241584-be9b8227e126", formatId: "1721743138130-e8ce6e1a7dce" },
  "cabinet-refacing-vs-replacement-cost": { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "cost-to-replace-countertops":        { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "is-a-kitchen-remodel-worth-it":      { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "cost-to-finish-a-basement":          { heroId: "1564013799919-ab600027ffc6", formatId: "1687266152952-540777e6e8c8" },
  "cost-to-paint-a-house":              { heroId: "1564013799919-ab600027ffc6", formatId: "1667830502449-d5a2039204d6" },
  "cost-to-replace-flooring-by-type":   { heroId: "1687266152952-540777e6e8c8", formatId: "1564013799919-ab600027ffc6" },
  "cost-to-add-bathroom-to-basement":   { heroId: "1564013799919-ab600027ffc6", formatId: "1723257891127-0d1ea314a720" },
  "cost-to-replace-interior-doors":     { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "drywall-repair-vs-replace-cost":     { heroId: "1769977453410-02f774fb8fef", formatId: "1564013799919-ab600027ffc6" },
  "is-it-worth-it-to-replace-windows":  { heroId: "1753717202565-ee088d9871fc", formatId: "1564013799919-ab600027ffc6" },
  "mold-remediation-cost-by-square-footage": { heroId: "1769977453410-02f774fb8fef", formatId: "1564013799919-ab600027ffc6" },
  "cost-to-remove-a-tree":              { heroId: "1667830502449-d5a2039204d6", formatId: "1770306924587-7884ec2753a2" },
  "average-cost-of-homeowners-insurance": { heroId: "1564013799919-ab600027ffc6", formatId: "1667830502449-d5a2039204d6" },
  "refrigerator-repair-vs-replace":     { heroId: "1769745241584-be9b8227e126", formatId: "1774437290626-34d18c49598a" },
  "garage-door-repair-vs-replace":      { heroId: "1667830502449-d5a2039204d6", formatId: "1770306924587-7884ec2753a2" },
  "garage-door-worth-it-before-selling": { heroId: "1667830502449-d5a2039204d6", formatId: "1770306924587-7884ec2753a2" },
  "termite-damage-repair-cost":         { heroId: "1769977453410-02f774fb8fef", formatId: "1564013799919-ab600027ffc6" },
  "how-much-value-does-a-pool-add":     { heroId: "1663293761270-8fafc94e2087", formatId: "1658190579991-65472a8b7b05" },
  "annual-home-maintenance-cost-calculator": { heroId: "1667830502449-d5a2039204d6", formatId: "1770306924587-7884ec2753a2" },
};

const PILLAR_PHOTOS = {
  "roofing-exterior":    { id: "1763665814605-a6489a3bf2a0", photographer: "Sergej Karpow" },
  "hvac-energy":         { id: "1757219525975-03b5984bc6e8", photographer: "Unsplash" },
  "plumbing":            { id: "1575299737366-39c143459bc5", photographer: "Michal Balog" },
  "electrical":          { id: "1753272691001-4d68806ac590", photographer: "Unsplash" },
  "kitchen-bath":        { id: "1769745241584-be9b8227e126", photographer: "Unsplash" },
  "interior-renovation": { id: "1564013799919-ab600027ffc6", photographer: "Unsplash" },
  "home-maintenance":    { id: "1667830502449-d5a2039204d6", photographer: "Unsplash" },
};

// ---- Download helper ----
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          const stats = fs.statSync(dest);
          if (stats.size < 1000) {
            fs.unlinkSync(dest);
            reject(new Error(`File too small: ${stats.size} bytes`));
          } else resolve();
        });
      } else {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          file.destroy();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          reject(new Error(`HTTP ${res.statusCode}`));
        });
      }
    });
    req.on("error", (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
    req.setTimeout(30000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

function getPhotoUrl(id, width = 1200, height, quality = 75) {
  let url = `https://images.unsplash.com/photo-${id}?w=${width}&q=${quality}&auto=format`;
  if (height) url += `&h=${height}&fit=crop`;
  return url;
}

// ---- Main ----
async function main() {
  console.log("=== Downloading photos from Unsplash ===\n");
  const sources = { hero: {}, format: {}, pillar: {} };
  let success = 0, fail = 0;

  // Download article photos
  const slugs = Object.keys(PHOTO_MAP);
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const info = PHOTO_MAP[slug];
    const dir = path.join(ARTICLE_DIR, slug);
    fs.mkdirSync(dir, { recursive: true });

    // Hero
    try {
      await download(getPhotoUrl(info.heroId, 1200, 630, 75), path.join(dir, "hero.jpg"));
      const p = PHOTO_IDS[info.heroId] || { photographer: "Unknown" };
      sources.hero[slug] = { source: `https://unsplash.com/photos/${info.heroId}`, photographer: p.photographer };
      success++;
    } catch (err) {
      fail++;
      console.log(`  hero ${slug}.jpg FAILED: ${err.message}`);
      sources.hero[slug] = { source: "fallback", photographer: "HomeCostGuide" };
    }

    // Format
    try {
      await download(getPhotoUrl(info.formatId, 800, 500, 75), path.join(dir, "format.jpg"));
      const p = PHOTO_IDS[info.formatId] || { photographer: "Unknown" };
      sources.format[slug] = { source: `https://unsplash.com/photos/${info.formatId}`, photographer: p.photographer };
    } catch (err) {
      console.log(`  format ${slug}.jpg FAILED: ${err.message}`);
      // Fallback: copy hero to format
      const heroPath = path.join(dir, "hero.jpg");
      if (fs.existsSync(heroPath)) {
        fs.copyFileSync(heroPath, path.join(dir, "format.jpg"));
        sources.format[slug] = { ...sources.hero[slug] };
      }
    }

    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${slugs.length} done`);
  }

  // Pillar photos
  console.log("\n--- Pillar photos ---");
  for (const [slug, info] of Object.entries(PILLAR_PHOTOS)) {
    try {
      await download(getPhotoUrl(info.id, 1200, 400, 75), path.join(PILLAR_DIR, `${slug}.jpg`));
      sources.pillar[slug] = { source: `https://unsplash.com/photos/${info.id}`, photographer: info.photographer };
      console.log(`  pillar ${slug}.jpg OK`);
    } catch (err) {
      console.log(`  pillar ${slug}.jpg FAILED: ${err.message}`);
      sources.pillar[slug] = { source: "fallback", photographer: "HomeCostGuide" };
    }
  }

  // Write sources
  fs.writeFileSync(SOURCES_PATH, JSON.stringify(sources, null, 2), "utf8");
  console.log(`\n=== Done! ${success} successful, ${fail} failed ===`);
  console.log(`Sources: ${SOURCES_PATH}`);
}

main().catch(console.error);
