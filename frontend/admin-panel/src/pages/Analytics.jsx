import { useState } from 'react'

const overviewStats = [
  { label: 'Total Users', value: '24,891', change: '+12.5%', icon: 'users' },
  { label: 'Total Revenue', value: '₹1.28Cr', change: '+22.3%', icon: 'dollar' },
  { label: 'Total Courses', value: '486', change: '+8.1%', icon: 'book' },
  { label: 'Completion Rate', value: '76%', change: '+3.2%', icon: 'check' },
]

const growthData = [30, 45, 38, 55, 48, 62, 58, 72, 65, 78, 70, 85]
const revenueTrend = [25, 40, 35, 60, 50, 68, 55, 75, 62, 80, 72, 90]
const enrollmentData = [60, 45, 75, 50, 80, 55]
const popularCoursesData = [85, 70, 60, 55, 45]

const topCourses = [
  { rank: 1, name: 'Full Stack Web Development', enrollments: 2450, completion: 82, rating: 4.8 },
  { rank: 2, name: 'Data Science Pro', enrollments: 1890, completion: 76, rating: 4.7 },
  { rank: 3, name: 'React Mastery', enrollments: 1670, completion: 88, rating: 4.9 },
  { rank: 4, name: 'Python Fundamentals', enrollments: 1450, completion: 79, rating: 4.5 },
  { rank: 5, name: 'AI & Machine Learning', enrollments: 1230, completion: 71, rating: 4.6 },
]

const demographics = [
  { label: '18-24', value: 35, color: '#1D7874' },
  { label: '25-34', value: 30, color: '#F4D35E' },
  { label: '35-44', value: 20, color: '#EE964B' },
  { label: '45+', value: 15, color: '#8B5CF6' },
]

export default function Analytics() {
  const [dateRange, setDateRange] = useState('yearly')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Platform Analytics
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-xl border text-sm outline-none"
            style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: 'var(--color-accent)' }}
          >
            Export Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="glass-card p-5 lg:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </p>
                <p className="text-2xl lg:text-3xl font-bold mt-1.5" style={{ color: 'var(--color-text-primary)' }}>
                  {stat.value}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#22C55E20', color: '#22C55E' }}>
                {stat.change}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>vs last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
              User Growth
            </h3>
            <span className="text-xs font-medium px-3 py-1 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>+18%</span>
          </div>
          <div className="flex items-end justify-between h-44 gap-1.5">
            {growthData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{ height: `${h}%`, background: 'var(--color-accent)', opacity: 0.6 + (h / 100) * 0.4 }}
                />
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
              Revenue Trend
            </h3>
            <span className="text-xs font-medium px-3 py-1 rounded-lg" style={{ background: '#22C55E20', color: '#22C55E' }}>+22.3%</span>
          </div>
          <svg className="w-full h-44" viewBox="0 0 300 180" preserveAspectRatio="none">
            <polyline
              points={revenueTrend.map((v, i) => `${(i / (revenueTrend.length - 1)) * 300},${180 - (v / 100) * 150}`).join(' ')}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
            <path
              d={`M0,180 ${revenueTrend.map((v, i) => `${(i / (revenueTrend.length - 1)) * 300},${180 - (v / 100) * 150}`).join(' ')} L300,180 Z`}
              fill="url(#revGrad)"
            />
            {revenueTrend.map((v, i) => (
              <circle
                key={i}
                cx={(i / (revenueTrend.length - 1)) * 300}
                cy={180 - (v / 100) * 150}
                r="4"
                fill="var(--color-bg-card)"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-base mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Course Enrollments
          </h3>
          <div className="space-y-4">
            {['Web Dev', 'Data Sci', 'React', 'Python', 'AI/ML', 'DevOps'].map((name, i) => (
              <div key={name}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--color-text-primary)' }}>{name}</span>
                  <span className="font-medium" style={{ color: 'var(--color-accent)' }}>{enrollmentData[i]}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'var(--color-border)' }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${enrollmentData[i]}%`, background: enrollmentData[i] > 70 ? '#22C55E' : 'var(--color-accent)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-base mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Popular Courses
          </h3>
          <div className="space-y-4">
            {['Full Stack', 'Data Science', 'React', 'Python', 'AI/ML'].map((name, i) => (
              <div key={name}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--color-text-primary)' }}>{name}</span>
                  <span className="font-medium" style={{ color: 'var(--color-accent)' }}>{popularCoursesData[i]}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'var(--color-border)' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${popularCoursesData[i]}%`, background: 'var(--color-accent)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-base mb-5" style={{ color: 'var(--color-text-primary)' }}>
            User Demographics
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                {demographics.reduce((acc, seg, i) => {
                  const prevAngle = acc.reduce((s, a) => s + a, 0)
                  const angle = (seg.value / 100) * 360
                  const startAngle = prevAngle - 90
                  const endAngle = startAngle + angle
                  const x1 = 18 + 16 * Math.cos((startAngle * Math.PI) / 180)
                  const y1 = 18 + 16 * Math.sin((startAngle * Math.PI) / 180)
                  const x2 = 18 + 16 * Math.cos((endAngle * Math.PI) / 180)
                  const y2 = 18 + 16 * Math.sin((endAngle * Math.PI) / 180)
                  const largeArc = angle > 180 ? 1 : 0
                  acc.push(angle)
                  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                  return acc
                }, [])}
                {demographics.reduce((els, seg, i) => {
                  const prevTotal = els.length > 0 ? els.slice(0, i).reduce((s, a) => s + a, 0) : 0
                  const angle = (seg.value / 100) * 360
                  const startAngle = prevTotal - 90
                  const endAngle = startAngle + angle
                  const x1 = 18 + 16 * Math.cos((startAngle * Math.PI) / 180)
                  const y1 = 18 + 16 * Math.sin((startAngle * Math.PI) / 180)
                  const x2 = 18 + 16 * Math.cos((endAngle * Math.PI) / 180)
                  const y2 = 18 + 16 * Math.sin((endAngle * Math.PI) / 180)
                  const largeArc = angle > 180 ? 1 : 0
                  els.push(angle)
                  return els
                }, [])}
                {(() => {
                  let total = 0
                  return demographics.map((seg, i) => {
                    const angle = (seg.value / 100) * 360
                    const startAngle = total - 90
                    const endAngle = startAngle + angle
                    const x1 = 18 + 16 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 18 + 16 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 18 + 16 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 18 + 16 * Math.sin((endAngle * Math.PI) / 180)
                    const largeArc = angle > 180 ? 1 : 0
                    total += angle
                    return (
                      <path
                        key={seg.label}
                        d={`M18,18 L${x1},${y1} A16,16 0 ${largeArc},1 ${x2},${y2} Z`}
                        fill={seg.color}
                        stroke="var(--color-bg-card)"
                        strokeWidth="1"
                      />
                    )
                  })
                })()}
                <circle cx="18" cy="18" r="8" fill="var(--color-bg-card)" />
                <text x="18" y="18" textAnchor="middle" dominantBaseline="central" fill="var(--color-text-primary)" fontSize="4" fontWeight="bold">
                  {demographics[0].value}%
                </text>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {demographics.map((seg) => (
              <div key={seg.label} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
                <span style={{ color: 'var(--color-text-muted)' }}>{seg.label}</span>
                <span className="font-medium ml-auto" style={{ color: 'var(--color-text-primary)' }}>{seg.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-5 lg:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
            Top Performing Courses
          </h3>
          <button className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                <th className="text-left py-3 pr-4 font-medium">Rank</th>
                <th className="text-left py-3 pr-4 font-medium">Course Name</th>
                <th className="text-right py-3 pr-4 font-medium">Enrollments</th>
                <th className="text-right py-3 pr-4 font-medium">Completion %</th>
                <th className="text-right py-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course) => (
                <tr key={course.rank} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-3.5 pr-4">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: course.rank === 1 ? '#F4D35E30' : 'var(--color-accent-light)',
                        color: course.rank === 1 ? '#F4D35E' : 'var(--color-accent)',
                      }}
                    >
                      {course.rank}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>{course.name}</td>
                  <td className="py-3.5 pr-4 text-right font-medium" style={{ color: 'var(--color-text-primary)' }}>{course.enrollments.toLocaleString()}</td>
                  <td className="py-3.5 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 rounded-full" style={{ background: 'var(--color-border)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${course.completion}%`, background: 'var(--color-accent)' }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{course.completion}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#F4D35E' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {course.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
