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
      <div className="bg-white rounded-xl p-6 shadow text-center text-gray-400">
        No data yet
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses Over Time</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${v}`} />
          <Tooltip formatter={(v) => [`$${v}`]} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} dot={false} name="Income" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} name="Expenses" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
