import { useState, useEffect } from 'react'
import { initDb } from './db'
import { useTransactions } from './hooks/useTransactions'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { NetProfitChart } from './components/NetProfitChart'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initDb().then(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-600">
        Loading...
      </div>
    )
  }

  return <Dashboard />
}

function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const { transactions, add, remove } = useTransactions()

  async function handleAdd(tx) {
    await add(tx)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-950 border-b border-gray-800 px-6 py-5 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Casino Tracker</h1>
      </nav>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-emerald-500 transition"
        >
          + Add Transaction
        </button>
        <TransactionList transactions={transactions} onDelete={remove} />
        <NetProfitChart transactions={transactions} />
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-lg mx-4">
            <TransactionForm onAdd={handleAdd} />
          </div>
        </div>
      )}
    </div>
  )
}
