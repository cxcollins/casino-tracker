import { useState, useEffect, useCallback } from 'react'
import { getTransactions, addTransaction, deleteTransaction } from '../db'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getTransactions()
      setTransactions(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const add = useCallback(async (tx) => {
    await addTransaction(tx)
    await reload()
  }, [reload])

  const remove = useCallback(async (id) => {
    await deleteTransaction(id)
    await reload()
  }, [reload])

  return { transactions, loading, add, remove, reload }
}
