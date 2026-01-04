import type { JSX } from "react";

const DataTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | JSX.Element)[][];
}): JSX.Element => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          {headers.map((header, i) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" key={i}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr className="border-b border-border/50 hover:bg-accent/30 transition-colors" key={i}>
            {row.map((cell, j) => (
              <td className="px-4 py-4 text-sm text-foreground" key={j}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
