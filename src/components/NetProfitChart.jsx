import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

export function NetProfitChart({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center text-gray-600">
        No data yet
      </div>
    )
  }

  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date))
  const today = new Date().toISOString().slice(0, 10)

  const dailyMap = {}
  for (const tx of sorted) {
    if (!dailyMap[tx.date]) dailyMap[tx.date] = 0
    dailyMap[tx.date] += tx.type === 'income' ? Number(tx.amount) : -Number(tx.amount)
  }

  const startDate = sorted[0].date
  const dates = []
  let current = new Date(startDate + 'T00:00:00')
  const end = new Date(today + 'T00:00:00')
  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10))
    current.setDate(current.getDate() + 1)
  }

  let cumulative = 0
  const data = dates.map(date => {
    cumulative += dailyMap[date] || 0
    return { date, profit: parseFloat(cumulative.toFixed(2)) }
  })

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Net Profit Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={{ stroke: '#374151' }}
            tickLine={{ stroke: '#374151' }}
            minTickGap={40}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickFormatter={v => `$${v}`}
            axisLine={{ stroke: '#374151' }}
            tickLine={{ stroke: '#374151' }}
          />
          <Tooltip
            formatter={(v) => [`$${v}`, 'Net Profit']}
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }}
            labelStyle={{ color: '#9ca3af' }}
          />
          <ReferenceLine y={0} stroke="#374151" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
