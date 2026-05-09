import { useState } from 'react'

export function TransactionList({ transactions, onDelete }) {
  const [typeFilter, setTypeFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const filtered = transactions.filter(tx => {
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false
    if (fromDate && tx.date < fromDate) return false
    if (toDate && tx.date > toDate) return false
    return true
  })

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex gap-4 items-center flex-wrap">
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-white focus:border-emerald-500 focus:outline-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_8px_center] bg-no-repeat"
        >
          <option value="all">All types</option>
          <option value="expense">Expenses</option>
          <option value="income">Income</option>
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
        />
        <span className="text-gray-600 text-sm">to</span>
        <input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-800">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Cashback</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                  No transactions
                </td>
              </tr>
            )}
            {filtered.map(tx => (
              <tr key={tx.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                <td className="px-4 py-3 text-gray-400">{tx.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    tx.type === 'expense'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">{tx.category}</td>
                <td className="px-4 py-3 text-gray-500">{tx.description ?? '—'}</td>
                <td className={`px-4 py-3 text-right font-medium ${
                  tx.type === 'expense' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {tx.type === 'expense' ? '-' : '+'}${Number(tx.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right text-emerald-400">
                  {tx.cashback != null ? `+$${Number(tx.cashback).toFixed(2)}` : '—'}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDelete(tx.id)}
                    className="text-gray-600 hover:text-red-400 text-xs transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
