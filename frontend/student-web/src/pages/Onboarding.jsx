import { useState } from 'react'

const interests = ['Linux Fundamentals', 'C Programming', 'Shell Scripting', 'Git & GitHub', 'Open Source', 'Embedded C', 'System Programming', 'Computer Networks']
const goals = ['Master Linux & C', 'Get a job in DevOps', 'Build embedded systems', 'Contribute to open source']
const experiences = ['Beginner (knows what ls is)', 'Intermediate (can write basic C)', 'Advanced (built projects)']

const steps = ['Personal Info', 'Interests', 'Preferences']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', interests: [], goal: '', hours: '2', experience: '' })
  const [errors, setErrors] = useState({})

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const toggleInterest = (item) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(item) ? prev.interests.filter(i => i !== item) : [...prev.interests, item]
    }))
  }

  const validate = () => {
    const errs = {}
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Required'
      if (!form.email.trim()) errs.email = 'Required'
      if (!form.phone.trim()) errs.phone = 'Required'
    }
    if (step === 1 && form.interests.length === 0) errs.interests = 'Select at least one'
    if (step === 2) {
      if (!form.goal) errs.goal = 'Select a goal'
      if (!form.experience) errs.experience = 'Select experience'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 2)) }
  const prev = () => setStep(s => Math.max(s - 1, 0))

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--color-text-primary)' }}>Welcome to Shipwise!</h2>
        <p className="text-center text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>Let's map your Linux & C programming level</p>

        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all" style={{
                background: i <= step ? 'var(--color-accent)' : 'var(--color-accent-light)',
                color: i <= step ? '#fff' : 'var(--color-text-muted)',
              }}>
                {i + 1}
              </div>
              <span className="text-sm hidden sm:block" style={{ color: i <= step ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>{s}</span>
              {i < steps.length - 1 && <div className="w-8 h-0.5" style={{ background: i < step ? 'var(--color-accent)' : 'var(--color-border)' }} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-5">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl border-2 border-dashed" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text-muted)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            </div>
            <Field label="Full Name" value={form.name} onChange={v => update('name', v)} error={errors.name} />
            <Field label="Email" type="email" value={form.email} onChange={v => update('email', v)} error={errors.email} />
            <Field label="Phone" type="tel" value={form.phone} onChange={v => update('phone', v)} error={errors.phone} />
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Select topics you want to learn:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {interests.map(item => (
                <button
                  key={item} onClick={() => toggleInterest(item)}
                  className="p-4 rounded-xl text-sm font-medium transition-all border"
                  style={{
                    background: form.interests.includes(item) ? 'var(--color-accent-light)' : 'var(--color-bg-card)',
                    borderColor: form.interests.includes(item) ? 'var(--color-accent)' : 'var(--color-border)',
                    color: form.interests.includes(item) ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            {errors.interests && <p className="text-red-500 text-sm mt-2">{errors.interests}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Learning Goal</label>
              <div className="grid grid-cols-2 gap-3">
                {goals.map(g => (
                  <button key={g} onClick={() => update('goal', g)}
                    className="p-3 rounded-xl text-sm font-medium transition-all border"
                    style={{
                      background: form.goal === g ? 'var(--color-accent-light)' : 'var(--color-bg-card)',
                      borderColor: form.goal === g ? 'var(--color-accent)' : 'var(--color-border)',
                      color: form.goal === g ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    }}
                  >{g}</button>
                ))}
              </div>
              {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Daily Hours</label>
              <input type="range" min="1" max="8" value={form.hours} onChange={e => update('hours', e.target.value)}
                className="w-full accent-teal-600" />
              <p className="text-sm text-center mt-1" style={{ color: 'var(--color-accent)' }}>{form.hours} hours/day</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Experience Level</label>
              <div className="grid grid-cols-3 gap-3">
                {experiences.map(e => (
                  <button key={e} onClick={() => update('experience', e)}
                    className="p-3 rounded-xl text-sm font-medium transition-all border"
                    style={{
                      background: form.experience === e ? 'var(--color-accent-light)' : 'var(--color-bg-card)',
                      borderColor: form.experience === e ? 'var(--color-accent)' : 'var(--color-border)',
                      color: form.experience === e ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    }}
                  >{e}</button>
                ))}
              </div>
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button onClick={prev} disabled={step === 0}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          >Previous</button>
          <button onClick={next}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
            style={{ background: 'var(--color-accent)' }}
          >{step === 2 ? 'Start Placement Test →' : 'Next'}</button>
        </div>

        {step === 2 && (
          <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>
            After onboarding, you'll take a quick placement test to map your Linux & C level
          </p>
        )}
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          background: 'var(--color-bg-primary)',
          border: `1px solid ${error ? '#EF4444' : 'var(--color-border)'}`,
          color: 'var(--color-text-primary)',
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
