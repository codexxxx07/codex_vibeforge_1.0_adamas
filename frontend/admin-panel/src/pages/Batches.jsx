import { useState } from 'react'

const initialBatches = [
  { id: 1, name: 'Full Stack Web Dev - Batch 7', course: 'Full Stack Web Development', mentor: 'Vikram Joshi', students: 24, maxStudents: 30, startDate: '01 Jun 2026', endDate: '30 Nov 2026', status: 'Active', schedule: 'Mon/Wed/Fri 6-8 PM' },
  { id: 2, name: 'Data Science Pro - Batch 3', course: 'Data Science Pro', mentor: 'Deepika Mehta', students: 18, maxStudents: 25, startDate: '15 May 2026', endDate: '15 Aug 2026', status: 'Active', schedule: 'Tue/Thu/Sat 4-6 PM' },
  { id: 3, name: 'React Mastery - Batch 5', course: 'React Mastery', mentor: 'Priya Patel', students: 28, maxStudents: 28, startDate: '10 Apr 2026', endDate: '10 Jul 2026', status: 'Active', schedule: 'Mon/Wed/Fri 10-12 AM' },
  { id: 4, name: 'Python Fundamentals - Batch 12', course: 'Python Fundamentals', mentor: 'Kavita Nair', students: 15, maxStudents: 30, startDate: '01 Jul 2026', endDate: '30 Sep 2026', status: 'Upcoming', schedule: 'Tue/Thu 2-4 PM' },
  { id: 5, name: 'AI & ML - Batch 2', course: 'AI & Machine Learning', mentor: 'Rohit Verma', students: 22, maxStudents: 25, startDate: '20 Mar 2026', endDate: '20 Jun 2026', status: 'Completed', schedule: 'Mon/Wed/Fri 6-8 PM' },
  { id: 6, name: 'UI/UX Design - Batch 4', course: 'UI/UX Design Masterclass', mentor: 'Sneha Reddy', students: 12, maxStudents: 20, startDate: '01 Aug 2026', endDate: '30 Oct 2026', status: 'Upcoming', schedule: 'Sat/Sun 10-1 PM' },
  { id: 7, name: 'DevOps Essentials - Batch 1', course: 'DevOps Essentials', mentor: 'Arun Kumar', students: 20, maxStudents: 25, startDate: '05 May 2026', endDate: '05 Aug 2026', status: 'On Hold', schedule: 'Wed/Fri 6-8 PM' },
  { id: 8, name: 'AWS Cloud - Batch 6', course: 'AWS Cloud Practitioner', mentor: 'Suresh Iyer', students: 30, maxStudents: 30, startDate: '01 Jan 2026', endDate: '31 Mar 2026', status: 'Completed', schedule: 'Mon/Tue/Wed 7-9 PM' },
]

const statusColors = {
  Active: '#22C55E',
  Upcoming: '#3B82F6',
  Completed: '#64748B',
  'On Hold': '#F59E0B',
}

const studentRoster = [
  { name: 'Arjun Mehta', email: 'arjun.m@email.com', progress: 72 },
  { name: 'Bhavna Shah', email: 'bhavna.s@email.com', progress: 88 },
  { name: 'Chirag Desai', email: 'chirag.d@email.com', progress: 65 },
  { name: 'Divya Kaur', email: 'divya.k@email.com', progress: 91 },
  { name: 'Esha Agarwal', email: 'esha.a@email.com', progress: 58 },
]

export default function Batches() {
  const [batches, setBatches] = useState(initialBatches)
  const [expandedId, setExpandedId] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [form, setForm] = useState({
    name: '', course: '', mentor: '', startDate: '', endDate: '', maxStudents: 30,
  })

  const filtered = statusFilter === 'All' ? batches : batches.filter((b) => b.status === statusFilter)

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id)

  const handleCreate = () => {
    const newBatch = {
      id: batches.length + 1,
      name: form.name || 'New Batch',
      course: form.course || 'General Course',
      mentor: form.mentor || 'Unassigned',
      students: 0,
      maxStudents: form.maxStudents || 30,
      startDate: form.startDate || 'TBD',
      endDate: form.endDate || 'TBD',
      status: 'Upcoming',
      schedule: 'TBD',
    }
    setBatches([newBatch, ...batches])
    setShowCreate(false)
    setForm({ name: '', course: '', mentor: '', startDate: '', endDate: '', maxStudents: 30 })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Batch Management
        </h2>
        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 inline-flex items-center gap-2"
          style={{ background: 'var(--color-accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Batch
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'Active', 'Upcoming', 'Completed', 'On Hold'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: statusFilter === s ? 'var(--color-accent)' : 'var(--color-accent-light)',
              color: statusFilter === s ? '#FFFFFF' : 'var(--color-accent)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((batch) => (
          <div key={batch.id} className="glass-card overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
                    {batch.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {batch.course}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                  style={{ background: `${statusColors[batch.status]}20`, color: statusColors[batch.status] }}
                >
                  {batch.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Mentor</span>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{batch.mentor}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Students</span>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {batch.students}/{batch.maxStudents}
                  </p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Start</span>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{batch.startDate}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>End</span>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{batch.endDate}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--color-border)' }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${(batch.students / batch.maxStudents) * 100}%`, background: 'var(--color-accent)' }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  {Math.round((batch.students / batch.maxStudents) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {batch.schedule}
                </span>
                <button
                  onClick={() => toggleExpand(batch.id)}
                  className="text-xs font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {expandedId === batch.id ? 'Less Info' : 'More Info'}
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`transition-transform ${expandedId === batch.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
            </div>

            {expandedId === batch.id && (
              <div className="border-t px-5 py-4 space-y-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-secondary)' }}>
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Student Roster ({studentRoster.length})
                  </h4>
                  <div className="space-y-2">
                    {studentRoster.map((s) => (
                      <div key={s.email} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-[10px]"
                            style={{ background: 'var(--color-accent)' }}
                          >
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.name}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full" style={{ background: 'var(--color-border)' }}>
                            <div className="h-1.5 rounded-full" style={{ width: `${s.progress}%`, background: 'var(--color-accent)' }} />
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{s.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Mentor Contact</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{batch.mentor}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{batch.mentor.toLowerCase().replace(' ', '.')}@shipwise.com</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Schedule</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{batch.schedule}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCreate && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCreate(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-lg rounded-2xl p-6 lg:p-8 shadow-xl"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Create New Batch</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Batch Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    placeholder="e.g. Full Stack Web Dev - Batch 8"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Course</label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    >
                      <option>Full Stack Web Development</option>
                      <option>Data Science Pro</option>
                      <option>React Mastery</option>
                      <option>Python Fundamentals</option>
                      <option>AI & Machine Learning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Mentor</label>
                    <select
                      value={form.mentor}
                      onChange={(e) => setForm({ ...form, mentor: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    >
                      <option>Vikram Joshi</option>
                      <option>Deepika Mehta</option>
                      <option>Priya Patel</option>
                      <option>Kavita Nair</option>
                      <option>Rohit Verma</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Start Date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>End Date</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Max Students</label>
                  <input
                    type="number"
                    value={form.maxStudents}
                    onChange={(e) => setForm({ ...form, maxStudents: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    min="1"
                    max="100"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium"
                  style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'var(--color-accent)' }}
                >
                  Create Batch
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
