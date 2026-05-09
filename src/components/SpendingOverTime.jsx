import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function SpendingOverTime({ transactions }) {
  const byMonth = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7)
    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 }
    if (tx.type === 'income') {
      acc[month].income += Number(tx.amount)
    } else {
      acc[month].expenses += Number(tx.amount)
    }
    return acc
  }, {})

  const data = Object.values(byMonth)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(d => ({
      ...d,
      income: parseFloat(d.income.toFixed(2)),
      expenses: parseFloat(d.expenses.toFixed(2)),
    }))

  if (data.length === 0) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center text-gray-600">
        No data yet
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Income vs Expenses Over Time</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} tickLine={{ stroke: '#374151' }} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={v => `$${v}`} axisLine={{ stroke: '#374151' }} tickLine={{ stroke: '#374151' }} />
          <Tooltip formatter={(v) => [`$${v}`]} contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={false} name="Income" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} name="Expenses" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
