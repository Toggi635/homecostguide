interface FindAProCTAProps {
  partnerName?: string;
}

export default function FindAProCTA({
  partnerName = "local home service pros",
}: FindAProCTAProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold mb-2">Find a Local Pro</h3>
      <p className="text-sm text-blue-100 mb-4">
        Ready to start your project? Get quotes from a few local contractors before you commit — pricing can vary more than people expect for the same job.
      </p>
    </div>
  );
}
