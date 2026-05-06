<template>
  <div id="app">
    <h1>Vue Todo List</h1>
    <div class="tabs">
      <button :class="{ active: activeTab === 'todo' }" @click="activeTab = 'todo'">任务列表</button>
      <button :class="{ active: activeTab === 'schema' }" @click="activeTab = 'schema'">数据库结构</button>
    </div>

    <!-- Tab 1: Todo List -->
    <div v-show="activeTab === 'todo'" class="tab-content">
      <div class="add-form">
        <input v-model="newTodo" placeholder="输入新任务" @keyup.enter="addTodo" />
        <button @click="addTodo">添加</button>
      </div>
      <table class="todo-table">
        <thead>
          <tr>
            <th>时间</th>
            <th>任务</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <td>{{ formatTime(todo.created_at) }}</td>
            <td :class="{ completed: todo.completed }">{{ todo.title }}</td>
            <td>
              <input type="checkbox" :checked="todo.completed" @change="toggleComplete(todo)" />
            </td>
            <td>
              <button @click="editTodo(todo)">编辑</button>
              <button @click="deleteTodo(todo.id)">删除</button>
            </td>
          </tr>
          <tr v-if="todos.length === 0">
            <td colspan="4" class="empty">暂无任务</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tab 2: Database Schema -->
    <div v-show="activeTab === 'schema'" class="tab-content">
      <h2>数据库表结构</h2>
      <table class="schema-table">
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
            <td rowspan="4">todos</td>
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
  </div>
</template>

<script>
import axios from 'axios'

const API_BASE = 'http://localhost:8000/api/todos'

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      newTodo: '',
      activeTab: 'todo'
    }
  },
  mounted() {
    this.fetchTodos()
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get(API_BASE)
        this.todos = response.data
      } catch (error) {
        console.error('获取列表失败:', error)
      }
    },
    async addTodo() {
      if (!this.newTodo.trim()) return
      try {
        await axios.post(API_BASE, { title: this.newTodo })
        this.newTodo = ''
        this.fetchTodos()
      } catch (error) {
        console.error('添加失败:', error)
      }
    },
    // 切换完成状态
    async toggleComplete(todo) {
      //  补充代码 -------------------------
      




    },

    // 编辑待办事项
    async editTodo(todo) {
      const newTitle = prompt('修改任务:', todo.title)
      //  补充代码 -------------------------



      
     
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`${API_BASE}/${id}`)
        this.fetchTodos()
      } catch (error) {
        console.error('删除失败:', error)
      }
    },
    formatTime(dateStr) {
      if (!dateStr) return '-'
      const date = new Date(dateStr)
      return date.toLocaleString('zh-CN')
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}
.tabs {
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}
.tabs button {
  padding: 10px 20px;
  margin-right: 5px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.tabs button.active {
  background: #4CAF50;
  color: white;
}
.tab-content {
  padding: 20px 0;
}
.add-form {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.add-form input {
  padding: 8px;
  flex: 1;
  font-size: 16px;
}
.add-form button {
  padding: 8px 20px;
  font-size: 16px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
.todo-table,
.schema-table {
  width: 100%;
  border-collapse: collapse;
}
.todo-table th,
.todo-table td,
.schema-table th,
.schema-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
.todo-table th,
.schema-table th {
  background: #f5f5f5;
}
.todo-table td.completed {
  text-decoration: line-through;
  color: #888;
}
.todo-table input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.todo-table button,
.schema-table button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}
.todo-table .empty {
  text-align: center;
  color: #888;
}
.schema-table h2 {
  margin-bottom: 15px;
}
</style>
