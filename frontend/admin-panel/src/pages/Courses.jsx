import { useState } from 'react'

const initialCourses = [
  { id: 1, title: 'Full Stack Web Development', category: 'Web Development', mentor: 'Vikram Joshi', price: '₹4,999', enrollments: 2450, rating: 4.8, status: 'Published', thumbnail: null },
  { id: 2, title: 'Data Science Pro', category: 'Data Science', mentor: 'Deepika Mehta', price: '₹9,999', enrollments: 1890, rating: 4.7, status: 'Published', thumbnail: null },
  { id: 3, title: 'React Mastery', category: 'Web Development', mentor: 'Priya Patel', price: '₹3,499', enrollments: 1670, rating: 4.9, status: 'Published', thumbnail: null },
  { id: 4, title: 'Python Fundamentals', category: 'Programming', mentor: 'Kavita Nair', price: '₹2,499', enrollments: 1450, rating: 4.5, status: 'Published', thumbnail: null },
  { id: 5, title: 'AI & Machine Learning', category: 'AI & ML', mentor: 'Rohit Verma', price: '₹8,999', enrollments: 1230, rating: 4.6, status: 'Published', thumbnail: null },
  { id: 6, title: 'UI/UX Design Masterclass', category: 'Design', mentor: 'Sneha Reddy', price: '₹3,999', enrollments: 890, rating: 4.4, status: 'Draft', thumbnail: null },
  { id: 7, title: 'DevOps Essentials', category: 'DevOps', mentor: 'Arun Kumar', price: '₹5,999', enrollments: 670, rating: 4.3, status: 'Draft', thumbnail: null },
  { id: 8, title: 'AWS Cloud Practitioner', category: 'Cloud Computing', mentor: 'Suresh Iyer', price: '₹6,999', enrollments: 1100, rating: 4.5, status: 'Archived', thumbnail: null },
]

const categories = ['All', 'Web Development', 'Data Science', 'Programming', 'AI & ML', 'Design', 'DevOps', 'Cloud Computing']
const statuses = ['All', 'Published', 'Draft', 'Archived']

const statusColors = {
  Published: '#22C55E',
  Draft: '#F59E0B',
  Archived: '#64748B',
}

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses)
  const [viewMode, setViewMode] = useState('grid')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const [selectedCourses, setSelectedCourses] = useState([])

  const filtered = courses.filter((c) => {
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false
    if (statusFilter !== 'All' && c.status !== statusFilter) return false
    if (priceRange === 'Under ₹3,000' && parseInt(c.price.replace(/[₹,]/g, '')) >= 3000) return false
    if (priceRange === '₹3,000-₹6,000') {
      const p = parseInt(c.price.replace(/[₹,]/g, ''))
      if (p < 3000 || p > 6000) return false
    }
    if (priceRange === 'Above ₹6,000' && parseInt(c.price.replace(/[₹,]/g, '')) <= 6000) return false
    return true
  })

  const toggleSelect = (id) => {
    setSelectedCourses((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id))
    setSelectedCourses(selectedCourses.filter((s) => s !== id))
  }

  const handleArchive = (id) => {
    setCourses(courses.map((c) => c.id === id ? { ...c, status: 'Archived' } : c))
  }

  const handleFeature = (id) => {
    setCourses(courses.map((c) => c.id === id ? { ...c, featured: !c.featured } : c))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Course Management
        </h2>
        <div className="flex items-center gap-3">
          {selectedCourses.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>{selectedCourses.length} selected</span>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#EF444420', color: '#EF4444' }}>Delete</button>
            </div>
          )}
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all inline-flex items-center gap-2"
            style={{ background: 'var(--color-accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Course
          </button>
          <div className="flex border rounded-xl overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
            <button
              onClick={() => setViewMode('grid')}
              className="p-2.5 transition-colors"
              style={{ background: viewMode === 'grid' ? 'var(--color-accent-light)' : 'transparent', color: viewMode === 'grid' ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2.5 transition-colors"
              style={{ background: viewMode === 'list' ? 'var(--color-accent-light)' : 'transparent', color: viewMode === 'list' ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border text-sm outline-none"
          style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border text-sm outline-none"
          style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
        >
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-2 rounded-xl border text-sm outline-none"
          style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
        >
          <option>All Prices</option>
          <option>Under ₹3,000</option>
          <option>₹3,000-₹6,000</option>
          <option>Above ₹6,000</option>
        </select>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course) => (
            <div key={course.id} className="glass-card overflow-hidden group">
              <div
                className="h-36 flex items-center justify-center relative"
                style={{ background: 'var(--color-accent-light)' }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <div className="absolute top-3 right-3">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => toggleSelect(course.id)}
                    className="rounded"
                  />
                </div>
                <span
                  className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${statusColors[course.status]}20`, color: statusColors[course.status] }}
                >
                  {course.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                  {course.title}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {course.category} • {course.mentor}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-base" style={{ color: 'var(--color-accent)' }}>{course.price}</span>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="inline-flex items-center gap-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      {course.enrollments}
                    </span>
                    <span className="inline-flex items-center gap-0.5" style={{ color: '#F4D35E' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <button className="flex-1 p-1.5 rounded-lg text-xs font-medium transition-colors" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>Edit</button>
                  <button onClick={() => handleFeature(course.id)} className="p-1.5 rounded-lg text-xs transition-colors" style={{ background: course.featured ? '#F4D35E30' : 'var(--color-accent-light)', color: course.featured ? '#F4D35E' : 'var(--color-text-muted)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={course.featured ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </button>
                  <button onClick={() => handleArchive(course.id)} className="p-1.5 rounded-lg text-xs transition-colors" style={{ background: 'var(--color-accent-light)', color: 'var(--color-text-muted)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="p-1.5 rounded-lg text-xs transition-colors" style={{ color: '#EF4444' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-secondary)' }}>
                  <th className="text-left py-3.5 pl-4 pr-2 w-10">
                    <input
                      type="checkbox"
                      checked={filtered.length > 0 && selectedCourses.length === filtered.length}
                      onChange={() => {
                        if (selectedCourses.length === filtered.length) setSelectedCourses([])
                        else setSelectedCourses(filtered.map((c) => c.id))
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-3.5 px-4 font-medium">Course</th>
                  <th className="text-left py-3.5 px-4 font-medium">Category</th>
                  <th className="text-left py-3.5 px-4 font-medium">Mentor</th>
                  <th className="text-right py-3.5 px-4 font-medium">Price</th>
                  <th className="text-right py-3.5 px-4 font-medium">Enrollments</th>
                  <th className="text-right py-3.5 px-4 font-medium">Rating</th>
                  <th className="text-left py-3.5 px-4 font-medium">Status</th>
                  <th className="text-right py-3.5 pl-4 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course) => (
                  <tr key={course.id} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-3.5 pl-4 pr-2">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleSelect(course.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--color-accent-light)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        </div>
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{course.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4" style={{ color: 'var(--color-text-muted)' }}>{course.category}</td>
                    <td className="py-3.5 px-4" style={{ color: 'var(--color-text-muted)' }}>{course.mentor}</td>
                    <td className="py-3.5 px-4 text-right font-semibold" style={{ color: 'var(--color-accent)' }}>{course.price}</td>
                    <td className="py-3.5 px-4 text-right" style={{ color: 'var(--color-text-muted)' }}>{course.enrollments.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: '#F4D35E' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        {course.rating}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: `${statusColors[course.status]}20`, color: statusColors[course.status] }}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => handleArchive(course.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                        </button>
                        <button onClick={() => handleDelete(course.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: '#EF4444' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
