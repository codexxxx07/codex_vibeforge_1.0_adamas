import { useState, useRef, useEffect } from 'react'

const suggestions = ['Explain polymorphism in C++', 'What is a flip-flop?', 'How does TCP work?', 'Explain the OSI model', 'What is a deadlock?']

export default function AITutor() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I\'m Shipwise AI, your learning assistant. Ask me anything about your courses! 📚', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorInput, setErrorInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

  const responses = {
    'explain polymorphism in c++': 'Polymorphism allows objects of different classes to be treated as objects of a common base class. In C++, it\'s achieved through virtual functions. When a base class pointer calls a virtual function, the derived class\'s version is executed — this is called dynamic dispatch. Example:\n\n```cpp\nclass Shape {\n  virtual void draw() { cout << "Shape"; }\n};\nclass Circle : public Shape {\n  void draw() override { cout << "Circle"; }\n};\n```\n\nThis enables writing flexible, extensible code following the Open-Closed Principle.',
    'what is a flip-flop': 'A flip-flop is a sequential digital circuit that can store one bit of data. It has two stable states (0 and 1) and changes state only on a clock edge. Common types:\n\n- **SR Flip-Flop**: Set-Reset, basic storage\n- **D Flip-Flop**: Data/Delay, captures input on clock edge\n- **JK Flip-Flop**: Universal, toggles when J=K=1\n- **T Flip-Flop**: Toggle, changes state each clock\n\nFlip-flops are the building blocks of registers, counters, and memory in digital systems.',
    'how does tcp work': 'TCP (Transmission Control Protocol) ensures reliable, ordered data delivery over IP networks. Key mechanisms:\n\n1. **Three-way handshake**: SYN → SYN-ACK → ACK (connection establishment)\n2. **Sequence numbers**: Track byte order and detect duplicates\n3. **ACK & Retransmission**: Lost packets are resent\n4. **Flow control**: Sliding window prevents overwhelming the receiver\n5. **Congestion control**: AIMD (Additive Increase Multiplicative Decrease) manages network load\n\nTCP guarantees that data arrives complete and in order, making it ideal for web browsing, email, and file transfers.',
    'explain the osi model': 'The OSI (Open Systems Interconnection) model has 7 layers:\n\n1. **Physical** — Raw bit transmission over wire/fiber/radio\n2. **Data Link** — Framing, MAC addresses, error detection (Ethernet, WiFi)\n3. **Network** — Routing, IP addressing (IP, ICMP)\n4. **Transport** — End-to-end reliability (TCP, UDP)\n5. **Session** — Session management, synchronization\n6. **Presentation** — Data formatting, encryption, compression\n7. **Application** — User-facing protocols (HTTP, FTP, SMTP)\n\nEach layer serves the layer above and abstracts complexity below.',
    'what is a deadlock': 'A deadlock occurs when two or more processes are blocked forever, each waiting for a resource held by another. Four necessary conditions (Coffman conditions):\n\n1. **Mutual Exclusion**: Resources are non-shareable\n2. **Hold and Wait**: Processes hold resources while waiting\n3. **No Preemption**: Resources can\'t be forcibly taken\n4. **Circular Wait**: A cycle of waiting processes exists\n\n**Solutions**: Prevention (break one condition), Avoidance (Banker\'s Algorithm), Detection & Recovery (kill processes), or Ostrich Algorithm (ignore it).',
  }

  const sendMessage = (text) => {
    const msg = text || input
    if (!msg.trim()) return
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setMessages(prev => [...prev, { role: 'user', text: msg, time }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const lower = msg.toLowerCase().trim().replace(/[?.!]/g, '')
      let reply = responses[lower]
      if (!reply) {
        const keys = Object.keys(responses)
        const matched = keys.find(k => lower.includes(k))
        reply = matched ? responses[matched] : `Great question about "${msg}"! This is a topic I can help you with. Could you be more specific about what you'd like to learn? I can explain concepts, provide examples, or suggest resources.`
      }
      setMessages(prev => [...prev, { role: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
      setIsTyping(false)
    }, 1500)
  }

  const explainError = () => {
    if (!errorInput.trim()) return
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { role: 'user', text: `Help me understand this error: ${errorInput}`, time }])
    setErrorInput('')
    setShowErrorModal(false)
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: `Let me break down this error for you:\n\n**Error Analysis:**\nThe error you're seeing is typically caused by a type mismatch or undefined reference. Here's how to fix it:\n\n1. Check the line number mentioned in the error\n2. Verify that all variables are declared before use\n3. Ensure function signatures match their definitions\n4. Look for missing semicolons or braces\n\n**Common fixes:**\n- Add the proper #include directive\n- Declare the variable with the correct type\n- Check for null pointer dereferences\n\nWould you like me to explain a specific part of this in more detail?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="glass-card flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--color-border)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'var(--color-accent)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>Shipwise AI</h3>
            <p className="text-xs" style={{ color: '#22C55E' }}>Online • Ready to help</p>
          </div>
          <button onClick={() => setShowErrorModal(true)}
            className="ml-auto px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            Explain Error
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex gap-3 max-w-[85%]">
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1" style={{ background: 'var(--color-accent-light)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/></svg>
                  </div>
                )}
                <div>
                  <div className={`p-4 rounded-2xl ${m.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                    style={{
                      background: m.role === 'user' ? 'var(--color-accent)' : 'var(--color-accent-light)',
                      color: m.role === 'user' ? '#fff' : 'var(--color-text-primary)',
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  </div>
                  <p className={`text-[10px] mt-1 ${m.role === 'user' ? 'text-right' : ''}`} style={{ color: 'var(--color-text-muted)' }}>{m.time}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-accent-light)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/></svg>
                </div>
                <div className="p-4 rounded-2xl rounded-bl-sm flex items-center gap-1" style={{ background: 'var(--color-accent-light)' }}>
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all hover:glow"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything about your courses..."
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            />
            <button onClick={() => sendMessage()}
              className="px-4 py-3 rounded-xl text-white transition-all"
              style={{ background: 'var(--color-accent)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowErrorModal(false)}>
          <div className="w-full max-w-lg glass-card p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Explain an Error</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Paste your error message and I'll explain what it means and how to fix it.</p>
            <textarea value={errorInput} onChange={e => setErrorInput(e.target.value)} rows={4}
              placeholder="Paste your compiler/runtime error here..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none mb-4"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowErrorModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
              >Cancel</button>
              <button onClick={explainError}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--color-accent)' }}
              >Explain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
