import { useState } from 'react'
import { useTheme } from '../ThemeContext'

const allStudents = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', courses: ['React Fundamentals', 'Web Development'], progress: 85, lastActive: '2 hours ago', avatar: 'SJ', status: 'online', enrolled: 'Mar 2026', performance: 'Excellent' },
  { id: 2, name: 'Mike Chen', email: 'mike.chen@example.com', courses: ['JavaScript Advanced'], progress: 62, lastActive: '5 hours ago', avatar: 'MC', status: 'offline', enrolled: 'Jan 2026', performance: 'Good' },
  { id: 3, name: 'Emma Wilson', email: 'emma.w@example.com', courses: ['Data Structures', 'Algorithms'], progress: 91, lastActive: '1 hour ago', avatar: 'EW', status: 'online', enrolled: 'Feb 2026', performance: 'Excellent' },
  { id: 4, name: 'Alex Rivera', email: 'alex.r@example.com', courses: ['Python Basics'], progress: 45, lastActive: '1 day ago', avatar: 'AR', status: 'offline', enrolled: 'Apr 2026', performance: 'Needs Improvement' },
  { id: 5, name: 'Lisa Park', email: 'lisa.p@example.com', courses: ['Web Development', 'UI/UX Design'], progress: 78, lastActive: '3 hours ago', avatar: 'LP', status: 'online', enrolled: 'Mar 2026', performance: 'Good' },
  { id: 6, name: 'James Bond', email: 'james.b@example.com', courses: ['React Fundamentals'], progress: 33, lastActive: '2 days ago', avatar: 'JB', status: 'offline', enrolled: 'May 2026', performance: 'At Risk' },
  { id: 7, name: 'Olivia Brown', email: 'olivia.b@example.com', courses: ['Machine Learning', 'Data Science'], progress: 95, lastActive: '30 min ago', avatar: 'OB', status: 'online', enrolled: 'Jan 2026', performance: 'Excellent' },
  { id: 8, name: 'Noah Garcia', email: 'noah.g@example.com', courses: ['Data Structures'], progress: 55, lastActive: '6 hours ago', avatar: 'NG', status: 'online', enrolled: 'Apr 2026', performance: 'Needs Improvement' },
]

const ITEMS_PER_PAGE = 6

export default function Students() {
  const { dark } = useTheme()
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [page, setPage] = useState(1)
  const [filterCourse, setFilterCourse] = useState('All')

  const courses = ['All', ...new Set(allStudents.flatMap(s => s.courses))]

  const filtered = allStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
    const matchesCourse = filterCourse === 'All' || s.courses.includes(filterCourse)
    return matchesSearch && matchesCourse
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (selectedStudent) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              {selectedStudent.avatar}
            </div>
            <div>
              <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>{selectedStudent.name}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{selectedStudent.email}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium`} style={{ background: selectedStudent.status === 'online' ? 'var(--color-accent-light)' : '#64748B20', color: selectedStudent.status === 'online' ? 'var(--color-accent)' : '#64748B' }}>
              {selectedStudent.status}
            </span>
          </div>
          <button
            onClick={() => setSelectedStudent(null)}
            className="px-4 py-2 rounded-xl text-sm transition-all duration-200"
            style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Enrolled Since</p>
            <p className="text-lg font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{selectedStudent.enrolled}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Course Progress</p>
            <p className="text-lg font-semibold mt-1" style={{ color: 'var(--color-accent)' }}>{selectedStudent.progress}%</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Performance</p>
            <p className="text-lg font-semibold mt-1" style={{ color: selectedStudent.performance === 'Excellent' ? 'var(--color-accent)' : selectedStudent.performance === 'At Risk' ? '#EF4444' : '#EE964B' }}>
              {selectedStudent.performance}
            </p>
          </div>
        </div>

        <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Enrolled Courses</h4>
        <div className="space-y-2">
          {selectedStudent.courses.map((course, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
              <span style={{ color: 'var(--color-text-primary)' }}>{course}</span>
              <span className="text-xs" style={{ color: 'var(--color-accent)' }}>Active</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
              style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={filterCourse}
            onChange={(e) => { setFilterCourse(e.target.value); setPage(1) }}
            className="px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
          >
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>
            Message All
          </button>
          <button className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200" style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginated.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className="glass-card p-5 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                  {student.avatar}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2`} style={{ background: student.status === 'online' ? '#22C55E' : '#64748B', borderColor: 'var(--color-bg-card)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{student.name}</p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{student.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Progress</span>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{student.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${student.progress}%`, background: student.progress >= 70 ? 'var(--color-accent)' : student.progress >= 40 ? '#F4D35E' : '#EF4444' }} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1.5 flex-wrap">
                {student.courses.slice(0, 2).map((c, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{c}</span>
                ))}
                {student.courses.length > 2 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}>+{student.courses.length - 2}</span>
                )}
              </div>
              <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{student.lastActive}</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-2 rounded-xl text-sm transition-all duration-200 disabled:opacity-30"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200`}
              style={{
                background: page === i + 1 ? 'var(--color-accent)' : 'var(--color-bg-card)',
                color: page === i + 1 ? 'white' : 'var(--color-text-muted)',
                border: page === i + 1 ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-2 rounded-xl text-sm transition-all duration-200 disabled:opacity-30"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
