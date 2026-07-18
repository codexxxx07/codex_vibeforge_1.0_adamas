import { useState } from 'react'

const pageTitles = {
  dashboard: 'Dashboard',
  users: 'User Management',
  batches: 'Batch Management',
  payments: 'Payments',
  content: 'Content Control',
  analytics: 'Analytics',
  courses: 'Course Management',
  reports: 'Reports',
  settings: 'Settings',
}

export default function Header({ page, dark, toggleTheme, setMobileOpen }) {
  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, text: 'New user registration: Rahul Sharma', time: '2 min ago', unread: true },
    { id: 2, text: 'Payment of ₹4,999 received from Amit Patel', time: '15 min ago', unread: true },
    { id: 3, text: 'Course "React Mastery" pending approval', time: '1 hour ago', unread: false },
    { id: 4, text: 'Batch B2024-03 completed', time: '3 hours ago', unread: false },
  ]

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-8 border-b sticky top-0 z-30"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg hover:opacity-70"
          style={{ color: 'var(--color-text-muted)' }}
          onClick={() => setMobileOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <h1 className="text-lg lg:text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {pageTitles[page] || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'var(--color-accent-light)', color: 'var(--color-text-muted)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none w-40 lg:w-56"
            style={{ color: 'var(--color-text-primary)' }}
          />
        </div>

        <button
          className="hidden md:flex p-2 rounded-xl transition-all duration-200"
          style={{ color: 'var(--color-text-muted)' }}
          onClick={toggleTheme}
        >
          {dark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>

        <div className="relative">
          <button
            className="relative p-2 rounded-xl transition-all duration-200"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white font-bold" style={{ background: '#EF4444' }}>3</span>
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-xl border z-50 overflow-hidden"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Notifications</span>
                  <button className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-5 py-3 border-b text-sm transition-colors cursor-pointer"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: n.unread ? 'var(--color-accent-light)' : 'transparent',
                      }}
                    >
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ background: 'var(--color-accent)' }}
          >
            A
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium leading-tight" style={{ color: 'var(--color-text-primary)' }}>Admin</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
