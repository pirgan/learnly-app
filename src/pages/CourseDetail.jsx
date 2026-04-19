import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { COURSES } from '../data/courses'
import Tag from '../components/Tag'
import CourseCard from '../components/CourseCard'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const course = COURSES.find(c => c.id === Number(id))
  if (!course) {
    return (
      <div className="p-8 text-center text-[#8b949e]">
        <p className="text-xl">Course not found</p>
        <button onClick={() => navigate('/my-learning')} className="mt-4 text-blue-400 hover:text-blue-300">
          Back to My Learning
        </button>
      </div>
    )
  }

  const inProgressEntry = user?.inProgress?.find(p => p.courseId === course.id)
  const progress = inProgressEntry?.progress || 0
  const isCompleted = user?.completedCourseIds?.includes(course.id)

  const completedModules = course.modules.filter(m => m.completed).length
  const totalModules = course.modules.length

  const related = COURSES.filter(c => c.id !== course.id && c.tags.some(t => course.tags.includes(t))).slice(0, 3)

  return (
    <div className="p-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-6">
        <button onClick={() => navigate('/my-learning')} className="hover:text-[#e6edf3] transition-colors">
          My Learning
        </button>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[#e6edf3] truncate max-w-xs">{course.title}</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl flex-shrink-0 w-16 h-16 bg-[#21262d] rounded-xl flex items-center justify-center">
                {course.thumbnail}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {course.tags.map(t => <Tag key={t} label={t} />)}
                  {course.mandatory && (
                    <span className="text-xs bg-yellow-900/50 text-yellow-400 border border-yellow-700/50 px-2 py-0.5 rounded">
                      Mandatory
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold text-[#e6edf3] mb-2">{course.title}</h1>
                <p className="text-sm text-[#8b949e]">{course.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 py-4 border-t border-[#30363d] text-sm text-[#8b949e]">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration} min total
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {totalModules} modules
              </span>
              <span className="flex items-center gap-1.5">
                ⭐ {course.rating}
              </span>
              <span className="flex items-center gap-1.5">
                👥 {course.learners.toLocaleString()} learners
              </span>
              <span className={`text-xs px-2 py-0.5 rounded border ${
                course.level === 'Beginner' ? 'bg-green-900/40 text-green-400 border-green-700/50' :
                course.level === 'Intermediate' ? 'bg-yellow-900/40 text-yellow-400 border-yellow-700/50' :
                'bg-red-900/40 text-red-400 border-red-700/50'
              }`}>
                {course.level}
              </span>
            </div>

            {progress > 0 && (
              <div className="pt-3 border-t border-[#30363d]">
                <div className="flex justify-between text-xs text-[#8b949e] mb-1.5">
                  <span>Your progress</span>
                  <span>{progress}% · {completedModules}/{totalModules} modules</span>
                </div>
                <div className="h-2 bg-[#30363d] rounded-full overflow-hidden">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Modules */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <h2 className="font-semibold text-[#e6edf3] mb-4">Course Modules</h2>
            <div className="space-y-2">
              {course.modules.map((mod, i) => (
                <div
                  key={mod.id}
                  className={`flex items-center gap-4 p-3.5 rounded-lg border transition-colors cursor-pointer ${
                    mod.completed
                      ? 'border-green-700/30 bg-green-900/10'
                      : 'border-[#30363d] hover:border-[#484f58] bg-[#0d1117]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                    mod.completed
                      ? 'bg-green-600 text-white'
                      : 'bg-[#21262d] text-[#8b949e] border border-[#30363d]'
                  }`}>
                    {mod.completed ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${mod.completed ? 'text-[#8b949e]' : 'text-[#e6edf3]'}`}>
                      {mod.title}
                    </p>
                  </div>
                  <span className="text-xs text-[#8b949e] flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {mod.duration} min
                  </span>
                  {!mod.completed && (
                    <svg className="w-4 h-4 text-[#484f58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sticky top-6">
            {isCompleted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-900/40 border border-green-700/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-green-400 text-sm mb-1">Completed!</p>
                <p className="text-xs text-[#8b949e]">You've finished this course</p>
                <button className="mt-3 w-full text-sm text-blue-400 hover:text-blue-300 border border-[#30363d] rounded-lg py-2 transition-colors">
                  Review again
                </button>
              </div>
            ) : (
              <>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
                {course.mandatory && (
                  <p className="text-xs text-center text-yellow-400">
                    ⚠ Mandatory · {course.overdue ? 'OVERDUE' : `Due ${course.dueDate}`}
                  </p>
                )}
              </>
            )}

            <div className="mt-4 pt-4 border-t border-[#30363d] space-y-2.5 text-sm text-[#8b949e]">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="text-[#e6edf3]">{course.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span>Level</span>
                <span className="text-[#e6edf3]">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Modules</span>
                <span className="text-[#e6edf3]">{totalModules}</span>
              </div>
              <div className="flex justify-between">
                <span>Rating</span>
                <span className="text-[#e6edf3]">⭐ {course.rating}</span>
              </div>
              <div className="flex justify-between">
                <span>Enrolled</span>
                <span className="text-[#e6edf3]">{course.learners.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#8b949e] mb-3">Related Courses</h3>
              <div className="space-y-3">
                {related.map(c => (
                  <CourseCard key={c.id} course={c} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
