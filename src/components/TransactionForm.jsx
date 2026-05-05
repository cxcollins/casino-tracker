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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Add Transaction</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Type</label>
          <select
            value={form.type}
            onChange={e => set('type', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <input
            type="text"
            required
            value={form.category}
            onChange={e => set('category', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="e.g. Food, Salary"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={e => set('date', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Optional note"
          />
        </div>
        {form.type === 'expense' && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cashback</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.cashback}
              onChange={e => set('cashback', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="0.00"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition"
      >
        Add Transaction
      </button>
    </form>
  )
}
