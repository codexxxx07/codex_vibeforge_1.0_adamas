import { useState } from 'react'

const allUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@email.com', role: 'Student', status: 'Active', joined: '18 Jun 2026', avatar: 'RS' },
  { id: 2, name: 'Priya Patel', email: 'priya.p@email.com', role: 'Mentor', status: 'Active', joined: '17 Jun 2026', avatar: 'PP' },
  { id: 3, name: 'Amit Singh', email: 'amit.singh@email.com', role: 'Student', status: 'Active', joined: '17 Jun 2026', avatar: 'AS' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha.r@email.com', role: 'Student', status: 'Inactive', joined: '16 Jun 2026', avatar: 'SR' },
  { id: 5, name: 'Vikram Joshi', email: 'vikram.j@email.com', role: 'Mentor', status: 'Active', joined: '16 Jun 2026', avatar: 'VJ' },
  { id: 6, name: 'Neha Gupta', email: 'neha.g@email.com', role: 'Admin', status: 'Active', joined: '15 Jun 2026', avatar: 'NG' },
  { id: 7, name: 'Arun Kumar', email: 'arun.k@email.com', role: 'Student', status: 'Banned', joined: '14 Jun 2026', avatar: 'AK' },
  { id: 8, name: 'Deepika Mehta', email: 'deepika.m@email.com', role: 'Mentor', status: 'Active', joined: '13 Jun 2026', avatar: 'DM' },
  { id: 9, name: 'Rohit Verma', email: 'rohit.v@email.com', role: 'Student', status: 'Active', joined: '12 Jun 2026', avatar: 'RV' },
  { id: 10, name: 'Kavita Nair', email: 'kavita.n@email.com', role: 'Mentor', status: 'Inactive', joined: '11 Jun 2026', avatar: 'KN' },
  { id: 11, name: 'Suresh Iyer', email: 'suresh.i@email.com', role: 'Student', status: 'Active', joined: '10 Jun 2026', avatar: 'SI' },
  { id: 12, name: 'Ananya Das', email: 'ananya.d@email.com', role: 'Admin', status: 'Active', joined: '09 Jun 2026', avatar: 'AD' },
]

const tabs = ['All', 'Students', 'Mentors', 'Admins']

const statusColors = {
  Active: '#22C55E',
  Inactive: '#F59E0B',
  Banned: '#EF4444',
}

export default function Users() {
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', role: 'Student', password: '' })
  const perPage = 5

  const filtered = allUsers.filter((u) => {
    if (activeTab !== 'All' && u.role !== activeTab) return false
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  const toggleSelect = (id) => {
    setSelectedUsers((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const toggleAll = () => {
    if (selectedUsers.length === paginated.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginated.map((u) => u.id))
    }
  }

  const handleAdd = () => {
    setShowAddModal(false)
    setForm({ name: '', email: '', role: 'Student', password: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          User Management
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 inline-flex items-center gap-2"
          style={{ background: 'var(--color-accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add User
        </button>
      </div>

      <div className="flex flex-wrap gap-1 p-1 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1) }}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === tab ? 'var(--color-accent)' : 'transparent',
              color: activeTab === tab ? '#FFFFFF' : 'var(--color-text-muted)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 lg:p-5 border-b flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border outline-none"
                style={{
                  background: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)',
                  borderColor: 'var(--color-border)',
                }}
              />
            </div>
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>{selectedUsers.length} selected</span>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#EF444420', color: '#EF4444' }}>Suspend</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#F59E0B20', color: '#F59E0B' }}>Activate</button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-secondary)' }}>
                <th className="text-left py-3.5 pl-4 pr-2 w-10">
                  <input
                    type="checkbox"
                    checked={paginated.length > 0 && selectedUsers.length === paginated.length}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="text-left py-3.5 px-4 font-medium">User</th>
                <th className="text-left py-3.5 px-4 font-medium">Email</th>
                <th className="text-left py-3.5 px-4 font-medium">Role</th>
                <th className="text-left py-3.5 px-4 font-medium">Status</th>
                <th className="text-left py-3.5 px-4 font-medium">Joined</th>
                <th className="text-right py-3.5 pl-4 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id} className="border-t transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-3.5 pl-4 pr-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                        style={{ background: 'var(--color-accent)' }}
                      >
                        {user.avatar}
                      </div>
                      <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4" style={{ color: 'var(--color-text-muted)' }}>{user.email}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: user.role === 'Student' ? '#1D787420' : user.role === 'Mentor' ? '#EE964B20' : '#F4D35E20',
                        color: user.role === 'Student' ? '#1D7874' : user.role === 'Mentor' ? '#EE964B' : '#F4D35E',
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: statusColors[user.status] }} />
                      <span style={{ color: statusColors[user.status] }} className="text-xs font-medium">{user.status}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4" style={{ color: 'var(--color-text-muted)' }}>{user.joined}</td>
                  <td className="py-3.5 pl-4 pr-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="p-1.5 rounded-lg transition-colors" style={{ color: '#F59E0B' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                      </button>
                      <button className="p-1.5 rounded-lg transition-colors" style={{ color: '#EF4444' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-40"
              style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: currentPage === i + 1 ? 'var(--color-accent)' : 'transparent',
                  color: currentPage === i + 1 ? '#FFFFFF' : 'var(--color-text-muted)',
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-40"
              style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAddModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md rounded-2xl p-6 lg:p-8 shadow-xl"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Add New User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                  >
                    <option>Student</option>
                    <option>Mentor</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                  style={{ background: 'var(--color-accent)' }}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
