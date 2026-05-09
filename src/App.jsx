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
  const { transactions, add, remove } = useTransactions()

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-950 border-b border-gray-800 px-6 py-5 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Casino Tracker</h1>
      </nav>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <TransactionForm onAdd={add} />
        <TransactionList transactions={transactions} onDelete={remove} />
        <NetProfitChart transactions={transactions} />
      </main>
    </div>
  )
}
