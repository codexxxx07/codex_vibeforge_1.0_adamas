import { useState } from 'react'

const initialStack = [
  {
    id: 1, name: 'Linux', level: 1, proficiency: 85,
    description: 'Operating system fundamentals, command line, file systems, process management',
    courses: ['Linux Basics', 'System Administration', 'Shell Scripting'],
    projects: ['Custom Shell', 'File Manager CLI'],
    expanded: false,
  },
  {
    id: 2, name: 'Shell', level: 2, proficiency: 75,
    description: 'Bash scripting, automation, text processing with awk/sed, pipes and redirections',
    courses: ['Advanced Bash', 'Automation with Scripts'],
    projects: ['Automated Backup System', 'Log Analyzer'],
    expanded: false,
  },
  {
    id: 3, name: 'C Programming', level: 3, proficiency: 80,
    description: 'Procedural programming, memory management, pointers, data structures',
    courses: ['C Programming Fundamentals', 'Data Structures in C', 'System Programming'],
    projects: ['Mini Database Engine', 'Memory Allocator'],
    expanded: false,
  },
  {
    id: 4, name: 'Open Source', level: 4, proficiency: 45,
    description: 'Contributing to open-source projects, Git workflows, code review, collaborative development',
    courses: ['Git & GitHub', 'Open Source Contribution'],
    projects: ['Contributed to Linux Kernel', 'Shipwise Platform'],
    expanded: false,
  },
  {
    id: 5, name: 'Embedded C', level: 5, proficiency: 55,
    description: 'Microcontroller programming, hardware interaction, real-time constraints',
    courses: ['Embedded C', 'RTOS Fundamentals'],
    projects: ['IoT Sensor Node', 'Motor Controller'],
    expanded: false,
  },
  {
    id: 6, name: 'VLSI Design', level: 6, proficiency: 65,
    description: 'Digital circuit design, Verilog/VHDL, synthesis, timing analysis',
    courses: ['Digital Design', 'VLSI Methodology'],
    projects: ['RISC-V Core', 'Memory Controller'],
    expanded: false,
  },
]

export default function SkillStack() {
  const [stack, setStack] = useState(initialStack)

  const toggleExpand = (id) => {
    setStack(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Skill Stack</h2>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>Your learning progression path — from foundations to mastery</p>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: 'var(--color-border)' }} />

        <div className="space-y-6">
          {stack.map((skill, idx) => (
            <div key={skill.id} className="relative">
              <div className="absolute left-8 top-6 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-10" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-accent)' }} />

              <div className="ml-16">
                <div
                  className="glass-card p-5 cursor-pointer transition-all hover:glow"
                  onClick={() => toggleExpand(skill.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg text-white" style={{ background: 'var(--color-accent)' }}>
                        Level {skill.level}
                      </span>
                      <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{skill.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{skill.proficiency}%</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ color: 'var(--color-text-muted)', transform: skill.expanded ? 'rotate(180deg)' : '' }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <div className="h-2.5 rounded-full" style={{ background: 'var(--color-accent-light)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${skill.proficiency}%`, background: 'var(--color-accent)' }} />
                  </div>

                  <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>{skill.description}</p>

                  {skill.expanded && (
                    <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: 'var(--color-border)' }}>
                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>COURSES</p>
                        <div className="flex flex-wrap gap-2">
                          {skill.courses.map((c, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-lg font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>PROJECTS</p>
                        <div className="flex flex-wrap gap-2">
                          {skill.projects.map((p, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-lg font-medium" style={{ background: 'rgba(238,150,75,0.15)', color: '#EE964B' }}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      {idx < stack.length - 1 && (
                        <div className="p-3 rounded-xl" style={{ background: 'rgba(29,120,116,0.05)' }}>
                          <p className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                            Next: Master {stack[idx + 1].name} → {stack[idx + 1].description.split(',')[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 mt-8">
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--color-text-primary)' }}>Recommended Learning Path</h3>
        <div className="flex flex-wrap gap-2">
          {['Linux Fundamentals', 'Shell Scripting', 'C Programming', 'Data Structures', 'Embedded C', 'VLSI Design', 'Open Source Contribution'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                {step}
              </span>
              {i < 6 && <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
