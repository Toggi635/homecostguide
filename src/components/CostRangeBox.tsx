"use client";

interface CostRangeBoxProps {
  low: string;
  average: string;
  high: string;
  label?: string;
}

export default function CostRangeBox({ low, average, high, label }: CostRangeBoxProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
      {label && <p className="text-sm text-gray-500 mb-3">{label}</p>}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Low</p>
          <p className="text-2xl font-bold text-green-600">{low}</p>
        </div>
        <div className="text-center border-x border-blue-200">
          <p className="text-sm text-gray-500 mb-1">National Average</p>
          <p className="text-2xl font-bold text-blue-600">{average}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">High</p>
          <p className="text-2xl font-bold text-red-600">{high}</p>
        </div>
      </div>
      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-red-400 rounded-full" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
