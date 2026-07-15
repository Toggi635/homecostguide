interface FindAProCTAProps {
  partnerName?: string;
}

export default function FindAProCTA({
  partnerName = "local home service pros",
}: FindAProCTAProps) {
  return (
    <div className="bg-gradient-to-r from-forest to-forest-dark text-white rounded-card p-6 my-6 shadow-soft">
      <h3 className="text-lg font-semibold font-serif mb-2">Find a Local Pro</h3>
      <p className="text-sm text-white/80 mb-4">
        Ready to start your project? Get quotes from a few local contractors before you commit — pricing can vary more than people expect for the same job.
      </p>
    </div>
  );
}
