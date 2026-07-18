import { useState } from 'react'
import { useTheme } from '../ThemeContext'

function ModuleLesson({ lesson, index, onChange, onRemove }) {
  return (
    <div className="p-4 rounded-xl ml-6 mt-2" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Lesson Title</label>
          <input
            type="text"
            value={lesson.title}
            onChange={(e) => onChange(index, 'title', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            placeholder="e.g. Introduction to Variables"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Duration (min)</label>
          <input
            type="number"
            value={lesson.duration}
            onChange={(e) => onChange(index, 'duration', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            placeholder="30"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>Description</label>
        <textarea
          value={lesson.description}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
          style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
          placeholder="What will students learn in this lesson?"
          onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all duration-200"
          style={{ border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          Upload Video
        </div>
        <button
          onClick={() => onRemove(index)}
          className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{ color: '#EF4444' }}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

function ModuleBlock({ module, index, onChange, onRemove, onAddLesson }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <span className="flex-1 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{module.title || `Module ${index + 1}`}</span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{module.lessons.length} lessons</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          <input
            type="text"
            value={module.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            placeholder="Module title"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          />
          {module.lessons.map((lesson, li) => (
            <ModuleLesson
              key={li}
              lesson={lesson}
              index={li}
              onChange={(li, field, val) => {
                const updated = [...module.lessons]
                updated[li] = { ...updated[li], [field]: val }
                onChange('lessons', updated)
              }}
              onRemove={(li) => {
                const updated = module.lessons.filter((_, i) => i !== li)
                onChange('lessons', updated)
              }}
            />
          ))}
          <button
            onClick={onAddLesson}
            className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ml-6"
            style={{ color: 'var(--color-accent)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Lesson
          </button>
          {module.lessons.length === 0 && (
            <button
              onClick={() => onRemove()}
              className="text-xs px-3 py-1.5 rounded-lg ml-6"
              style={{ color: '#EF4444' }}
            >
              Remove Module
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function CourseBuilder() {
  const { dark } = useTheme()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [modules, setModules] = useState([])

  const addModule = () => {
    setModules([...modules, { title: '', lessons: [] }])
  }

  const updateModule = (mi, field, val) => {
    const updated = [...modules]
    updated[mi] = { ...updated[mi], [field]: val }
    setModules(updated)
  }

  const removeModule = (mi) => {
    setModules(modules.filter((_, i) => i !== mi))
  }

  const addLesson = (mi) => {
    const updated = [...modules]
    updated[mi] = { ...updated[mi], lessons: [...updated[mi].lessons, { title: '', duration: '', description: '' }] }
    setModules(updated)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Course Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                placeholder="e.g. Advanced React Development"
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                placeholder="Describe what students will learn..."
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                >
                  <option value="">Select category</option>
                  <option value="web">Web Development</option>
                  <option value="data">Data Science</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="ai">AI & Machine Learning</option>
                  <option value="design">UI/UX Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Level</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Thumbnail</label>
              <div
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
                style={{ borderColor: 'var(--color-border)' }}
                onClick={() => document.getElementById('thumb-input').click()}
              >
                <svg className="w-10 h-10 mx-auto mb-2" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Drop an image here or click to browse</p>
                <input id="thumb-input" type="file" accept="image/*" className="hidden" onChange={(e) => setThumbnail(e.target.files[0])} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Curriculum</h2>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{modules.length} modules</span>
          </div>
          <div className="space-y-3">
            {modules.map((mod, mi) => (
              <ModuleBlock
                key={mi}
                module={mod}
                index={mi}
                onChange={(field, val) => updateModule(mi, field, val)}
                onRemove={() => removeModule(mi)}
                onAddLesson={() => addLesson(mi)}
              />
            ))}
            <button
              onClick={addModule}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all duration-200"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Module
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>
            Publish Course
          </button>
          <button className="px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
            Save Draft
          </button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="glass-card p-6 sticky top-24">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Curriculum Outline</h3>
          {modules.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No modules yet.<br />Add your first module to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {modules.map((mod, mi) => (
                <div key={mi} className="p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{mod.title || `Module ${mi + 1}`}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{mod.lessons.length} lessons</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
