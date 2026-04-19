import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { TEAM_MEMBERS } from '../data/users'

const PERIODS = ['This Week', 'This Month', 'All Time']

const WEEKLY_POINTS = {
  1: 340, 4: 510, 5: 280, 6: 420, 7: 190, 2: 260, 8: 480, 9: 150,
}
const MONTHLY_POINTS = {
  1: 1240, 4: 1680, 5: 960, 6: 1450, 7: 780, 2: 890, 8: 1820, 9: 620,
}

export default function Leaderboard() {
  const { user } = useAuth()
  const [period, setPeriod] = useState('All Time')

  function getPoints(m) {
    if (period === 'This Week') return WEEKLY_POINTS[m.id] || 0
    if (period === 'This Month') return MONTHLY_POINTS[m.id] || 0
    return m.points
  }

  const sorted = [...TEAM_MEMBERS].sort((a, b) => getPoints(b) - getPoints(a))

  const currentUserRank = sorted.findIndex(m => m.id === user?.id) + 1
  const currentUserData = sorted.find(m => m.id === user?.id)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">Leaderboard</h1>
          <p className="text-sm text-[#8b949e] mt-0.5">See how your team is performing</p>
        </div>
        <div className="flex items-center gap-1 bg-[#161b22] border border-[#30363d] rounded-lg p-1">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {sorted.slice(0, 3).map((m, i) => (
          <div
            key={m.id}
            className={`bg-[#161b22] border rounded-xl p-5 text-center transition-all ${
              m.id === user?.id
                ? 'border-blue-500/60 bg-blue-900/10'
                : 'border-[#30363d]'
            } ${i === 0 ? 'ring-1 ring-yellow-500/30' : ''}`}
          >
            <div className="text-3xl mb-2">{medals[i]}</div>
            <div className={`w-14 h-14 rounded-full ${m.avatarColor} flex items-center justify-center text-lg font-bold text-white mx-auto mb-3`}>
              {m.avatar}
            </div>
            <p className="font-semibold text-[#e6edf3] text-sm">{m.name}</p>
            <p className="text-xs text-[#8b949e] mb-3">{m.title}</p>
            <p className={`text-2xl font-bold ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : 'text-amber-600'}`}>
              {getPoints(m).toLocaleString()}
            </p>
            <p className="text-xs text-[#8b949e]">points</p>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#30363d]">
              <th className="text-left text-xs font-medium text-[#8b949e] px-5 py-3 w-12">#</th>
              <th className="text-left text-xs font-medium text-[#8b949e] px-5 py-3">Learner</th>
              <th className="text-right text-xs font-medium text-[#8b949e] px-5 py-3">Points</th>
              <th className="text-right text-xs font-medium text-[#8b949e] px-5 py-3">Courses</th>
              <th className="text-right text-xs font-medium text-[#8b949e] px-5 py-3">Streak</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m, i) => {
              const isMe = m.id === user?.id
              return (
                <tr
                  key={m.id}
                  className={`border-b border-[#30363d] last:border-0 transition-colors ${
                    isMe ? 'bg-blue-900/10' : 'hover:bg-[#21262d]'
                  }`}
                >
                  <td className="px-5 py-3.5 text-sm">
                    {i < 3 ? (
                      <span className="text-base">{medals[i]}</span>
                    ) : (
                      <span className="text-[#8b949e]">{i + 1}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${m.avatarColor} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {m.avatar}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isMe ? 'text-blue-300' : 'text-[#e6edf3]'}`}>
                          {m.name}
                          {isMe && <span className="ml-2 text-xs bg-blue-600/30 text-blue-400 px-1.5 py-0.5 rounded">You</span>}
                        </p>
                        <p className="text-xs text-[#8b949e]">{m.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`font-semibold text-sm ${isMe ? 'text-blue-300' : 'text-[#e6edf3]'}`}>
                      {getPoints(m).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm text-[#8b949e]">{m.coursesDone}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm text-[#8b949e]">🔥 {m.streak}d</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Your standing */}
      {currentUserRank > 3 && currentUserData && (
        <div className="mt-4 bg-blue-900/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-400">#{currentUserRank}</span>
            <div>
              <p className="text-sm font-medium text-[#e6edf3]">Your ranking</p>
              <p className="text-xs text-[#8b949e]">
                {getPoints(sorted[currentUserRank - 2]) - getPoints(currentUserData)} pts behind #{currentUserRank - 1}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-300">{getPoints(currentUserData).toLocaleString()}</p>
            <p className="text-xs text-[#8b949e]">your points</p>
          </div>
        </div>
      )}
    </div>
  )
}
