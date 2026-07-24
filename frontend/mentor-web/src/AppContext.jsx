/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useRef } from 'react'

const AppContext = createContext()

export function useApp() {
  return useContext(AppContext)
}

const initialSubmissions = [
  { id: 1, student: 'Sarah Johnson', course: 'React Fundamentals', assignment: 'React Hooks – useRef', date: '2026-06-17', status: 'pending', score: null },
  { id: 2, student: 'Mike Chen', course: 'JavaScript Advanced', assignment: 'Closures & Scope', date: '2026-06-17', status: 'pending', score: null },
  { id: 3, student: 'Emma Wilson', course: 'Data Structures', assignment: 'Binary Trees', date: '2026-06-16', status: 'graded', score: 92 },
  { id: 4, student: 'Alex Rivera', course: 'Python Basics', assignment: 'Functions & Modules', date: '2026-06-16', status: 'pending', score: null },
  { id: 5, student: 'Lisa Park', course: 'Web Development', assignment: 'CSS Grid Layout', date: '2026-06-15', status: 'graded', score: 88 },
  { id: 6, student: 'James Bond', course: 'React Fundamentals', assignment: 'State Management', date: '2026-06-15', status: 'pending', score: null },
  { id: 7, student: 'Olivia Brown', course: 'Machine Learning', assignment: 'Linear Regression', date: '2026-06-14', status: 'graded', score: 95 },
  { id: 8, student: 'Noah Garcia', course: 'Data Structures', assignment: 'Hash Tables', date: '2026-06-14', status: 'pending', score: null },
]

const initialResources = [
  { id: 1, name: 'React_Hooks_Guide.pdf', type: 'pdf', size: '2.4 MB', date: '2026-06-15', downloads: 47, shared: true, folder: 'React Fundamentals/Module 2: Hooks/References' },
  { id: 2, name: 'useRef_Demo.mp4', type: 'video', size: '45 MB', date: '2026-06-14', downloads: 32, shared: true, folder: 'React Fundamentals/Module 2: Hooks' },
  { id: 3, name: 'Array_Algorithms.docx', type: 'doc', size: '1.1 MB', date: '2026-06-13', downloads: 28, shared: false, folder: 'Data Structures/Module 1: Arrays/Lecture Notes' },
  { id: 4, name: 'Binary_Tree_Code.zip', type: 'code', size: '3.8 MB', date: '2026-06-12', downloads: 19, shared: true, folder: 'Data Structures/Module 2: Trees/Practice Problems' },
  { id: 5, name: 'CSS_Grid_Cheatsheet.pdf', type: 'pdf', size: '890 KB', date: '2026-06-11', downloads: 56, shared: true, folder: 'Web Development/Module 1: HTML-CSS/Templates' },
  { id: 6, name: 'HTML_Template.zip', type: 'code', size: '2.1 MB', date: '2026-06-10', downloads: 41, shared: false, folder: 'Web Development/Module 1: HTML-CSS/Templates' },
  { id: 7, name: 'State_Mgmt_Slides.pptx', type: 'doc', size: '5.2 MB', date: '2026-06-09', downloads: 23, shared: true, folder: 'React Fundamentals/Module 1: Intro/Slides' },
  { id: 8, name: 'Intro_Code_Samples.js', type: 'code', size: '156 KB', date: '2026-06-08', downloads: 35, shared: true, folder: 'React Fundamentals/Module 1: Intro/Code Examples' },
]

const initialSchedule = [
  { id: 1, course: 'Advanced Mathematics', time: '09:00', duration: 60, day: 0, students: 24, type: 'Lecture', color: '#1D7874' },
  { id: 2, course: 'Data Structures', time: '11:00', duration: 90, day: 0, students: 18, type: 'Lab', color: '#EE964B' },
  { id: 3, course: 'Web Development', time: '14:00', duration: 60, day: 1, students: 22, type: 'Workshop', color: '#F4D35E' },
  { id: 4, course: 'Machine Learning', time: '16:00', duration: 60, day: 2, students: 15, type: 'Mentoring', color: '#1D7874' },
  { id: 5, course: 'React Fundamentals', time: '10:00', duration: 90, day: 3, students: 28, type: 'Lecture', color: '#EE964B' },
  { id: 6, course: 'Python Basics', time: '13:00', duration: 60, day: 4, students: 20, type: 'Lab', color: '#F4D35E' },
  { id: 7, course: 'JavaScript Advanced', time: '15:00', duration: 60, day: 5, students: 16, type: 'Workshop', color: '#1D7874' },
]

const initialCourses = [
  { id: 1, title: 'React Fundamentals', description: 'Learn the basics of React', category: 'web', level: 'beginner', status: 'published', modules: 5, students: 156 },
  { id: 2, title: 'JavaScript Advanced', description: 'Master advanced JS concepts', category: 'web', level: 'advanced', status: 'published', modules: 8, students: 89 },
  { id: 3, title: 'Data Structures', description: 'Essential data structures and algorithms', category: 'data', level: 'intermediate', status: 'published', modules: 6, students: 124 },
  { id: 4, title: 'Python Basics', description: 'Introduction to Python programming', category: 'data', level: 'beginner', status: 'published', modules: 4, students: 203 },
  { id: 5, title: 'Web Development', description: 'Full-stack web development', category: 'web', level: 'intermediate', status: 'published', modules: 10, students: 178 },
]

const initialNotifications = [
  { id: 1, text: 'Sarah submitted assignment "React Hooks – useRef"', time: '12 min ago', read: false },
  { id: 2, text: 'Mike Chen joined your live class', time: '28 min ago', read: false },
  { id: 3, text: 'New grading request from Emma Wilson', time: '1 hour ago', read: false },
]

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [resources, setResources] = useState(initialResources)
  const [schedule, setSchedule] = useState(initialSchedule)
  const [courses, setCourses] = useState(initialCourses)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  const navigate = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const submitGrade = useCallback((submissionId, score, feedback) => {
    const numScore = parseInt(score, 10)
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      addToast('Grade must be between 0 and 100', 'error')
      return false
    }
    setSubmissions(prev => prev.map(s =>
      s.id === submissionId ? { ...s, status: 'graded', score: numScore, feedback } : s
    ))
    addToast('Grade submitted successfully!')
    return true
  }, [addToast])

  const quickGrade = useCallback((submissionId, score) => {
    const numScore = parseInt(score, 10)
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      addToast('Grade must be between 0 and 100', 'error')
      return false
    }
    setSubmissions(prev => prev.map(s =>
      s.id === submissionId ? { ...s, status: 'graded', score: numScore } : s
    ))
    addToast('Quick grade saved!')
    return true
  }, [addToast])

  const addResource = useCallback((file) => {
    const ext = file.name.split('.').pop().toLowerCase()
    let type = 'doc'
    if (['pdf'].includes(ext)) type = 'pdf'
    else if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) type = 'video'
    else if (['js', 'ts', 'py', 'java', 'cpp', 'zip', 'rar'].includes(ext)) type = 'code'

    const size = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(0)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`

    const newResource = {
      id: Date.now(),
      name: file.name,
      type,
      size,
      date: new Date().toISOString().split('T')[0],
      downloads: 0,
      shared: false,
      folder: 'React Fundamentals/Module 1: Intro',
    }
    setResources(prev => [newResource, ...prev])
    addToast(`"${file.name}" uploaded successfully!`)
    return newResource
  }, [addToast])

  const deleteResource = useCallback((id) => {
    setResources(prev => prev.filter(r => r.id !== id))
    addToast('File deleted')
  }, [addToast])

  const toggleResourceShare = useCallback((id) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, shared: !r.shared } : r))
  }, [])

  const addScheduleClass = useCallback((newClass) => {
    if (!newClass.course) {
      addToast('Course name is required', 'error')
      return false
    }
    const colors = ['#1D7874', '#EE964B', '#F4D35E', '#8b5cf6']
    setSchedule(prev => [...prev, {
      ...newClass,
      id: Date.now(),
      students: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    }])
    addToast('Class added to schedule!')
    return true
  }, [addToast])

  const updateScheduleClass = useCallback((id, updates) => {
    setSchedule(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }, [])

  const deleteScheduleClass = useCallback((id) => {
    setSchedule(prev => prev.filter(c => c.id !== id))
    addToast('Class removed from schedule')
  }, [addToast])

  const addCourse = useCallback((course) => {
    if (!course.title) {
      addToast('Course title is required', 'error')
      return false
    }
    setCourses(prev => [...prev, { ...course, id: Date.now(), status: 'draft', modules: 0, students: 0 }])
    addToast('Course saved as draft!')
    return true
  }, [addToast])

  const publishCourse = useCallback((course) => {
    if (!course.title) {
      addToast('Course title is required', 'error')
      return false
    }
    if (course.modules.length === 0) {
      addToast('Add at least one module before publishing', 'error')
      return false
    }
    setCourses(prev => [...prev, {
      ...course,
      id: Date.now(),
      status: 'published',
      modules: course.modules.length,
      students: 0,
    }])
    addToast('Course published successfully!')
    return true
  }, [addToast])

  const value = {
    currentPage,
    navigate,
    toasts,
    addToast,
    dismissToast,
    submissions,
    submitGrade,
    quickGrade,
    resources,
    addResource,
    deleteResource,
    toggleResourceShare,
    schedule,
    addScheduleClass,
    updateScheduleClass,
    deleteScheduleClass,
    courses,
    addCourse,
    publishCourse,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
