import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import { AppProvider, useApp } from './AppContext'
import ToastContainer from './components/Toast'

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

function MentorPortalInner() {
  const { currentPage, navigate } = useApp()
  const [authChecked, setAuthChecked] = useState(false)
  const location = useLocation()
  const routerNavigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlAuth = params.get('auth') === 'true'
    const urlRole = params.get('role')
    const localAuth = localStorage.getItem('isAuthenticated') === 'true'
    const localRole = localStorage.getItem('role')
    const isAuthed = urlAuth || localAuth
    const role = urlRole || localRole
    if (isAuthed && role === 'mentor') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('role', 'mentor')
      if (urlAuth) {
        routerNavigate('/mentor', { replace: true })
      }
      setAuthChecked(true)
    } else {
      routerNavigate('/')
    }
  }, [location, routerNavigate])

  if (!authChecked) return null

  const PageComponent = pages[currentPage]?.component || Dashboard

  return (
    <>
      <DashboardLayout currentPage={currentPage} onNavigate={navigate} pageTitle={pages[currentPage]?.label}>
        <PageComponent />
      </DashboardLayout>
      <ToastContainer />
    </>
  )
}

export default function MentorPortal() {
  return (
    <AppProvider>
      <MentorPortalInner />
    </AppProvider>
  )
}