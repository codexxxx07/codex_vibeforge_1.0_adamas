import { useState, useRef, useEffect } from 'react'

const commands = {
  help: 'Available commands: ls, cd, pwd, cat, whoami, help, clear, echo, date, uname -a, neofetch, history',
  whoami: 'student@shipwise',
  pwd: '/home/student/shipwise',
  uname: { '-a': 'Linux shipwise 6.1.0-x86_64 #1 SMP PREEMPT ShipwiseOS' },
  date: new Date().toString(),
  neofetch: `
        ██████████
      ██          ██
    ██  ██      ██  ██    student@shipwise
   ██  ████████████  ██   --------------------
   ██  ██        ██  ██   OS: ShipwiseOS 1.0
    ██  ██      ██  ██    Shell: bash 5.1.16
      ██          ██      Uptime: 47 days, 6h
        ██████████        Theme: Shipwise Dark
                          Terminal: ShipwiseTerm
  `.trim(),
}

const fileSystem = {
  '/': {
    'home': {
      'student': {
        'shipwise': {
          'courses': { 'vlsi': '📁', 'dsa': '📁', 'embedded': '📁' },
          'projects': { 'calculator.c': '📄', 'sorting.c': '📄' },
          'notes.txt': '📄',
          'README.md': '📄',
        }
      }
    },
    'etc': { 'passwd': '📄', 'hostname': '📄' },
    'usr': { 'bin': { 'gcc': '📄', 'python': '📄' } },
    'var': { 'log': { 'syslog': '📄' } },
  }
}

function getNode(path, fs) {
  const parts = path.split('/').filter(Boolean)
  let node = fs
  for (const p of parts) {
    if (node[p]) node = node[p]
    else return null
  }
  return node
}

function listContents(node) {
  if (!node || typeof node === 'string') return []
  return Object.keys(node)
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { cmd: '', output: '🌟 Welcome to Shipwise Terminal v1.0\nType "help" for available commands.\n' },
  ])
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState('/home/student/shipwise')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [history])

  const runCommand = (cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setCmdHistory(prev => [...prev, trimmed])
    setHistIdx(-1)

    const parts = trimmed.split(/\s+/)
    const base = parts[0]
    const arg = parts.slice(1).join(' ')

    let output = ''

    if (base === 'clear') {
      setHistory([])
      return
    }

    if (base === 'ls') {
      const node = getNode(cwd, fileSystem['/'])
      const contents = listContents(node)
      output = contents.length ? contents.map(c => {
        const val = getNode(cwd + '/' + c, fileSystem['/'])
        return typeof val === 'object' ? c + '/' : c
      }).join('  ') : '(empty)'
    } else if (base === 'cd') {
      if (!arg || arg === '~' || arg === '/home/student') {
        setCwd('/home/student/shipwise')
        output = ''
        setHistory(prev => [...prev, { cmd, output: '' }])
        setInput('')
        return
      }
      if (arg === '..') {
        const newCwd = cwd.split('/').slice(0, -1).join('/') || '/'
        setCwd(newCwd)
        output = ''
        setHistory(prev => [...prev, { cmd, output: '' }])
        setInput('')
        return
      }
      const target = cwd + '/' + arg
      const node = getNode(target, fileSystem['/'])
      if (node && typeof node === 'object') {
        setCwd(target)
        output = ''
        setHistory(prev => [...prev, { cmd, output: '' }])
        setInput('')
        return
      } else {
        output = `cd: ${arg}: No such directory`
      }
    } else if (base === 'cat') {
      if (arg === 'notes.txt') {
        output = '📝 Shipwise Learning Notes\n- Complete VLSI modules 1-4\n- Practice DSA problems daily\n- Prepare for Embedded Systems exam'
      } else if (arg === 'README.md') {
        output = '# Shipwise Student Platform\n"Navigate Knowledge Wisely"\n\nA comprehensive learning management system.'
      } else if (arg === 'passwd') {
        output = 'student:x:1000:1000:Student:/home/student:/bin/bash'
      } else if (arg === 'hostname') {
        output = 'shipwise-station'
      } else {
        output = `cat: ${arg}: No such file`
      }
    } else if (base === 'echo') {
      output = arg || ''
    } else if (base === 'whoami') {
      output = commands.whoami
    } else if (base === 'pwd') {
      output = cwd
    } else if (base === 'uname' && parts[1] === '-a') {
      output = commands.uname['-a']
    } else if (base === 'date') {
      output = commands.date
    } else if (base === 'neofetch') {
      output = commands.neofetch
    } else if (base === 'history') {
      output = cmdHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n')
    } else if (base === 'help') {
      output = commands.help
    } else if (base === 'sudo') {
      output = 'Nice try! 😄 This is a student terminal.'
    } else if (base === 'vim' || base === 'nano' || base === 'emacs') {
      output = `Vim/Nano/Emacs not available. Use "echo" to write text.`
    } else if (base === 'lsblk' || base === 'df' || base === 'free') {
      output = `Simulated: ${base} output unavailable in sandbox`
    } else {
      output = `bash: ${base}: command not found`
    }

    setHistory(prev => [...prev, { cmd, output }])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1)
        setHistIdx(idx)
        setInput(cmdHistory[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx >= 0) {
        const idx = histIdx + 1
        if (idx >= cmdHistory.length) {
          setHistIdx(-1)
          setInput('')
        } else {
          setHistIdx(idx)
          setInput(cmdHistory[idx])
        }
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto" onClick={() => inputRef.current?.focus()}>
      <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#2D2D2D', borderBottom: '1px solid #404040' }}>
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-sm font-medium" style={{ color: '#CCC' }}>Terminal — shipwise@student</span>
        </div>
        <div
          className="h-[500px] overflow-y-auto p-4 font-mono text-sm leading-6"
          style={{ background: '#0D1117', color: '#00FF00' }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, i) => (
            <div key={i}>
              {entry.cmd && (
                <div>
                  <span style={{ color: '#00FF00' }}>student@shipwise</span>
                  <span style={{ color: '#569CD6' }}>:</span>
                  <span style={{ color: '#569CD6' }}>{cwd}</span>
                  <span style={{ color: '#00FF00' }}>$ </span>
                  <span style={{ color: '#C9D1D9' }}>{entry.cmd}</span>
                </div>
              )}
              {entry.output && (
                <div className="whitespace-pre-wrap" style={{ color: '#C9D1D9' }}>{entry.output}</div>
              )}
            </div>
          ))}
          <div>
            <span style={{ color: '#00FF00' }}>student@shipwise</span>
            <span style={{ color: '#569CD6' }}>:</span>
            <span style={{ color: '#569CD6' }}>{cwd}</span>
            <span style={{ color: '#00FF00' }}>$ </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none inline-block"
              style={{ color: '#C9D1D9', caretColor: '#00FF00', width: `${Math.max(input.length * 8, 20)}px`, minWidth: '100px' }}
              spellCheck={false}
              autoFocus
            />
            <span className="animate-pulse inline-block w-2 h-4 ml-0.5" style={{ background: '#00FF00' }} />
          </div>
          <div ref={endRef} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Try: help, ls, pwd, whoami, neofetch, echo hello</p>
      </div>
    </div>
  )
}
