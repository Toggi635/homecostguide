"use client";

import { useState } from "react";

interface RepairVsReplaceWidgetProps {
  systemName: string;
  replacementCostLow?: number;
  replacementCostHigh?: number;
}

export default function RepairVsReplaceWidget({
  systemName,
  replacementCostLow = 5000,
  replacementCostHigh = 15000,
}: RepairVsReplaceWidgetProps) {
  const [repairCost, setRepairCost] = useState(1000);
  const [age, setAge] = useState(5);

  const avgReplacement = (replacementCostLow + replacementCostHigh) / 2;
  const ratio = repairCost / avgReplacement;
  const recommendation = ratio >= 0.5 || age >= 15 ? "Replace" : ratio >= 0.3 || age >= 10 ? "Consider Replacing" : "Repair";
  const colorClass = recommendation === "Replace" ? "text-red-600" : recommendation === "Consider Replacing" ? "text-yellow-600" : "text-green-600";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 my-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{systemName}: Repair or Replace?</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Repair Cost: ${repairCost.toLocaleString()}
          </label>
          <input
            type="range"
            min={100}
            max={avgReplacement * 1.2}
            step={50}
            value={repairCost}
            onChange={(e) => setRepairCost(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Unit Age: {age} years
          </label>
          <input
            type="range"
            min={0}
            max={30}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500 mb-1">Recommendation</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{recommendation}</p>
        <p className="text-xs text-gray-400 mt-2">
          Repair cost is {Math.round(ratio * 100)}% of replacement cost ({age} years old)
        </p>
      </div>
    </div>
  );
}
