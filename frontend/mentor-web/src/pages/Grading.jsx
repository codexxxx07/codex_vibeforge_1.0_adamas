import { useState } from 'react'
import { useTheme } from '../ThemeContext'

const submissions = [
  { id: 1, student: 'Sarah Johnson', course: 'React Fundamentals', assignment: 'React Hooks – useRef', date: '2026-06-17', status: 'pending', score: null },
  { id: 2, student: 'Mike Chen', course: 'JavaScript Advanced', assignment: 'Closures & Scope', date: '2026-06-17', status: 'pending', score: null },
  { id: 3, student: 'Emma Wilson', course: 'Data Structures', assignment: 'Binary Trees', date: '2026-06-16', status: 'graded', score: 92 },
  { id: 4, student: 'Alex Rivera', course: 'Python Basics', assignment: 'Functions & Modules', date: '2026-06-16', status: 'pending', score: null },
  { id: 5, student: 'Lisa Park', course: 'Web Development', assignment: 'CSS Grid Layout', date: '2026-06-15', status: 'graded', score: 88 },
  { id: 6, student: 'James Bond', course: 'React Fundamentals', assignment: 'State Management', date: '2026-06-15', status: 'pending', score: null },
  { id: 7, student: 'Olivia Brown', course: 'Machine Learning', assignment: 'Linear Regression', date: '2026-06-14', status: 'graded', score: 95 },
  { id: 8, student: 'Noah Garcia', course: 'Data Structures', assignment: 'Hash Tables', date: '2026-06-14', status: 'pending', score: null },
]

const gradeDistribution = [
  { range: '90-100', count: 12, color: '#1D7874' },
  { range: '80-89', count: 18, color: '#2DD4BF' },
  { range: '70-79', count: 14, color: '#F4D35E' },
  { range: '60-69', count: 8, color: '#EE964B' },
  { range: 'Below 60', count: 5, color: '#EF4444' },
]

const maxDistCount = Math.max(...gradeDistribution.map(g => g.count))

const courses = ['All Courses', 'React Fundamentals', 'JavaScript Advanced', 'Data Structures', 'Python Basics', 'Web Development', 'Machine Learning']
const statuses = ['All Status', 'Pending', 'Graded']

export default function Grading() {
  const { dark } = useTheme()
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [selectedSub, setSelectedSub] = useState(null)
  const [gradeInput, setGradeInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [quickMode, setQuickMode] = useState(false)

  const filtered = submissions.filter(s => {
    if (selectedCourse !== 'All Courses' && s.course !== selectedCourse) return false
    if (selectedStatus === 'Pending' && s.status !== 'pending') return false
    if (selectedStatus === 'Graded' && s.status !== 'graded') return false
    return true
  })

  const avgScore = Math.round(submissions.filter(s => s.score).reduce((a, s) => a + s.score, 0) / submissions.filter(s => s.score).length)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card p-5">
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{submissions.filter(s => s.status === 'pending').length}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Pending</p>
            </div>
            <div className="text-center p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{submissions.filter(s => s.status === 'graded').length}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Graded</p>
            </div>
            <div className="text-center p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{avgScore}%</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Avg Score</p>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Grade Distribution</h4>
            <div className="space-y-2">
              {gradeDistribution.map((g) => (
                <div key={g.range} className="flex items-center gap-3">
                  <span className="text-xs w-16 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{g.range}</span>
                  <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(g.count / maxDistCount) * 100}%`, background: g.color }} />
                  </div>
                  <span className="text-xs w-6 text-right" style={{ color: 'var(--color-text-muted)' }}>{g.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            >
              {courses.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            >
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button
              onClick={() => setQuickMode(!quickMode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${quickMode ? 'shadow-lg' : ''}`}
              style={{
                background: quickMode ? 'var(--color-accent)' : 'var(--color-bg-card)',
                color: quickMode ? 'white' : 'var(--color-text-muted)',
                border: quickMode ? 'none' : '1px solid var(--color-border)',
              }}
            >
              Quick Grade Mode
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Student</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Course</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Assignment</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Date</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Status</th>
                  {quickMode && <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Grade</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => { setSelectedSub(s); setGradeInput(s.score?.toString() || ''); setFeedback('') }}
                    className="cursor-pointer transition-all duration-150"
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      background: selectedSub?.id === s.id ? 'var(--color-accent-light)' : 'transparent',
                    }}
                  >
                    <td className="p-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.student}</td>
                    <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{s.course}</td>
                    <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{s.assignment}</td>
                    <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{s.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${s.status === 'graded' ? '' : ''}`}
                        style={{
                          background: s.status === 'graded' ? 'var(--color-accent-light)' : '#F4D35E20',
                          color: s.status === 'graded' ? 'var(--color-accent)' : '#EE964B',
                        }}
                      >
                        {s.status === 'graded' ? `Graded (${s.score})` : 'Pending'}
                      </span>
                    </td>
                    {quickMode && (
                      <td className="p-4">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 rounded-lg text-sm outline-none text-center"
                          style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                          placeholder="0"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="glass-card p-5 sticky top-24">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            {selectedSub ? `Grade: ${selectedSub.student}` : 'Select a Submission'}
          </h3>

          {selectedSub ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Assignment</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{selectedSub.assignment}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{selectedSub.course} · Submitted {selectedSub.date}</p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Student's Answer</label>
                <div
                  className="p-3 rounded-xl text-sm min-h-[100px]"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                >
                  [Student answer content would appear here. This is a placeholder for the submitted work that needs to be reviewed and graded.]
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Grade (0-100)</label>
                <input
                  type="number"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  min="0" max="100"
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  placeholder="Provide detailed feedback..."
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>

              <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>
                Submit Grade
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Click a submission to start grading</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
