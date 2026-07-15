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
    <div className="bg-white border border-gray-200 rounded-lg p-6 my-6 shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Dwelling Type</label>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={dwelling}
          onChange={(e) => setDwelling(e.target.value)}
        >
          {dwellingTypes.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">Household Size</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Low ({unit})</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Average ({unit})</th>
              <th className="border border-gray-200 px-4 py-2 text-left">High ({unit})</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Est. Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(billsForDwelling).map(([size, vals], i) => (
              <tr key={size} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2 font-medium">{size} {size === "1" ? "person" : "people"}</td>
                <td className="border border-gray-200 px-4 py-2">{vals.low.toLocaleString()}</td>
                <td className="border border-gray-200 px-4 py-2">{vals.average.toLocaleString()}</td>
                <td className="border border-gray-200 px-4 py-2">{vals.high.toLocaleString()}</td>
                <td className="border border-gray-200 px-4 py-2 font-medium">${Math.round(vals.average * 0.12).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
