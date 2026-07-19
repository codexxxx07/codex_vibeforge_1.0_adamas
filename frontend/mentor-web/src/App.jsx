import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import CourseBuilder from './pages/CourseBuilder'
import LiveClass from './pages/LiveClass'
import Grading from './pages/Grading'
import Analytics from './pages/Analytics'
import Students from './pages/Students'
import Schedule from './pages/Schedule'
import Resources from './pages/Resources'
import Settings from './pages/Settings'
import DashboardLayout from './components/layout/DashboardLayout'

const pages = {
  dashboard: { component: Dashboard, label: 'Dashboard' },
  'course-builder': { component: CourseBuilder, label: 'Course Builder' },
  'live-class': { component: LiveClass, label: 'Live Class' },
  grading: { component: Grading, label: 'Grading' },
  analytics: { component: Analytics, label: 'Analytics' },
  students: { component: Students, label: 'Students' },
  schedule: { component: Schedule, label: 'Schedule' },
  resources: { component: Resources, label: 'Resources' },
  settings: { component: Settings, label: 'Settings' },
}

function App() {
  const [page, setPage] = useState('dashboard')
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlAuth = params.get('auth') === 'true'
    const urlRole = params.get('role')
    const localAuth = localStorage.getItem('isAuthenticated') === 'true'
    const localRole = localStorage.getItem('role')

    console.log('[Mentor] urlAuth:', urlAuth, 'urlRole:', urlRole)
    console.log('[Mentor] localAuth:', localAuth, 'localRole:', localRole)

    const isAuthed = urlAuth || localAuth
    const role = urlRole || localRole

    if (isAuthed && role === 'mentor') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('role', 'mentor')
      if (urlAuth) {
        window.history.replaceState({}, '', window.location.pathname)
        console.log('[Mentor] Auth passed via URL, persisted to localStorage, URL cleaned')
      }
      setAuthChecked(true)
    } else {
      console.log('[Mentor] Auth FAILED, redirecting to landing')
      window.location.href = 'http://localhost:5173'
    }
  }, [])

  if (!authChecked) return null

  const PageComponent = pages[page]?.component || Dashboard

  return (
    <DashboardLayout currentPage={page} onNavigate={setPage} pageTitle={pages[page]?.label}>
      <PageComponent />
    </DashboardLayout>
  )
}

export default App
