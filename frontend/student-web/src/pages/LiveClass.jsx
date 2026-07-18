import { useState } from 'react'

const participants = [
  { name: 'Dr. Sharma', role: 'Instructor', status: 'active', avatar: 'DS' },
  { name: 'Priya K.', role: 'Student', status: 'active', avatar: 'PK' },
  { name: 'Rahul M.', role: 'Student', status: 'away', avatar: 'RM' },
  { name: 'Sneha P.', role: 'Student', status: 'active', avatar: 'SP' },
  { name: 'Arjun S.', role: 'Student', status: 'offline', avatar: 'AS' },
]

const chapters = ['1. File System Basics', '2. Permissions & Ownership', '3. Pipes & Redirection', '4. Process Management']

const chatMessages = [
  { name: 'Priya K.', msg: 'Can you explain the difference between soft and hard links?', time: '2:15 PM', avatar: 'PK' },
  { name: 'Dr. Sharma', msg: 'Sure! Soft links are like shortcuts — they point to the filename. Hard links point to the inode.', time: '2:16 PM', avatar: 'DS' },
  { name: 'Rahul M.', msg: 'So deleting original breaks soft link but not hard?', time: '2:17 PM', avatar: 'RM' },
]

export default function LiveClass() {
  const [chatOpen, setChatOpen] = useState(true)
  const [participantsOpen, setParticipantsOpen] = useState(false)
  const [chatMsg, setChatMsg] = useState('')
  const [messages, setMessages] = useState(chatMessages)
  const [isRecording] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [showChapters, setShowChapters] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)

  const sendMessage = () => {
    if (!chatMsg.trim()) return
    setMessages(prev => [...prev, { name: 'You', msg: chatMsg, time: 'Now', avatar: 'You' }])
    setChatMsg('')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-8rem)]">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1D7874, #0D4A48)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              <p className="text-white/50 text-sm mt-2">WebRTC Live Stream</p>
            </div>
          </div>
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/80 text-white text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              REC
            </div>
          )}
          {showChapters && (
            <div className="absolute top-4 right-4 glass-card p-3 rounded-xl w-56">
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Chapters</p>
              <div className="space-y-1">
                {chapters.map((ch, i) => (
                  <button key={i} onClick={() => setCurrentChapter(i)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: currentChapter === i ? 'var(--color-accent-light)' : 'transparent',
                      color: currentChapter === i ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    }}
                  >{ch}</button>
                ))}
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass-card p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>Linux File System — Module 1</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Dr. Sharma • 02:00 PM - 03:00 PM</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium px-2 py-1 rounded-lg" style={{ background: 'rgba(34,197,94,0.2)', color: '#22C55E' }}>Live</span>
                <span className="text-[10px] font-medium px-2 py-1 rounded-lg" style={{ background: 'rgba(91,157,240,0.15)', color: '#5b9df0' }}>HD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-3 flex items-center justify-center gap-2 lg:gap-4">
          <ControlBtn icon={micOn ? 'mic' : 'mic-off'} active={micOn} onClick={() => setMicOn(!micOn)} />
          <ControlBtn icon={camOn ? 'camera' : 'camera-off'} active={camOn} onClick={() => setCamOn(!camOn)} />
          <ControlBtn icon="screen" label="Share" />
          <ControlBtn icon="message-circle" label="Chat" active={chatOpen} onClick={() => setChatOpen(!chatOpen)} />
          <ControlBtn icon="users" label="People" active={participantsOpen} onClick={() => setParticipantsOpen(!participantsOpen)} />
          <ControlBtn icon="book" label="Chapters" active={showChapters} onClick={() => setShowChapters(!showChapters)} />
          <ControlBtn icon="hand" label="Hand" />
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all">
            Leave
          </button>
        </div>
      </div>

      {chatOpen && (
        <div className="w-full lg:w-80 flex flex-col glass-card overflow-hidden">
          <div className="p-4 border-b font-semibold text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}>
            Live Chat
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 text-white" style={{ background: m.name === 'Dr. Sharma' ? '#1D7874' : m.name === 'You' ? '#EE964B' : '#F4D35E' }}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{m.name}</span>
                    <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{m.time}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-primary)' }}>{m.msg}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2" style={{ borderColor: 'var(--color-border)' }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask a doubt..."
              className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            />
            <button onClick={sendMessage} className="p-2 rounded-xl" style={{ background: 'var(--color-accent)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      {participantsOpen && (
        <div className="w-full lg:w-64 flex flex-col glass-card overflow-hidden">
          <div className="p-4 border-b font-semibold text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}>
            Participants ({participants.length})
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {participants.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: p.role === 'Instructor' ? '#1D7874' : '#EE964B' }}>{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{p.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.role}</p>
                </div>
                <span className={`w-2 h-2 rounded-full ${p.status === 'active' ? 'bg-green-500' : p.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ControlBtn({ icon, active, onClick, label }) {
  const paths = {
    'mic': <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><line x1="19" y1="10" x2="19" y2="12a7 7 0 0 1-14 0v-2"/></>,
    'mic-off': <><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    'camera': <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
    'camera-off': <><line x1="1" y1="1" x2="23" y2="23"/><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"/></>,
    'screen': <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    'message-circle': <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></>,
    'users': <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    'hand': <><path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.21 0-4.21-.9-5.66-2.34L2.5 14.5a1.5 1.5 0 0 1 2.12-2.12L6 13.5"/></>,
    'book': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
  }
  return (
    <button onClick={onClick}
      className="p-2.5 rounded-xl transition-all flex items-center gap-1.5"
      style={{ background: active ? 'var(--color-accent-light)' : 'transparent', color: active ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>
      {label && <span className="text-xs hidden lg:inline">{label}</span>}
    </button>
  )
}
