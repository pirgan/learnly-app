import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { COURSES } from '../data/courses'
import CourseCard from '../components/CourseCard'
import Tag from '../components/Tag'

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced']
const SKILLS = ['All', 'Product Strategy', 'Data Analysis', 'Leadership', 'Agile', 'Communication', 'UX Research', 'Compliance', 'SQL', 'Analytics', 'Design']

export default function MyLearning() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialFilter = searchParams.get('filter') === 'mandatory' ? 'mandatory' : 'all'
  const initialSearch = searchParams.get('q') || ''

  const [tab, setTab] = useState(initialFilter === 'mandatory' ? 'all' : 'all')
  const [search, setSearch] = useState(initialSearch)
  const [level, setLevel] = useState('All')
  const [skill, setSkill] = useState('All')
  const [showMandatory, setShowMandatory] = useState(initialFilter === 'mandatory')

  const inProgress = user?.inProgress || []
  const completed = user?.completedCourseIds || []
  const bookmarks = user?.bookmarks || []

  function getProgress(id) {
    return inProgress.find(p => p.courseId === id)?.progress || 0
  }

  const filtered = useMemo(() => {
    let list = COURSES
    if (tab === 'in-progress') list = list.filter(c => inProgress.some(p => p.courseId === c.id))
    if (tab === 'completed') list = list.filter(c => completed.includes(c.id))
    if (tab === 'bookmarked') list = list.filter(c => bookmarks.includes(c.id))
    if (showMandatory) list = list.filter(c => c.mandatory)
    if (level !== 'All') list = list.filter(c => c.level === level)
    if (skill !== 'All') list = list.filter(c => c.tags.includes(skill))
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.level.toLowerCase().includes(q)
      )
    }
    return list
  }, [tab, search, level, skill, showMandatory, inProgress, completed, bookmarks])

  const tabs = [
    { id: 'all', label: 'All Courses', count: COURSES.length },
    { id: 'in-progress', label: 'In Progress', count: inProgress.length },
    { id: 'completed', label: 'Completed', count: completed.length },
    { id: 'bookmarked', label: 'Bookmarked', count: bookmarks.length },
  ]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e6edf3]">My Learning</h1>
        <p className="text-sm text-[#8b949e] mt-0.5">Browse and manage your courses</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#30363d] mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setShowMandatory(false) }}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${
              tab === t.id && !showMandatory
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              tab === t.id && !showMandatory
                ? 'bg-blue-600/30 text-blue-300'
                : 'bg-[#21262d] text-[#8b949e]'
            }`}>{t.count}</span>
          </button>
        ))}
        <button
          onClick={() => setShowMandatory(v => !v)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ml-1 ${
            showMandatory
              ? 'border-yellow-500 text-yellow-400'
              : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
          }`}
        >
          ⚠ Mandatory
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            showMandatory ? 'bg-yellow-900/40 text-yellow-400' : 'bg-[#21262d] text-[#8b949e]'
          }`}>{COURSES.filter(c => c.mandatory).length}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484f58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, skill..."
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg pl-9 pr-4 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-[#e6edf3] focus:outline-none focus:border-blue-500"
        >
          {LEVELS.map(l => <option key={l} value={l}>{l === 'All' ? 'All Levels' : l}</option>)}
        </select>

        <select
          value={skill}
          onChange={e => setSkill(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-[#e6edf3] focus:outline-none focus:border-blue-500"
        >
          {SKILLS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Skills' : s}</option>)}
        </select>

        {(search || level !== 'All' || skill !== 'All') && (
          <button
            onClick={() => { setSearch(''); setLevel('All'); setSkill('All') }}
            className="text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#8b949e]">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium text-[#e6edf3]">No courses found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-[#8b949e] mb-4">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                progress={getProgress(course.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
