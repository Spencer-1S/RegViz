export default function Loader() {
  return (
    <div className="inline-flex items-center gap-2 text-slate-300 text-sm">
      <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
      <span className="h-2 w-2 rounded-full bg-teal-300 animate-ping [animation-delay:0.15s]" />
      <span className="h-2 w-2 rounded-full bg-teal-200 animate-ping [animation-delay:0.3s]" />
      <span>Processing…</span>
    </div>
  )
}
