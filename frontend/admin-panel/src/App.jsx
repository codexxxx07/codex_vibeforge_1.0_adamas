import { useState } from 'react'
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
  const PageComponent = pages[page] || Dashboard

  return (
    <DashboardLayout page={page} setPage={setPage} dark={dark} toggleTheme={toggle}>
      <PageComponent />
    </DashboardLayout>
  )
}

export default App
