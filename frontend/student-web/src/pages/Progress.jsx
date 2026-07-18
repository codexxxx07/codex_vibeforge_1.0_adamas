import { useState } from 'react'

const courses = [
  { name: 'Linux Fundamentals', progress: 78, total: 24, done: 19, color: '#1D7874', weak: 'File Permissions' },
  { name: 'C Programming', progress: 65, total: 32, done: 21, color: '#EE964B', weak: 'Dynamic Memory' },
  { name: 'Shell Scripting', progress: 42, total: 18, done: 8, color: '#F4D35E', weak: 'AWK & Sed' },
  { name: 'System Calls', progress: 30, total: 20, done: 6, color: '#00D9FF', weak: 'Signals' },
  { name: 'Networking Basics', progress: 55, total: 16, done: 9, color: '#C9B6E4', weak: 'TCP vs UDP' },
]

const weekActivity = [5, 8, 3, 0, 6, 10, 7]
const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const maxActivity = Math.max(...weekActivity)

const achievements = [
  { title: '3-Day Streak', icon: '🔥', desc: 'Studied 3 days in a row' },
  { title: '10 Compiles', icon: '⚡', desc: 'Compiled C code 10 times' },
  { title: 'First Shell', icon: '🐚', desc: 'Completed first shell script' },
  { title: 'Bug Squasher', icon: '🐛', desc: 'Fixed 5 segmentation faults' },
]

const weakTopics = [
  { topic: 'File Permissions (chmod/chown)', progress: 25, course: 'Linux Fundamentals' },
  { topic: 'Dynamic Memory Allocation', progress: 30, course: 'C Programming' },
  { topic: 'AWK & Sed Command', progress: 15, course: 'Shell Scripting' },
  { topic: 'Signal Handling', progress: 20, course: 'System Calls' },
]

export default function Progress() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Progress</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Syllabus completion, streaks & weak topics</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>🔥 5-day streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Overall Progress" value="54%" sub="12/22 modules" color="#1D7874" />
        <StatCard label="Courses Enrolled" value="5" sub="2 completed" color="#EE964B" />
        <StatCard label="Weak Topics" value="4" sub="Needs attention" color="#EF4444" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>Course Syllabus Progress</h3>
          <div className="space-y-3">
            {courses.map((c, i) => (
              <div key={i} className="cursor-pointer" onClick={() => setSelectedCourse(selectedCourse === i ? null : i)}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                    {c.weak && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>Weak</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: c.color }}>{c.progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${c.progress}%`, background: c.color }} />
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{c.done}/{c.total} lessons</p>
                {selectedCourse === i && c.weak && (
                  <div className="mt-2 p-2 rounded-lg text-xs" style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    ⚠ Weak topic: {c.weak} — practice recommended
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>Weekly Activity</h3>
          <div className="flex items-end gap-2 h-32 mt-4">
            {weekActivity.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium" style={{ color: val === maxActivity ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>{val}</span>
                <div className="w-full rounded-lg transition-all" style={{
                  height: `${(val / maxActivity) * 100}%`,
                  background: val === maxActivity ? 'var(--color-accent)' : 'var(--color-accent-light)',
                  minHeight: val > 0 ? '12px' : '4px',
                }} />
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{weekLabels[i]}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>Best day: Friday (10 activities)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text-primary)' }}>Weak Topics to Focus On</h3>
          <div className="space-y-3">
            {weakTopics.map((wt, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{wt.topic}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>{wt.progress}%</span>
                  </div>
                  <button className="text-[10px] px-2 py-1 rounded-lg font-medium text-white" style={{ background: 'var(--color-accent)' }}>
                    Practice
                  </button>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{wt.course}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text-primary)' }}>Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="p-3 rounded-xl text-center" style={{ background: 'var(--color-accent-light)' }}>
                <span className="text-2xl">{a.icon}</span>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{a.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="glass-card p-5">
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
      <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>
    </div>
  )
}
