import { useState } from 'react'

const assignments = [
  { id: 1, title: 'Implement a Singly Linked List (C)', due: 'Jun 20, 2026', status: 'pending', type: 'code', points: 100, desc: 'Write a C program to implement a singly linked list with insert, delete, and search operations.', testCases: 5 },
  { id: 2, title: 'Shell Script — File Organizer', due: 'Jun 22, 2026', status: 'pending', type: 'shell', points: 80, desc: 'Write a bash script that organizes files in a directory by extension into subdirectories.', testCases: 3 },
  { id: 3, title: 'Process Table Analysis (MCQ)', due: 'Jun 18, 2026', status: 'submitted', type: 'mcq', points: 50, desc: '10 multiple choice questions on Linux process states and scheduling.', mcqDone: 7, mcqTotal: 10 },
  { id: 4, title: 'Binary Search Tree (C)', due: 'Jun 25, 2026', status: 'graded', type: 'code', points: 120, desc: 'Implement BST with insert, search, and in-order traversal.', score: 95 },
  { id: 5, title: 'AWK Data Processing', due: 'Jun 16, 2026', status: 'graded', type: 'shell', points: 60, desc: 'Use AWK to process CSV log files and generate summary.', score: 88 },
  { id: 6, title: 'Memory Leak Detection (MCQ)', due: 'Jun 14, 2026', status: 'graded', type: 'mcq', points: 40, desc: 'MCQs on valgrind, memory leaks, and heap profiling.', score: 92 },
]

const mcqQuestions = [
  { q: 'Which system call creates a new process?', opts: ['fork()', 'exec()', 'wait()', 'exit()'], correct: 0 },
  { q: 'What does chmod 755 set?', opts: ['rwxr-xr-x', 'rwxrwxrwx', 'r-xr-xr-x', 'rwxr--r--'], correct: 0 },
  { q: 'Which signal is SIGKILL?', opts: ['9', '15', '2', '1'], correct: 0 },
  { q: 'What does malloc(0) return?', opts: ['NULL or unique pointer', 'NULL', '0', 'Segfault'], correct: 0 },
  { q: 'Which shell operator redirects stderr?', opts: ['2>', '>', '<', '|'], correct: 0 },
]

export default function Assignments() {
  const [selected, setSelected] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [showMcq, setShowMcq] = useState(false)
  const [mcqAnswers, setMcqAnswers] = useState({})
  const [mcqSubmitted, setMcqSubmitted] = useState(false)
  const [fileUpload, setFileUpload] = useState(null)

  const filtered = activeTab === 'all' ? assignments : assignments.filter(a => a.status === activeTab)

  const handleMcqSubmit = () => {
    setMcqSubmitted(true)
    setSelected(prev => ({ ...prev, status: 'submitted', mcqDone: Object.keys(mcqAnswers).length, mcqTotal: mcqQuestions.length }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) setFileUpload(file)
  }

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'graded', label: 'Graded' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Assignments</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>MCQ, code tests & shell script uploads</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
          Avg Score: {Math.round(assignments.filter(a => a.score).reduce((s, a) => s + a.score, 0) / assignments.filter(a => a.score).length)}%
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.key ? 'var(--color-accent)' : 'var(--color-accent-light)',
              color: activeTab === tab.key ? '#fff' : 'var(--color-accent)',
            }}
          >{tab.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`space-y-2 ${selected ? 'hidden lg:block' : ''} lg:col-span-1`}>
          {filtered.map(a => (
            <button key={a.id} onClick={() => setSelected(a)}
              className="w-full glass-card p-3 text-left transition-all"
              style={{
                border: selected?.id === a.id ? '1.5px solid var(--color-accent)' : '1px solid transparent',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{a.title}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Due: {a.due}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    a.status === 'pending' ? 'text-yellow-500' : a.status === 'submitted' ? 'text-blue-500' : 'text-green-500'
                  }`} style={{ background: a.status === 'pending' ? 'rgba(245,158,11,0.12)' : a.status === 'submitted' ? 'rgba(59,130,246,0.12)' : 'rgba(34,197,94,0.12)' }}>
                    {a.status}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{a.type}</span>
                </div>
              </div>
              {a.score !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: a.score >= 90 ? '#22C55E' : a.score >= 70 ? '#F59E0B' : '#EF4444' }}>{a.score}%</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
                    <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: a.score >= 90 ? '#22C55E' : a.score >= 70 ? '#F59E0B' : '#EF4444' }} />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className={`${selected ? 'block' : 'hidden lg:block'} lg:col-span-2`}>
          {selected ? (
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{selected.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{selected.type.toUpperCase()}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>•</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Due: {selected.due}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>•</span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{selected.points} pts</span>
                  </div>
                </div>
                <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                  selected.status === 'pending' ? 'text-yellow-500' : selected.status === 'submitted' ? 'text-blue-500' : 'text-green-500'
                }`} style={{ background: selected.status === 'pending' ? 'rgba(245,158,11,0.12)' : selected.status === 'submitted' ? 'rgba(59,130,246,0.12)' : 'rgba(34,197,94,0.12)' }}>
                  {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{selected.desc}</p>

              {selected.type === 'mcq' && !mcqSubmitted && selected.status === 'pending' && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Answer the following questions:</p>
                  {mcqQuestions.map((q, qi) => (
                    <div key={qi} className="p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                      <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>{qi + 1}. {q.q}</p>
                      <div className="space-y-1.5">
                        {q.opts.map((opt, oi) => (
                          <label key={oi} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`mcq-${qi}`} value={oi} checked={mcqAnswers[qi] === oi}
                              onChange={() => setMcqAnswers(prev => ({ ...prev, [qi]: oi }))}
                              className="accent-teal-600" />
                            <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={handleMcqSubmit} disabled={Object.keys(mcqAnswers).length < mcqQuestions.length}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                    style={{ background: Object.keys(mcqAnswers).length >= mcqQuestions.length ? 'var(--color-accent)' : '#6B7280' }}
                  >Submit MCQ</button>
                </div>
              )}

              {selected.type === 'mcq' && (mcqSubmitted || selected.status !== 'pending') && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <p className="text-sm font-semibold text-green-500">✓ MCQ submitted</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{mcqSubmitted ? Object.keys(mcqAnswers).length : selected.mcqDone}/{mcqQuestions.length} questions answered</p>
                </div>
              )}

              {selected.type === 'code' && selected.status === 'pending' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>Test Cases: {selected.testCases}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Your code will be tested against {selected.testCases} hidden test cases.</p>
                  </div>
                  <textarea rows={8} placeholder="// Paste your C code here"
                    className="w-full p-4 font-mono text-sm rounded-xl outline-none resize-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    spellCheck={false} />
                  <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'var(--color-accent)' }}>
                    Submit Code
                  </button>
                </div>
              )}

              {selected.type === 'shell' && selected.status === 'pending' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>Upload Shell Script</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Upload a .sh file. It will be executed against test cases.</p>
                  </div>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer" style={{ borderColor: 'var(--color-border)' }}>
                    {fileUpload ? (
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" className="mx-auto mb-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <p className="text-sm font-medium text-green-500">{fileUpload.name}</p>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" className="mx-auto mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Click to upload .sh file</p>
                        <input type="file" accept=".sh" className="hidden" onChange={handleFileUpload} />
                      </label>
                    )}
                  </div>
                  <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'var(--color-accent)' }}>
                    Submit Shell Script
                  </button>
                </div>
              )}

              {selected.score !== undefined && (
                <div className="p-4 rounded-xl" style={{ background: selected.score >= 90 ? 'rgba(34,197,94,0.08)' : selected.score >= 70 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)' }}>
                  <p className="text-sm font-semibold" style={{
                    color: selected.score >= 90 ? '#22C55E' : selected.score >= 70 ? '#F59E0B' : '#EF4444'
                  }}>Score: {selected.score}%</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Graded assignment</p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <p className="text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>Select an assignment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
