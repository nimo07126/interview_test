# 面试测试题 - TodoList 全栈开发

## 题目背景

本项目是一个简陋的 TodoList 应用，前端和后端代码已经给出，数据库已配置好。

**你的任务**：
1. 补充后端删除功能代码
2. 前后端对接（编辑、状态切换功能）
3. 前端 UI 样式优化

---

## 题目要求

### 第一部分：后端删除功能（补充代码）

需要补充以下位置的删除功能代码：

**1. Node.js 后端** (`backend/nodejs-todo/src/server.js`)
- 位置：删除接口 `/api/todos/:id` 的实现
- 参考代码示例：
```javascript
// 先查询是否存在

// 执行删除

```

**2. FastAPI 后端** (`backend/fastapi-todo/app/main.py`)
- 位置：删除接口 `/api/todos/{todo_id}` 的 `delete_todo` 函数实现


```

---

### 第二部分：前后端功能对接

#### 1. 状态切换功能（checkbox）

**Vue 前端** (`frontend/vue-todo/src/App.vue`)
- 位置：`toggleComplete` 方法
```javascript
async toggleComplete(todo) {
  //  补充代码 -------------------------
  // 调用 PUT /api/todos/{id} 接口
  // 传入 { completed: !todo.completed }
}
```

**React 前端** (`frontend/react-todo/src/App.jsx`)
- 位置：`toggleComplete` 函数
```javascript
const toggleComplete = async (todo) => {
  // 补充代码 -------------------------
  // 调用 PUT /api/todos/{id} 接口
  // 传入 { completed: !todo.completed }
}
```

#### 2. 编辑功能

**Vue 前端** (`frontend/vue-todo/src/App.vue`)
- 位置：`editTodo` 方法
```javascript
async editTodo(todo) {
  const newTitle = prompt('修改任务:', todo.title)
  //  补充代码 -------------------------
  // 如果用户确认了新标题，调用 PUT /api/todos/{id} 接口
  // 传入 { title: newTitle }
}
```

**React 前端** (`frontend/react-todo/src/App.jsx`)
- 位置：`editTodo` 函数
```javascript
const editTodo = async (todo) => {
  const newTitle = prompt('修改任务:', todo.title)
  // 补充代码 -------------------------
  // 如果用户确认了新标题，调用 PUT /api/todos/{id} 接口
  // 传入 { title: newTitle }
}
```

---

### 第三部分：UI 样式优化

当前界面比较简陋，可以进行以下优化：
- 调整表格样式（边框、间距、颜色）
- 优化按钮样式
- 调整布局和间距
- 添加hover效果
- 完善空状态显示

---

## API 接口参考

| 方法 | 路径 | 描述 | 请求体 |
|------|------|------|--------|
| GET | /api/todos | 获取所有任务 | - |
| POST | /api/todos | 创建任务 | `{ "title": "内容" }` |
| PUT | /api/todos/:id | 更新任务 | `{ "title": "新内容" }` 或 `{ "completed": true }` |
| DELETE | /api/todos/:id | 删除任务 | - |

响应格式：
```json
{
  "id": 1,
  "title": "任务内容",
  "completed": false,
  "created_at": "2026-05-06T00:00:00"
}
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3 / React 18 + Axios + Vite |
| 后端 | Node.js + Express / FastAPI (Python) |
| 数据库 | SQLite + 原生 SQL |

---

## 启动方式

### 后端（选择一个）

**Node.js:**
```bash
cd backend/nodejs-todo
npm install
npm run dev
```

**FastAPI:**
```bash
cd backend/fastapi-todo
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### 前端（选择一个）

**Vue:**
```bash
cd frontend/vue-todo
npm install
npm run dev
```

**React:**
```bash
cd frontend/react-todo
npm install
npm run dev
```

---

## 评分标准

| 项目 | 分值 | 说明 |
|------|------|------|
| 后端删除功能 | 30% | 补充 DELETE 接口代码 |
| 状态切换对接 | 25% | 完成 checkbox 切换功能 |
| 编辑功能对接 | 25% | 完成编辑并保存功能 |
| UI 样式优化 | 20% | 调整界面美观度 |

---

## 数据库表结构

```
表名: todos

| 字段       | 类型     | 说明                    |
|------------|----------|-------------------------|
| id         | INTEGER  | 主键，自增              |
| title      | TEXT     | 任务标题，不能为空      |
| completed  | INTEGER  | 完成状态 (0/1)，默认 0  |
| created_at | TEXT     | 创建时间，默认当前时间  |
```
