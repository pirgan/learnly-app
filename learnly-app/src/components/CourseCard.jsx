import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Tag from './Tag'

export default function CourseCard({ course, progress = 0, compact = false }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  const isBookmarked = user?.bookmarks?.includes(course.id)
  const label = progress > 0 ? 'Continue' : 'Start'

  if (compact) {
    return (
      <div
        className="bg-[#1c2333] border border-[#30363d] rounded-xl p-4 hover:border-[#484f58] transition-colors cursor-pointer"
        onClick={() => navigate(`/course/${course.id}`)}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-[#e6edf3] text-sm font-semibold leading-snug">{course.title}</p>
          <span className="text-lg flex-shrink-0">{course.thumbnail}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {course.tags.map(t => <Tag key={t} label={t} />)}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <span>⏱ {course.duration} min</span>
          <span>·</span>
          <span>{course.level}</span>
        </div>
        {progress > 0 && (
          <div className="mt-2">
            <div className="h-1 bg-[#30363d] rounded-full overflow-hidden">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#484f58] transition-all group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[#e6edf3] font-semibold text-sm leading-snug pr-2">{course.title}</h3>
        <button
          className={`flex-shrink-0 transition-colors ${isBookmarked ? 'text-blue-400' : 'text-[#484f58] group-hover:text-[#8b949e]'}`}
          title="Bookmark"
        >
          <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {course.tags.map(t => <Tag key={t} label={t} />)}
      </div>

      <div className="flex items-center gap-3 text-xs text-[#8b949e] mb-1.5">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.duration} min
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {course.level}
        </span>
      </div>

      {course.reason && (
        <p className="text-xs text-[#8b949e] italic mb-3">{course.reason}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(`/course/${course.id}`)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {label}
        </button>
        {progress > 0 && (
          <span className="text-xs text-[#8b949e]">{progress}% complete</span>
        )}
      </div>
    </div>
  )
}
