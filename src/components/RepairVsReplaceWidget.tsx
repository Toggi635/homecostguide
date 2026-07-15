"use client";

import { useState } from "react";
import { Wrench, RefreshCw } from "lucide-react";

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
  const colorClass = recommendation === "Replace" ? "text-rust" : recommendation === "Consider Replacing" ? "text-rust-dark" : "text-forest";
  const icon = recommendation === "Replace" ? RefreshCw : Wrench;
  const IconComp = icon;

  return (
    <div className="bg-white border border-line rounded-card p-6 my-6 shadow-soft">
      <h3 className="text-lg font-serif font-semibold text-ink mb-4">{systemName}: Repair or Replace?</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Estimated Repair Cost: ${repairCost.toLocaleString()}
          </label>
          <input
            type="range"
            min={100}
            max={avgReplacement * 1.2}
            step={50}
            value={repairCost}
            onChange={(e) => setRepairCost(Number(e.target.value))}
            className="w-full accent-rust"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Current Unit Age: {age} years
          </label>
          <input
            type="range"
            min={0}
            max={30}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-rust"
          />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-line text-center">
        <p className="text-sm text-muted mb-1">Recommendation</p>
        <p className={`text-2xl font-bold font-serif flex items-center justify-center gap-2 ${colorClass}`}>
          <IconComp size={24} />
          {recommendation}
        </p>
        <p className="text-xs text-muted mt-2">
          Repair cost is {Math.round(ratio * 100)}% of replacement cost ({age} years old)
        </p>
      </div>
    </div>
  );
}
