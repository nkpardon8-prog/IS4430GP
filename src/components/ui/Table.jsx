// Table — a lightly styled table. Two ways to use it (both supported):
//   1. data props:  <Table columns={['A','B']} rows={[[1,2]]} />
//   2. raw children: <Table><thead>…</thead><tbody>…</tbody></Table>
// In children mode, bare <th>/<td> are auto-styled (padding, header tint, row
// dividers) so a hand-written <thead>/<tbody> looks like the data-prop version.
// Any explicit cell class (e.g. text-right on a price cell) is preserved.
const CHILD_STYLES =
  'w-full text-sm ' +
  '[&_thead]:bg-canvas [&_thead]:text-muted [&_thead_tr]:border-b [&_thead_tr]:border-line ' +
  '[&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-medium ' +
  '[&_td]:px-4 [&_td]:py-2.5 [&_td]:text-ink ' +
  '[&_tbody_tr]:border-t [&_tbody_tr]:border-line'

export default function Table({ columns = [], rows = [], className = '', children }) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-line ${className}`}>
      {children ? (
        <table className={CHILD_STYLES}>{children}</table>
      ) : (
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
      )}
    </div>
  )
}
