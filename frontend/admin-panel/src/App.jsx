import { useState, useEffect } from 'react'
import { useTheme } from './ThemeContext'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Batches from './pages/Batches'
import Payments from './pages/Payments'
import Content from './pages/Content'
import Analytics from './pages/Analytics'
import Courses from './pages/Courses'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

const pages = {
  dashboard: Dashboard,
  users: Users,
  batches: Batches,
  payments: Payments,
  content: Content,
  analytics: Analytics,
  courses: Courses,
  reports: Reports,
  settings: Settings,
}

function App() {
  const [page, setPage] = useState('dashboard')
  const { dark, toggle } = useTheme()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlAuth = params.get('auth') === 'true'
    const urlRole = params.get('role')
    const localAuth = localStorage.getItem('isAuthenticated') === 'true'
    const localRole = localStorage.getItem('role')

    console.log('[Admin] urlAuth:', urlAuth, 'urlRole:', urlRole)
    console.log('[Admin] localAuth:', localAuth, 'localRole:', localRole)

    const isAuthed = urlAuth || localAuth
    const role = urlRole || localRole

    if (isAuthed && role === 'admin') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('role', 'admin')
      if (urlAuth) {
        window.history.replaceState({}, '', window.location.pathname)
        console.log('[Admin] Auth passed via URL, persisted to localStorage, URL cleaned')
      }
      setAuthChecked(true)
    } else {
      console.log('[Admin] Auth FAILED, redirecting to landing')
      window.location.href = import.meta.env.VITE_LANDING_URL
    }
  }, [])

  if (!authChecked) return null

  const PageComponent = pages[page] || Dashboard

  return (
    <DashboardLayout page={page} setPage={setPage} dark={dark} toggleTheme={toggle}>
      <PageComponent />
    </DashboardLayout>
  )
}

export default App
