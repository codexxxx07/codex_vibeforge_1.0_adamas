import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../ThemeContext'
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

export default function AdminPortal() {
  const [page, setPage] = useState('dashboard')
  const { dark, toggle } = useTheme()
  const [authChecked, setAuthChecked] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlAuth = params.get('auth') === 'true'
    const urlRole = params.get('role')
    const localAuth = localStorage.getItem('isAuthenticated') === 'true'
    const localRole = localStorage.getItem('role')

    const isAuthed = urlAuth || localAuth
    const role = urlRole || localRole

    if (isAuthed && role === 'admin') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('role', 'admin')
      if (urlAuth) {
        navigate('/admin', { replace: true })
      }
      setAuthChecked(true)
    } else {
      navigate('/')
    }
  }, [location, navigate])

  if (!authChecked) return null

  const PageComponent = pages[page] || Dashboard

  return (
    <DashboardLayout page={page} setPage={setPage} dark={dark} toggleTheme={toggle}>
      <PageComponent />
    </DashboardLayout>
  )
}