import { useState } from 'react'

const DEFAULT_FORM = {
  income: '',
  expense: '',
  cashback: '',
  website: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
}

export function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(DEFAULT_FORM)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if ((!form.income && !form.expense) || !form.website || !form.date) return
    await onAdd({
      income: form.income ? parseFloat(form.income) : 0,
      expense: form.expense ? parseFloat(form.expense) : 0,
      cashback: form.cashback ? parseFloat(form.cashback) : 0,
      website: form.website,
      description: form.description || null,
      date: form.date,
    })
    setForm(DEFAULT_FORM)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
      <h2 className="text-lg font-semibold text-white">Add Transaction</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Income</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.income}
            onChange={e => set('income', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Expense</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.expense}
            onChange={e => set('expense', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="0.00"
          />
        </div>
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
        <div>
          <label className="block text-sm text-gray-400 mb-1">Website</label>
          <input
            type="text"
            required
            value={form.website}
            onChange={e => set('website', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="e.g. DraftKings, FanDuel"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
            placeholder="Optional note"
          />
        </div>
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
