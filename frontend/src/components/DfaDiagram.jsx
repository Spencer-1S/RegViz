import { useEffect, useMemo } from 'react'
import ReactFlow, { Background, Controls, MiniMap, MarkerType, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css'

export default function DfaDiagram({ result }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const baseEdges = useMemo(() => {
    if (!result) return []
    return (result.edges || []).map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      label: edge.label,
      markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18, color: '#22d3ee' },
      style: { stroke: '#22d3ee', strokeWidth: 2 },
      labelStyle: { fill: '#e2e8f0', fontWeight: 600 },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9, stroke: '#1e293b', strokeWidth: 1 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 6
    }))
  }, [result])

  useEffect(() => {
    if (!result) {
      setNodes([])
      setEdges([])
      return
    }
    const laidOut = layoutCircular((result.nodes || []).map((node) => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: { label: node.label },
      style: {
        width: 76,
        height: 76,
        borderRadius: '9999px',
        border: node.start ? '2px solid #2dd4bf' : '2px solid #334155',
        outline: node.accept ? '3px solid #22d3ee55' : 'none',
        background: '#0f172a',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        boxShadow: '0 12px 35px rgba(0,0,0,0.35)'
      }
    })))
    setNodes(laidOut)
    setEdges(baseEdges)
  }, [result, baseEdges, setNodes, setEdges])

  if (!result) return null

  return (
    <div className="h-[520px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
      >
        <MiniMap pannable zoomable style={{ background: '#0b1224' }} maskColor="#0b1224aa" nodeColor={() => '#22d3ee'} />
        <Controls showFitView={false} />
        <Background gap={16} color="#1e293b" />
      </ReactFlow>
    </div>
  )
}

// Simple deterministic circle placement; adjust radius to keep spacing reasonable.
function layoutCircular(nodes) {
  const ordered = [...nodes].sort((a, b) => a.id.localeCompare(b.id))
  const count = ordered.length
  if (count === 0) return []
  const radius = Math.max(140, Math.min(320, count * 32))
  return ordered.map((node, idx) => {
    const angle = (2 * Math.PI * idx) / count
    return {
      ...node,
      position: {
        x: radius + radius * Math.cos(angle),
        y: radius + radius * Math.sin(angle)
      }
    }
  })
}
