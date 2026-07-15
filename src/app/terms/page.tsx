import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <div className="prose prose-gray max-w-none">
        <p><em>Last updated: January 15, 2026</em></p>
        <h2>Use of Content</h2>
        <p>
          All content on HomeCostGuide is for informational purposes only. We make no guarantees 
          about the accuracy, completeness, or timeliness of the information. Home improvement 
          costs vary by location, market conditions, and project specifics.
        </p>
        <h2>Not Professional Advice</h2>
        <p>
          Content on this site does not constitute professional contractor, legal, or financial 
          advice. Always consult licensed professionals for specific project estimates and requirements.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          All content, including text, graphics, and calculators, is owned by HomeCostGuide unless 
          otherwise credited. Reproduction without permission is prohibited.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          HomeCostGuide is not liable for any damages arising from the use of this site or reliance 
          on its content. Use at your own risk.
        </p>
        <h2>Changes</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use of the site after 
          changes constitutes acceptance of the new terms.
        </p>
      </div>
    </div>
  );
}
