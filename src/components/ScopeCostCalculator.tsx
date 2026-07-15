"use client";

// A thin, server-safe wrapper around CostCalculator for the one pattern the article
// template needs: scale a low/average/high cost range by a "project scope" percentage.
// CostCalculator itself takes a `formula` function prop, which cannot be passed from a
// Server Component (article page.tsx) to a Client Component - functions aren't
// serializable across that boundary. This component takes only plain number/string
// props (serializable) and defines the formula itself, client-side.

import CostCalculator from "./CostCalculator";

interface ScopeCostCalculatorProps {
  costLow: number;
  costAvg: number;
  costHigh: number;
  sourceNote: string;
}

export default function ScopeCostCalculator({ costLow, costAvg, costHigh, sourceNote }: ScopeCostCalculatorProps) {
  return (
    <CostCalculator
      title="Cost Calculator"
      fields={[
        {
          type: "slider",
          key: "scope",
          label: "Project Scope",
          min: 60,
          max: 140,
          step: 5,
          unit: "%",
          defaultValue: 100,
        },
      ]}
      formula={(values) => {
        const scale = values.scope / 100;
        return {
          low: Math.round(costLow * scale),
          average: Math.round(costAvg * scale),
          high: Math.round(costHigh * scale),
        };
      }}
      baseUnit={sourceNote}
    />
  );
}
