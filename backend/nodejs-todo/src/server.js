import express from 'express'
import cors from 'cors'
import { initDb, getDb, saveDb } from './database.js'

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

// 获取所有待办事项
app.get('/api/todos', (req, res) => {
  const db = getDb()
  const todos = db.exec('SELECT * FROM todos ORDER BY created_at DESC')
  if (todos.length === 0) {
    return res.json([])
  }
  const columns = todos[0].columns
  const result = todos[0].values.map(row => {
    const obj = {}
    columns.forEach((col, i) => {
      obj[col] = col === 'completed' ? Boolean(row[i]) : row[i]
    })
    return obj
  })
  res.json(result)
})

// 获取单个待办事项
app.get('/api/todos/:id', (req, res) => {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM todos WHERE id = ?')
  stmt.bind([Number(req.params.id)])
  if (stmt.step()) {
    const row = stmt.getAsObject()
    stmt.free()
    res.json({ ...row, completed: Boolean(row.completed) })
  } else {
    stmt.free()
    res.status(404).json({ error: 'Todo not found' })
  }
})

// 创建新的待办事项
app.post('/api/todos', (req, res) => {
  const { title, completed = false } = req.body
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' })
  }
  const db = getDb()
  db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [title.trim(), completed ? 1 : 0])
  saveDb()

  const newId = db.exec('SELECT last_insert_rowid()')[0].values[0][0]
  const stmt = db.prepare('SELECT * FROM todos WHERE id = ?')
  stmt.bind([newId])
  stmt.step()
  const row = stmt.getAsObject()
  stmt.free()

  res.status(201).json({ ...row, completed: Boolean(row.completed) })
})

// 更新待办事项（修改状态和修改标题）
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body
  const db = getDb()

  const checkStmt = db.prepare('SELECT * FROM todos WHERE id = ?')
  checkStmt.bind([Number(id)])
  if (!checkStmt.step()) {
    checkStmt.free()
    return res.status(404).json({ error: 'Todo not found' })
  }
  checkStmt.free()

  const updates = []
  const values = []

  if (title !== undefined) {
    updates.push('title = ?')
    values.push(title.trim())
  }
  if (completed !== undefined) {
    updates.push('completed = ?')
    values.push(completed ? 1 : 0)
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' })
  }

  values.push(Number(id))
  db.run(`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`, values)
  saveDb()

  const stmt = db.prepare('SELECT * FROM todos WHERE id = ?')
  stmt.bind([Number(id)])
  stmt.step()
  const row = stmt.getAsObject()
  stmt.free()

  res.json({ ...row, completed: Boolean(row.completed) })
})

// 删除待办事项
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const db = getDb()

  // 补充完成代码 -------------------------








  // -----------------------------
  res.json({ message: 'Todo deleted' })
})

async function start() {
  await initDb()
  app.listen(PORT, () => {
    console.log(`Node.js 服务运行在 http://localhost:${PORT}`)
  })
}

start()
