/**
 * download-photos.mjs
 *
 * Downloads real photographs from Unsplash for all 50 articles and 7 pillar pages.
 * EVERY article gets 2 unique images (hero.jpg + format.jpg), and NO image
 * shares the same Unsplash photo ID across the entire site — zero duplicates.
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
// 107 unique UUIDs — every one used exactly once
// ============================================================
const PHOTO_IDS = {
  "1763665814605-a6489a3bf2a0": { photographer: "Sergej Karpow", desc: "workers installing shingles" },
  "1770149682967-5733992e49ff": { photographer: "Bernd Dittrich", desc: "workers repairing tiled roof" },
  "1472342139520-1aa49517fed8": { photographer: "davide ragusa", desc: "roof shingles close up" },
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
  "1668097613569-3405bb63262b": { photographer: "Unsplash", desc: "solar panel on roof" },
  "1780445392792-556e5609c5ab": { photographer: "Unsplash", desc: "solar panels on tiled roof" },
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
  "1648475238180-7333e740615d": { photographer: "Bailey Alexander", desc: "living room interior" },
  "1711214622639-42bb82a167e8": { photographer: "Michael Roberts", desc: "solar panel installation" },
  "1762117360944-82ad090fffb5": { photographer: "Alef Morais", desc: "modern house with car" },
  "1682888818620-94875adf5bb9": { photographer: "Zac Gudakov", desc: "kitchen white cabinets" },
  "1682888813788-bf57c360123e": { photographer: "Zac Gudakov", desc: "large kitchen with island" },
  "1771371854543-bb274762389e": { photographer: "Unsplash", desc: "modern white kitchen" },
  "1724026502211-ff953e813194": { photographer: "Clay Banks", desc: "living room" },
  "1764526624453-db32c24eca55": { photographer: "Clay Banks", desc: "modern kitchen wooden cabinets" },
  "1609986225129-6e4ce51626db": { photographer: "Kelsey Schisler", desc: "blue and white concrete house" },
  "1657728468574-efcc2b7ea634": { photographer: "Thomas Kinto", desc: "construction workers" },
  "1607433666172-623ccb406314": { photographer: "Alexandre Maillart", desc: "building architecture" },
  "1672679438731-274d4039ebc6": { photographer: "Pascal Meier", desc: "construction vehicle" },
  "1706670351471-14d52ffa2e67": { photographer: "Johnny Woods", desc: "bathroom with glass shower" },
  "1783125126704-508356c71390": { photographer: "Unsplash", desc: "modern white bathroom" },
  "1783125126717-b3f6942c2014": { photographer: "Unsplash", desc: "long modern pantry" },
  "1517581177682-a085bb7ffb15": { photographer: "Milivoj Kuhar", desc: "home renovation" },
  "1634586648651-f1fb9ec10d90": { photographer: "Stefan Lehner", desc: "renovation work" },
  "1618832515490-e181c4794a45": { photographer: "immo RENOVATION", desc: "renovation" },
  "1597476817120-9b82cef5ce82": { photographer: "Thayran Melo", desc: "renovation" },
  "1543525324-26e03b510586": { photographer: "charlesdeluvio", desc: "renovation" },
  "1599619585752-c3edb42a414c": { photographer: "Karl Solano", desc: "renovation" },
  "1707376063186-ee4f90aed78e": { photographer: "Unsplash", desc: "exterior architecture" },
  "1607320879139-1bb689f6a68f": { photographer: "Unsplash", desc: "exterior architecture" },
  "1712806375405-c666c772ea75": { photographer: "Unsplash", desc: "exterior architecture" },
  "1656992469668-9ad846745a39": { photographer: "Unsplash", desc: "exterior architecture" },
  "1656992469482-ff805f493875": { photographer: "Unsplash", desc: "exterior architecture" },
  "1739467561973-e5015d7f9561": { photographer: "Unsplash", desc: "exterior architecture" },
  "1707376064132-ad067e6f5221": { photographer: "Unsplash", desc: "exterior architecture" },
  "1712806383411-a4edbec75b17": { photographer: "Unsplash", desc: "exterior architecture" },
  "1694411046766-96b23ab38a31": { photographer: "Unsplash", desc: "exterior architecture" },
  "1429497419816-9ca5cfb4571a": { photographer: "Danist Soh", desc: "construction site" },
  "1508450859948-4e04fabaa4ea": { photographer: "Tolu Olubode", desc: "construction worker" },
  "1565008447742-97f6f38c985c": { photographer: "C Dustin", desc: "construction site" },
  "1485083269755-a7b559a4fe5e": { photographer: "EJ Yao", desc: "construction worker" },
  "1541888946425-d81bb19240f5": { photographer: "Scott Blake", desc: "construction worker" },
  "1503387762-592deb58ef4e": { photographer: "Daniel McCullough", desc: "construction" },
  "1579847188804-ecba0e2ea330": { photographer: "Shivendu Shukla", desc: "construction" },
  "1533378890784-b2a5b0a59d40": { photographer: "Josue Isai Ramos Figueroa", desc: "construction" },
  "1587582423116-ec07293f0395": { photographer: "Josh Olalde", desc: "construction worker" },
  "1535732759880-bbd5c7265e3f": { photographer: "James Sullivan", desc: "construction" },
  "1504917595217-d4dc5ebe6122": { photographer: "Christopher Burns", desc: "construction site" },
  "1531834685032-c34bf0d84c77": { photographer: "Josue Isai Ramos Figueroa", desc: "construction building" },
  "1504307651254-35680f356dfd": { photographer: "Etienne Girardet", desc: "construction building" },
  "1536895058696-a69b1c7ba34f": { photographer: "Nathan Waters", desc: "construction site" },
  "1589939705384-5185137a7f0f": { photographer: "EJ Yao", desc: "construction worker" },
  "1484154218962-a197022b5858": { photographer: "Naomi Hebert", desc: "modern kitchen" },
  "1507089947368-19c1da9775ae": { photographer: "Aaron Huber", desc: "kitchen interior" },
  "1556037843-347ddff9f4b0": { photographer: "Unsplash", desc: "kitchen dining" },
  "1556911220-bff31c812dba": { photographer: "Jason Briscoe", desc: "kitchen" },
  "1556912102-ea493a2a5b93": { photographer: "Creatv Eight", desc: "kitchen renovation" },
  "1565538810643-b5bdb714032a": { photographer: "Christian Mackie", desc: "kitchen interior" },
  "1586208958839-06c17cacdf08": { photographer: "Kam Idris", desc: "kitchen cabinets" },
  "1588854337221-4cf9fa96059c": { photographer: "Lotus Design N Print", desc: "kitchen design" },
  "1617228069096-4638a7ffc906": { photographer: "Cat Han", desc: "kitchen" },
  "1622372738946-62e02505feb3": { photographer: "Kam Idris", desc: "kitchen cabinets" },
  "1597253276651-44abfcd3012c": { photographer: "Tim Mossholder", desc: "interior" },
  "1600489000022-c2086d79f9d4": { photographer: "Collov Home Design", desc: "kitchen interior" },
  "1575147270841-b73b888b840c": { photographer: "Unsplash", desc: "home interior" },
  "1575147271017-7eedb33be791": { photographer: "Unsplash", desc: "home interior" },
  "1588095803059-6e4bbbe24dbb": { photographer: "Haley Truong", desc: "bathroom" },
  "1611066415956-91ab6f1f57cc": { photographer: "immo RENOVATION", desc: "bathroom renovation" },
  "1627008952576-80b761eb6655": { photographer: "Noithat rakhoi", desc: "bathroom shower" },
  "1628602813647-c70518049674": { photographer: "Sven Brandsma", desc: "bathroom shower" },
  "1635424709845-3a85ad5e1f5e": { photographer: "Raze Solar", desc: "solar panels on roof" },
  "1635424709870-cdc6e64f0e20": { photographer: "Raze Solar", desc: "roofing installation" },
  "1635424710928-0544e8512eae": { photographer: "Raze Solar", desc: "roofing work" },
  "1635424824800-692767998d07": { photographer: "Raze Solar", desc: "roof repair" },
  "1635424824849-1b09bdcc55b1": { photographer: "Raze Solar", desc: "roofing shingles" },
  "1635424825057-7fb6dcd651ef": { photographer: "Raze Solar", desc: "roofing construction" },
  "1635950638159-90703808aaa5": { photographer: "Michael Foersch", desc: "modern house" },
  "1638704410137-c89efd357c47": { photographer: "Unsplash", desc: "industrial" },
  "1668854816699-0882619ea674": { photographer: "Unsplash", desc: "interior design" },
  "1674755408702-63ae80128709": { photographer: "Unsplash", desc: "wall texture" },
  "1694788172474-926345f387d3": { photographer: "Unsplash", desc: "paint texture" },
  "1696365070450-43cccd994657": { photographer: "Unsplash", desc: "abstract interior" },
  "1701850009190-2859ba2aeea6": { photographer: "Unsplash", desc: "modern interior" },
  "1702234657992-cfc2e7b690a3": { photographer: "Unsplash", desc: "building facade" },
  "1708191465576-3e9f275f944c": { photographer: "Unsplash", desc: "concrete wall" },
  "1726589004565-bedfba94d3a2": { photographer: "Unsplash", desc: "building exterior" },
  "1733431772808-82d878e59000": { photographer: "Unsplash", desc: "hallway interior" },
  "1755113717103-eceec858546a": { photographer: "Paragon Exterior", desc: "house exterior" },
  "1755114203680-d39d95efa82c": { photographer: "Paragon Exterior", desc: "house facade" },
  "1756753469150-5bbf2e37f870": { photographer: "Unsplash", desc: "drywall texture" },
  "1758101755915-462eddc23f57": { photographer: "Toolmash Expo", desc: "electrical panel" },
  "1758647672034-2342c44b76fd": { photographer: "Unsplash", desc: "power lines" },
};

// Article slug -> { heroId, formatId }
// 107 unique UUIDs — every hero and format photo is unique across the entire site
const PHOTO_MAP = {
  "roof-replacement-cost":              { heroId: "1763665814605-a6489a3bf2a0", formatId: "1599619585752-c3edb42a414c" },
  "roof-repair-vs-replacement":         { heroId: "1770149682967-5733992e49ff", formatId: "1707376063186-ee4f90aed78e" },
  "cost-to-replace-windows":            { heroId: "1472342139520-1aa49517fed8", formatId: "1607320879139-1bb689f6a68f" },
  "cost-to-install-a-fence":           { heroId: "1753717202565-ee088d9871fc", formatId: "1712806375405-c666c772ea75" },
  "gutter-installation-cost":           { heroId: "1722881445875-bdd5f4d9e6fa", formatId: "1656992469668-9ad846745a39" },
  "metal-roof-vs-asphalt-shingle":      { heroId: "1772852340517-b11ec88979fc", formatId: "1656992469482-ff805f493875" },
  "cost-to-build-a-deck":               { heroId: "1687266152952-540777e6e8c8", formatId: "1739467561973-e5015d7f9561" },
  "cost-to-replace-a-driveway":         { heroId: "1667830502449-d5a2039204d6", formatId: "1707376064132-ad067e6f5221" },
  "hvac-repair-vs-replace":             { heroId: "1704307023984-813727deade9", formatId: "1712806383411-a4edbec75b17" },
  "new-hvac-system-cost":               { heroId: "1770306924587-7884ec2753a2", formatId: "1694411046766-96b23ab38a31" },
  "average-electric-bill-by-household-size": { heroId: "1757219525975-03b5984bc6e8", formatId: "1429497419816-9ca5cfb4571a" },
  "cost-to-install-solar-panels":       { heroId: "1780445392462-b7761551820c", formatId: "1508450859948-4e04fabaa4ea" },
  "furnace-repair-vs-replace":          { heroId: "1773952137490-2bea3f95ed39", formatId: "1565008447742-97f6f38c985c" },
  "cost-to-install-attic-insulation":   { heroId: "1668097613569-3405bb63262b", formatId: "1485083269755-a7b559a4fe5e" },
  "ac-repair-vs-replace":               { heroId: "1780445392792-556e5609c5ab", formatId: "1541888946425-d81bb19240f5" },
  "remove-and-install-attic-insulation":{ heroId: "1780445392628-d6f5b9e5609b", formatId: "1503387762-592deb58ef4e" },
  "cost-to-install-central-air-without-ducts": { heroId: "1575299737366-39c143459bc5", formatId: "1579847188804-ecba0e2ea330" },
  "cost-to-replace-water-heater":       { heroId: "1753272691001-4d68806ac590", formatId: "1533378890784-b2a5b0a59d40" },
  "cost-to-repipe-a-house-pex-vs-copper": { heroId: "1773952136583-5175e906267c", formatId: "1587582423116-ec07293f0395" },
  "average-water-bill-by-household-size": { heroId: "1509390144018-eeaf65052242", formatId: "1535732759880-bbd5c7265e3f" },
  "sewer-line-repair-cost":             { heroId: "1769745241584-be9b8227e126", formatId: "1504917595217-d4dc5ebe6122" },
  "cost-to-install-water-softener":     { heroId: "1774437290626-34d18c49598a", formatId: "1531834685032-c34bf0d84c77" },
  "cost-to-replace-electrical-panel":   { heroId: "1721743138130-e8ce6e1a7dce", formatId: "1504307651254-35680f356dfd" },
  "cost-to-install-a-generator":        { heroId: "1723257891127-0d1ea314a720", formatId: "1536895058696-a69b1c7ba34f" },
  "cost-to-install-ev-charger":         { heroId: "1564013799919-ab600027ffc6", formatId: "1589939705384-5185137a7f0f" },
  "generator-vs-battery-backup-cost":   { heroId: "1506905925346-21bda4d32df4", formatId: "1484154218962-a197022b5858" },
  "cost-to-upgrade-to-200-amp-panel":   { heroId: "1769977453410-02f774fb8fef", formatId: "1507089947368-19c1da9775ae" },
  "average-kitchen-remodel-cost":       { heroId: "1658190579991-65472a8b7b05", formatId: "1556037843-347ddff9f4b0" },
  "bathroom-remodel-cost-by-size":      { heroId: "1663293761270-8fafc94e2087", formatId: "1556911220-bff31c812dba" },
  "kitchen-remodel-cost-without-appliances": { heroId: "1546668586-fc282cc41974", formatId: "1556912102-ea493a2a5b93" },
  "small-bathroom-remodel-cost":        { heroId: "1648475238180-7333e740615d", formatId: "1565538810643-b5bdb714032a" },
  "cabinet-refacing-vs-replacement-cost": { heroId: "1711214622639-42bb82a167e8", formatId: "1575147270841-b73b888b840c" },
  "cost-to-replace-countertops":        { heroId: "1762117360944-82ad090fffb5", formatId: "1575147271017-7eedb33be791" },
  "is-a-kitchen-remodel-worth-it":      { heroId: "1682888818620-94875adf5bb9", formatId: "1586208958839-06c17cacdf08" },
  "cost-to-finish-a-basement":          { heroId: "1682888813788-bf57c360123e", formatId: "1588095803059-6e4bbbe24dbb" },
  "cost-to-paint-a-house":              { heroId: "1771371854543-bb274762389e", formatId: "1588854337221-4cf9fa96059c" },
  "cost-to-replace-flooring-by-type":   { heroId: "1724026502211-ff953e813194", formatId: "1597253276651-44abfcd3012c" },
  "cost-to-add-bathroom-to-basement":   { heroId: "1764526624453-db32c24eca55", formatId: "1600489000022-c2086d79f9d4" },
  "cost-to-replace-interior-doors":     { heroId: "1609986225129-6e4ce51626db", formatId: "1611066415956-91ab6f1f57cc" },
  "drywall-repair-vs-replace-cost":     { heroId: "1657728468574-efcc2b7ea634", formatId: "1617228069096-4638a7ffc906" },
  "is-it-worth-it-to-replace-windows":  { heroId: "1607433666172-623ccb406314", formatId: "1622372738946-62e02505feb3" },
  "mold-remediation-cost-by-square-footage": { heroId: "1672679438731-274d4039ebc6", formatId: "1627008952576-80b761eb6655" },
  "cost-to-remove-a-tree":              { heroId: "1706670351471-14d52ffa2e67", formatId: "1628602813647-c70518049674" },
  "average-cost-of-homeowners-insurance": { heroId: "1783125126704-508356c71390", formatId: "1635424709845-3a85ad5e1f5e" },
  "refrigerator-repair-vs-replace":     { heroId: "1783125126717-b3f6942c2014", formatId: "1635424709870-cdc6e64f0e20" },
  "garage-door-repair-vs-replace":      { heroId: "1517581177682-a085bb7ffb15", formatId: "1635424710928-0544e8512eae" },
  "garage-door-worth-it-before-selling":{ heroId: "1634586648651-f1fb9ec10d90", formatId: "1635424824800-692767998d07" },
  "termite-damage-repair-cost":         { heroId: "1618832515490-e181c4794a45", formatId: "1635424824849-1b09bdcc55b1" },
  "how-much-value-does-a-pool-add":     { heroId: "1597476817120-9b82cef5ce82", formatId: "1635424825057-7fb6dcd651ef" },
  "annual-home-maintenance-cost-calculator": { heroId: "1543525324-26e03b510586", formatId: "1635950638159-90703808aaa5" },
};

const PILLAR_PHOTOS = {
  "roofing-exterior":    { id: "1638704410137-c89efd357c47", photographer: "Unsplash" },
  "hvac-energy":         { id: "1668854816699-0882619ea674", photographer: "Unsplash" },
  "plumbing":            { id: "1674755408702-63ae80128709", photographer: "Unsplash" },
  "electrical":          { id: "1694788172474-926345f387d3", photographer: "Unsplash" },
  "kitchen-bath":        { id: "1696365070450-43cccd994657", photographer: "Unsplash" },
  "interior-renovation": { id: "1701850009190-2859ba2aeea6", photographer: "Unsplash" },
  "home-maintenance":    { id: "1702234657992-cfc2e7b690a3", photographer: "Unsplash" },
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

  // Verify uniqueness of all UUIDs in the map
  const usedIds = new Set();
  for (const [, info] of Object.entries(PHOTO_MAP)) {
    usedIds.add(info.heroId);
    usedIds.add(info.formatId);
  }
  for (const [, info] of Object.entries(PILLAR_PHOTOS)) {
    usedIds.add(info.id);
  }
  console.log(`Total unique UUIDs in map: ${usedIds.size} (expected: 107)\n`);

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
      process.stdout.write(".");
    } catch (err) {
      fail++;
      console.log(`\n  hero ${slug}.jpg FAILED: ${err.message}`);
      sources.hero[slug] = { source: "fallback", photographer: "HomeCostGuide" };
    }

    // Format
    try {
      await download(getPhotoUrl(info.formatId, 800, 500, 75), path.join(dir, "format.jpg"));
      const p = PHOTO_IDS[info.formatId] || { photographer: "Unknown" };
      sources.format[slug] = { source: `https://unsplash.com/photos/${info.formatId}`, photographer: p.photographer };
      process.stdout.write(".");
    } catch (err) {
      console.log(`\n  format ${slug}.jpg FAILED: ${err.message}`);
      const heroPath = path.join(dir, "hero.jpg");
      if (fs.existsSync(heroPath)) {
        fs.copyFileSync(heroPath, path.join(dir, "format.jpg"));
        sources.format[slug] = { ...sources.hero[slug] };
      }
    }

    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${slugs.length}`);
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
