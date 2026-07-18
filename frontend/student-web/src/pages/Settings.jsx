import { useState } from 'react'
import { useTheme } from '../ThemeContext'

export default function Settings() {
  const { darkMode, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false })
  const [lowDataMode, setLowDataMode] = useState(false)
  const [audioOnly, setAudioOnly] = useState(false)
  const [offlineDownload, setOfflineDownload] = useState(false)
  const [saved, setSaved] = useState(false)

  const settingGroups = [
    {
      title: 'Notifications',
      items: [
        { key: 'email', label: 'Email Notifications', desc: 'Assignment due reminders & grade alerts' },
        { key: 'push', label: 'Push Notifications', desc: 'Live class reminders & doubt replies' },
        { key: 'sms', label: 'SMS Alerts', desc: 'Critical updates via SMS' },
      ],
    },
    {
      title: 'Data & Performance',
      items: [
        { key: 'lowData', label: 'Low Data Mode', desc: 'Reduce video quality to 144p, disable animations' },
        { key: 'audioOnly', label: 'Audio-Only Streaming', desc: 'Stream live classes in audio-only mode' },
        { key: 'offline', label: 'Auto Offline Download', desc: 'Download completed recordings for offline access' },
      ],
      custom: true,
    },
  ]

  const handleToggle = (key) => {
    if (key === 'email' || key === 'push' || key === 'sms') {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }
    if (key === 'lowData') setLowDataMode(!lowDataMode)
    if (key === 'audioOnly') setAudioOnly(!audioOnly)
    if (key === 'offline') setOfflineDownload(!offlineDownload)
    setSaved(false)
  }

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Settings</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Preferences, appearance & data management</p>
        </div>
        <button onClick={saveSettings}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all flex items-center gap-2"
          style={{ background: saved ? '#22C55E' : 'var(--color-accent)' }}
        >
          {saved ? (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Saved</>
          ) : 'Save Settings'}
        </button>
      </div>

      <div className="glass-card p-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Appearance</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Toggle between light and dark theme</p>
          </div>
          <button onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-all flex items-center p-1"
            style={{ background: darkMode ? '#1D7874' : '#E5E7EB' }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center"
              style={{ transform: darkMode ? 'translateX(28px)' : 'translateX(0)' }}>
              {darkMode ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F4D35E"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="#F59E0B" strokeWidth="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="#F59E0B" strokeWidth="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#F59E0B" strokeWidth="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#F59E0B" strokeWidth="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="#F59E0B" strokeWidth="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="#F59E0B" strokeWidth="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#F59E0B" strokeWidth="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#F59E0B" strokeWidth="2"/></svg>
              )}
            </div>
          </button>
        </div>
      </div>

      {settingGroups.map(group => (
        <div key={group.title} className="glass-card p-5 mb-4">
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>{group.title}</h3>
          <div className="space-y-4">
            {group.items.map(item => {
              const checked = group.custom
                ? item.key === 'lowData' ? lowDataMode : item.key === 'audioOnly' ? audioOnly : offlineDownload
                : notifications[item.key]
              return (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                  </div>
                  <button onClick={() => handleToggle(item.key)}
                    className="relative w-12 h-6 rounded-full transition-all shrink-0"
                    style={{ background: checked ? 'var(--color-accent)' : '#E5E7EB' }}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: checked ? 'translateX(24px)' : 'translateX(2px)' }} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="glass-card p-5 mb-4">
        <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text-primary)' }}>Account</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Profile</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Update your name, email, and photo</p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-accent)' }}>Edit</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Password & Security</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Change password, 2FA, session management</p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-accent)' }}>Manage</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: '#EF4444' }}>Delete Account</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Permanently delete your account and all data</p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg text-white" style={{ background: '#EF4444' }}>Delete</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text-primary)' }}>Storage & Downloads</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Cached Data</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>234 MB — clear to free space</p>
              </div>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>Clear</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--color-accent-light)' }}>
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Downloaded Recordings</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>3 files — 1.2 GB</p>
              </div>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>Manage</button>
          </div>
        </div>
      </div>
    </div>
  )
}
