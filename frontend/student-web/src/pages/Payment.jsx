import { useState } from 'react'

const plans = [
  {
    id: 'basic', name: 'Basic', price: 499, period: 'month',
    features: ['Access to recorded classes', 'Practice labs', 'Community forum', 'Basic support'],
    popular: false,
  },
  {
    id: 'pro', name: 'Pro', price: 999, period: 'month',
    features: ['Everything in Basic', 'Live classes', 'AI Tutor access', '1-on-1 mentorship', 'Priority support'],
    popular: true,
  },
  {
    id: 'enterprise', name: 'Enterprise', price: 2499, period: 'month',
    features: ['Everything in Pro', 'Unlimited courses', 'Certificate programs', 'Project reviews', 'Dedicated mentor', 'API access'],
    popular: false,
  },
]

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [emi, setEmi] = useState(0)
  const [upiId, setUpiId] = useState('')

  const plan = plans.find(p => p.id === selectedPlan)
  const emiOptions = [3, 6, 9, 12]
  const monthlyEmi = plan ? Math.round(plan.price / (emi || 1)) : 0

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>Choose Your Plan</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {plans.map(p => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)}
            className={`glass-card p-6 cursor-pointer transition-all relative ${p.popular ? 'ring-2' : ''}`}
            style={{
              borderColor: selectedPlan === p.id ? 'var(--color-accent)' : 'var(--color-border)',
              ringColor: selectedPlan === p.id ? 'var(--color-accent)' : 'transparent',
              transform: selectedPlan === p.id ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'var(--color-accent)' }}>
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>{p.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>₹{p.price}</span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{'/' + p.period}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: selectedPlan === p.id ? 'var(--color-accent)' : 'var(--color-accent-light)',
                color: selectedPlan === p.id ? '#fff' : 'var(--color-accent)',
              }}
            >
              {selectedPlan === p.id ? 'Selected' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Payment Method</h3>
            <div className="flex gap-2 mb-6">
              {['upi', 'card', 'netbanking'].map(method => (
                <button key={method} onClick={() => setPaymentMethod(method)}
                  className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all"
                  style={{
                    background: paymentMethod === method ? 'var(--color-accent)' : 'var(--color-accent-light)',
                    color: paymentMethod === method ? '#fff' : 'var(--color-text-muted)',
                  }}
                >
                  {method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI' : 'Net Banking'}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Card Number</label>
                  <input value={cardForm.number} onChange={e => setCardForm(p => ({ ...p, number: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Expiry</label>
                    <input value={cardForm.expiry} onChange={e => setCardForm(p => ({ ...p, expiry: e.target.value }))}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>CVV</label>
                    <input value={cardForm.cvv} onChange={e => setCardForm(p => ({ ...p, cvv: e.target.value }))}
                      placeholder="***"
                      type="password" maxLength={4}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Cardholder Name</label>
                    <input value={cardForm.name} onChange={e => setCardForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Full name"
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>EMI Options</label>
                  <div className="flex gap-2">
                    {emiOptions.map(m => (
                      <button key={m} onClick={() => setEmi(m)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                        style={{
                          background: emi === m ? 'var(--color-accent)' : 'var(--color-accent-light)',
                          color: emi === m ? '#fff' : 'var(--color-text-muted)',
                        }}
                      >{m} months</button>
                    ))}
                  </div>
                  {emi > 0 && (
                    <p className="text-sm mt-2" style={{ color: 'var(--color-accent)' }}>
                      ₹{monthlyEmi}/month for {emi} months
                    </p>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-2xl flex items-center justify-center" style={{ background: 'white', border: '2px solid var(--color-border)' }}>
                    <div className="text-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1D7874" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="8" y="8" width="8" height="8"/></svg>
                      <p className="text-xs mt-2" style={{ color: '#1D7874' }}>Scan to Pay</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>Or enter UPI ID</label>
                  <input value={upiId} onChange={e => setUpiId(e.target.value)}
                    placeholder="example@paytm / example@upi"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-3">
                {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'].map(bank => (
                  <button key={bank}
                    className="w-full p-3 rounded-xl text-sm text-left font-medium transition-all border"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                  >{bank} Bank</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-6 h-fit">
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Order Summary</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>Plan</span>
              <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{plan?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>Price</span>
              <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>₹{plan?.price}/{plan?.period}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--color-text-muted)' }}>GST (18%)</span>
              <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>₹{Math.round((plan?.price || 0) * 0.18)}</span>
            </div>
            <div className="border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between">
                <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>Total</span>
                <span className="font-bold text-lg" style={{ color: 'var(--color-accent)' }}>₹{Math.round((plan?.price || 0) * 1.18)}</span>
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all" style={{ background: 'var(--color-accent)' }}>
            Pay ₹{Math.round((plan?.price || 0) * 1.18)}
          </button>
          <p className="text-xs text-center mt-3" style={{ color: 'var(--color-text-muted)' }}>
            Secure payment • 100% refund within 7 days
          </p>
        </div>
      </div>
    </div>
  )
}
