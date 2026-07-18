import { useState } from 'react'

const reportTypes = [
  {
    id: 'user',
    title: 'User Reports',
    icon: 'users',
    desc: 'User growth, activity, and churn analytics',
    color: '#3B82F6',
    data: {
      'New Registrations': { value: '2,847', change: '+12.5%', trend: 'up' },
      'Active Users (30d)': { value: '18,432', change: '+8.2%', trend: 'up' },
      'Churn Rate': { value: '4.2%', change: '-1.1%', trend: 'down' },
      'Avg. Session': { value: '24m 18s', change: '+2.3%', trend: 'up' },
    },
  },
  {
    id: 'course',
    title: 'Course Reports',
    icon: 'book',
    desc: 'Popular courses, ratings, and completion metrics',
    color: '#8B5CF6',
    data: {
      'Most Popular': { value: 'Full Stack Web Dev', change: '2,450 enrollments', trend: 'up' },
      'Highest Rated': { value: 'React Mastery', change: '4.9 ★', trend: 'up' },
      'Completion Rate': { value: '76%', change: '+3.2%', trend: 'up' },
      'Avg. Course Rating': { value: '4.6 ★', change: '+0.2', trend: 'up' },
    },
  },
  {
    id: 'financial',
    title: 'Financial Reports',
    icon: 'dollar',
    desc: 'Revenue, payouts, and transaction summaries',
    color: '#22C55E',
    data: {
      'Monthly Revenue': { value: '₹18,42,500', change: '+8.1%', trend: 'up' },
      'Total Payouts': { value: '₹1,46,500', change: '+15.3%', trend: 'up' },
      'Refunds (30d)': { value: '₹42,300', change: '-3.2%', trend: 'down' },
      'Avg. Transaction': { value: '₹4,820', change: '+5.7%', trend: 'up' },
    },
  },
  {
    id: 'system',
    title: 'System Logs',
    icon: 'clipboard',
    desc: 'Recent platform activities and audit trail',
    color: '#F59E0B',
    logs: [
      { timestamp: '18 Jun 2026, 14:32', user: 'Admin', action: 'Updated platform settings' },
      { timestamp: '18 Jun 2026, 12:15', user: 'Admin', action: 'Approved course: Advanced React Patterns' },
      { timestamp: '18 Jun 2026, 10:00', user: 'System', action: 'Weekly backup completed' },
      { timestamp: '17 Jun 2026, 22:45', user: 'Priya Patel', action: 'Uploaded new course content' },
      { timestamp: '17 Jun 2026, 18:30', user: 'Admin', action: 'Processed mentor payouts' },
      { timestamp: '17 Jun 2026, 15:20', user: 'System', action: 'Database optimization run' },
      { timestamp: '16 Jun 2026, 11:10', user: 'Vikram Joshi', action: 'Submitted course for review' },
      { timestamp: '16 Jun 2026, 09:00', user: 'System', action: 'CDN cache refreshed' },
      { timestamp: '15 Jun 2026, 16:45', user: 'Admin', action: 'Created new batch: Full Stack - Batch 8' },
      { timestamp: '15 Jun 2026, 14:00', user: 'Admin', action: 'Updated user roles' },
    ],
  },
]

export default function Reports() {
  const [expanded, setExpanded] = useState(null)

  const toggleExpanded = (id) => setExpanded(expanded === id ? null : id)

  const trendIcon = (trend) => {
    if (trend === 'up') {
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
    }
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
  }

  const sectionBg = {
    user: '#3B82F610',
    course: '#8B5CF610',
    financial: '#22C55E10',
    system: '#F59E0B10',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Reports
        </h2>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-xl text-sm font-semibold transition-all" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            Download CSV
          </button>
          <button className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: 'var(--color-accent)' }}>
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {reportTypes.map((report) => (
          <div key={report.id} className="glass-card overflow-hidden">
            <button
              onClick={() => toggleExpanded(report.id)}
              className="w-full p-5 lg:p-6 flex items-start justify-between text-left"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${report.color}20` }}
                >
                  {report.id === 'user' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={report.color} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                  {report.id === 'course' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={report.color} strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>}
                  {report.id === 'financial' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={report.color} strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
                  {report.id === 'system' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={report.color} strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>}
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                    {report.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{report.desc}</p>
                </div>
              </div>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"
                className={`transition-transform duration-200 shrink-0 mt-2 ${expanded === report.id ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {expanded === report.id && (
              <div
                className="px-5 lg:px-6 pb-5 lg:pb-6"
                style={{ background: sectionBg[report.id] }}
              >
                {report.logs ? (
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    {report.logs.map((log, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 py-2.5 px-3 rounded-lg text-sm"
                        style={{ borderBottom: i < report.logs.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ background: report.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p style={{ color: 'var(--color-text-primary)' }}>{log.action}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{log.user}</span>
                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{log.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(report.data).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-4 rounded-xl"
                        style={{ background: 'var(--color-bg-card)' }}
                      >
                        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                          {key}
                        </p>
                        <p className="text-lg font-bold mt-1.5" style={{ color: 'var(--color-text-primary)' }}>
                          {val.value}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5">
                          {trendIcon(val.trend)}
                          <span
                            className="text-xs font-medium"
                            style={{ color: val.trend === 'up' ? '#22C55E' : '#EF4444' }}
                          >
                            {val.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
