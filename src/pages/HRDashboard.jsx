import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { HR_STATS, COMPLETION_TRENDS, SKILL_HEATMAP, TOP_SKILL_GAPS, DEPARTMENT_STATS } from '../data/hrData'

const DEPARTMENTS = ['Engineering', 'Sales', 'HR', 'Product']

function heatColor(val) {
  if (val >= 80) return 'bg-green-700 text-green-100'
  if (val >= 60) return 'bg-yellow-700/80 text-yellow-100'
  if (val >= 50) return 'bg-orange-700/80 text-orange-100'
  return 'bg-red-700 text-red-100'
}

const SEVERITY_STYLE = {
  critical: 'bg-red-900/50 text-red-400 border border-red-700/50',
  high: 'bg-orange-900/50 text-orange-400 border border-orange-700/50',
  moderate: 'bg-yellow-900/50 text-yellow-400 border border-yellow-700/50',
}

export default function HRDashboard() {
  const [deptFilter, setDeptFilter] = useState('All Departments')

  const s = HR_STATS

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">HR Skill Dashboard</h1>
          <p className="text-sm text-[#8b949e] mt-0.5">Learnly · L&D Analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-[#e6edf3] focus:outline-none focus:border-blue-500"
          >
            <option>All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <button className="flex items-center gap-2 text-sm text-[#8b949e] bg-[#161b22] border border-[#30363d] px-3 py-2 rounded-lg hover:text-[#e6edf3] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last 6 Months
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'TOTAL LEARNERS',
            value: s.totalLearners.toLocaleString(),
            change: `+${s.totalLearnersChange}% vs last quarter`,
            positive: true,
            icon: (
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
          },
          {
            label: 'OVERALL COMPLETION',
            value: `${s.overallCompletion}%`,
            change: `+${s.overallCompletionChange}% vs last quarter`,
            positive: true,
            icon: (
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ),
          },
          {
            label: 'VOLUNTARY COMPLETION',
            value: `${s.voluntaryCompletion}%`,
            change: `${s.voluntaryCompletionChange}% vs last quarter`,
            positive: false,
            icon: (
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ),
          },
          {
            label: 'AVG SKILL GAP SCORE',
            value: `${s.avgSkillGapScore} / 10`,
            change: `High risk in ${s.highRiskDomains} domains`,
            positive: false,
            isAlert: true,
            icon: (
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ),
          },
        ].map(kpi => (
          <div key={kpi.label} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#8b949e] tracking-wide">{kpi.label}</span>
              {kpi.icon}
            </div>
            <p className="text-3xl font-bold text-[#e6edf3] mb-1">{kpi.value}</p>
            <p className={`text-xs font-medium ${
              kpi.isAlert ? 'text-red-400' : kpi.positive ? 'text-green-400' : 'text-red-400'
            }`}>
              {kpi.positive ? '↑' : kpi.isAlert ? '' : '↓'} {kpi.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#e6edf3]">Completion Trends</h3>
            <div className="flex items-center gap-4 text-xs text-[#8b949e]">
              <span>6-month overview</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#6366f1] inline-block rounded" /> Overall</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#f59e0b] inline-block rounded" /> Voluntary</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={COMPLETION_TRENDS} barCategoryGap="30%" barGap={3}>
              <CartesianGrid vertical={false} stroke="#30363d" />
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e6edf3', fontWeight: 600 }}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                formatter={(val, name) => [`${val}%`, name === 'overall' ? 'Overall' : 'Voluntary']}
              />
              <Bar dataKey="overall" fill="#6366f1" radius={[3, 3, 0, 0]} />
              <Bar dataKey="voluntary" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Skill Gaps */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="font-semibold text-[#e6edf3]">Top Skill Gaps</h3>
            </div>
            <span className="text-xs bg-red-900/50 text-red-400 border border-red-700/50 px-2 py-0.5 rounded">
              5 alerts
            </span>
          </div>
          <div className="space-y-4">
            {TOP_SKILL_GAPS.map(gap => (
              <div key={gap.id} className="border-b border-[#30363d] pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide ${SEVERITY_STYLE[gap.severity]}`}>
                      {gap.severity}
                    </span>
                    <span className="text-sm font-semibold text-[#e6edf3]">{gap.skill}</span>
                  </div>
                  <span className={`text-sm font-bold ${
                    gap.severity === 'critical' ? 'text-red-400' : gap.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'
                  }`}>{gap.gap}%</span>
                </div>
                <p className="text-xs text-[#8b949e] mb-1">{gap.team}</p>
                <div className="h-1 bg-[#30363d] rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-1 rounded-full ${
                      gap.severity === 'critical' ? 'bg-red-500' : gap.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${gap.gap}%` }}
                  />
                </div>
                <p className="text-xs text-blue-400 mt-1">→ {gap.coursePath}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#e6edf3]">Skill Coverage Heatmap</h3>
          <span className="text-xs text-[#8b949e]">by Skill Domain × Department</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs text-[#8b949e] font-medium pb-3 w-36">Skill Domain</th>
                {DEPARTMENTS.map(d => (
                  <th key={d} className="text-center text-xs text-[#8b949e] font-medium pb-3 px-2">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {SKILL_HEATMAP.map(row => (
                <tr key={row.domain}>
                  <td className="text-sm text-[#e6edf3] py-2 pr-4 font-medium">{row.domain}</td>
                  {DEPARTMENTS.map(d => (
                    <td key={d} className="px-2 py-2">
                      <div className={`rounded-lg text-center py-2.5 text-sm font-semibold ${heatColor(row[d])}`}>
                        {row[d]}%
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#30363d] text-xs text-[#8b949e]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-700 inline-block" /> &gt;80% Good</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-700 inline-block" /> 50–80% Developing</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-700 inline-block" /> &lt;50% Critical</span>
        </div>
      </div>

      {/* Dept table */}
      <div className="mt-6 bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#30363d]">
          <h3 className="font-semibold text-[#e6edf3]">Department Overview</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#30363d]">
              {['Department', 'Learners', 'Completion Rate', 'Avg Skill Gap'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-[#8b949e] px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEPARTMENT_STATS.map(d => (
              <tr key={d.dept} className="border-b border-[#30363d] last:border-0 hover:bg-[#21262d] transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-[#e6edf3]">{d.dept}</td>
                <td className="px-5 py-3.5 text-sm text-[#8b949e]">{d.learners}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-24 h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                      <div className={`h-1.5 rounded-full ${heatColor(d.completion).split(' ')[0]}`} style={{ width: `${d.completion}%` }} />
                    </div>
                    <span className="text-sm text-[#e6edf3]">{d.completion}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-sm font-semibold ${d.avgGap <= 3 ? 'text-green-400' : d.avgGap <= 3.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {d.avgGap} / 10
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
