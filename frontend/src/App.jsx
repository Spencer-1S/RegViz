import { useState } from 'react'
import RegexForm from './components/RegexForm'
import DfaSummary from './components/DfaSummary'
import GraphvizDiagram from './components/GraphvizDiagram'
import ErrorAlert from './components/ErrorAlert'
import Loader from './components/Loader'
import { buildDfa } from './api/dfa'

export default function App() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (payload) => {
    setLoading(true)
    setError('')
    try {
      const data = await buildDfa(payload)
      setResult(data)
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Request failed'
      setError(message)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">RegViz</h1>
            <p className="text-sm text-slate-400">Developed by Spencer1s</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Convert a regular expression to DFA diagram</h2>
          <RegexForm onSubmit={handleSubmit} onInteraction={() => setError('')} loading={loading} />
          <div className="mt-4">{loading ? <Loader /> : <ErrorAlert message={error} />}</div>
        </div>

        {result && (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <DfaSummary result={result} />
            </div>
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">DFA Diagram</h3>
                <p className="text-xs text-slate-500">Graphviz (DOT)</p>
              </div>
              <GraphvizDiagram dot={result.dot} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
