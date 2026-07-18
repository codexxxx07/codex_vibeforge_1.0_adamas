import { useState } from 'react'
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
  const PageComponent = pages[page] || Dashboard

  return (
    <DashboardLayout page={page} setPage={setPage}>
      <PageComponent />
    </DashboardLayout>
  )
}
