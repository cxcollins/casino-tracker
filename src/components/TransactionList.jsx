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
    <div className="bg-white rounded-xl shadow">
      <div className="p-4 border-b flex gap-4 items-center flex-wrap">
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="all">All types</option>
          <option value="expense">Expenses</option>
          <option value="income">Income</option>
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        />
        <span className="text-gray-400 text-sm">to</span>
        <input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
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
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No transactions
                </td>
              </tr>
            )}
            {filtered.map(tx => (
              <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{tx.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    tx.type === 'expense'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3">{tx.category}</td>
                <td className="px-4 py-3 text-gray-500">{tx.description ?? '—'}</td>
                <td className={`px-4 py-3 text-right font-medium ${
                  tx.type === 'expense' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {tx.type === 'expense' ? '-' : '+'}${Number(tx.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right text-green-600">
                  {tx.cashback != null ? `+$${Number(tx.cashback).toFixed(2)}` : '—'}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDelete(tx.id)}
                    className="text-gray-400 hover:text-red-500 text-xs"
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
