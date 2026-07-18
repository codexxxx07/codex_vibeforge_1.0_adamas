import { useState } from 'react'
import { useTheme } from '../../ThemeContext'

export default function Header({ title, onMenuClick }) {
  const { dark, toggle } = useTheme()
  const [search, setSearch] = useState('')

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-8 border-b backdrop-blur-xl"
      style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h1>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--color-text-muted)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search students, courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="hidden md:flex p-2 rounded-xl transition-all duration-200"
          style={{ color: 'var(--color-text-muted)' }}
          title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {dark
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            }
          </svg>
        </button>

        <button className="relative p-2 rounded-xl transition-all duration-200" style={{ color: 'var(--color-text-muted)' }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ background: 'var(--color-accent)' }}
          >
            3
          </span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #1D7874, #EE964B)' }}
          >
            JD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-tight" style={{ color: 'var(--color-text-primary)' }}>Dr. James</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Mentor</p>
          </div>
        </div>
      </div>
    </header>
  )
}
