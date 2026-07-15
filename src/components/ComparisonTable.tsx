interface ComparisonRow {
  feature: string;
  column1: string;
  column2: string;
  column3?: string;
}

interface ComparisonTableProps {
  title?: string;
  columnHeaders: string[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({ title, columnHeaders, rows }: ComparisonTableProps) {
  const cols = columnHeaders.length;
  return (
    <div className="my-6 overflow-x-auto">
      {title && <h3 className="text-lg font-serif font-semibold text-ink mb-3">{title}</h3>}
      <table className="w-full border-collapse border border-line text-sm">
        <thead>
          <tr className="bg-paper">
            <th className="border border-line px-4 py-2 text-left font-medium text-ink">{columnHeaders[0]}</th>
            <th className="border border-line px-4 py-2 text-left font-medium text-ink">{columnHeaders[1]}</th>
            <th className="border border-line px-4 py-2 text-left font-medium text-ink">{columnHeaders[2]}</th>
            {cols > 3 && <th className="border border-line px-4 py-2 text-left font-medium text-ink">{columnHeaders[3]}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-paper"}>
              <td className="border border-line px-4 py-2 font-medium text-ink">{row.feature}</td>
              <td className="border border-line px-4 py-2 text-ink/80">{row.column1}</td>
              <td className="border border-line px-4 py-2 text-ink/80">{row.column2}</td>
              {cols > 3 && <td className="border border-line px-4 py-2 text-ink/80">{row.column3}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
