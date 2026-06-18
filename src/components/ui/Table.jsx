// Table — a lightly styled table. Pass `columns` (strings) and `rows`
// (array of arrays of cells). For richer tables, write your own <table> using
// these same classes.
export default function Table({ columns = [], rows = [], className = '' }) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-line ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas text-left text-muted">
            {columns.map((c) => (
              <th key={c} className="px-4 py-2.5 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0 hover:bg-canvas/60">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-ink">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
