import { useNavigate } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from 'recharts'
import { useAuth } from '../context/AuthContext'
import { USER_SKILLS, RADAR_DATA, RECENT_COMPLETIONS, GROWTH_PATHS } from '../data/skills'
import { COURSES } from '../data/courses'
import Tag from '../components/Tag'

const STATUS_BADGE = {
  'on-track': 'bg-green-900/50 text-green-400 border border-green-700/50',
  'gap': 'bg-yellow-900/50 text-yellow-400 border border-yellow-700/50',
  'critical': 'bg-red-900/50 text-red-400 border border-red-700/50',
}
const STATUS_LABEL = { 'on-track': 'On track', 'gap': 'Gap', 'critical': 'Critical gap' }
const STATUS_BAR = { 'on-track': 'bg-green-500', 'gap': 'bg-yellow-500', 'critical': 'bg-red-500' }

export default function SkillProfile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const skills = USER_SKILLS[user?.id] || []
  const radarData = RADAR_DATA[user?.id] || []
  const completions = RECENT_COMPLETIONS[user?.id] || []
  const growthPath = GROWTH_PATHS[user?.id] || []

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">My Skill Profile</h1>
          <p className="text-sm text-[#8b949e] mt-0.5">Track your growth and close skill gaps</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#e6edf3] bg-[#161b22] border border-[#30363d] px-3 py-1.5 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last 90 days
          </button>
          <button className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#e6edf3] bg-[#161b22] border border-[#30363d] px-3 py-1.5 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-6 flex items-center gap-6">
        <div className={`w-16 h-16 rounded-full ${user?.avatarColor || 'bg-blue-600'} flex items-center justify-center text-xl font-bold text-white flex-shrink-0`}>
          {user?.avatar}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#e6edf3]">{user?.name}</h2>
          <p className="text-sm text-[#8b949e] mt-0.5">
            🏢 {user?.title} · {user?.team} · 🏛 {user?.department}
          </p>
        </div>
        {[
          { icon: '🔥', value: user?.streak, label: 'Day streak' },
          { icon: null, value: user?.coursesDone, label: 'Courses done' },
          { icon: null, value: user?.skillsTracked, label: 'Skills tracked', color: 'text-blue-400' },
          { icon: null, value: `${user?.avgProficiency}%`, label: 'Avg proficiency', color: 'text-blue-400' },
        ].map((stat, i) => (
          <div key={i} className="text-center border-l border-[#30363d] pl-6">
            <p className={`text-2xl font-bold ${stat.color || 'text-[#e6edf3]'}`}>
              {stat.icon}{stat.value}
            </p>
            <p className="text-xs text-[#8b949e] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Radar */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#e6edf3]">Skill Radar</h3>
            <div className="flex items-center gap-4 text-xs text-[#8b949e]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                Target
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#30363d" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#8b949e', fontSize: 11 }} />
              <Radar dataKey="target" stroke="#22c55e" fill="#22c55e" fillOpacity={0.08} strokeWidth={1.5} />
              <Radar dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip
                contentStyle={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e6edf3' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill progress bars */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#e6edf3]">Skill Progress</h3>
            <span className="text-xs text-[#8b949e]">Current vs. Target</span>
          </div>
          <div className="space-y-4">
            {skills.map(s => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_BAR[s.status]}`} />
                    <span className="text-sm text-[#e6edf3]">{s.skill}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8b949e]">{s.current}% / {s.target}%</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${STATUS_BADGE[s.status]}`}>
                      {STATUS_LABEL[s.status]}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-[#30363d] rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${STATUS_BAR[s.status]}`}
                    style={{ width: `${s.current}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Growth Path */}
        <div className="col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-400">🧭</span>
            <h3 className="font-semibold text-[#e6edf3]">Recommended Growth Path</h3>
          </div>
          <p className="text-xs text-[#8b949e] mb-4">Next steps to close your critical skill gaps</p>
          <div className="flex items-center gap-3">
            {growthPath.map((step, i) => {
              const course = COURSES.find(c => c.id === step.courseId)
              if (!course) return null
              const isLast = i === growthPath.length - 1
              return (
                <div key={step.courseId} className="flex items-center gap-3 flex-1">
                  <div
                    className={`flex-1 border rounded-xl p-4 cursor-pointer transition-colors ${
                      isLast ? 'border-blue-500/60 bg-blue-900/10' : 'border-[#30363d] hover:border-[#484f58]'
                    }`}
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <Tag label={step.tag} />
                    <p className="text-sm font-semibold text-[#e6edf3] mt-2 mb-2">{course.title}</p>
                    <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                      <span>⏱ {course.duration} min</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${isLast ? 'bg-blue-600/20 text-blue-400 border border-blue-600/40' : 'bg-[#21262d] text-[#8b949e]'}`}>
                        Step {step.step}
                      </span>
                    </div>
                  </div>
                  {!isLast && (
                    <svg className="w-5 h-5 text-[#484f58] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Completions */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-500">✅</span>
            <h3 className="font-semibold text-[#e6edf3]">Recent Completions</h3>
          </div>
          <div className="space-y-3">
            {completions.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-900/40 border border-green-700/40 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#e6edf3] leading-snug">{c.title}</p>
                  <p className="text-xs text-[#8b949e] mt-0.5">{c.date}</p>
                </div>
                <Tag label={c.tag} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
