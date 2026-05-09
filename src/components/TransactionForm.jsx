import { useState } from 'react'

const DEFAULT_FORM = {
  amount: '',
  type: 'expense',
  category: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
  cashback: '',
}

export function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(DEFAULT_FORM)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount || !form.category || !form.date) return
    await onAdd({
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      description: form.description || null,
      date: form.date,
      cashback: form.type === 'expense' && form.cashback ? parseFloat(form.cashback) : null,
    })
    setForm(DEFAULT_FORM)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
      <h2 className="text-lg font-semibold text-white">Add Transaction</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <select
            value={form.type}
            onChange={e => set('type', e.target.value)}
            className="w-full appearance-none bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 pr-8 text-sm text-white focus:border-emerald-500 focus:outline-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_8px_center] bg-no-repeat"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <input
            type="text"
            required
            value={form.category}
            onChange={e => set('category', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="e.g. Food, Salary"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={e => set('date', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="Optional note"
          />
        </div>
        {form.type === 'expense' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Cashback</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.cashback}
              onChange={e => set('cashback', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
              placeholder="0.00"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-emerald-500 transition"
      >
        Add Transaction
      </button>
    </form>
  )
}
