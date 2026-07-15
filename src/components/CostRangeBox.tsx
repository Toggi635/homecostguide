"use client";

interface CostRangeBoxProps {
  low: string;
  average: string;
  high: string;
  label?: string;
}

export default function CostRangeBox({ low, average, high, label }: CostRangeBoxProps) {
  return (
    <div className="bg-white border border-line rounded-card p-6 my-6 shadow-soft">
      {label && <p className="text-sm text-muted mb-3">{label}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted mb-1">Low</p>
          <p className="text-2xl font-bold font-serif text-forest">{low}</p>
        </div>
        <div className="text-center sm:border-x border-t sm:border-t-0 border-line pt-4 sm:pt-0 mt-4 sm:mt-0">
          <p className="text-sm text-muted mb-1">National Average</p>
          <p className="text-2xl font-bold font-serif text-rust">{average}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted mb-1">High</p>
          <p className="text-2xl font-bold font-serif text-ink">{high}</p>
        </div>
      </div>
      <div className="mt-3 h-2 bg-line rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-forest via-rust to-ink rounded-full" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
