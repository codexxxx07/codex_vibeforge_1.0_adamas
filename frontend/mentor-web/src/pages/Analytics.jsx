import { useState } from 'react'
import { useTheme } from '../ThemeContext'

const overviewStats = [
  { label: 'Active Students', value: '847', change: '+12%', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Avg Progress', value: '72%', change: '+5%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { label: 'Completion Rate', value: '84%', change: '+3%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Attendance Rate', value: '91%', change: '+2%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
]

const students = [
  { id: 1, name: 'Sarah Johnson', course: 'React Fundamentals', progress: 85, lastActive: '2 hours ago', status: 'online', assignments: [95, 88, 92, 78], attendance: [1, 1, 1, 0, 1, 1, 1] },
  { id: 2, name: 'Mike Chen', course: 'JavaScript Advanced', progress: 62, lastActive: '5 hours ago', status: 'offline', assignments: [72, 85, 68], attendance: [1, 1, 0, 1, 1] },
  { id: 3, name: 'Emma Wilson', course: 'Data Structures', progress: 91, lastActive: '1 hour ago', status: 'online', assignments: [98, 92, 95, 88, 100], attendance: [1, 1, 1, 1, 1] },
  { id: 4, name: 'Alex Rivera', course: 'Python Basics', progress: 45, lastActive: '1 day ago', status: 'offline', assignments: [65, 70, 55], attendance: [1, 0, 1, 0, 0] },
  { id: 5, name: 'Lisa Park', course: 'Web Development', progress: 78, lastActive: '3 hours ago', status: 'online', assignments: [85, 90, 82], attendance: [1, 1, 1, 1, 0] },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const engagementData = [65, 72, 68, 85, 78, 92]
const maxEngagement = Math.max(...engagementData)

export default function Analytics() {
  const { dark } = useTheme()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-accent-light)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
            </div>
            <span className="text-xs font-medium mt-3 block" style={{ color: dark ? '#5b9df0' : '#1D7874' }}>{stat.change} vs last month</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Student Engagement</h3>
          <div className="flex items-end gap-3 h-40">
            {engagementData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{val}%</span>
                <div
                  className="w-full rounded-t-lg transition-all duration-300 relative group"
                  style={{
                    height: `${val}%`,
                    background: val >= 80 ? 'var(--color-accent)' : 'var(--color-accent-light)',
                  }}
                />
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Course Performance</h3>
          <div className="space-y-3">
            {['React Fundamentals', 'JavaScript Advanced', 'Data Structures', 'Python Basics', 'Web Development'].map((course) => (
              <div key={course} className="flex items-center gap-3">
                <span className="text-sm w-36 shrink-0 truncate" style={{ color: 'var(--color-text-primary)' }}>{course}</span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.floor(Math.random() * 40) + 60}%`, background: 'var(--color-accent)' }}
                  />
                </div>
                <span className="text-xs w-8 text-right" style={{ color: 'var(--color-text-muted)' }}>{Math.floor(Math.random() * 20) + 80}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedStudent ? (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                {selectedStudent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{selectedStudent.name}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{selectedStudent.course} · Last active {selectedStudent.lastActive}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${selectedStudent.status === 'online' ? '' : ''}`} style={{ background: selectedStudent.status === 'online' ? 'var(--color-accent-light)' : '#64748B20', color: selectedStudent.status === 'online' ? 'var(--color-accent)' : '#64748B' }}>
                {selectedStudent.status}
              </span>
            </div>
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-sm px-4 py-2 rounded-xl transition-all duration-200"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}
            >
              Back to List
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Assignment Scores</h4>
              <div className="space-y-2">
                {selectedStudent.assignments.map((score, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Assignment {i + 1}</span>
                    <span className="text-sm font-medium" style={{ color: score >= 80 ? 'var(--color-accent)' : '#EE964B' }}>{score}%</span>
                  </div>
                ))}
              </div>
              <p className="text-lg font-bold mt-3" style={{ color: 'var(--color-accent)' }}>
                {Math.round(selectedStudent.assignments.reduce((a, s) => a + s, 0) / selectedStudent.assignments.length)}%
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Average Score</p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Attendance Record</h4>
              <div className="flex gap-1.5 flex-wrap">
                {selectedStudent.attendance.map((a, i) => (
                  <span key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium" style={{ background: a ? 'var(--color-accent-light)' : '#EF444420', color: a ? 'var(--color-accent)' : '#EF4444' }}>
                    {a ? 'P' : 'A'}
                  </span>
                ))}
              </div>
              <p className="text-lg font-bold mt-3" style={{ color: 'var(--color-accent)' }}>
                {Math.round((selectedStudent.attendance.filter(a => a).length / selectedStudent.attendance.length) * 100)}%
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Attendance Rate</p>
            </div>

            <div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Engagement Timeline</h4>
              <div className="flex items-end gap-1 h-20">
                {engagementData.map((val, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${val * 0.3}px`, background: 'var(--color-accent)' }} />
                ))}
              </div>
              <p className="text-lg font-bold mt-3" style={{ color: 'var(--color-accent)' }}>{selectedStudent.progress}%</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Course Progress</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Student Performance</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>
                Export Data
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Student</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Course</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Progress</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Last Active</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className="cursor-pointer transition-all duration-150"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{s.course}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.progress}%`, background: s.progress >= 70 ? 'var(--color-accent)' : s.progress >= 40 ? '#F4D35E' : '#EF4444' }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{s.lastActive}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${s.status === 'online' ? '' : ''}`} style={{ background: s.status === 'online' ? '#22C55E' : '#64748B' }} />
                        <span className="text-xs capitalize" style={{ color: 'var(--color-text-muted)' }}>{s.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
