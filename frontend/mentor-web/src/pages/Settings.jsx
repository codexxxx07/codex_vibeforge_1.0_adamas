import { useState } from 'react'
import { useTheme } from '../ThemeContext'

export default function Settings() {
  const { dark, toggle } = useTheme()

  const [profile, setProfile] = useState({
    name: 'Dr. James Wilson',
    email: 'james.wilson@shipwise.edu',
    bio: 'Senior mentor specializing in web development and data structures. Passionate about helping students navigate the world of programming.',
    expertise: ['React', 'JavaScript', 'Python', 'Data Structures', 'Algorithms'],
    social: { github: 'github.com/jameswilson', linkedin: 'linkedin.com/in/jameswilson', twitter: '@jameswilson' },
  })

  const [notifications, setNotifications] = useState({
    email: true,
    classReminders: true,
    gradingAlerts: true,
    studentMessages: false,
    weeklyDigest: true,
  })

  const [availability, setAvailability] = useState({
    workHoursStart: '09:00',
    workHoursEnd: '17:00',
    maxStudents: 50,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  })

  const [payment, setPayment] = useState({
    bankName: 'First National Bank',
    accountNumber: '****1234',
    ifscCode: 'FNBL0001234',
    upiId: 'james.wilson@upi',
  })

  const [newExpertise, setNewExpertise] = useState('')

  const addExpertise = () => {
    if (newExpertise && !profile.expertise.includes(newExpertise)) {
      setProfile({ ...profile, expertise: [...profile.expertise, newExpertise] })
      setNewExpertise('')
    }
  }

  const removeExpertise = (tag) => {
    setProfile({ ...profile, expertise: profile.expertise.filter(t => t !== tag) })
  }

  const toggleDay = (day) => {
    setAvailability({
      ...availability,
      days: availability.days.includes(day)
        ? availability.days.filter(d => d !== day)
        : [...availability.days, day],
    })
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="max-w-4xl space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1D7874, #EE964B)' }}
          >
            JW
          </div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{profile.name}</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{profile.email}</p>
            <button className="text-xs font-medium mt-1" style={{ color: 'var(--color-accent)' }}>Change photo</button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Expertise Areas</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.expertise.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                >
                  {tag}
                  <button onClick={() => removeExpertise(tag)} className="hover:opacity-70">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addExpertise()}
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                placeholder="Add expertise..."
              />
              <button
                onClick={addExpertise}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ background: 'var(--color-accent)', color: 'white' }}
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Social Links</label>
            <div className="space-y-2">
              {['github', 'linkedin', 'twitter'].map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  <span className="text-sm w-20 capitalize" style={{ color: 'var(--color-text-muted)' }}>{platform}</span>
                  <input
                    type="text"
                    value={profile.social[platform]}
                    onChange={(e) => setProfile({ ...profile, social: { ...profile.social, [platform]: e.target.value } })}
                    className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>
            Save Profile
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Notification Preferences</h2>
        <div className="space-y-3">
          {[
            { key: 'email', label: 'Email Notifications' },
            { key: 'classReminders', label: 'Class Reminders' },
            { key: 'gradingAlerts', label: 'Grading Alerts' },
            { key: 'studentMessages', label: 'Student Messages' },
            { key: 'weeklyDigest', label: 'Weekly Digest' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.label}</span>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 ${notifications[item.key] ? '' : 'opacity-40'}`}
                style={{
                  background: notifications[item.key] ? 'var(--color-accent)' : 'var(--color-border)',
                }}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${notifications[item.key] ? 'translate-x-5' : ''}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Availability</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Working Days</label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200`}
                  style={{
                    background: availability.days.includes(day) ? 'var(--color-accent-light)' : 'var(--color-bg-primary)',
                    color: availability.days.includes(day) ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    border: `1px solid ${availability.days.includes(day) ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Work Hours Start</label>
              <input
                type="time"
                value={availability.workHoursStart}
                onChange={(e) => setAvailability({ ...availability, workHoursStart: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Work Hours End</label>
              <input
                type="time"
                value={availability.workHoursEnd}
                onChange={(e) => setAvailability({ ...availability, workHoursEnd: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Max Students</label>
              <input
                type="number"
                value={availability.maxStudents}
                onChange={(e) => setAvailability({ ...availability, maxStudents: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: 'var(--color-accent)', color: 'white' }}>
            Save Availability
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Payment Info</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Bank Name</label>
              <input
                type="text"
                value={payment.bankName}
                readOnly
                className="w-full px-3 py-2 rounded-xl text-sm outline-none cursor-not-allowed"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Account Number</label>
              <input
                type="text"
                value={payment.accountNumber}
                readOnly
                className="w-full px-3 py-2 rounded-xl text-sm outline-none cursor-not-allowed"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>IFSC Code</label>
              <input
                type="text"
                value={payment.ifscCode}
                readOnly
                className="w-full px-3 py-2 rounded-xl text-sm outline-none cursor-not-allowed"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>UPI ID</label>
              <input
                type="text"
                value={payment.upiId}
                readOnly
                className="w-full px-3 py-2 rounded-xl text-sm outline-none cursor-not-allowed"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              />
            </div>
          </div>
          <button className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            Update Payment Info
          </button>
        </div>
      </div>

      <div className="glass-card p-6 border-red-500/20" style={{ borderColor: dark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.2)' }}>
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#EF4444' }}>Danger Zone</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Irreversible actions that affect your account and courses.</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: '#EF444415', color: '#EF4444', border: '1px solid #EF444430' }}>
            Delete Account
          </button>
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: '#EF444415', color: '#EF4444', border: '1px solid #EF444430' }}>
            Archive All Courses
          </button>
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: '#EF444415', color: '#EF4444', border: '1px solid #EF444430' }}>
            Export All Data
          </button>
        </div>
      </div>
    </div>
  )
}
