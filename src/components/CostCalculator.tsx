"use client";

import { useState } from "react";

interface CalculatorField {
  type: "slider" | "dropdown" | "number";
  label: string;
  key: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { value: number; label: string }[];
  defaultValue?: number;
}

interface CostCalculatorProps {
  title?: string;
  fields: CalculatorField[];
  formula: (values: Record<string, number>) => { low: number; average: number; high: number };
  baseUnit?: string;
}

export default function CostCalculator({ title, fields, formula, baseUnit }: CostCalculatorProps) {
  const initial: Record<string, number> = {};
  fields.forEach((f) => { initial[f.key] = f.defaultValue ?? (f.options ? f.options[0].value : f.min ?? 100); });
  const [values, setValues] = useState(initial);

  const result = formula(values);

  const update = (key: string, v: number) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  return (
    <div className="bg-white border border-line rounded-card p-6 my-6 shadow-soft">
      {title && <h3 className="text-lg font-serif font-semibold text-ink mb-4">{title}</h3>}
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-ink mb-1">
              {field.label}: {field.options ? field.options.find((o) => o.value === values[field.key])?.label : `${values[field.key]}${field.unit ?? ""}`}
            </label>
            {field.type === "dropdown" && field.options ? (
              <select
                className="w-full border border-line rounded-btn px-3 py-2 text-sm bg-white text-ink focus:ring-2 focus:ring-rust/40 focus:border-rust outline-none"
                value={values[field.key]}
                onChange={(e) => update(field.key, Number(e.target.value))}
              >
                {field.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="range"
                min={field.min ?? 0}
                max={field.max ?? 10000}
                step={field.step ?? 1}
                value={values[field.key]}
                onChange={(e) => update(field.key, Number(e.target.value))}
                className="w-full accent-rust"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-line">
        <p className="text-sm text-muted mb-2">Estimated Cost Range</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted">Low</p>
            <p className="text-xl font-bold font-serif text-forest">${result.low.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted">Average</p>
            <p className="text-xl font-bold font-serif text-rust">${result.average.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted">High</p>
            <p className="text-xl font-bold font-serif text-ink">${result.high.toLocaleString()}</p>
          </div>
        </div>
        {baseUnit && <p className="text-xs text-muted text-center mt-2">{baseUnit}</p>}
      </div>
    </div>
  );
}
