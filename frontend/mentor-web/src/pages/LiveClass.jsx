import { useState } from 'react'
import { useTheme } from '../ThemeContext'

const sampleMessages = [
  { name: 'Sarah J.', msg: 'Could you explain the closure concept again?', time: '2:14 PM', role: 'student' },
  { name: 'Mike C.', msg: 'Here is my solution for the exercise', time: '2:12 PM', role: 'student' },
  { name: 'Dr. James', msg: 'Great question! Let me share my screen', time: '2:10 PM', role: 'mentor' },
  { name: 'Emma W.', msg: 'I have a question about async/await', time: '2:08 PM', role: 'student' },
]

const raiseHandQueue = [
  { name: 'Alex Rivera', question: 'Can you go over the useState hook again?', time: '2:15 PM' },
  { name: 'Lisa Park', question: 'I have a doubt about the useEffect cleanup', time: '2:13 PM' },
]

export default function LiveClass() {
  const { dark } = useTheme()
  const [isLive, setIsLive] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [topic, setTopic] = useState('Advanced React Hooks')
  const [duration, setDuration] = useState(60)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(sampleMessages)
  const [queue, setQueue] = useState(raiseHandQueue)
  const [cameraOn, setCameraOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [screenShareOn, setScreenShareOn] = useState(false)

  const ControlBtn = ({ active, onClick, label, icon }) => (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-200 ${active ? 'shadow-lg' : 'opacity-60'}`}
      style={{
        background: active ? 'var(--color-accent)' : 'var(--color-bg-card)',
        color: active ? 'white' : 'var(--color-text-muted)',
        border: active ? 'none' : '1px solid var(--color-border)',
      }}
      title={label}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </button>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div
          className="relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center"
          style={{
            background: dark
              ? 'linear-gradient(135deg, #0b0b18, #111128)'
              : 'linear-gradient(135deg, #1D7874, #0D5E5A)',
          }}
        >
          {screenShareOn ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-white/70 text-lg font-medium">Screen Sharing Active</p>
                <p className="text-white/50 text-sm">You are sharing your screen with the class</p>
              </div>
            </div>
          ) : cameraOn ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-20 h-20 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-white/70 text-lg">Camera Preview</p>
                <p className="text-white/50 text-sm">Dr. James — Advanced React Hooks</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-20 h-20 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-white/50">Camera Off</p>
            </div>
          )}

          {isLive && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <ControlBtn active={micOn} onClick={() => setMicOn(!micOn)} label="Microphone" icon={micOn ? 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' : 'M13.118 2.07a9 9 0 00-7.966 7.966M16 17.94A9 9 0 0019 12m-7 7a9 9 0 01-7-7m0 0l-3 3m3-3l3 3'} />
            <ControlBtn active={cameraOn} onClick={() => setCameraOn(!cameraOn)} label="Camera" icon={cameraOn ? 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' : 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'} />
            <ControlBtn active={screenShareOn} onClick={() => setScreenShareOn(!screenShareOn)} label="Screen Share" icon='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
          </div>

          {!isLive && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setIsLive(true)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg"
                style={{ background: '#EF4444', color: 'white' }}
              >
                Start Class
              </button>
            </div>
          )}
        </div>

        <div className="glass-card p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Topic:</span>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Duration:</span>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg text-sm outline-none text-center"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              />
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>min</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <svg className="w-4 h-4" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>24 students</span>
            </div>
            {isLive && (
              <button
                onClick={() => setIsLive(false)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: '#EF444420', color: '#EF4444' }}
              >
                End Class
              </button>
            )}
          </div>
        </div>

        <div className="glass-card p-4">
          <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Raise Hand Queue</h4>
          {queue.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No students waiting</p>
          ) : (
            <div className="space-y-2">
              {queue.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-bg-primary)' }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: dark ? '#a78bfa' : '#F4D35E', color: dark ? '#0b0b18' : '#262626' }}>
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{item.name}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{item.question}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>Accept</button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200" style={{ background: '#EF444420', color: '#EF4444' }}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className={`glass-card flex flex-col h-full min-h-[500px] ${chatOpen ? '' : ''}`}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Live Chat</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{messages.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'mentor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${m.role === 'mentor' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                  style={{
                    background: m.role === 'mentor' ? 'var(--color-accent)' : 'var(--color-bg-primary)',
                    color: m.role === 'mentor' ? 'white' : 'var(--color-text-primary)',
                  }}
                >
                  <p className="text-xs font-medium mb-0.5" style={{ opacity: 0.8 }}>{m.name}</p>
                  <p className="text-sm">{m.msg}</p>
                  <p className="text-[10px] mt-1" style={{ opacity: 0.6 }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && message.trim()) {
                    setMessages([...messages, { name: 'Dr. James', msg: message, time: 'Now', role: 'mentor' }])
                    setMessage('')
                  }
                }}
              />
              <button
                onClick={() => {
                  if (message.trim()) {
                    setMessages([...messages, { name: 'Dr. James', msg: message, time: 'Now', role: 'mentor' }])
                    setMessage('')
                  }
                }}
                className="p-2 rounded-xl transition-all duration-200"
                style={{ background: 'var(--color-accent)', color: 'white' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
