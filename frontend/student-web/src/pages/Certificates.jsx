import { useState } from 'react'

const certificates = [
  { id: 1, title: 'Linux Fundamentals', issuer: 'Shipwise Academy', date: 'May 2026', grade: 'A', skills: ['File System', 'Permissions', 'Process Management', 'Shell Basics'], color: '#1D7874' },
  { id: 2, title: 'C Programming Essentials', issuer: 'Shipwise Academy', date: 'Apr 2026', grade: 'A+', skills: ['Pointers', 'Memory Mgmt', 'Data Structures', 'File I/O'], color: '#EE964B' },
  { id: 3, title: 'Shell Scripting Mastery', issuer: 'Shipwise Academy', date: 'Jun 2026', grade: 'B+', skills: ['Bash', 'AWK', 'Sed', 'Cron Jobs'], color: '#F4D35E' },
  { id: 4, title: 'System Calls & Signals', issuer: 'Shipwise Academy', date: 'Jul 2026', grade: 'In Progress', skills: ['fork/exec', 'Signals', 'Pipes', 'IPC'], color: '#00D9FF', progress: 65 },
]

const skills = [
  { name: 'Linux CLI', level: 92, color: '#1D7874' },
  { name: 'C Programming', level: 78, color: '#EE964B' },
  { name: 'Shell Scripting', level: 65, color: '#F4D35E' },
  { name: 'Git Version Control', level: 70, color: '#F59E0B' },
  { name: 'Networking', level: 45, color: '#00D9FF' },
  { name: 'System Calls', level: 55, color: '#C9B6E4' },
]

export default function Certificates() {
  const [activeTab, setActiveTab] = useState('certificates')
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Certificates & Skills</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>PDF certificates & LinkedIn-shareable skill graph</p>
        </div>
        <div className="flex gap-2">
          <TabBtn label="Certificates" active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} />
          <TabBtn label="Skill Graph" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
        </div>
      </div>

      {activeTab === 'certificates' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {certificates.map(cert => (
              <div key={cert.id} className="glass-card p-5 text-center cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedCert(cert)}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: `${cert.color}20` }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={cert.color} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{cert.title}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{cert.issuer}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{cert.date}</span>
                  {cert.grade !== 'In Progress' ? (
                    <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>{cert.grade}</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>{cert.progress}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedCert && (
            <div className="glass-card p-6 lg:p-8 text-center max-w-lg mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `${selectedCert.color}20` }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={selectedCert.color} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <h3 className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>{selectedCert.title}</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Issued by {selectedCert.issuer}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{selectedCert.date}</span>
                {selectedCert.grade !== 'In Progress' ? (
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>Grade: {selectedCert.grade}</span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>{selectedCert.progress}% Complete</span>
                )}
              </div>
              <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Skills Acquired</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {selectedCert.skills.map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-lg font-medium" style={{ background: `${selectedCert.color}20`, color: selectedCert.color }}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all flex items-center gap-2" style={{ background: 'var(--color-accent)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download PDF
                </button>
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2" style={{ background: '#0A66C2', color: '#fff' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Share on LinkedIn
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>Skill Proficiency</h3>
            <div className="space-y-4">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{s.name}</span>
                    <span className="text-xs font-semibold" style={{ color: s.color }}>{s.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${s.level}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>Radar Overview</h3>
            <div className="aspect-square max-w-xs mx-auto flex items-center justify-center">
              <div className="relative w-48 h-48">
                {[1, 2, 3].map(ring => (
                  <div key={ring} className="absolute inset-0 rounded-full border" style={{
                    borderColor: 'var(--color-border)',
                    margin: `${ring * 20}px`,
                  }} />
                ))}
                {[
                  { label: 'Linux', x: 0.5, y: 0, value: 92 },
                  { label: 'C', x: 0.975, y: 0.345, value: 78 },
                  { label: 'Shell', x: 0.75, y: 0.9, value: 65 },
                  { label: 'Git', x: 0.25, y: 0.9, value: 70 },
                  { label: 'Net', x: 0.025, y: 0.345, value: 45 },
                  { label: 'Syscalls', x: 0.5, y: 0.525, value: 55 },
                ].map((pt, i) => {
                  const r = (pt.value / 100) * 80
                  const angle = (i * 60 - 90) * Math.PI / 180
                  const cx = 96 + r * Math.cos(angle)
                  const cy = 96 + r * Math.sin(angle)
                  const lx = 96 + 88 * Math.cos(angle)
                  const ly = 96 + 88 * Math.sin(angle)
                  return (
                    <div key={i}>
                      <div className="absolute w-3 h-3 rounded-full" style={{ background: skills.find(s => s.name.startsWith(pt.label))?.color, left: `${cx - 6}px`, top: `${cy - 6}px` }} />
                      <span className="absolute text-[10px] font-medium" style={{
                        color: 'var(--color-text-muted)',
                        left: `${lx}px`, top: `${ly}px`,
                        transform: 'translate(-50%, -50%)',
                      }}>{pt.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TabBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
      style={{ background: active ? 'var(--color-accent)' : 'var(--color-accent-light)', color: active ? '#fff' : 'var(--color-accent)' }}
    >{label}</button>
  )
}
