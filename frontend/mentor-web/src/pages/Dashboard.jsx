const stats = [
  { label: 'Total Students', value: '2,847', change: '+12%', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Active Courses', value: '14', change: '+3', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { label: 'Pending Gradings', value: '38', change: '+5', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Upcoming Classes', value: '6', change: 'Today', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
]

const quickActions = [
  { label: 'Start Live Class', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { label: 'Grade Submissions', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'View Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'Create Course', icon: 'M12 4v16m8-8H4' },
]

const activities = [
  { name: 'Sarah Johnson', action: 'submitted assignment', detail: 'React Hooks - Module 3', time: '12 min ago', avatar: 'SJ', online: true },
  { name: 'Mike Chen', action: 'joined live class', detail: 'Advanced JavaScript', time: '28 min ago', avatar: 'MC', online: true },
  { name: 'Emma Wilson', action: 'scored 92% on', detail: 'Data Structures Quiz', time: '1 hour ago', avatar: 'EW', online: false },
  { name: 'Alex Rivera', action: 'posted a question', detail: 'In Graph Theory Discussion', time: '2 hours ago', avatar: 'AR', online: true },
  { name: 'Lisa Park', action: 'completed', detail: 'Python Basics Course', time: '3 hours ago', avatar: 'LP', online: false },
]

const schedule = [
  { time: '09:00 AM', course: 'Advanced Mathematics', students: 24, type: 'Lecture' },
  { time: '11:00 AM', course: 'Data Structures', students: 18, type: 'Lab' },
  { time: '02:00 PM', course: 'Web Development', students: 22, type: 'Workshop' },
  { time: '04:00 PM', course: 'Machine Learning', students: 15, type: 'Mentoring' },
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const earnings = [420, 580, 350, 720, 490, 610, 380]
const maxEarning = Math.max(...earnings)

export default function Dashboard() {

  return (
    <div className="space-y-6">
      <div
        className="relative rounded-2xl p-6 lg:p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-card) 50%, var(--color-bg-secondary) 100%)',
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'var(--color-accent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-10" style={{ background: 'var(--color-accent)', transform: 'translate(-20%, 40%)' }} />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Welcome back, Dr. James! 👋</h2>
              <p className="text-white/70 mt-1">Here's what's happening with your courses today.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                View Report
              </button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}>
                Quick Start
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
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
            <div className="flex items-center gap-1 mt-3">
              <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{stat.change}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="glass-card p-5 flex flex-col items-center gap-3 text-center group cursor-pointer"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
              style={{ background: 'var(--color-accent-light)' }}
            >
              <svg className="w-6 h-6" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
              </svg>
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{action.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h3>
            <button className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>View All</button>
          </div>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-4" style={{ borderBottom: i < activities.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                    {a.avatar}
                  </div>
                  {a.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: 'var(--color-accent)', borderColor: 'var(--color-bg-card)' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    <span className="font-medium">{a.name}</span> {a.action}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{a.detail}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Today's Schedule</h3>
            <button className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>View Calendar</button>
          </div>
          <div className="space-y-3">
            {schedule.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
                <div className="text-center min-w-[64px]">
                  <p className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{s.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.course}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{s.type}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.students} students</span>
                  </div>
                </div>
                <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Weekly Earnings</h4>
            <div className="flex items-end gap-2 h-32">
              {earnings.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>${val}</span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${(val / maxEarning) * 100}%`,
                      background: val >= 600 ? 'var(--color-accent)' : 'var(--color-accent-light)',
                    }}
                  />
                  <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
