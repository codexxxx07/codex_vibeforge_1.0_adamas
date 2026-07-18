import { useState } from 'react'

const contributionData = Array.from({ length: 53 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
)

const getColor = (count) => {
  if (count === 0) return 'var(--color-accent-light)'
  if (count === 1) return 'rgba(29,120,116,0.3)'
  if (count === 2) return 'rgba(29,120,116,0.5)'
  if (count === 3) return 'rgba(29,120,116,0.7)'
  return 'var(--color-accent)'
}

const repos = [
  { name: 'shipwise-platform', stars: 45, forks: 12, language: 'React', updated: '2 days ago' },
  { name: 'dsa-practice', stars: 23, forks: 8, language: 'C++', updated: '5 days ago' },
  { name: 'vlsi-toolkit', stars: 67, forks: 19, language: 'Python', updated: '1 week ago' },
  { name: 'embedded-lab', stars: 12, forks: 4, language: 'C', updated: '2 weeks ago' },
  { name: 'open-source-guide', stars: 89, forks: 34, language: 'Markdown', updated: '3 weeks ago' },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function GitHubTracker() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Open Source Tracker</h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#24292E' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>alexjohnson</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Contributions', value: '847', color: '#1D7874' },
          { label: 'Current Streak', value: '14 days', color: '#F4D35E' },
          { label: 'Longest Streak', value: '47 days', color: '#EE964B' },
          { label: 'Repos Contributed', value: '12', color: '#7C3AED' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Contribution Activity</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-1" style={{ minWidth: '700px' }}>
            <div className="flex flex-col gap-1 pr-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <span key={d} className="text-[10px] h-3 leading-3" style={{ color: 'var(--color-text-muted)' }}>{d}</span>
              ))}
            </div>
            <div className="flex gap-1">
              {contributionData.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <div key={di} className="w-3 h-3 rounded-sm" style={{ background: getColor(day) }} title={`${day} contributions`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(v => (
            <div key={v} className="w-3 h-3 rounded-sm" style={{ background: getColor(v) }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Repositories</h3>
        <div className="space-y-3">
          {repos.map((repo, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>{repo.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: repo.language === 'React' ? '#61DAFB' : repo.language === 'C++' ? '#F34B7D' : repo.language === 'Python' ? '#3572A5' : repo.language === 'C' ? '#555555' : '#083FA1' }} />
                    {repo.language}
                  </span>
                  <span>Updated {repo.updated}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  {repo.forks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Recent Pull Requests</h3>
        <div className="space-y-2">
          {[
            { title: 'Fix memory leak in memory allocator', repo: 'dsa-practice', status: 'open', date: '2 days ago' },
            { title: 'Add I2C driver implementation', repo: 'embedded-lab', status: 'merged', date: '1 week ago' },
            { title: 'Update documentation for VLSI toolkit', repo: 'vlsi-toolkit', status: 'open', date: '1 week ago' },
          ].map((pr, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: pr.status === 'merged' ? '#7C3AED' : '#22C55E' }}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{pr.title}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{pr.repo} • {pr.date}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${pr.status === 'merged' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}
                style={{ background: pr.status === 'merged' ? 'rgba(124,58,237,0.15)' : 'rgba(34,197,94,0.15)', color: pr.status === 'merged' ? '#7C3AED' : '#22C55E' }}
              >
                {pr.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
