import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#059669', '#047857', '#a7f3d0', '#065f46', '#99f6e4']

export function SpendingByCategory({ transactions }) {
  const byCategory = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount)
      return acc
    }, {})

  const data = Object.entries(byCategory)
    .map(([category, total]) => ({ category, total: parseFloat(total.toFixed(2)) }))
    .sort((a, b) => b.total - a.total)

  if (data.length === 0) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center text-gray-600">
        No expense data yet
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} tickLine={{ stroke: '#374151' }} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={v => `$${v}`} axisLine={{ stroke: '#374151' }} tickLine={{ stroke: '#374151' }} />
          <Tooltip formatter={(v) => [`$${v}`, 'Total']} contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
