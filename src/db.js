import Database from '@tauri-apps/plugin-sql'

let db = null

async function getDb() {
  if (!db) {
    db = await Database.load('sqlite:casino-tracker.db')
  }
  return db
}

export async function initDb() {
  const db = await getDb()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT    NOT NULL,
      type TEXT    NOT NULL CHECK(type IN ('income','expense'))
    )
  `)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS transactions (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      amount      REAL    NOT NULL,
      type        TEXT    NOT NULL CHECK(type IN ('income','expense')),
      category    TEXT    NOT NULL,
      description TEXT,
      date        TEXT    NOT NULL,
      cashback    REAL
    )
  `)
}

export async function getTransactions() {
  const db = await getDb()
  return db.select('SELECT * FROM transactions ORDER BY date DESC')
}

export async function addTransaction(tx) {
  const db = await getDb()
  await db.execute(
    'INSERT INTO transactions (amount, type, category, description, date, cashback) VALUES (?, ?, ?, ?, ?, ?)',
    [tx.amount, tx.type, tx.category, tx.description ?? null, tx.date, tx.cashback ?? null],
  )
}

export async function deleteTransaction(id) {
  const db = await getDb()
  await db.execute('DELETE FROM transactions WHERE id = ?', [id])
}
