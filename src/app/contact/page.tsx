import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the HomeCostGuide team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="prose prose-gray max-w-none">
        <p>
          Have a correction, suggestion, or question? We would love to hear from you.
        </p>
        <p>
          <strong>Email:</strong> contact@homecostguide.com
        </p>
        <p>
          We aim to respond to all inquiries within 2 business days. If you are reporting a 
          pricing error, please include the specific guide URL and the source of your correction.
        </p>
      </div>
    </div>
  );
}
