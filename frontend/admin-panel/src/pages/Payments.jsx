import { useState } from 'react'

const revenueStats = [
  { label: 'Total Revenue', value: '₹1,28,49,200', change: '+22%', color: '#22C55E' },
  { label: 'Monthly Revenue', value: '₹18,42,500', change: '+8%', color: '#3B82F6' },
  { label: 'Pending Payouts', value: '₹3,28,400', change: '-5%', color: '#F59E0B' },
  { label: 'Successful Transactions', value: '14,892', change: '+15%', color: '#1D7874' },
]

const transactions = [
  { id: 'TXN-001', user: 'Rahul Sharma', amount: '₹4,999', method: 'UPI', status: 'Success', date: '18 Jun 2026' },
  { id: 'TXN-002', user: 'Priya Patel', amount: '₹9,999', method: 'Card', status: 'Success', date: '17 Jun 2026' },
  { id: 'TXN-003', user: 'Amit Singh', amount: '₹2,499', method: 'Net Banking', status: 'Pending', date: '17 Jun 2026' },
  { id: 'TXN-004', user: 'Sneha Reddy', amount: '₹6,999', method: 'UPI', status: 'Failed', date: '16 Jun 2026' },
  { id: 'TXN-005', user: 'Vikram Joshi', amount: '₹15,000', method: 'Card', status: 'Refunded', date: '16 Jun 2026' },
  { id: 'TXN-006', user: 'Neha Gupta', amount: '₹3,499', method: 'UPI', status: 'Success', date: '15 Jun 2026' },
  { id: 'TXN-007', user: 'Arun Kumar', amount: '₹8,999', method: 'Net Banking', status: 'Success', date: '14 Jun 2026' },
  { id: 'TXN-008', user: 'Deepika Mehta', amount: '₹22,000', method: 'Card', status: 'Pending', date: '13 Jun 2026' },
]

const payouts = [
  { mentor: 'Vikram Joshi', amount: '₹45,000', courses: 3, status: 'Pending', due: '25 Jun 2026' },
  { mentor: 'Deepika Mehta', amount: '₹32,000', courses: 2, status: 'Pending', due: '25 Jun 2026' },
  { mentor: 'Priya Patel', amount: '₹28,500', courses: 2, status: 'Paid', due: '10 Jun 2026' },
  { mentor: 'Kavita Nair', amount: '₹18,200', courses: 1, status: 'Pending', due: '25 Jun 2026' },
  { mentor: 'Rohit Verma', amount: '₹22,800', courses: 1, status: 'Paid', due: '05 Jun 2026' },
]

const statusColors = {
  Success: '#22C55E',
  Pending: '#F59E0B',
  Failed: '#EF4444',
  Refunded: '#64748B',
  Paid: '#22C55E',
}

export default function Payments() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [methodFilter, setMethodFilter] = useState('All')

  const filtered = transactions.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false
    if (methodFilter !== 'All' && t.method !== methodFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
        Payments Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              {stat.label}
            </p>
            <p className="text-xl lg:text-2xl font-bold mt-1.5" style={{ color: 'var(--color-text-primary)' }}>
              {stat.value}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${stat.color}20`, color: stat.color }}
              >
                {stat.change}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 lg:p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
              Transactions
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-1.5 rounded-xl border text-xs outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-1.5 rounded-xl border text-xs outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border text-xs outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              >
                <option>All Status</option>
                <option>Success</option>
                <option>Pending</option>
                <option>Failed</option>
                <option>Refunded</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border text-xs outline-none"
                style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              >
                <option>All Methods</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-secondary)' }}>
                <th className="text-left py-3.5 px-4 font-medium">Transaction ID</th>
                <th className="text-left py-3.5 px-4 font-medium">User</th>
                <th className="text-left py-3.5 px-4 font-medium">Amount</th>
                <th className="text-left py-3.5 px-4 font-medium">Method</th>
                <th className="text-left py-3.5 px-4 font-medium">Status</th>
                <th className="text-left py-3.5 px-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr key={txn.id} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-3.5 px-4 font-mono text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                    {txn.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>{txn.user}</td>
                  <td className="py-3.5 px-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>{txn.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{txn.method}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: `${statusColors[txn.status]}20`, color: statusColors[txn.status] }}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4" style={{ color: 'var(--color-text-muted)' }}>{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-5 lg:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
            Mentor Payouts
          </h3>
          <button
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: 'var(--color-accent)' }}
          >
            Process All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                <th className="text-left py-3 pr-4 font-medium">Mentor</th>
                <th className="text-left py-3 pr-4 font-medium">Amount</th>
                <th className="text-left py-3 pr-4 font-medium">Courses</th>
                <th className="text-left py-3 pr-4 font-medium">Status</th>
                <th className="text-left py-3 pr-4 font-medium">Due Date</th>
                <th className="text-right py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.mentor} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-3.5 pr-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>{p.mentor}</td>
                  <td className="py-3.5 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>{p.amount}</td>
                  <td className="py-3.5 pr-4" style={{ color: 'var(--color-text-muted)' }}>{p.courses}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: `${statusColors[p.status]}20`, color: statusColors[p.status] }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4" style={{ color: 'var(--color-text-muted)' }}>{p.due}</td>
                  <td className="py-3.5 text-right">
                    {p.status === 'Pending' ? (
                      <button
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                        style={{ background: 'var(--color-accent)' }}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
