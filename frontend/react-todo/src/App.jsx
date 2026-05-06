import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8000/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [activeTab, setActiveTab] = useState('todo')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE)
      setTodos(response.data)
    } catch (error) {
      console.error('获取列表失败:', error)
    }
  }

  const addTodo = async () => {
    if (!newTodo.trim()) return
    try {
      await axios.post(API_BASE, { title: newTodo })
      setNewTodo('')
      fetchTodos()
    } catch (error) {
      console.error('添加失败:', error)
    }
  }

  // 切换完成状态
  const toggleComplete = async (todo) => {
    // 补充代码 -------------------------






  }


  // 编辑待办事项
  const editTodo = async (todo) => {
    const newTitle = prompt('修改任务:', todo.title)
    // 补充代码 -------------------------




    /// 
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleString('zh-CN')
  }

  return (
    <div className="app">
      <h1>React Todo List</h1>
      <div className="tabs">
        <button
          className={activeTab === 'todo' ? 'active' : ''}
          onClick={() => setActiveTab('todo')}
        >
          任务列表
        </button>
        <button
          className={activeTab === 'schema' ? 'active' : ''}
          onClick={() => setActiveTab('schema')}
        >
          数据库结构
        </button>
      </div>

      {activeTab === 'todo' && (
        <div className="tab-content">
          <div className="add-form">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="输入新任务"
              onKeyUp={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>添加</button>
          </div>
          <table className="todo-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>任务</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{formatTime(todo.created_at)}</td>
                  <td className={todo.completed ? 'completed' : ''}>{todo.title}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                    />
                  </td>
                  <td>
                    <button onClick={() => editTodo(todo)}>编辑</button>
                    <button onClick={() => deleteTodo(todo.id)}>删除</button>
                  </td>
                </tr>
              ))}
              {todos.length === 0 && (
                <tr>
                  <td colspan="4" className="empty">暂无任务</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="tab-content">
          <h2>数据库表结构</h2>
          <table className="schema-table">
            <thead>
              <tr>
                <th>表名</th>
                <th>字段</th>
                <th>类型</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={4}>todos</td>
                <td>id</td>
                <td>INTEGER</td>
                <td>主键，自增</td>
              </tr>
              <tr>
                <td>title</td>
                <td>TEXT</td>
                <td>任务标题，不能为空</td>
              </tr>
              <tr>
                <td>completed</td>
                <td>INTEGER (0/1)</td>
                <td>完成状态，默认 0</td>
              </tr>
              <tr>
                <td>created_at</td>
                <td>TEXT</td>
                <td>创建时间，默认当前时间</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
