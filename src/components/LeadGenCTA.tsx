interface LeadGenCTAProps {
  partnerName?: string;
  affiliateUrl?: string;
  pillar?: string;
}

export default function LeadGenCTA({
  partnerName = "local home service pros",
  affiliateUrl = "#",
}: LeadGenCTAProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold mb-2">Get Free Quotes From Local Pros</h3>
      <p className="text-sm text-blue-100 mb-4">
        Compare prices from up to 3 prescreened {partnerName} in your area. No obligation, free estimate.
      </p>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-blue-700 font-medium px-6 py-2 rounded-md hover:bg-blue-50 transition-colors text-sm"
      >
        Get Quotes Now
      </a>
      <p className="text-xs text-blue-200 mt-3">
        We may earn a commission if you hire through our partner links. See our disclosure.
      </p>
    </div>
  );
}
