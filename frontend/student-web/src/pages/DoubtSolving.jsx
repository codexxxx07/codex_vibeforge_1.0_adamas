import { useState } from 'react'

const threads = [
  { id: 1, title: 'Understanding fork() — child process not printing', author: 'Rohit S.', replies: 5, views: 42, tag: 'C', time: '2h ago', solved: true },
  { id: 2, title: 'Why is my segmentation fault on malloc?', author: 'Priya K.', replies: 8, views: 67, tag: 'C', time: '4h ago', solved: true },
  { id: 3, title: 'grep vs awk — when to use which?', author: 'Anmol D.', replies: 3, views: 28, tag: 'Shell', time: '6h ago', solved: false },
  { id: 4, title: 'How to compile multiple .c files with Makefile', author: 'Sneha P.', replies: 6, views: 51, tag: 'Build', time: '1d ago', solved: true },
  { id: 5, title: 'chmod 777 vs 755 — permissions not working', author: 'Vikas R.', replies: 4, views: 35, tag: 'Linux', time: '2d ago', solved: false },
  { id: 6, title: 'Understanding pointers to pointers in C', author: 'Neha G.', replies: 10, views: 89, tag: 'C', time: '2d ago', solved: true },
]

const mentors = [
  { name: 'Dr. Sharma', expertise: 'Linux Kernel, Systems', available: true, rating: 4.9, avatar: 'DS' },
  { name: 'Prof. Gupta', expertise: 'C Programming, Algos', available: true, rating: 4.8, avatar: 'PG' },
  { name: 'Dr. Patel', expertise: 'Shell Scripting, DevOps', available: false, rating: 4.7, avatar: 'DP' },
]

const communityMessages = [
  { name: 'Rohit S.', message: 'has anyone faced this issue with fork()? The child process runs but doesnt print anything.', time: '2:30 PM', replies: 5, avatar: 'RS' },
  { name: 'Priya K.', message: 'setvbuf(stdout, NULL, _IONBF, 0) before fork() fixed it for me!', time: '2:35 PM', replies: 0, avatar: 'PK' },
  { name: 'Prof. Gupta', message: 'That is because stdout is buffered. Use _IONBF or call fflush before fork.', time: '2:40 PM', replies: 0, avatar: 'PG' },
  { name: 'Rohit S.', message: 'That worked! Thanks Priya and Prof. Gupta 🙌', time: '2:45 PM', replies: 0, avatar: 'RS' },
  { name: 'Anmol D.', message: 'This is gold. Adding this to my notes.', time: '2:50 PM', replies: 0, avatar: 'AD' },
]

const tags = ['All', 'C', 'Linux', 'Shell', 'Build', 'Networking']

export default function DoubtSolving() {
  const [activeTab, setActiveTab] = useState('community')
  const [selectedThread, setSelectedThread] = useState(null)
  const [activeTag, setActiveTag] = useState('All')
  const [showRequest, setShowRequest] = useState(false)
  const [requestForm, setRequestForm] = useState({ topic: '', desc: '', mentor: '' })
  const [replyText, setReplyText] = useState('')
  const [forumReplies, setForumReplies] = useState(communityMessages)

  const filtered = activeTag === 'All' ? threads : threads.filter(t => t.tag === activeTag)

  const submitRequest = () => {
    if (!requestForm.topic || !requestForm.desc) return
    setShowRequest(false)
    setRequestForm({ topic: '', desc: '', mentor: '' })
  }

  const addReply = () => {
    if (!replyText.trim()) return
    setForumReplies(prev => [...prev, { name: 'You', message: replyText, time: 'Just now', replies: 0, avatar: 'Yo' }])
    setReplyText('')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Doubt Solving</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Community forum + 1:1 mentor sessions</p>
        </div>
        <div className="flex gap-2">
          <TabBtn label="Community" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
          <TabBtn label="Mentors 1:1" active={activeTab === 'mentors'} onClick={() => setActiveTab('mentors')} />
        </div>
      </div>

      {activeTab === 'community' && (
        <>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {tags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeTag === tag ? 'var(--color-accent)' : 'var(--color-accent-light)',
                  color: activeTag === tag ? '#fff' : 'var(--color-accent)',
                }}
              >{tag}</button>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex-1 min-w-0 space-y-3">
              {filtered.map(th => (
                <div key={th.id} className="glass-card p-4 cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedThread(th)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{th.title}</h3>
                        {th.solved && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>Solved</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{th.author}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{th.tag}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{th.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-center">
                        <p className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{th.replies}</p>
                        <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>replies</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{th.views}</p>
                        <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>views</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block w-72 shrink-0 glass-card p-4">
              <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text-primary)' }}>Hot Topics</h3>
              <div className="space-y-2">
                {threads.filter(t => t.solved).slice(0, 3).map(th => (
                  <div key={th.id} className="p-2 rounded-lg cursor-pointer" style={{ background: 'var(--color-accent-light)' }}>
                    <p className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{th.title}</p>
                    <span className="text-[10px]" style={{ color: 'var(--color-accent)' }}>{th.tag} • {th.views} views</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedThread && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedThread(null)}>
              <div className="w-full max-w-2xl glass-card p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{selectedThread.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{selectedThread.author}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{selectedThread.tag}</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{selectedThread.time}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedThread(null)} className="p-1 rounded-lg" style={{ color: 'var(--color-text-muted)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  {forumReplies.map((r, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: r.name.includes('Prof') || r.name.includes('Dr') ? '#1D7874' : '#EE964B' }}>{r.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{r.name}</span>
                          <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{r.time}</span>
                          {(r.name.includes('Prof') || r.name.includes('Dr')) && <span className="text-[10px] px-1 py-0.5 rounded font-medium" style={{ background: 'rgba(29,120,116,0.2)', color: '#1D7874' }}>Mentor</span>}
                        </div>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-text-primary)' }}>{r.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addReply()}
                    placeholder="Write a reply..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  />
                  <button onClick={addReply} className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'var(--color-accent)' }}>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'mentors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {mentors.map((m, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#1D7874' }}>{m.avatar}</div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{m.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{m.expertise}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F4D35E" stroke="#F4D35E"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{m.rating}</span>
                  </div>
                </div>
                <span className={`ml-auto w-2.5 h-2.5 rounded-full ${m.available ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
              <button disabled={!m.available}
                className="w-full py-2 rounded-xl text-xs font-medium text-white transition-all"
                style={{ background: m.available ? 'var(--color-accent)' : '#6B7280' }}
              >{m.available ? 'Book 1:1 Session' : 'Unavailable'}</button>
            </div>
          ))}
          <div className="lg:col-span-3 glass-card p-5 text-center cursor-pointer hover:shadow-lg transition-all" onClick={() => setShowRequest(true)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" className="mx-auto mb-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>Request Expert Match</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Share your doubt topic and we'll match you with the right mentor</p>
          </div>
        </div>
      )}

      {showRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowRequest(false)}>
          <div className="w-full max-w-lg glass-card p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Request Mentor Match</h3>
            <div className="space-y-3">
              <input value={requestForm.topic} onChange={e => setRequestForm(p => ({ ...p, topic: e.target.value }))} placeholder="Topic (e.g., Pointers in C)"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }} />
              <textarea value={requestForm.desc} onChange={e => setRequestForm(p => ({ ...p, desc: e.target.value }))} placeholder="Describe your doubt in detail..." rows={3}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }} />
              <select value={requestForm.mentor} onChange={e => setRequestForm(p => ({ ...p, mentor: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                <option value="">Preferred mentor (optional)</option>
                {mentors.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
              </select>
            </div>
            <button onClick={submitRequest} className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'var(--color-accent)' }}>
              Submit Request
            </button>
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
