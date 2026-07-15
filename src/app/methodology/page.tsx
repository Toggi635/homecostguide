import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Calculate Costs",
  description: "Our methodology for researching and calculating home improvement cost guides. Transparent, sourced, and annually updated.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">How We Calculate Costs</h1>
      <div className="prose prose-gray max-w-none">
        <p className="lead">
          Every cost figure on HomeCostGuide follows a consistent research methodology. Here is exactly 
          how we arrive at our numbers.
        </p>
        <h2>Data Sources</h2>
        <p>We draw from the following types of sources, listed in order of preference:</p>
        <ol>
          <li><strong>Industry cost databases</strong> — RSMeans, Craftsman Book Company, and similar construction cost reference data</li>
          <li><strong>Published averages from home-service platforms</strong> — Angi (formerly Angie&apos;s List), HomeAdvisor, Fixr, HomeGuide, and similar aggregators that collect real contractor quotes</li>
          <li><strong>Contractor surveys</strong> — National and regional trade association reports (e.g., NARI, NAHB, ACCA)</li>
          <li><strong>Bureau of Labor Statistics (BLS) data</strong> — Consumer expenditure surveys for utility cost estimates and CPI adjustments</li>
          <li><strong>HomeCostGuide estimates</strong> — Where no published source exists, we provide our own estimate clearly labeled as such</li>
        </ol>
        <h2>How We Build Ranges</h2>
        <p>For each project, we establish three figures:</p>
        <ul>
          <li><strong>Low end:</strong> Basic materials, straightforward installation, national low-cost region</li>
          <li><strong>Average (national):</strong> Mid-grade materials, typical installation conditions, weighted national blend</li>
          <li><strong>High end:</strong> Premium materials, complex installation, high-cost region or custom work</li>
        </ul>
        <h2>Regional Variation</h2>
        <p>
          All figures on this site are national averages unless explicitly stated. Actual costs in your area 
          may differ by ±20-40% depending on local labor rates, material availability, and permitting costs. 
          We recommend getting at least three quotes from local contractors for any project.
        </p>
        <h2>Update Cadence</h2>
        <p>
          We review and update our guides at least annually. Major pricing shifts (e.g., material cost spikes) 
          are incorporated as soon as reliable data is available. Each guide displays its last-updated date 
          prominently.
        </p>
        <h2>Sourced vs. Estimated</h2>
        <p>
          Every cost figure on this site is labeled either with its specific source (e.g., &ldquo;Angi 2025 data&rdquo;) 
          or as a &ldquo;HomeCostGuide estimate&rdquo; when no authoritative published source exists. We never present 
          unsourced guesses as facts.
        </p>
      </div>
    </div>
  );
}
