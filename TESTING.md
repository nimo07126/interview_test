# 面试测试题 - TodoList 全栈开发

## 题目背景

本项目是一个简陋的 TodoList 应用，前端和后端代码已经给出，数据库已配置好。

**你的任务**：理解现有代码，将各个功能模块对接完成，实现完整的前后端交互。

---

## 题目要求

### 第一部分：后端理解与数据对接

1. **理解后端 API**
   - 查看后端代码，理解 RESTful API 设计
   - 确认以下接口的请求/响应格式：
     - `GET /api/todos` - 获取所有任务
     - `POST /api/todos` - 创建任务
     - `PUT /api/todos/{id}` - 更新任务
     - `DELETE /api/todos/{id}` - 删除任务

2. **数据库操作**
   - 理解 SQLite 数据库的表结构
   - 理解原生 SQL 的增删改查操作

### 第二部分：前端功能实现

1. **添加任务功能**
   - 输入框输入任务内容
   - 点击"添加"按钮或按回车提交
   - 调用 POST API 创建任务
   - 创建成功后刷新列表

2. **完成任务功能**
   - 点击 checkbox 或"完成"按钮
   - 调用 PUT API 更新任务的 completed 状态
   - 已完成的任务显示删除线效果

3. **编辑任务功能**
   - 点击"编辑"按钮
   - 弹出输入框修改任务内容
   - 调用 PUT API 更新任务标题

4. **删除任务功能**
   - 点击"删除"按钮
   - 调用 DELETE API 删除任务
   - 删除后刷新列表

### 第三部分：UI 优化（选做）

当前界面比较简陋，可以自行优化：
- 添加更好的样式和布局
- 添加任务分类或筛选功能
- 添加动画效果

---

## API 接口详情

### 请求格式

**创建任务 POST /api/todos**
```json
请求体: { "title": "任务内容" }
响应: { "id": 1, "title": "任务内容", "completed": false, "created_at": "2024-01-01T00:00:00" }
```

**更新任务 PUT /api/todos/{id}**
```json
请求体: { "title": "新内容" } 或 { "completed": true }
响应: { "id": 1, "title": "新内容", "completed": true, "created_at": "2024-01-01T00:00:00" }
```

**删除任务 DELETE /api/todos/{id}**
```json
响应: { "message": "Todo deleted" }
```

---

## 技术栈参考

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Vue 3 / React 18 | 可选 |
| HTTP 客户端 | Axios | 已配置 |
| 后端框架 | Node.js + Express / FastAPI | 可选 |
| 数据库 | SQLite + 原生 SQL | 已配置 |

---

## 启动方式

### 启动后端（选择其中一个）

**Node.js:**
```bash
cd backend/nodejs-todo
npm install  # 如已安装可跳过
npm run dev
```

**FastAPI:**
```bash
cd backend/fastapi-todo
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 启动前端（选择其中一个）

**Vue:**
```bash
cd frontend/vue-todo
npm install  # 如已安装可跳过
npm run dev
```

**React:**
```bash
cd frontend/react-todo
npm install  # 如已安装可跳过
npm run dev
```

### 访问地址

- Vue 前端: http://localhost:3000
- React 前端: http://localhost:3001
- Node.js 后端 API: http://localhost:8000/api/todos
- FastAPI 后端 API: http://localhost:8000/api/todos

---

## 评分标准

| 项目 | 分值 | 说明 |
|------|------|------|
| 后端理解 | 20% | 理解 API 设计和数据库操作 |
| 添加功能 | 20% | 正确调用 POST 接口 |
| 完成功能 | 20% | 正确调用 PUT 接口完成状态 |
| 编辑功能 | 20% | 正确调用 PUT 接口修改标题 |
| 删除功能 | 20% | 正确调用 DELETE 接口 |

---

## 注意事项

1. 两个后端端口都是 8000，**不可同时启动**
2. 两个前端端口分别是 3000 和 3001，可以同时启动
3. 前端代码中的 API 地址已配置为 `http://localhost:8000/api/todos`
4. 数据库文件为 `todo.db`，SQLite 可用 DB Browser 查看
