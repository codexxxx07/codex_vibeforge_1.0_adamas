import { useState } from 'react'

const exercises = [
  { id: 1, title: 'Reverse a String (C)', difficulty: 'Easy', cmd: 'gcc -o reverse reverse.c && ./reverse', test: 'Input: "hello" -> Output: "olleh"' },
  { id: 2, title: 'File Permissions Check (Shell)', difficulty: 'Easy', cmd: 'bash permissions.sh', test: 'Check rwx bits on /tmp/test.txt' },
  { id: 3, title: 'Merge Sort (C)', difficulty: 'Medium', cmd: 'gcc -o mergesort mergesort.c && ./mergesort', test: 'Array: [38,27,43,3,9,82,10]' },
  { id: 4, title: 'Process Lister (Linux)', difficulty: 'Medium', cmd: 'gcc -o proclist proclist.c && ./proclist', test: 'List all zombie processes' },
  { id: 5, title: 'Shell Script — Backup', difficulty: 'Hard', cmd: 'bash backup.sh', test: 'Tar + gzip /var/log -> /backup/logs' },
  { id: 6, title: 'Socket Programming (C)', difficulty: 'Hard', cmd: 'gcc -o server server.c -lpthread && ./server', test: 'TCP echo server on port 8080' },
]

const previewCodes = {
  1: `#include <stdio.h>
#include <string.h>

void reverse(char *s) {
  int n = strlen(s);
  for (int i = 0; i < n / 2; i++) {
    char t = s[i];
    s[i] = s[n - 1 - i];
    s[n - 1 - i] = t;
  }
}

int main() {
  char s[] = "hello";
  reverse(s);
  printf("%s\\n", s);
  return 0;
}`,
  3: `#include <stdio.h>

void merge(int a[], int l, int m, int r) {
  int n1 = m - l + 1, n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = a[l + i];
  for (int j = 0; j < n2; j++) R[j] = a[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2)
    a[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
  while (i < n1) a[k++] = L[i++];
  while (j < n2) a[k++] = R[j++];
}

void sort(int a[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    sort(a, l, m);
    sort(a, m + 1, r);
    merge(a, l, m, r);
  }
}

int main() {
  int arr[] = {38, 27, 43, 3, 9, 82, 10};
  int n = sizeof(arr)/sizeof(arr[0]);
  sort(arr, 0, n - 1);
  for (int i = 0; i < n; i++) printf("%d ", arr[i]);
  printf("\\n");
  return 0;
}`,
}

const terminalHistory = [
  { dir: '~', cmd: './terminal --start lab-session' },
  { dir: 'lab~', out: 'Lab session initialized. Container ready.' },
]

export default function PracticeLab() {
  const [activeTab, setActiveTab] = useState('exercise')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [code, setCode] = useState('')
  const [terminal, setTerminal] = useState(terminalHistory)
  const [termCmd, setTermCmd] = useState('')
  const [termDir, setTermDir] = useState('lab~')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)

  const selectExercise = (ex) => {
    setSelectedExercise(ex)
    setCode(previewCodes[ex.id] || '// Write your code here')
    setOutput('')
  }

  const runCode = () => {
    setRunning(true)
    setOutput('Compiling...')
    setTimeout(() => {
      setOutput('✅ Compilation successful.\n' + (selectedExercise?.test || '') + '\n> Output will appear here in production.')
      setRunning(false)
      setTerminal(prev => [...prev, { dir: termDir, out: 'Program executed successfully.' }])
    }, 1200)
  }

  const sendCommand = (e) => {
    e?.preventDefault()
    if (!termCmd.trim()) return
    setTerminal(prev => [...prev, { dir: termDir, cmd: termCmd }])
    setTimeout(() => {
      setTerminal(prev => [...prev, { dir: termDir, out: `[executed] ${termCmd}` }])
    }, 300)
    setTermCmd('')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Practice Lab</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>In-browser Linux terminal + C code editor</p>
        </div>
        <div className="flex gap-2">
          <TabBtn label="Exercise" active={activeTab === 'exercise'} onClick={() => setActiveTab('exercise')} />
          <TabBtn label="Terminal" active={activeTab === 'terminal'} onClick={() => setActiveTab('terminal')} />
        </div>
      </div>

      {activeTab === 'exercise' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-2">
            {exercises.map(ex => (
              <button key={ex.id} onClick={() => selectExercise(ex)}
                className="w-full glass-card p-3 text-left transition-all"
                style={{
                  border: selectedExercise?.id === ex.id ? '1.5px solid var(--color-accent)' : '1px solid transparent',
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{ex.title}</h3>
                  <DifficultyBadge level={ex.difficulty} />
                </div>
                <p className="text-xs mt-1 font-mono" style={{ color: 'var(--color-text-muted)' }}>{ex.cmd}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {selectedExercise ? (
              <>
                <div className="glass-card overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs font-mono ml-2" style={{ color: 'var(--color-text-muted)' }}>editor.c</span>
                    </div>
                    <button onClick={runCode} disabled={running}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all flex items-center gap-1.5"
                      style={{ background: running ? '#6B7280' : 'var(--color-accent)' }}
                    >
                      {running ? (
                        <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/><path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor"/></svg> Running</>
                      ) : (
                        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run</>
                      )}
                    </button>
                  </div>
                  <textarea value={code} onChange={e => setCode(e.target.value)}
                    className="w-full h-64 p-4 font-mono text-sm outline-none resize-none border-0"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
                    spellCheck={false}
                  />
                </div>

                {output && (
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-xs font-semibold" style={{ color: '#22C55E' }}>Output</span>
                    </div>
                    <pre className="text-xs font-mono whitespace-pre-wrap" style={{ color: 'var(--color-text-primary)' }}>{output}</pre>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/></svg>
                <p className="text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>Select an exercise from the left to start coding</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'terminal' && (
        <div className="glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#1a1a2e', borderColor: '#2a2a4e' }}>
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs font-mono ml-2 text-gray-400">terminal — Linux Container</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded ml-auto" style={{ background: 'rgba(91,157,240,0.15)', color: '#5b9df0' }}>ACTIVE</span>
          </div>
          <div className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed" style={{ background: '#0d0d1a', color: '#e0e0e0' }}>
            {terminal.map((entry, i) => (
              <div key={i}>
                {entry.cmd !== undefined ? (
                  <div><span className="text-green-400">root@lab:</span><span className="text-blue-400">~$ </span>{entry.cmd}</div>
                ) : (
                  <div className="text-gray-400 ml-4">{entry.out}</div>
                )}
              </div>
            ))}
            <form onSubmit={sendCommand} className="flex items-center gap-1">
              <span className="text-green-400">root@lab:</span>
              <span className="text-blue-400">~$ </span>
              <input value={termCmd} onChange={e => setTermCmd(e.target.value)} autoFocus
                className="flex-1 bg-transparent outline-none text-white border-0"
                placeholder="type a command..."
              />
            </form>
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
      style={{
        background: active ? 'var(--color-accent)' : 'var(--color-accent-light)',
        color: active ? '#fff' : 'var(--color-accent)',
      }}
    >{label}</button>
  )
}

function DifficultyBadge({ level }) {
  const colors = { Easy: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' }, Medium: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' }, Hard: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' } }
  const c = colors[level]
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: c.bg, color: c.text }}>{level}</span>
}
