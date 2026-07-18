import { useState } from 'react'

const recordings = [
  { id: 1, title: 'Linux File System Deep Dive', date: 'Jun 15, 2026', duration: '45:20', instructor: 'Dr. Sharma', chapters: ['Introduction to inodes', 'Directory structure', 'Mount points', 'File permissions'] },
  { id: 2, title: 'C Programming — Pointers & Memory', date: 'Jun 13, 2026', duration: '52:10', instructor: 'Prof. Gupta', chapters: ['Pointer arithmetic', 'malloc/calloc', 'Stack vs Heap', 'Common bugs'] },
  { id: 3, title: 'Shell Scripting Basics', date: 'Jun 11, 2026', duration: '38:45', instructor: 'Dr. Patel', chapters: ['Variables & args', 'Conditionals', 'Loops', 'Functions'] },
  { id: 4, title: 'Git Version Control Masterclass', date: 'Jun 10, 2026', duration: '41:30', instructor: 'Dr. Sharma', chapters: ['Init & commits', 'Branching', 'Merge conflicts', 'Rebase'] },
  { id: 5, title: 'System Calls in Linux', date: 'Jun 08, 2026', duration: '55:00', instructor: 'Prof. Gupta', chapters: ['open/read/write', 'fork & exec', 'Signals', 'Pipes'] },
  { id: 6, title: 'Data Structures with C', date: 'Jun 06, 2026', duration: '48:15', instructor: 'Dr. Patel', chapters: ['Linked lists', 'Binary trees', 'Hash tables', 'Graphs'] },
]

export default function Recordings() {
  const [selected, setSelected] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeChapter, setActiveChapter] = useState(0)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Class Recordings</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Auto-uploaded VODs with chapter navigation</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
          {recordings.length} recordings available
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recordings.map(rec => (
          <div key={rec.id} className="glass-card overflow-hidden group cursor-pointer" onClick={() => { setSelected(rec); setActiveChapter(0); setProgress(0); setPlaying(false) }}>
            <div className="aspect-video relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1D7874, #0D4A48)' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/20 group-hover:bg-white/30 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded bg-black/50 text-white">{rec.duration}</span>
              <div className="absolute top-2 left-2 flex gap-1">
                {rec.chapters.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                ))}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{rec.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{rec.date}</span>
                <span className="text-xs" style={{ color: 'var(--color-accent)' }}>{rec.instructor}</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                {rec.chapters.slice(0, 3).map((ch, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{ch.split(' ').slice(0, 2).join(' ')}</span>
                ))}
                {rec.chapters.length > 3 && (
                  <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>+{rec.chapters.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-4xl glass-card overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="aspect-video relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1D7874, #0D4A48)' }}>
              <div className="text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <p className="text-white/40 text-sm mt-2">Recording Preview</p>
              </div>
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-white/80 hover:bg-black/60 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-4 lg:p-6 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{selected.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{selected.date} • {selected.instructor} • {selected.duration}</p>
                </div>
                {selected.chapters && (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.chapters.map((ch, i) => (
                      <button key={i} onClick={() => setActiveChapter(i)}
                        className="text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all"
                        style={{
                          background: activeChapter === i ? 'var(--color-accent)' : 'var(--color-accent-light)',
                          color: activeChapter === i ? '#fff' : 'var(--color-accent)',
                        }}
                      >{ch}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setPlaying(!playing)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shrink-0"
                  style={{ background: 'var(--color-accent)' }}
                >
                  {playing ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                </button>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--color-accent)' }} />
                </div>
                <span className="text-xs font-mono shrink-0" style={{ color: 'var(--color-text-muted)' }}>00:00/{selected.duration}</span>
                <div className="flex items-center gap-2">
                  <select className="text-xs px-2 py-1 rounded-lg outline-none" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                    <option>1x</option><option>1.5x</option><option>2x</option>
                  </select>
                  <button className="p-2 rounded-lg flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download
                  </button>
                </div>
              </div>
              {selected.chapters && (
                <div className="p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>Current Chapter: {selected.chapters[activeChapter]}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Chapter {activeChapter + 1} of {selected.chapters.length}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
