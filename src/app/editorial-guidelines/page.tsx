import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Guidelines",
  description: "Our editorial standards for accuracy, transparency, and integrity in home improvement cost reporting.",
};

export default function EditorialGuidelinesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Editorial Guidelines</h1>
      <div className="prose prose-gray max-w-none">
        <h2>Accuracy First</h2>
        <p>
          We prioritize accuracy over speed. Every cost figure is verified against at least two independent 
          sources before publication. When sources disagree, we note the range and explain the discrepancy.
        </p>
        <h2>Transparency</h2>
        <p>
          We clearly distinguish between sourced data and estimates. We name our sources. We explain our 
          methodology. We do not present opinion as fact.
        </p>
        <h2>Corrections</h2>
        <p>
          If you find an error in one of our guides, please contact us. We investigate every correction 
          request and update the guide promptly if the error is confirmed. Corrections are noted in the 
          guide&apos;s revision history.
        </p>
        <h2>Review Cadence</h2>
        <p>
          Each guide is reviewed at least annually. Major market shifts (e.g., lumber price spikes, 
          HVAC regulatory changes) trigger immediate review. We date every guide so readers know 
          how current the information is.
        </p>
        <h2>Affiliate Disclosure</h2>
        <p>
          Some links on this site are affiliate links. If you click an affiliate link and make a purchase 
          or hire a service, we may earn a commission. This does not affect our pricing information or 
          recommendations. We clearly label affiliate content.
        </p>
        <h2>Independence</h2>
        <p>
          Our cost data is independent. We do not accept payment from contractors, manufacturers, or 
          service providers to include or exclude their pricing. Sponsored content, if any, will be 
          clearly labeled as such.
        </p>
      </div>
    </div>
  );
}
