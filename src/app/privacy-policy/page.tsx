import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none">
        <p><em>Last updated: January 15, 2026</em></p>
        <h2>Information We Collect</h2>
        <p>
          HomeCostGuide does not collect personal information unless you voluntarily provide it 
          (e.g., via our contact form). We use standard web analytics to track page views and 
          user behavior in aggregate.
        </p>
        <h2>Cookies</h2>
        <p>
          We use cookies for analytics (Google Analytics) and advertising (Google AdSense). 
          You can control cookie preferences through your browser settings.
        </p>
        <h2>Third-Party Services</h2>
        <p>
          We use Google AdSense to display advertisements. AdSense may use cookies to serve 
          targeted ads based on your browsing history. See Google&apos;s Privacy Policy for details.
        </p>
        <h2>Affiliate Links</h2>
        <p>
          Some pages contain affiliate links. Clicking these links may set cookies from the 
          affiliate partner. We do not control these third-party cookies.
        </p>
        <h2>Your Rights</h2>
        <p>
          You may request deletion of any personal data we hold by contacting us. We will 
          respond within 30 days.
        </p>
        <h2>Contact</h2>
        <p>For privacy-related inquiries: contact@homecostguide.com</p>
      </div>
    </div>
  );
}
