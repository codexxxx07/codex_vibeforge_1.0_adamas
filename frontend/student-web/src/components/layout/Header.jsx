import { useTheme } from '../../ThemeContext'

const pageTitles = {
  'dashboard': 'Dashboard',
  'onboarding': 'Onboarding',
  'skill-assessment': 'Skill Assessment',
  'live-class': 'Live Class',
  'recordings': 'Recordings',
  'practice-lab': 'Practice Lab',
  'doubts': 'Doubts',
  'progress': 'Progress',
  'assignments': 'Assignments',
  'certificates': 'Certificates',
  'pyq': 'PYQ Engine',
  'scheduler': 'Scheduler',
  'skill-stack': 'Skill Stack',
  'github-tracker': 'GitHub Tracker',
  'ai-tutor': 'AI Tutor',
  'plagiarism': 'Plagiarism Check',
  'payment': 'Payment',
  'settings': 'Settings',
}

export default function Header({ page, collapsed, setCollapsed, setMobileOpen }) {
  const { dark, toggle } = useTheme()

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 h-16 border-b"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-2 rounded-lg"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <h1 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {pageTitles[page] || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-border)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search courses, topics..."
            className="bg-transparent text-sm outline-none w-40 lg:w-56"
            style={{ color: 'var(--color-text-primary)' }}
          />
        </div>

        <button
          onClick={toggle}
          className="hidden md:flex p-2 rounded-lg"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {dark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>

        <button className="relative p-2 rounded-lg" style={{ color: 'var(--color-text-muted)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">3</span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: 'var(--color-border)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--color-accent)' }}>
            A
          </div>
          <span className="hidden lg:block text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Alex</span>
        </div>
      </div>
    </header>
  )
}
