import { useState } from 'react'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay()

const subjects = [
  { name: 'VLSI Design', color: '#1D7874', days: [1, 3, 5] },
  { name: 'Data Structures', color: '#F4D35E', days: [2, 4, 6] },
  { name: 'Embedded Systems', color: '#EE964B', days: [1, 4] },
  { name: 'Digital Electronics', color: '#7C3AED', days: [2, 5] },
]

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Scheduler() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [view, setView] = useState('monthly')
  const [schedule, setSchedule] = useState(subjects)
  const [showAdd, setShowAdd] = useState(false)
  const [newSubject, setNewSubject] = useState({ name: '', color: '#1D7874', days: [] })

  const totalDays = daysInMonth(month, year)
  const firstDay = firstDayOfMonth(month, year)
  const today = now.getDate()

  const days = Array.from({ length: totalDays }, (_, i) => i + 1)

  const getSubjectsForDay = (day) => {
    const date = new Date(year, month, day)
    const dow = date.getDay()
    return schedule.filter(s => s.days.includes(dow))
  }

  const addSubject = () => {
    if (!newSubject.name || newSubject.days.length === 0) return
    setSchedule(prev => [...prev, { ...newSubject }])
    setNewSubject({ name: '', color: '#1D7874', days: [] })
    setShowAdd(false)
  }

  const toggleDay = (day) => {
    setNewSubject(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }))
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Scheduler</h2>
        <div className="flex gap-1 glass-card p-1">
          <button onClick={() => setView('monthly')}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: view === 'monthly' ? 'var(--color-accent)' : 'transparent', color: view === 'monthly' ? '#fff' : 'var(--color-text-muted)' }}
          >Monthly</button>
          <button onClick={() => setView('weekly')}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: view === 'weekly' ? 'var(--color-accent)' : 'transparent', color: view === 'weekly' ? '#fff' : 'var(--color-text-muted)' }}
          >Weekly</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }}
          className="p-2 rounded-lg" style={{ color: 'var(--color-text-muted)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{months[month]} {year}</h3>
        <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }}
          className="p-2 rounded-lg" style={{ color: 'var(--color-text-muted)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {view === 'monthly' ? (
        <>
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-7">
              {dayNames.map(d => (
                <div key={d} className="p-3 text-center text-xs font-semibold border-b" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                  {d}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="p-3" />
              ))}
              {days.map(day => {
                const subs = getSubjectsForDay(day)
                const isToday = day === today && month === now.getMonth() && year === now.getFullYear()
                return (
                  <div key={day}
                    className="p-2 min-h-[80px] lg:min-h-[100px] border-b border-r transition-all"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: isToday ? 'var(--color-accent-light)' : 'transparent',
                    }}
                  >
                    <span className={`text-xs font-medium ${isToday ? 'text-white' : ''}`}
                      style={{
                        background: isToday ? 'var(--color-accent)' : 'transparent',
                        color: isToday ? '#fff' : 'var(--color-text-muted)',
                        display: 'inline-block',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '22px',
                      }}
                    >{day}</span>
                    <div className="mt-1 space-y-1">
                      {subs.map((s, i) => (
                        <div key={i} className="text-[10px] px-1.5 py-0.5 rounded font-medium truncate text-white" style={{ background: s.color }}>
                          {s.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="glass-card p-6">
          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((d, i) => (
              <div key={d}>
                <p className="text-xs font-semibold text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>{d}</p>
                <div className="space-y-2">
                  {schedule.filter(s => s.days.includes(i)).map((s, j) => (
                    <div key={j} className="p-2 rounded-lg text-xs font-medium text-white text-center" style={{ background: s.color }}>
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setShowAdd(!showAdd)}
          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ background: 'var(--color-accent)', color: '#fff' }}
        >
          {showAdd ? 'Cancel' : '+ Add Subject'}
        </button>
        {schedule.map((s, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: s.color }}>
            {s.name}
            <button onClick={() => setSchedule(prev => prev.filter((_, idx) => idx !== i))}
              className="text-white/70 hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="glass-card p-6 mt-4">
          <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Add New Subject Schedule</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Subject Name</label>
              <input value={newSubject.name} onChange={e => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                placeholder="e.g., Machine Learning"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Color</label>
              <input type="color" value={newSubject.color} onChange={e => setNewSubject(prev => ({ ...prev, color: e.target.value }))}
                className="w-full h-10 rounded-xl cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Days of Week</label>
              <div className="flex gap-1">
                {weekDays.map((d, i) => (
                  <button key={d} onClick={() => toggleDay(i)}
                    className="w-9 h-9 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: newSubject.days.includes(i) ? 'var(--color-accent)' : 'var(--color-accent-light)',
                      color: newSubject.days.includes(i) ? '#fff' : 'var(--color-text-muted)',
                    }}
                  >{d[0]}</button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={addSubject} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--color-accent)' }}>
            Add to Schedule
          </button>
        </div>
      )}
    </div>
  )
}
