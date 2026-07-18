import { useState } from 'react'

const stats = [
  { label: 'Total Users', value: '24,891', change: '+12%' },
  { label: 'Active Students', value: '18,432', change: '+8%' },
  { label: 'Active Mentors', value: '1,247', change: '+15%' },
  { label: 'Total Revenue (₹)', value: '₹1,28,49,200', change: '+22%' },
  { label: 'Total Courses', value: '486', change: '+5%' },
  { label: 'Completion Rate', value: '76%', change: '+3%' },
]

const chartBars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]
const chartDots = [30, 45, 38, 55, 48, 62, 58, 72, 65, 78, 70, 85]

const recentRegistrations = [
  { name: 'Rahul Sharma', email: 'rahul.sharma@email.com', date: '18 Jun 2026', role: 'Student' },
  { name: 'Priya Patel', email: 'priya.p@email.com', date: '17 Jun 2026', role: 'Mentor' },
  { name: 'Amit Singh', email: 'amit.singh@email.com', date: '17 Jun 2026', role: 'Student' },
  { name: 'Sneha Reddy', email: 'sneha.r@email.com', date: '16 Jun 2026', role: 'Student' },
  { name: 'Vikram Joshi', email: 'vikram.j@email.com', date: '16 Jun 2026', role: 'Mentor' },
  { name: 'Neha Gupta', email: 'neha.g@email.com', date: '15 Jun 2026', role: 'Admin' },
]

const quickActions = [
  { label: 'Add User', icon: 'user-plus', desc: 'Register a new user' },
  { label: 'Create Batch', icon: 'plus-square', desc: 'Start a new batch' },
  { label: 'View Reports', icon: 'file-text', desc: 'Analytics & insights' },
  { label: 'Payouts', icon: 'credit-card', desc: 'Process payouts' },
]

const systemHealth = [
  { label: 'Server Uptime', status: '99.9%', ok: true },
  { label: 'API Response', status: '124ms', ok: true },
  { label: 'Database', status: 'Connected', ok: true },
  { label: 'Email Service', status: 'Operational', ok: true },
  { label: 'CDN', status: '52 ms', ok: true },
  { label: 'Queue Load', status: '12%', ok: true },
]

export default function Dashboard() {
  const [showAllActivity, setShowAllActivity] = useState(false)

  const roleBadge = (role) => {
    return (
      <span
        className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
        style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
      >
        {role}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Welcome back, Admin 👋
          </h2>
          <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Here's what's happening with Shipwise today.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ background: 'var(--color-accent)' }}
          >
            Download Report
          </button>
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-4 lg:p-5">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              {stat.label}
            </p>
            <p className="text-xl lg:text-2xl font-bold mt-1.5" style={{ color: 'var(--color-text-primary)' }}>
              {stat.value}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                {stat.change}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Revenue Overview</h3>
            <select
              className="text-xs px-3 py-1.5 rounded-lg border outline-none"
              style={{
                background: 'var(--color-bg-primary)',
                color: 'var(--color-text-muted)',
                borderColor: 'var(--color-border)',
              }}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="flex items-end justify-between h-40 gap-1.5">
            {chartBars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${h}%`,
                    background: i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-light)',
                    opacity: 0.8 + (h / 100) * 0.2,
                  }}
                />
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>User Growth</h3>
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              +18% this month
            </span>
          </div>
          <div className="relative h-40">
            <svg className="w-full h-full" viewBox="0 0 300 160" preserveAspectRatio="none">
              <polyline
                points={chartDots.map((v, i) => `${(i / (chartDots.length - 1)) * 300},${160 - (v / 100) * 140}`).join(' ')}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
              <path
                d={`M0,160 ${chartDots.map((v, i) => `${(i / (chartDots.length - 1)) * 300},${160 - (v / 100) * 140}`).join(' ')} L300,160 Z`}
                fill="url(#areaGrad)"
              />
              {chartDots.map((v, i) => (
                <circle
                  key={i}
                  cx={(i / (chartDots.length - 1)) * 300}
                  cy={160 - (v / 100) * 140}
                  r="4"
                  fill="var(--color-bg-card)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Recent Registrations</h3>
            <button className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  <th className="text-left py-3 pr-4 font-medium">Name</th>
                  <th className="text-left py-3 pr-4 font-medium">Email</th>
                  <th className="text-left py-3 pr-4 font-medium">Date</th>
                  <th className="text-left py-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {(showAllActivity ? recentRegistrations : recentRegistrations.slice(0, 4)).map((user) => (
                  <tr key={user.email} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                          style={{ background: 'var(--color-accent)' }}
                        >
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4" style={{ color: 'var(--color-text-muted)' }}>{user.email}</td>
                    <td className="py-3.5 pr-4" style={{ color: 'var(--color-text-muted)' }}>{user.date}</td>
                    <td className="py-3.5">{roleBadge(user.role)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="p-4 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
                style={{ background: 'var(--color-accent-light)' }}
              >
                <p className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>{action.label}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>System Health</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {systemHealth.map((item) => (
            <div key={item.label} className="glass-card p-4 flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: item.ok ? '#22C55E' : '#EF4444' }}
              />
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
