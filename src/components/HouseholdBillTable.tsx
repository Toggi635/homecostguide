"use client";

import { useState } from "react";

interface HouseholdBillTableProps {
  title?: string;
  utilityType: "electric" | "water" | "gas";
  data: Record<string, Record<string, { low: number; average: number; high: number }>>;
}

const dwellingTypes = ["Apartment", "House"];

export default function HouseholdBillTable({ title, utilityType, data }: HouseholdBillTableProps) {
  const [dwelling, setDwelling] = useState("House");
  const unit = utilityType === "electric" ? "kWh" : utilityType === "water" ? "gallons" : "therms";

  const billsForDwelling = data[dwelling] ?? {};

  return (
    <div className="bg-white border border-line rounded-card p-6 my-6 shadow-soft">
      {title && <h3 className="text-lg font-serif font-semibold text-ink mb-4">{title}</h3>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-ink mb-1">Dwelling Type</label>
        <select
          className="border border-line rounded-btn px-3 py-2 text-sm bg-white text-ink focus:ring-2 focus:ring-rust/40 focus:border-rust outline-none"
          value={dwelling}
          onChange={(e) => setDwelling(e.target.value)}
        >
          {dwellingTypes.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-line text-sm">
          <thead>
            <tr className="bg-paper">
              <th className="border border-line px-4 py-2 text-left text-ink font-medium">Household Size</th>
              <th className="border border-line px-4 py-2 text-left text-ink font-medium">Low ({unit})</th>
              <th className="border border-line px-4 py-2 text-left text-ink font-medium">Average ({unit})</th>
              <th className="border border-line px-4 py-2 text-left text-ink font-medium">High ({unit})</th>
              <th className="border border-line px-4 py-2 text-left text-ink font-medium">Est. Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(billsForDwelling).map(([size, vals], i) => (
              <tr key={size} className={i % 2 === 0 ? "bg-white" : "bg-paper"}>
                <td className="border border-line px-4 py-2 font-medium text-ink">{size} {size === "1" ? "person" : "people"}</td>
                <td className="border border-line px-4 py-2 text-ink/80">{vals.low.toLocaleString()}</td>
                <td className="border border-line px-4 py-2 text-ink/80">{vals.average.toLocaleString()}</td>
                <td className="border border-line px-4 py-2 text-ink/80">{vals.high.toLocaleString()}</td>
                <td className="border border-line px-4 py-2 font-medium text-rust">${Math.round(vals.average * 0.12).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
