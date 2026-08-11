import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ page, setPage, dark, toggleTheme, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        page={page}
        setPage={setPage}
        dark={dark}
        toggleTheme={toggleTheme}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          page={page}
          dark={dark}
          toggleTheme={toggleTheme}
          setMobileOpen={setMobileOpen}
        />
        <main
          className="flex-1 overflow-y-auto p-4 lg:p-8"
          style={{ background: 'var(--color-bg-primary)' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
