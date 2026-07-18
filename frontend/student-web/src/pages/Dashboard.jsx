import { useState } from 'react'

const stats = [
  { label: 'Courses Enrolled', value: '6', icon: 'book' },
  { label: 'Classes Attended', value: '24', icon: 'play' },
  { label: 'Assignments Done', value: '18', icon: 'check' },
  { label: 'Overall Progress', value: '72%', icon: 'trending' },
]

const quickActions = [
  { label: 'Resume Class', icon: 'play', desc: 'VLSI Design - Module 4' },
  { label: 'Practice Lab', icon: 'terminal', desc: 'DSA - Arrays & Linked Lists' },
  { label: 'Check Doubts', icon: 'message', desc: '2 unresolved' },
  { label: 'View PYQ', icon: 'book', desc: '2024 Question Papers' },
]

const courses = [
  { name: 'VLSI Design', progress: 75 },
  { name: 'Data Structures', progress: 60 },
  { name: 'Embedded Systems', progress: 40 },
  { name: 'Digital Electronics', progress: 90 },
]

const schedule = [
  { time: '09:00 AM', title: 'VLSI Design', instructor: 'Dr. Sharma', type: 'Live' },
  { time: '11:00 AM', title: 'DSA Practice', instructor: 'Prof. Gupta', type: 'Lab' },
  { time: '02:00 PM', title: 'Embedded Systems', instructor: 'Dr. Patel', type: 'Live' },
]

const activities = [
  { text: 'Submitted DSA Assignment #4', time: '2 hours ago' },
  { text: 'Attended VLSI Live Class', time: '4 hours ago' },
  { text: 'Scored 85% in PYQ Test', time: 'Yesterday' },
  { text: 'Completed Embedded Lab', time: 'Yesterday' },
]

export default function Dashboard() {
  const [studentName] = useState('Alex')

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="glass-card p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full" style={{ background: 'var(--color-accent)', transform: 'translate(30%, -30%)' }} />
        <div className="relative">
          <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Welcome back, {studentName}! 👋
          </h2>
          <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>
            "Navigate Knowledge Wisely" — Here's your learning snapshot
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent-light)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {stat.icon === 'book' && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                  {stat.icon === 'play' && <><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></>}
                  {stat.icon === 'check' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>}
                  {stat.icon === 'trending' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>}
                </svg>
              </div>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <button key={i} className="glass-card p-5 text-left group cursor-pointer">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors" style={{ background: 'var(--color-accent-light)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {action.icon === 'play' && <><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></>}
                {action.icon === 'terminal' && <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>}
                {action.icon === 'message' && <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></>}
                {action.icon === 'book' && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
              </svg>
            </div>
            <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{action.label}</h4>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{action.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Course Progress</h3>
          <div className="space-y-4">
            {courses.map((course, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span style={{ color: 'var(--color-text-primary)' }}>{course.name}</span>
                  <span className="font-medium" style={{ color: 'var(--color-accent)' }}>{course.progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%`, background: 'var(--color-accent)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Today's Schedule</h3>
          <div className="space-y-3">
            {schedule.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                <div className="text-center min-w-[60px]">
                  <p className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{item.time}</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.title}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.instructor}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h3>
        <div className="space-y-3">
          {activities.map((act, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
              <p className="flex-1 text-sm" style={{ color: 'var(--color-text-primary)' }}>{act.text}</p>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
