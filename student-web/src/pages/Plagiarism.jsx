import { useState } from 'react'

export default function Plagiarism() {
  const [dragOver, setDragOver] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const [showComparison, setShowComparison] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      setUploaded(true)
    }
  }

  const handleBrowse = () => {
    setFileName('submission_code.c')
    setUploaded(true)
  }

  const results = {
    overall: 23,
    color: '#22C55E',
    sources: [
      { name: 'github.com/user/vlsi-project', similarity: 15, match: 'void setup_timer() { TCCR1B |= (1 << CS11); }' },
      { name: 'stackoverflow.com/questions/12345', similarity: 8, match: '// Initialize SPI communication SPI.begin();' },
    ]
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Plagiarism Checker</h2>

      {!uploaded ? (
        <div
          className={`glass-card p-12 lg:p-16 text-center border-2 border-dashed transition-all cursor-pointer`}
          style={{ borderColor: dragOver ? 'var(--color-accent)' : 'var(--color-border)' }}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={handleBrowse}
        >
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: dragOver ? 'var(--color-accent-light)' : 'transparent' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            {dragOver ? 'Drop your file here' : 'Upload Code File'}
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Drag & drop a .c, .cpp, .py, .java, or .js file
          </p>
          <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--color-accent)' }}>
            Browse Files
          </button>
        </div>
      ) : (
        <>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{fileName}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Scanned against 2.4M+ sources</p>
                </div>
              </div>
              <span className="text-2xl font-bold" style={{ color: results.color }}>{results.overall}%</span>
            </div>
            <div className="h-3 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
              <div className="h-full rounded-full" style={{ width: `${results.overall}%`, background: results.color }} />
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} /> Low (0-24%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} /> Medium (25-49%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#EF4444' }} /> High (50%+)</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Matched Sources</h3>
            <div className="space-y-3">
              {results.sources.map((src, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/></svg>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{src.name}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: results.color }}>{src.similarity}%</span>
                  </div>
                  <code className="block text-xs p-3 rounded-lg font-mono" style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}>
                    {src.match}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setShowComparison(!showComparison)}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            {showComparison ? 'Hide Comparison' : 'View Side-by-Side Comparison'}
          </button>

          {showComparison && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="glass-card p-4 overflow-hidden">
                <div className="text-xs font-semibold mb-3 px-2" style={{ color: 'var(--color-accent)' }}>Your Code</div>
                <pre className="text-xs font-mono leading-5 overflow-x-auto" style={{ color: 'var(--color-text-primary)' }}>
{`#include <stdio.h>
#include <avr/io.h>

void setup_timer() {
    TCCR1B |= (1 << CS11);
}

int main() {
    setup_timer();
    SPI.begin();
    while(1);
    return 0;
}`}
                </pre>
              </div>
              <div className="glass-card p-4 overflow-hidden">
                <div className="text-xs font-semibold mb-3 px-2" style={{ color: '#EF4444' }}>Matched Source</div>
                <pre className="text-xs font-mono leading-5 overflow-x-auto" style={{ color: 'var(--color-text-primary)' }}>
{`// From: github.com/user/vlsi-project
#include <avr/io.h>

void setup_timer() {
    TCCR1B |= (1 << CS11);  // Match
}

// Initialize SPI
void init_spi() {
    SPI.begin();  // Match
}`}
                </pre>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
