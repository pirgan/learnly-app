import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { TEAM_MEMBERS } from '../data/users'

const TEAM_SKILLS = [
  { skill: 'Product Strategy', coverage: 78 },
  { skill: 'Data Analysis', coverage: 62 },
  { skill: 'Leadership', coverage: 71 },
  { skill: 'Communication', coverage: 69 },
  { skill: 'Agile', coverage: 85 },
  { skill: 'UX Research', coverage: 54 },
]

const TEAM_ACTIVITY = [
  { member: 'Priya Sharma', action: 'completed', course: 'OKR Framework Masterclass', time: '2h ago', tag: 'Product Strategy' },
  { member: 'Lena Fischer', action: 'completed', course: 'Data Analysis with Python', time: '4h ago', tag: 'Data Analysis' },
  { member: 'Tom Baker', action: 'started', course: 'SQL for Product Managers', time: '6h ago', tag: 'SQL' },
  { member: 'Julia Müller', action: 'completed', course: 'UX Research Methods', time: '1d ago', tag: 'UX Research' },
  { member: 'Alex Chen', action: 'completed', course: 'Agile Sprint Planning', time: '1d ago', tag: 'Agile' },
  { member: 'Carlos Rivera', action: 'started', course: 'Stakeholder Communication', time: '2d ago', tag: 'Communication' },
]

function getBarColor(pct) {
  if (pct >= 75) return 'bg-green-500'
  if (pct >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function Teams() {
  const { user } = useAuth()
  const [activeView, setActiveView] = useState('members')

  const totalCourses = TEAM_MEMBERS.reduce((s, m) => s + m.coursesDone, 0)
  const avgStreak = Math.round(TEAM_MEMBERS.reduce((s, m) => s + m.streak, 0) / TEAM_MEMBERS.length)
  const totalPoints = TEAM_MEMBERS.reduce((s, m) => s + m.points, 0)

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e6edf3]">Teams</h1>
        <p className="text-sm text-[#8b949e] mt-0.5">Growth Team · Product Division</p>
      </div>

      {/* Team stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Team Members', value: TEAM_MEMBERS.length, icon: '👥' },
          { label: 'Courses Completed', value: totalCourses, icon: '📚' },
          { label: 'Avg Streak', value: `${avgStreak} days`, icon: '🔥' },
          { label: 'Total Points', value: totalPoints.toLocaleString(), icon: '⭐' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#161b22] border border-[#30363d] rounded-xl p-4">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="text-xl font-bold text-[#e6edf3]">{stat.value}</p>
            <p className="text-xs text-[#8b949e] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#30363d] mb-6">
        {[
          { id: 'members', label: 'Members' },
          { id: 'skills', label: 'Skill Coverage' },
          { id: 'activity', label: 'Recent Activity' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveView(t.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeView === t.id
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeView === 'members' && (
        <div className="grid grid-cols-2 gap-4">
          {TEAM_MEMBERS.map(m => (
            <div
              key={m.id}
              className={`bg-[#161b22] border rounded-xl p-5 flex items-center gap-4 ${
                m.id === user?.id ? 'border-blue-500/50' : 'border-[#30363d]'
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${m.avatarColor} flex items-center justify-center font-bold text-white flex-shrink-0`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#e6edf3] text-sm">{m.name}</p>
                  {m.id === user?.id && (
                    <span className="text-xs bg-blue-600/30 text-blue-400 px-1.5 py-0.5 rounded">You</span>
                  )}
                </div>
                <p className="text-xs text-[#8b949e]">{m.title}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-[#e6edf3]">{m.points.toLocaleString()} pts</p>
                <p className="text-xs text-[#8b949e]">🔥 {m.streak}d · {m.coursesDone} courses</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'skills' && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 max-w-2xl">
          <p className="text-sm text-[#8b949e] mb-5">Average skill proficiency across Growth Team</p>
          <div className="space-y-5">
            {TEAM_SKILLS.map(s => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="text-[#e6edf3]">{s.skill}</span>
                  <span className={`font-semibold ${
                    s.coverage >= 75 ? 'text-green-400' : s.coverage >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>{s.coverage}%</span>
                </div>
                <div className="h-2.5 bg-[#30363d] rounded-full overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${getBarColor(s.coverage)}`}
                    style={{ width: `${s.coverage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#30363d] text-xs text-[#8b949e]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> ≥75% Strong</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> 50–75% Developing</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> &lt;50% Needs attention</span>
          </div>
        </div>
      )}

      {activeView === 'activity' && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl divide-y divide-[#30363d]">
          {TEAM_ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                a.action === 'completed' ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-[#e6edf3]">
                  <span className="font-medium">{a.member}</span>
                  {' '}
                  <span className={a.action === 'completed' ? 'text-green-400' : 'text-blue-400'}>
                    {a.action}
                  </span>
                  {' '}
                  <span className="text-[#8b949e]">{a.course}</span>
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${
                {
                  'Product Strategy': 'bg-teal-900/60 text-teal-300',
                  'Data Analysis': 'bg-blue-900/60 text-blue-300',
                  'SQL': 'bg-cyan-900/60 text-cyan-300',
                  'UX Research': 'bg-indigo-900/60 text-indigo-300',
                  'Agile': 'bg-purple-900/60 text-purple-300',
                  'Communication': 'bg-orange-900/60 text-orange-300',
                }[a.tag] || 'bg-gray-800 text-gray-400'
              }`}>{a.tag}</span>
              <span className="text-xs text-[#484f58] flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
