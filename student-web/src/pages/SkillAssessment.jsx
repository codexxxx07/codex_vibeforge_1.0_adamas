import { useState } from 'react'

const topics = [
  { id: 1, name: 'Linux Basics', difficulty: 'Beginner', questions: 10, time: '15 min', desc: 'File system, permissions, processes, pipes' },
  { id: 2, name: 'C Programming', difficulty: 'Beginner', questions: 12, time: '20 min', desc: 'Pointers, memory, structs, file I/O' },
  { id: 3, name: 'Shell Scripting', difficulty: 'Intermediate', questions: 10, time: '20 min', desc: 'Bash syntax, variables, loops, awk/sed' },
  { id: 4, name: 'Data Structures in C', difficulty: 'Intermediate', questions: 12, time: '25 min', desc: 'Arrays, linked lists, trees, hash tables' },
  { id: 5, name: 'System Programming', difficulty: 'Advanced', questions: 10, time: '25 min', desc: 'Syscalls, signals, processes, sockets' },
  { id: 6, name: 'Git & Version Control', difficulty: 'Beginner', questions: 8, time: '12 min', desc: 'Commits, branches, merge, rebase' },
]

const linuxQuestions = [
  { id: 1, text: 'Which command lists all files including hidden ones?', options: ['ls -a', 'ls -l', 'ls -r', 'ls -h'], correct: 0 },
  { id: 2, text: 'What does chmod 755 do?', options: ['Owner: rwx, Group: rx, Others: rx', 'Owner: rwx, Group: rwx, Others: rx', 'Owner: rx, Group: rw, Others: rwx', 'Owner: rw, Group: r, Others: rx'], correct: 0 },
  { id: 3, text: 'Which signal is sent by Ctrl+C?', options: ['SIGINT', 'SIGTERM', 'SIGKILL', 'SIGSTOP'], correct: 0 },
  { id: 4, text: 'What does the pipe operator | do?', options: ['Passes stdout of left cmd to stdin of right cmd', 'Runs commands in parallel', 'Redirects to a file', 'Chains commands sequentially'], correct: 0 },
  { id: 5, text: 'Which file contains user account info?', options: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/hosts'], correct: 0 },
  { id: 6, text: 'What is the purpose of grep?', options: ['Search text using patterns', 'Sort file contents', 'Count lines in a file', 'Compress files'], correct: 0 },
  { id: 7, text: 'Which command shows running processes?', options: ['ps', 'ls', 'cat', 'echo'], correct: 0 },
  { id: 8, text: 'What does the find command do?', options: ['Search for files in directory hierarchy', 'Find text in files', 'Locate installed packages', 'Search command history'], correct: 0 },
  { id: 9, text: 'What is the default permission for a new file?', options: ['644', '755', '777', '622'], correct: 0 },
  { id: 10, text: 'Which command is used to view the last few lines of a file?', options: ['tail', 'head', 'cat', 'less'], correct: 0 },
]

const cQuestions = [
  { id: 1, text: 'What is the size of int on a 64-bit Linux system?', options: ['4 bytes', '2 bytes', '8 bytes', 'Depends on compiler'], correct: 0 },
  { id: 2, text: 'What does the & operator do when used with a variable?', options: ['Gets memory address', 'Dereferences pointer', 'Bitwise AND', 'Logical AND'], correct: 0 },
  { id: 3, text: 'What is a NULL pointer?', options: ['Pointer that points to nothing', 'Pointer to address 0', 'Uninitialized pointer', 'Pointer to a null character'], correct: 0 },
  { id: 4, text: 'What is the output of printf("%d", 5/2)?', options: ['2', '2.5', '2.0', 'Error'], correct: 0 },
  { id: 5, text: 'Which header is needed for malloc?', options: ['stdlib.h', 'stdio.h', 'string.h', 'math.h'], correct: 0 },
  { id: 6, text: 'What is a struct in C?', options: ['User-defined data type grouping variables', 'A function that organizes code', 'A type of loop', 'A memory allocation function'], correct: 0 },
  { id: 7, text: 'What does the const keyword do?', options: ['Makes variable read-only', 'Declares a constant expression', 'Allocates constant memory', 'Prevents variable creation'], correct: 0 },
  { id: 8, text: 'What is function recursion?', options: ['Function calling itself', 'Function calling another function', 'Multiple return values', 'Nested loops'], correct: 0 },
  { id: 9, text: 'What does fopen return on failure?', options: ['NULL', '0', '-1', 'EOF'], correct: 0 },
  { id: 10, text: 'Which keyword is used to create a typedef?', options: ['typedef', 'define', 'struct', 'alias'], correct: 0 },
  { id: 11, text: 'What is a segmentation fault?', options: ['Accessing invalid memory', 'Dividing by zero', 'Stack overflow', 'Null function call'], correct: 0 },
  { id: 12, text: 'What does the -> operator do?', options: ['Access member via pointer', 'Access member via struct', 'Dereference and access', 'Arrow function declaration'], correct: 0 },
]

const questionSets = {
  1: linuxQuestions,
  2: cQuestions,
  3: linuxQuestions,
  4: cQuestions,
  5: linuxQuestions,
  6: linuxQuestions,
}

export default function SkillAssessment() {
  const [activeTopic, setActiveTopic] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  if (!activeTopic) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Placement Test</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Map your current Linux & C level</p>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            Recommended: Start with Linux Basics
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map(topic => (
            <div key={topic.id} className="glass-card p-6">
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{topic.name}</h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{topic.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{topic.difficulty}</span>
                <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-text-muted)' }}>{topic.questions} Q</span>
                <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-text-muted)' }}>{topic.time}</span>
              </div>
              <button onClick={() => { setActiveTopic(topic.id); setCurrentQ(0); setAnswers({}); setSubmitted(false); setShowExplanation(false) }}
                className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                style={{ background: 'var(--color-accent)' }}
              >Start Test</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const topic = topics.find(t => t.id === activeTopic)
  const questions = questionSets[activeTopic] || linuxQuestions
  const q = questions[currentQ]
  const isLast = currentQ === questions.length - 1
  const answeredCount = Object.keys(answers).length

  if (submitted) {
    const correct = questions.filter(q => answers[q.id] === q.correct).length
    const total = questions.length
    const pct = Math.round((correct / total) * 100)
    const weakTopics = []
    if (pct < 50) weakTopics.push('Linux Basics')
    if (pct < 40) weakTopics.push('C Programming')

    return (
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: pct >= 60 ? 'rgba(29,120,116,0.15)' : 'rgba(239,68,68,0.15)' }}>
            <span className="text-3xl font-bold" style={{ color: pct >= 60 ? '#1D7874' : '#EF4444' }}>{pct}%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Placement Complete!</h2>
          <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>{topic.name} — {total} questions</p>

          {weakTopics.length > 0 && (
            <div className="p-4 rounded-xl mb-4 inline-flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <span>⚠️</span>
              <span className="text-sm font-medium" style={{ color: '#EF4444' }}>Weak areas flagged: {weakTopics.join(', ')}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
              <p className="text-2xl font-bold" style={{ color: '#1D7874' }}>{correct}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Correct</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>{total - correct}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Wrong</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{total}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Total</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setShowExplanation(true) }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            >Review Answers</button>
            <button onClick={() => setActiveTopic(null)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: 'var(--color-accent)' }}
            >Back to Tests</button>
          </div>
        </div>

        {showExplanation && (
          <div className="mt-6 space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <span className={`text-sm font-bold mt-0.5 ${answers[q.id] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {answers[q.id] === q.correct ? '✓' : '✗'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Q{i+1}. {q.text}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                      Your answer: {q.options[answers[q.id]]} | Correct: {q.options[q.correct]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{topic.name}</h2>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Placement Test • {topic.difficulty} level</p>
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>{answeredCount}/{questions.length} answered</span>
      </div>

      <div className="h-2 rounded-full mb-6" style={{ background: 'var(--color-accent-light)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, background: 'var(--color-accent)' }} />
      </div>

      <div className="glass-card p-6 lg:p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            Question {currentQ + 1} of {questions.length}
          </span>
          {answers[q.id] !== undefined && (
            <span className="text-xs font-medium" style={{ color: '#22C55E' }}>✓ Answered</span>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-2 mb-6" style={{ color: 'var(--color-text-primary)' }}>{q.text}</h3>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
              className="w-full p-4 rounded-xl text-left text-sm font-medium transition-all border"
              style={{
                background: answers[q.id] === i ? 'var(--color-accent-light)' : 'var(--color-bg-card)',
                borderColor: answers[q.id] === i ? 'var(--color-accent)' : 'var(--color-border)',
                color: answers[q.id] === i ? 'var(--color-accent)' : 'var(--color-text-primary)',
              }}
            >{opt}</button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setCurrentQ(p => Math.max(0, p - 1))} disabled={currentQ === 0}
          className="px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-30"
          style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        >Previous</button>
        {isLast ? (
          <button onClick={() => setSubmitted(true)} disabled={answeredCount < questions.length}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-30"
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
  )
}
