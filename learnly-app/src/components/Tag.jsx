import { TAG_COLORS } from '../data/courses'

export default function Tag({ label }) {
  const cls = TAG_COLORS[label] || 'bg-gray-800 text-gray-400 border border-gray-700/50'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>
      {label}
    </span>
  )
}
