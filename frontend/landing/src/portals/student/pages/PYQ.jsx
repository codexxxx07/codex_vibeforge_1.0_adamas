import { useState, useEffect, useCallback } from 'react'

const subjects = [
  { id: 'vlsi', name: 'VLSI Design' },
  { id: 'dsa', name: 'Data Structures' },
  { id: 'embedded', name: 'Embedded Systems' },
  { id: 'digital', name: 'Digital Electronics' },
  { id: 'networks', name: 'Computer Networks' },
  { id: 'os', name: 'Operating Systems' },
]

const allQuestions = {
  vlsi: [
    { id: 1, text: 'What is the threshold voltage of a MOSFET?', options: ['Voltage at which channel forms', 'Breakdown voltage', 'Supply voltage', 'Gate voltage'], correct: 0 },
    { id: 2, text: 'Which logic family has the lowest power consumption?', options: ['TTL', 'CMOS', 'ECL', 'RTL'], correct: 1 },
    { id: 3, text: 'What is setup time in flip-flops?', options: ['Min time data must be stable before clock', 'Max delay of circuit', 'Clock period', 'Propagation delay'], correct: 0 },
    { id: 4, text: 'Which is a type of programmable logic device?', options: ['FPGA', 'MOSFET', 'BJT', 'Diode'], correct: 0 },
    { id: 5, text: 'What does SPICE stand for?', options: ['Simulation Program with IC Emphasis', 'Signal Processing Circuit', 'System Programming', 'Special IC'], correct: 0 },
  ],
  dsa: [
    { id: 1, text: 'Which data structure is used for BFS?', options: ['Queue', 'Stack', 'Tree', 'Heap'], correct: 0 },
    { id: 2, text: 'Time complexity of binary search?', options: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], correct: 0 },
    { id: 3, text: 'Which sorting is fastest in average case?', options: ['Quick Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort'], correct: 0 },
    { id: 4, text: 'What is a self-balancing BST?', options: ['AVL Tree', 'Binary Tree', 'B-Tree', 'Heap'], correct: 0 },
    { id: 5, text: 'DFS uses which data structure?', options: ['Stack', 'Queue', 'Array', 'LinkedList'], correct: 0 },
  ],
  embedded: [
    { id: 1, text: 'What is an ISR?', options: ['Interrupt Service Routine', 'Instruction Set Register', 'Integrated System Reset', 'Internal State Register'], correct: 0 },
    { id: 2, text: 'Which protocol is I2C?', options: ['Serial communication', 'Parallel', 'Wireless', 'Optical'], correct: 0 },
    { id: 3, text: 'What is a watchdog timer used for?', options: ['System reset on hang', 'Time keeping', 'PWM generation', 'ADC conversion'], correct: 0 },
    { id: 4, text: 'What does GPIO stand for?', options: ['General Purpose Input/Output', 'Graphics Port I/O', 'Gate Processor I/O', 'General Protocol I/O'], correct: 0 },
    { id: 5, text: 'Which is a real-time OS?', options: ['FreeRTOS', 'Windows', 'macOS', 'Android'], correct: 0 },
  ],
  digital: [
    { id: 1, text: 'What is a half adder?', options: ['Adds 2 bits', 'Adds 3 bits', 'Subtracts bits', 'Multiplies bits'], correct: 0 },
    { id: 2, text: 'Which gate is universal?', options: ['NAND', 'AND', 'OR', 'NOT'], correct: 0 },
    { id: 3, text: 'What is a flip-flop?', options: ['1-bit memory', 'Combinational circuit', 'Multiplexer', 'Decoder'], correct: 0 },
    { id: 4, text: 'Number of inputs for full adder?', options: ['3', '2', '4', '1'], correct: 0 },
    { id: 5, text: 'Boolean algebra deals with:', options: ['Binary variables', 'Real numbers', 'Complex numbers', 'Integers'], correct: 0 },
  ],
  networks: [
    { id: 1, text: 'OSI model has how many layers?', options: ['7', '5', '4', '6'], correct: 0 },
    { id: 2, text: 'What is TCP?', options: ['Transmission Control Protocol', 'Transfer Control Protocol', 'Transport Communication Protocol', 'Terminal Control Protocol'], correct: 0 },
    { id: 3, text: 'IP address is:', options: ['32-bit', '16-bit', '64-bit', '8-bit'], correct: 0 },
    { id: 4, text: 'HTTP runs on which port?', options: ['80', '21', '22', '443'], correct: 0 },
    { id: 5, text: 'DNS stands for:', options: ['Domain Name System', 'Digital Network Service', 'Data Network Security', 'Dynamic Node System'], correct: 0 },
  ],
  os: [
    { id: 1, text: 'What is a process?', options: ['Program in execution', 'Set of instructions', 'File on disk', 'Memory block'], correct: 0 },
    { id: 2, text: 'Which scheduling is FCFS?', options: ['First Come First Serve', 'Fast CPU Scheduling', 'Fair Cycle Scheduling', 'File Control System'], correct: 0 },
    { id: 3, text: 'What is a deadlock?', options: ['Processes waiting indefinitely', 'System crash', 'Memory overflow', 'Disk full'], correct: 0 },
    { id: 4, text: 'Virtual memory uses:', options: ['Paging', 'Segmentation', 'Both', 'None'], correct: 2 },
    { id: 5, text: 'Which is a page replacement algorithm?', options: ['LRU', 'FCFS', 'SJF', 'RR'], correct: 0 },
  ],
}

export default function PYQ() {
  const [subject, setSubject] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [markedForReview, setMarkedForReview] = useState([])
  const [timeLeft, setTimeLeft] = useState(600)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!subject || submitted) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setSubmitted(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [subject, submitted])

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>PYQ Practice Engine</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Select a subject to practice previous year questions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(s => (
            <button key={s.id} onClick={() => { setSubject(s); setCurrentQ(0); setAnswers({}); setMarkedForReview([]); setTimeLeft(600); setSubmitted(false) }}
              className="glass-card p-6 text-left group"
            >
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{s.name}</h3>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>5 questions • 10 minutes</p>
              <button className="mt-4 px-5 py-2 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'var(--color-accent)' }}>
                Start Practice
              </button>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const questions = allQuestions[subject.id]
  const q = questions[currentQ]
  const answeredCount = Object.keys(answers).length
  const attempted = questions.filter(qi => answers[qi.id] !== undefined).length
  const notAttempted = questions.length - attempted
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (submitted) {
    const correct = questions.filter(qi => answers[qi.id] === qi.correct).length
    const total = questions.length
    const pct = Math.round((correct / total) * 100)
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 lg:p-8">
          <div className="text-center mb-8">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: pct >= 60 ? 'rgba(29,120,116,0.15)' : 'rgba(239,68,68,0.15)' }}>
              <span className="text-4xl font-bold" style={{ color: pct >= 60 ? '#1D7874' : '#EF4444' }}>{pct}%</span>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Practice Complete!</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{subject.name}</p>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[{ label: 'Correct', value: correct, color: '#22C55E' }, { label: 'Wrong', value: total - correct - (questions.length - answeredCount), color: '#EF4444' }, { label: 'Unanswered', value: questions.length - answeredCount, color: '#F59E0B' }, { label: 'Time Taken', value: `${10 - minutes}m ${60 - seconds}s`, color: 'var(--color-accent)' }].map((s, i) => (
              <div key={i} className="p-4 rounded-xl text-center" style={{ background: 'var(--color-accent-light)' }}>
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {questions.map((qi, idx) => (
              <div key={qi.id} className="p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: answers[qi.id] === qi.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: answers[qi.id] === qi.correct ? '#22C55E' : '#EF4444' }}>
                    Q{idx + 1}
                  </span>
                  <span className="text-xs" style={{ color: answers[qi.id] === qi.correct ? '#22C55E' : '#EF4444' }}>
                    {answers[qi.id] === qi.correct ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{qi.text}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>Correct: {qi.options[qi.correct]}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setSubject(null)} className="mt-6 px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--color-accent)' }}>
            Back to Subjects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{subject.name} - PYQ</h2>
        <div className={`px-4 py-2 rounded-xl text-sm font-bold font-mono ${timeLeft < 120 ? 'animate-pulse' : ''}`} style={{ background: timeLeft < 120 ? 'rgba(239,68,68,0.15)' : 'var(--color-accent-light)', color: timeLeft < 120 ? '#EF4444' : 'var(--color-accent)' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="glass-card p-6 lg:p-8 mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Question {currentQ + 1} of {questions.length}</p>
              <button onClick={() => setMarkedForReview(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id])}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{ background: markedForReview.includes(q.id) ? 'rgba(245,158,11,0.2)' : 'var(--color-accent-light)', color: markedForReview.includes(q.id) ? '#F59E0B' : 'var(--color-text-muted)' }}
              >
                {markedForReview.includes(q.id) ? '✓ Marked for Review' : 'Mark for Review'}
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>{q.text}</h3>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                  className="w-full p-4 rounded-xl text-left text-sm font-medium transition-all border"
                  style={{
                    background: answers[q.id] === i ? 'var(--color-accent-light)' : 'var(--color-bg-card)',
                    borderColor: answers[q.id] === i ? 'var(--color-accent)' : 'var(--color-border)',
                    color: answers[q.id] === i ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  }}
                >
                  <span className="mr-3 text-xs font-mono opacity-50">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setCurrentQ(p => Math.max(0, p - 1))} disabled={currentQ === 0}
              className="px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-30"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            >Previous</button>
            {currentQ === questions.length - 1 ? (
              <button onClick={() => setSubmitted(true)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--color-accent)' }}
              >Submit</button>
            ) : (
              <button onClick={() => setCurrentQ(p => Math.min(questions.length - 1, p + 1))}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--color-accent)' }}
              >Next</button>
            )}
          </div>
        </div>

        <div className="w-full lg:w-56">
          <div className="glass-card p-4">
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Questions</h4>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((qi, i) => {
                let bg = 'var(--color-accent-light)'
                let color = 'var(--color-text-muted)'
                if (answers[qi.id] !== undefined) { bg = 'var(--color-accent)'; color = '#fff' }
                if (markedForReview.includes(qi.id)) { bg = '#F59E0B'; color = '#fff' }
                return (
                  <button key={qi.id} onClick={() => setCurrentQ(i)}
                    className="w-9 h-9 rounded-lg text-xs font-bold transition-all"
                    style={{ background: bg, color }}
                  >{i + 1}</button>
                )
              })}
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: 'var(--color-accent)' }} /> <span style={{ color: 'var(--color-text-muted)' }}>Answered ({attempted})</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: 'var(--color-accent-light)' }} /> <span style={{ color: 'var(--color-text-muted)' }}>Not Attempted ({notAttempted})</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: '#F59E0B' }} /> <span style={{ color: 'var(--color-text-muted)' }}>Review ({markedForReview.length})</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
