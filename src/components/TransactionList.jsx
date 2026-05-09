import { useState } from 'react'

function netProfit(tx) {
  return Number(tx.income) - Number(tx.expense) + Number(tx.cashback)
}

export function TransactionList({ transactions, onDelete }) {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const filtered = transactions.filter(tx => {
    if (fromDate && tx.date < fromDate) return false
    if (toDate && tx.date > toDate) return false
    return true
  })

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex gap-4 items-center flex-wrap">
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
              <th className="px-4 py-3 font-medium">Website</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium text-right">Income</th>
              <th className="px-4 py-3 font-medium text-right">Expense</th>
              <th className="px-4 py-3 font-medium text-right">Cashback</th>
              <th className="px-4 py-3 font-medium text-right">Net Profit</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-600">
                  No transactions
                </td>
              </tr>
            )}
            {filtered.map(tx => {
              const net = netProfit(tx)
              return (
                <tr key={tx.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-gray-400">{tx.date}</td>
                  <td className="px-4 py-3 text-gray-300">{tx.website}</td>
                  <td className="px-4 py-3 text-gray-500">{tx.description ?? '—'}</td>
                  <td className="px-4 py-3 text-right text-emerald-400">
                    {Number(tx.income) > 0 ? `+$${Number(tx.income).toFixed(2)}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-red-400">
                    {Number(tx.expense) > 0 ? `-$${Number(tx.expense).toFixed(2)}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-emerald-400">
                    {Number(tx.cashback) > 0 ? `+$${Number(tx.cashback).toFixed(2)}` : '—'}
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${
                    net >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {net >= 0 ? '+' : '-'}${Math.abs(net).toFixed(2)}
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
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
