import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { COURSES, RECOMMENDED_FOR_USER } from '../data/courses'
import CourseCard from '../components/CourseCard'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const recIds = RECOMMENDED_FOR_USER[user?.id] || []
  const recommended = recIds.map(id => COURSES.find(c => c.id === id)).filter(Boolean)

  const mandatory = COURSES.filter(c => c.mandatory)
  const inProgress = user?.inProgress || []

  function getProgress(courseId) {
    return inProgress.find(p => p.courseId === courseId)?.progress || 0
  }

  function handleSearch(e) {
    e.preventDefault()
    if (search.trim()) navigate(`/my-learning?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">
            {getGreeting()}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-[#8b949e] mt-0.5">Here is what we recommend for you today</p>
        </div>
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484f58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="bg-[#161b22] border border-[#30363d] rounded-lg pl-9 pr-4 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:border-blue-500 w-56 transition-colors"
            />
          </form>
          <button className="relative text-[#8b949e] hover:text-[#e6edf3] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Recommended */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[#e6edf3]">Recommended for You</h2>
            <span className="text-xs bg-[#21262d] text-[#8b949e] px-2.5 py-0.5 rounded-full border border-[#30363d]">
              {recommended.length} courses
            </span>
          </div>
          <button
            onClick={() => navigate('/my-learning')}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {recommended.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getProgress(course.id)}
            />
          ))}
        </div>
      </section>

      {/* Mandatory Training */}
      <section>
        <div className="bg-[#161b22] border border-yellow-600/40 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-base font-semibold text-[#e6edf3]">Mandatory Training</h2>
              <span className="text-xs bg-yellow-900/50 text-yellow-400 border border-yellow-700/50 px-2 py-0.5 rounded-full">
                {mandatory.length} required
              </span>
            </div>
            <button
              onClick={() => navigate('/my-learning?filter=mandatory')}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mandatory.map(course => {
              const prog = getProgress(course.id)
              const minsLeft = Math.round(course.duration * (1 - prog / 100))
              return (
                <div
                  key={course.id}
                  className={`bg-[#0d1117] border rounded-lg p-4 ${
                    course.overdue ? 'border-red-700/60' : 'border-[#30363d]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      course.overdue
                        ? 'bg-red-900/50 text-red-400'
                        : 'bg-green-900/40 text-green-400'
                    }`}>
                      {course.tags[0]}
                    </span>
                    <span className={`text-xs ${course.overdue ? 'text-red-400 font-semibold' : 'text-[#8b949e]'}`}>
                      {course.overdue
                        ? <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Due {course.dueDate} · 9 days overdue
                          </span>
                        : `Due ${course.dueDate}`
                      }
                    </span>
                  </div>

                  <h3 className="text-[#e6edf3] font-semibold text-sm mt-2 mb-2">{course.title}</h3>

                  <div className="mb-1">
                    <div className="flex items-center justify-between text-xs text-[#8b949e] mb-1">
                      <span>Progress</span>
                      <span className={prog > 50 ? 'text-green-400' : 'text-[#8b949e]'} style={{ fontWeight: 600 }}>
                        {prog}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${course.overdue ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${prog}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-[#8b949e]">
                      {course.duration} min total · {minsLeft} min left
                    </span>
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        course.overdue
                          ? 'bg-red-600 hover:bg-red-500 text-white border border-red-500'
                          : 'bg-green-600 hover:bg-green-500 text-white'
                      }`}
                    >
                      {course.overdue ? 'Complete Now' : 'Continue'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
