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
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left font-medium">{columnHeaders[0]}</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-medium">{columnHeaders[1]}</th>
            <th className="border border-gray-200 px-4 py-2 text-left font-medium">{columnHeaders[2]}</th>
            {cols > 3 && <th className="border border-gray-200 px-4 py-2 text-left font-medium">{columnHeaders[3]}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-200 px-4 py-2 font-medium">{row.feature}</td>
              <td className="border border-gray-200 px-4 py-2">{row.column1}</td>
              <td className="border border-gray-200 px-4 py-2">{row.column2}</td>
              {cols > 3 && <td className="border border-gray-200 px-4 py-2">{row.column3}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
