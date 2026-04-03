import { useState } from 'react'

export default function RegexForm({ onSubmit, onInteraction, loading }) {
  const [regex, setRegex] = useState('a*(ab|c)')
  const [alphabet, setAlphabet] = useState('')
  const [minimize, setMinimize] = useState(true)
  const [warning, setWarning] = useState('')

  const validate = (val) => {
    if (/\[[^\]]*\\[wWdDsS][^\]]*\]/.test(val)) {
      setWarning('Warning: Shorthands like \\w, \\d are not supported inside character classes [ ]. Use explicit ranges (e.g. [0-9] or [a-zA-Z]).')
    } else {
      setWarning('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ regex, alphabet: alphabet || undefined, minimize })
  }

  const handleChange = (setter) => (e) => {
    const val = e.target.value
    setter(val)
    if (setter === setRegex) validate(val)
    if (onInteraction) onInteraction()
  }

  const handleExampleClick = (val) => {
    setRegex(val)
    validate(val)
    if (onInteraction) onInteraction()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">Regular expression</label>
        <input
          type="text"
          value={regex}
          onChange={handleChange(setRegex)}
          placeholder="e.g. (ab)*c|d"
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <p className="mt-1 text-xs text-slate-400">
          Supported: <code>* + ? | ( ) [ ] &#123;min,max&#125;</code> and standard classes. Use <code>()</code> for empty string (epsilon).
          <br />Note: <code>^</code> and <code>$</code> anchors are allowed but processed as start/end of input.
        </p>
        {warning && (
          <div className="mt-2 text-sm text-amber-400 font-medium">
            {warning}
          </div>
        )}
        <div className="mt-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Examples:</span>{' '}
          <code className="bg-slate-800 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-700" onClick={() => handleExampleClick('(a|b)*abb')}>(a|b)*abb</code>,{' '}
          <code className="bg-slate-800 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-700" onClick={() => handleExampleClick('[0-9]+')}>[0-9]+</code>,{' '}
          <code className="bg-slate-800 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-700" onClick={() => handleExampleClick('a*bc*')}>a*bc*</code>{' '}
          {/*<code className="bg-slate-800 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-700" onClick={() => handleExampleClick('a&b')}>a&b</code> (intersection)*/}
        </div>

        <div className="mt-3 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
          <p className="font-semibold text-slate-300 mb-1">Engine Support Note:</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>Supported: <code className="text-teal-400">*</code>, <code className="text-teal-400">+</code>, <code className="text-teal-400">?</code>, <code className="text-teal-400">|</code> (union), <code className="text-teal-400">()</code> group, <code className="text-teal-400">[a-z]</code> ranges, <code className="text-teal-400">.</code> (any char), <code className="text-teal-400">&amp;</code> (intersection), <code className="text-teal-400">~</code> (complement).</li>
            <li>Unsupported: Lookarounds, Backreferences, and Shorthands like <code className="text-orange-400">\w</code>, <code className="text-orange-400">\d</code> inside character classes (use <code className="text-teal-400">[0-9]</code> instead).</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-3">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-200 mb-2">Alphabet (optional)</label>
          <input
            type="text"
            value={alphabet}
            onChange={handleChange(setAlphabet)}
            placeholder="abc"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-xs text-slate-500 mt-1">If omitted, dk.brics.automaton infers the alphabet from the regex.</p>
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={minimize}
            onChange={(e) => setMinimize(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-teal-500 focus:ring-teal-500"
          />
          Minimize DFA
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-semibold text-slate-900 hover:bg-teal-400 disabled:opacity-70 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Processing…' : 'Convert to DFA'}
      </button>
    </form>
  )
}
