import { useState } from 'react'
import { useApp } from '../AppContext'

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const courses = ['All Courses', 'Advanced Mathematics', 'Data Structures', 'Web Development', 'Machine Learning', 'React Fundamentals', 'Python Basics', 'JavaScript Advanced']
const types = ['All Types', 'Lecture', 'Lab', 'Workshop', 'Mentoring']

const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default function Schedule() {
  const { schedule, addScheduleClass, updateScheduleClass, deleteScheduleClass, addToast } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [filterCourse, setFilterCourse] = useState('All Courses')
  const [filterType, setFilterType] = useState('All Types')
  const [newClass, setNewClass] = useState({ course: '', day: 0, time: '09:00', duration: 60, topic: '' })
  const [editingClass, setEditingClass] = useState(null)
  const [dragging, setDragging] = useState(null)

  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1

  const filtered = schedule.filter(c => {
    if (filterCourse !== 'All Courses' && c.course !== filterCourse) return false
    if (filterType !== 'All Types' && c.type !== filterType) return false
    return true
  })

  const addClass = () => {
    if (!newClass.course.trim()) {
      addToast('Please enter a course name', 'error')
      return
    }
    addScheduleClass({ ...newClass })
    setShowModal(false)
    setNewClass({ course: '', day: 0, time: '09:00', duration: 60, topic: '' })
  }

  const handleEdit = (cls) => {
    setEditingClass({ ...cls })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (!editingClass.course.trim()) {
      addToast('Course name is required', 'error')
      return
    }
    updateScheduleClass(editingClass.id, {
      course: editingClass.course,
      day: editingClass.day,
      time: editingClass.time,
      duration: editingClass.duration,
      topic: editingClass.topic,
      type: editingClass.type,
    })
    setShowEditModal(false)
    setEditingClass(null)
    addToast('Class updated successfully!')
  }

  const handleDelete = (cls) => {
    if (confirm(`Remove "${cls.course}" from schedule?`)) {
      deleteScheduleClass(cls.id)
    }
  }

  const getClassStyle = (cls) => {
    const [h, m] = cls.time.split(':').map(Number)
    const top = ((h - 8) * 60 + m) * 1.25
    const height = cls.duration * 1.25
    return { top: `${top}px`, height: `${height}px` }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
          >
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
          >
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
          style={{ background: 'var(--color-accent)', color: 'white' }}
        >
          Add Class
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-8 min-w-[800px]">
          <div className="p-3 border-r text-center" style={{ borderColor: 'var(--color-border)' }}>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Time</span>
          </div>
          {weekDays.map((day, i) => (
            <div
              key={day}
              className={`p-3 text-center border-r`}
              style={{
                borderColor: 'var(--color-border)',
                background: i === todayIndex ? 'var(--color-accent-light)' : 'transparent',
              }}
            >
              <p className="text-xs font-semibold" style={{ color: i === todayIndex ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                {day.slice(0, 3)}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{i === todayIndex ? 'Today' : ''}</p>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-8 min-w-[800px]" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="relative" style={{ minHeight: '750px' }}>
            {hours.map((h) => (
              <div
                key={h}
                className="h-[75px] flex items-start justify-end pr-3 pt-1 border-b"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{h}</span>
              </div>
            ))}
          </div>

          {weekDays.map((day, di) => (
            <div
              key={day}
              className="relative border-r"
              style={{ borderColor: 'var(--color-border)', background: di === todayIndex ? 'var(--color-accent-light)' : 'transparent' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                if (dragging) {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const y = e.clientY - rect.top
                  const hour = Math.floor(y / 75) + 8
                  const minute = Math.round((y % 75) / 75 * 60)
                  const time = `${String(hour).padStart(2, '0')}:${String(Math.round(minute / 15) * 15).padStart(2, '0')}`
                  updateScheduleClass(dragging.id, { day: di, time })
                  setDragging(null)
                  addToast(`Class moved to ${day} ${time}`)
                }
              }}
            >
              {hours.map((h) => (
                <div key={h} className="h-[75px] border-b" style={{ borderColor: 'var(--color-border)' }} />
              ))}
              {filtered.filter(c => c.day === di).map((cls) => {
                const pos = getClassStyle(cls)
                return (
                  <div
                    key={cls.id}
                    draggable
                    onDragStart={() => setDragging(cls)}
                    className="absolute left-1 right-1 rounded-lg px-2 py-1 cursor-grab active:cursor-grabbing overflow-hidden transition-all duration-200 hover:shadow-lg z-10 group"
                    style={{
                      ...pos,
                      background: cls.color + '20',
                      borderLeft: `3px solid ${cls.color}`,
                    }}
                  >
                    <p className="text-xs font-semibold truncate" style={{ color: cls.color }}>{cls.course}</p>
                    <p className="text-[10px] truncate" style={{ color: 'var(--color-text-muted)' }}>{cls.time} · {cls.duration}min</p>
                    <p className="text-[10px] truncate" style={{ color: 'var(--color-text-muted)' }}>{cls.students} students</p>
                    <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(cls) }}
                        className="w-5 h-5 rounded flex items-center justify-center text-white/80 hover:text-white"
                        style={{ background: 'rgba(0,0,0,0.3)' }}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(cls) }}
                        className="w-5 h-5 rounded flex items-center justify-center text-white/80 hover:text-red-300"
                        style={{ background: 'rgba(0,0,0,0.3)' }}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in"
              style={{ background: 'var(--color-bg-card)' }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Add Class</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Course *</label>
                  <input
                    type="text"
                    value={newClass.course}
                    onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    placeholder="Course name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Day</label>
                    <select
                      value={newClass.day}
                      onChange={(e) => setNewClass({ ...newClass, day: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    >
                      {weekDays.map((d, i) => <option key={i} value={i}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Time</label>
                    <input
                      type="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Duration (min)</label>
                    <input
                      type="number"
                      value={newClass.duration}
                      onChange={(e) => setNewClass({ ...newClass, duration: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Type</label>
                    <select
                      value={newClass.type || 'Lecture'}
                      onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    >
                      {types.filter(t => t !== 'All Types').map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Topic</label>
                  <input
                    type="text"
                    value={newClass.topic}
                    onChange={(e) => setNewClass({ ...newClass, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    placeholder="Class topic"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={addClass}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: 'var(--color-accent)', color: 'white' }}
                >
                  Add to Schedule
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm transition-all duration-200 hover:opacity-80"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {showEditModal && editingClass && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowEditModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in"
              style={{ background: 'var(--color-bg-card)' }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Edit Class</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Course *</label>
                  <input
                    type="text"
                    value={editingClass.course}
                    onChange={(e) => setEditingClass({ ...editingClass, course: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Day</label>
                    <select
                      value={editingClass.day}
                      onChange={(e) => setEditingClass({ ...editingClass, day: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    >
                      {weekDays.map((d, i) => <option key={i} value={i}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Time</label>
                    <input
                      type="time"
                      value={editingClass.time}
                      onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Duration (min)</label>
                    <input
                      type="number"
                      value={editingClass.duration}
                      onChange={(e) => setEditingClass({ ...editingClass, duration: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Type</label>
                    <select
                      value={editingClass.type}
                      onChange={(e) => setEditingClass({ ...editingClass, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    >
                      {types.filter(t => t !== 'All Types').map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Topic</label>
                  <input
                    type="text"
                    value={editingClass.topic || ''}
                    onChange={(e) => setEditingClass({ ...editingClass, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: 'var(--color-accent)', color: 'white' }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm transition-all duration-200 hover:opacity-80"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
