import { useEffect, useRef, useState } from 'react'
import { instance } from '@viz-js/viz'

export default function GraphvizDiagram({ dot }) {
  const ref = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!dot || !ref.current) return
    let cancelled = false
    setError('')
    setLoading(true)

    instance().then(viz => {
      if (cancelled) return
      try {
        const svg = viz.renderSVGElement(dot)
        if (cancelled) return
        const container = ref.current
        container.innerHTML = ''
        svg.style.width = '100%'
        svg.style.height = '100%'
        container.appendChild(svg)
      } catch (err) {
        console.error('Graphviz render error', err)
        if (!cancelled) setError(err.message || 'Failed to render diagram')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }).catch(err => {
      console.error('Graphviz instance error', err)
      if (!cancelled) {
        setError('Failed to load Graphviz engine')
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [dot])

  if (!dot) return null

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 overflow-auto flex items-center justify-center relative shadow-sm" style={{ minHeight: 520 }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
           <span className="text-teal-600 text-sm font-medium">Rendering...</span>
        </div>
      )}
      {error ? (
        <div className="text-sm text-red-600 whitespace-pre-wrap font-medium">{error}</div>
      ) : (
        <div ref={ref} className="w-full h-full" />
      )}
    </div>
  )
}
