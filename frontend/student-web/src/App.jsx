import { useState, useEffect } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import SkillAssessment from './pages/SkillAssessment'
import LiveClass from './pages/LiveClass'
import Recordings from './pages/Recordings'
import PracticeLab from './pages/PracticeLab'
import DoubtSolving from './pages/DoubtSolving'
import Progress from './pages/Progress'
import Assignments from './pages/Assignments'
import Certificates from './pages/Certificates'
import Terminal from './pages/Terminal'
import PYQ from './pages/PYQ'
import Scheduler from './pages/Scheduler'
import SkillStack from './pages/SkillStack'
import GitHubTracker from './pages/GitHubTracker'
import AITutor from './pages/AITutor'
import Plagiarism from './pages/Plagiarism'
import Payment from './pages/Payment'
import Settings from './pages/Settings'

const pages = {
  'dashboard': Dashboard,
  'onboarding': Onboarding,
  'skill-assessment': SkillAssessment,
  'live-class': LiveClass,
  'recordings': Recordings,
  'practice-lab': PracticeLab,
  'doubts': DoubtSolving,
  'progress': Progress,
  'assignments': Assignments,
  'certificates': Certificates,
  'terminal': Terminal,
  'pyq': PYQ,
  'scheduler': Scheduler,
  'skill-stack': SkillStack,
  'github-tracker': GitHubTracker,
  'ai-tutor': AITutor,
  'plagiarism': Plagiarism,
  'payment': Payment,
  'settings': Settings,
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlAuth = params.get('auth') === 'true'
    const urlRole = params.get('role')
    const localAuth = localStorage.getItem('isAuthenticated') === 'true'
    const localRole = localStorage.getItem('role')

    console.log('[Student] urlAuth:', urlAuth, 'urlRole:', urlRole)
    console.log('[Student] localAuth:', localAuth, 'localRole:', localRole)

    const isAuthed = urlAuth || localAuth
    const role = urlRole || localRole

    if (isAuthed && role === 'student') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('role', 'student')
      if (urlAuth) {
        window.history.replaceState({}, '', window.location.pathname)
        console.log('[Student] Auth passed via URL, persisted to localStorage, URL cleaned')
      }
      setAuthChecked(true)
    } else {
      console.log('[Student] Auth FAILED, redirecting to landing')
      window.location.href = 'http://localhost:5173'
    }
  }, [])

  if (!authChecked) return null

  const PageComponent = pages[page] || Dashboard

  return (
    <DashboardLayout page={page} setPage={setPage}>
      <PageComponent />
    </DashboardLayout>
  )
}
