import { useState, useEffect } from 'react'
import { initDb } from './db'
import { useTransactions } from './hooks/useTransactions'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { SpendingByCategory } from './components/SpendingByCategory'
import { SpendingOverTime } from './components/SpendingOverTime'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initDb().then(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    )
  }

  return <Dashboard />
}

function Dashboard() {
  const [tab, setTab] = useState('transactions')
  const { transactions, add, remove } = useTransactions()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b px-6 py-4 flex items-center gap-6">
        <h1 className="text-xl font-bold text-gray-900">Casino Tracker</h1>
        <div className="flex gap-1">
          {['transactions', 'reports'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition ${
                tab === t
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {tab === 'transactions' ? (
          <>
            <TransactionForm onAdd={add} />
            <TransactionList transactions={transactions} onDelete={remove} />
          </>
        ) : (
          <>
            <SpendingByCategory transactions={transactions} />
            <SpendingOverTime transactions={transactions} />
          </>
        )}
      </main>
    </div>
  )
}
