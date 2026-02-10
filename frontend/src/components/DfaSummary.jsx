export default function DfaSummary({ result }) {
  if (!result) return null

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Regex</p>
          <p className="font-mono text-sm text-teal-300">{result.regex}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-500">Minimized</p>
          <p className="text-sm font-semibold text-slate-100">{result.minimized ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3 text-sm text-slate-200">
        <div>
          <p className="text-slate-500 text-xs uppercase">Start state</p>
          <p className="font-mono">{result.startState}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs uppercase">Accept states</p>
          <p className="font-mono">{Array.from(result.acceptStates || []).join(', ')}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs uppercase">States</p>
          <p className="font-mono">{(result.states || []).join(', ')}</p>
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-xs uppercase mb-2">Transitions</p>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-800 text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">From</th>
                <th className="px-3 py-2 font-semibold">Label</th>
                <th className="px-3 py-2 font-semibold">To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {(result.transitions || []).map((t) => (
                <tr key={`${t.from}-${t.label}-${t.to}`} className="text-slate-200">
                  <td className="px-3 py-2 font-mono">{t.from}</td>
                  <td className="px-3 py-2 font-mono text-teal-200">{t.label}</td>
                  <td className="px-3 py-2 font-mono">{t.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'dfa.json'
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
        >
          Download JSON
        </button>
      </div>
    </div>
  )
}
