import { useState } from 'react'
import { useTheme } from '../ThemeContext'

export default function Settings() {
  const { dark, toggle } = useTheme()
  const [smtp, setSmtp] = useState({ host: 'smtp.shipwise.com', port: '587', user: 'noreply@shipwise.com', pass: '••••••••' })
  const [features, setFeatures] = useState({
    liveClasses: true,
    aiTutor: true,
    forum: true,
    certificates: true,
    assignments: true,
    quizzes: true,
    discussionBoard: false,
    webinar: false,
  })
  const [platformInfo, setPlatformInfo] = useState({
    name: 'Shipwise',
    tagline: 'Navigate Knowledge Wisely',
    logoUrl: '/logo.png',
    description: 'An advanced EdTech platform connecting students with expert mentors for immersive learning experiences.',
    supportEmail: 'support@shipwise.com',
  })
  const [maintenance, setMaintenance] = useState(false)
  const [twoFA, setTwoFA] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [passwordPolicy, setPasswordPolicy] = useState('strong')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Settings
        </h2>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: '#22C55E' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: 'var(--color-accent)' }}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Platform Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Platform Name</label>
              <input
                type="text"
                value={platformInfo.name}
                onChange={(e) => setPlatformInfo({ ...platformInfo, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Tagline</label>
              <input
                type="text"
                value={platformInfo.tagline}
                onChange={(e) => setPlatformInfo({ ...platformInfo, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Logo URL</label>
              <input
                type="text"
                value={platformInfo.logoUrl}
                onChange={(e) => setPlatformInfo({ ...platformInfo, logoUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Support Email</label>
              <input
                type="email"
                value={platformInfo.supportEmail}
                onChange={(e) => setPlatformInfo({ ...platformInfo, supportEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Description</label>
              <textarea
                rows="3"
                value={platformInfo.description}
                onChange={(e) => setPlatformInfo({ ...platformInfo, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Feature Toggles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(features).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 rounded-xl border"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              >
                <span className="text-sm font-medium capitalize" style={{ color: 'var(--color-text-primary)' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => setFeatures({ ...features, [key]: !val })}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200`}
                  style={{ background: val ? 'var(--color-accent)' : '#CBD5E1' }}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      val ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Email Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>SMTP Host</label>
              <input
                type="text"
                value={smtp.host}
                onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>SMTP Port</label>
              <input
                type="text"
                value={smtp.port}
                onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Username</label>
              <input
                type="text"
                value={smtp.user}
                onChange={(e) => setSmtp({ ...smtp, user: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Password</label>
              <input
                type="password"
                value={smtp.pass}
                onChange={(e) => setSmtp({ ...smtp, pass: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
            </div>
          </div>
          <button
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
          >
            Test Connection
          </button>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Payment Gateway
          </h3>
          <div className="p-4 rounded-xl border text-sm" style={{ background: 'var(--color-accent-light)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <div>
                <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Razorpay • Stripe • Instamojo</p>
                <p style={{ color: 'var(--color-text-muted)' }}>Payment gateway is configured and operational</p>
              </div>
            </div>
            <button
              className="mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'var(--color-accent)', color: '#FFFFFF' }}
            >
              Configure
            </button>
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Security
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-xl border" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Two-Factor Authentication</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Add an extra layer of security to admin accounts</p>
              </div>
              <button
                onClick={() => setTwoFA(!twoFA)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200`}
                style={{ background: twoFA ? 'var(--color-accent)' : '#CBD5E1' }}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    twoFA ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Session Timeout</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Auto logout after inactivity</p>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="px-4 py-1.5 rounded-lg border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Password Policy</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Minimum password strength requirements</p>
              </div>
              <select
                value={passwordPolicy}
                onChange={(e) => setPasswordPolicy(e.target.value)}
                className="px-4 py-1.5 rounded-lg border text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              >
                <option value="basic">Basic (6+ chars)</option>
                <option value="medium">Medium (8+ chars, mixed)</option>
                <option value="strong">Strong (10+ chars, special)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Theme Preference
          </h3>
          <div className="flex items-center justify-between p-4 rounded-xl border" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3">
              {dark ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>
              )}
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Theme Mode</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Currently using {dark ? 'Dark' : 'Light'} mode
                </p>
              </div>
            </div>
            <button
              onClick={toggle}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200`}
              style={{ background: dark ? 'var(--color-accent)' : '#CBD5E1' }}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  dark ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="glass-card p-5 lg:p-6">
          <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Maintenance Mode
          </h3>
          <div className="flex items-center justify-between p-4 rounded-xl border" style={{
            background: maintenance ? '#EF444410' : 'var(--color-bg-card)',
            borderColor: maintenance ? '#EF4444' : 'var(--color-border)',
          }}>
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={maintenance ? '#EF4444' : 'var(--color-text-muted)'} strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              <div>
                <p className="text-sm font-medium" style={{ color: maintenance ? '#EF4444' : 'var(--color-text-primary)' }}>
                  {maintenance ? 'Maintenance Mode Active' : 'Enable Maintenance Mode'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {maintenance ? 'Users cannot access the platform' : 'Temporarily disable access for updates'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setMaintenance(!maintenance)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200`}
              style={{ background: maintenance ? '#EF4444' : '#CBD5E1' }}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  maintenance ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
