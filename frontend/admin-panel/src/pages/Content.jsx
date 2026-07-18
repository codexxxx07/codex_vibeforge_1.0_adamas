import { useState } from 'react'

const initialCategories = [
  { id: 1, name: 'Web Development', courses: 48, color: '#3B82F6' },
  { id: 2, name: 'Data Science', courses: 32, color: '#8B5CF6' },
  { id: 3, name: 'Mobile Development', courses: 24, color: '#EC4899' },
  { id: 4, name: 'DevOps', courses: 18, color: '#F59E0B' },
  { id: 5, name: 'AI & ML', courses: 27, color: '#22C55E' },
  { id: 6, name: 'UI/UX Design', courses: 15, color: '#EF4444' },
  { id: 7, name: 'Cloud Computing', courses: 21, color: '#06B6D4' },
  { id: 8, name: 'Cybersecurity', courses: 12, color: '#1D7874' },
]

const pendingCourses = [
  { id: 1, title: 'Advanced React Patterns', mentor: 'Priya Patel', submitted: '16 Jun 2026', status: 'Pending' },
  { id: 2, title: 'Machine Learning with TensorFlow', mentor: 'Vikram Joshi', submitted: '15 Jun 2026', status: 'Pending' },
  { id: 3, title: 'Kubernetes for Beginners', mentor: 'Arun Kumar', submitted: '14 Jun 2026', status: 'Pending' },
  { id: 4, title: 'Docker & Containerization', mentor: 'Suresh Iyer', submitted: '12 Jun 2026', status: 'Pending' },
]

const reportedContent = [
  { id: 1, title: 'Inappropriate comment in Python 101', reporter: 'Neha Gupta', reason: 'Spam', reported: '17 Jun 2026' },
  { id: 2, title: 'Plagiarized content in React course', reporter: 'Rahul Sharma', reason: 'Copyright', reported: '16 Jun 2026' },
  { id: 3, title: 'Offensive material in forum post', reporter: 'Sneha Reddy', reason: 'Harassment', reported: '15 Jun 2026' },
]

const resources = [
  { id: 1, name: 'Coding Guidelines Handbook', type: 'PDF', size: '2.4 MB', uploaded: '10 Jun 2026' },
  { id: 2, name: 'API Documentation Template', type: 'DOCX', size: '1.1 MB', uploaded: '08 Jun 2026' },
  { id: 3, name: 'Mentor Onboarding Kit', type: 'ZIP', size: '8.6 MB', uploaded: '05 Jun 2026' },
]

const initialTags = ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Docker', 'AWS', 'CSS', 'TypeScript', 'MongoDB', 'GraphQL', 'Kubernetes']

export default function Content() {
  const [categories, setCategories] = useState(initialCategories)
  const [tags, setTags] = useState(initialTags)
  const [newCategory, setNewCategory] = useState('')
  const [newTag, setNewTag] = useState('')
  const [editingCat, setEditingCat] = useState(null)
  const [editCatName, setEditCatName] = useState('')
  const [activeTab, setActiveTab] = useState('categories')

  const tabs = [
    { id: 'categories', label: 'Categories' },
    { id: 'approval', label: 'Course Approval' },
    { id: 'moderation', label: 'Moderation' },
    { id: 'resources', label: 'Resources' },
    { id: 'tags', label: 'Tags' },
  ]

  const addCategory = () => {
    if (!newCategory.trim()) return
    setCategories([...categories, {
      id: categories.length + 1,
      name: newCategory,
      courses: 0,
      color: `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`,
    }])
    setNewCategory('')
  }

  const deleteCategory = (id) => setCategories(categories.filter((c) => c.id !== id))

  const startEditCategory = (cat) => {
    setEditingCat(cat.id)
    setEditCatName(cat.name)
  }

  const saveEditCategory = () => {
    setCategories(categories.map((c) => c.id === editingCat ? { ...c, name: editCatName } : c))
    setEditingCat(null)
  }

  const addTag = () => {
    if (!newTag.trim() || tags.includes(newTag.trim())) return
    setTags([...tags, newTag.trim()])
    setNewTag('')
  }

  const deleteTag = (tag) => setTags(tags.filter((t) => t !== tag))

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
        Content Control Panel
      </h2>

      <div className="flex flex-wrap gap-1 p-1 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === tab.id ? 'var(--color-accent)' : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-muted)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'categories' && (
        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-5">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name..."
              className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            />
            <button
              onClick={addCategory}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0"
              style={{ background: 'var(--color-accent)' }}
            >
              Add Category
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl border transition-all"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    {editingCat === cat.id ? (
                      <input
                        type="text"
                        value={editCatName}
                        onChange={(e) => setEditCatName(e.target.value)}
                        className="text-sm font-medium bg-transparent border-b outline-none w-28"
                        style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-accent)' }}
                        onKeyDown={(e) => e.key === 'Enter' && saveEditCategory()}
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{cat.name}</span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{cat.courses} courses</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {editingCat === cat.id ? (
                    <>
                      <button onClick={saveEditCategory} className="text-xs font-semibold" style={{ color: '#22C55E' }}>Save</button>
                      <button onClick={() => setEditingCat(null)} className="text-xs font-semibold" style={{ color: '#EF4444' }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditCategory(cat)} className="text-xs font-medium px-2.5 py-1 rounded-lg transition-colors" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>Edit</button>
                      <button onClick={() => deleteCategory(cat.id)} className="text-xs font-medium px-2.5 py-1 rounded-lg transition-colors" style={{ background: '#EF444420', color: '#EF4444' }}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'approval' && (
        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Pending Course Approvals
          </h3>
          <div className="space-y-3">
            {pendingCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{course.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    by {course.mentor} • Submitted {course.submitted}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: '#22C55E' }}>Approve</button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: '#EF4444' }}>Reject</button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'moderation' && (
        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Reported Content
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  <th className="text-left py-3 pr-4 font-medium">Content</th>
                  <th className="text-left py-3 pr-4 font-medium">Reported By</th>
                  <th className="text-left py-3 pr-4 font-medium">Reason</th>
                  <th className="text-left py-3 pr-4 font-medium">Date</th>
                  <th className="text-right py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {reportedContent.map((item) => (
                  <tr key={item.id} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-3.5 pr-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.title}</td>
                    <td className="py-3.5 pr-4" style={{ color: 'var(--color-text-muted)' }}>{item.reporter}</td>
                    <td className="py-3.5 pr-4">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={{ background: '#EF444420', color: '#EF4444' }}>
                        {item.reason}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4" style={{ color: 'var(--color-text-muted)' }}>{item.reported}</td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#22C55E' }}>Keep</button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#EF4444' }}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
              Platform Resources
            </h3>
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all inline-flex items-center gap-2"
              style={{ background: 'var(--color-accent)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Resource
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl border flex items-center justify-between"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: 'var(--color-accent)' }}
                  >
                    {res.type}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{res.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{res.size} • {res.uploaded}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tags' && (
        <div className="glass-card p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-5">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag name..."
              className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
            />
            <button
              onClick={addTag}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0"
              style={{ background: 'var(--color-accent)' }}
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                {tag}
                <button onClick={() => deleteTag(tag)} className="hover:opacity-70">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
