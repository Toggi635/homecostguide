import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about HomeCostGuide and our mission to provide transparent, accurate home improvement cost information.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "About" },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="text-3xl font-bold mb-6">About HomeCostGuide</h1>
      <div className="prose prose-gray max-w-none">
        <p>
          HomeCostGuide was created to solve a simple problem: finding reliable, up-to-date home improvement 
          cost information is surprisingly hard. Most guides give vague ranges, outdated numbers, or 
          bury the real price behind lead-generation forms.
        </p>
        <p>
          We believe homeowners deserve transparent, researched pricing before they hire a contractor or 
          start a project. Every guide on this site includes a clear national average, a low-to-high range, 
          and a breakdown of what drives costs up or down.
        </p>
        <h2>Our Approach</h2>
        <p>
          Our cost data comes from multiple sources: industry cost databases, contractor surveys, published 
          averages from home-service aggregators, and BLS consumer expenditure data for utility costs. 
          We cross-reference these sources to build our ranges and update them at least annually.
        </p>
        <h2>Our Team</h2>
        <p>
          The HomeCostGuide team includes researchers and writers with backgrounds in home improvement, 
          construction, and data analysis. We are not contractors or licensed tradespeople — our expertise 
          is in collecting, verifying, and presenting cost data in a useful way.
        </p>
        <h2>Our Commitment</h2>
        <ul>
          <li>We clearly label sourced data vs. estimates.</li>
          <li>We cite our sources and explain our methodology.</li>
          <li>We update guides when pricing changes significantly.</li>
          <li>We disclose affiliate relationships transparently.</li>
        </ul>
      </div>
    </div>
  );
}
