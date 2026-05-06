# 全栈面试测试项目 - TodoList

本项目用于测试面试者的全栈能力，包含两套前端和两套后端，可以自由组合对接。

## 测试项目
   可自由选择前端框架（Vue/react）和后端框架（nodejs/fastapi）
   - 1、补充后端代码（删除功能）。
   - 2、后端API和前端对接（编辑、状态check功能）。
   - 3、前端UI优化调整（微调样式）。

## 项目结构

```
interview_test/
├── frontend/
│   ├── vue-todo/        # Vue 3 前端 (端口 3000)
│   └── react-todo/      # React 前端 (端口 3001)
├── backend/
│   ├── nodejs-todo/     # Node.js + Express 后端 (端口 8000)
│   └── fastapi-todo/    # FastAPI 后端 (端口 8000)
├── TESTING.md           # 面试测试题
└── README.md
```

## 技术栈

- **前端**: Vue 3 / React 18 + Axios + Vite
- **后端**: Node.js + Express (JavaScript) / FastAPI (Python)
- **数据库**: SQLite

## API 接口

两个后端提供相同的 API 接口：

| 方法   | 路径              | 描述         |
|--------|-------------------|--------------|
| GET    | /api/todos        | 获取所有任务 |
| GET    | /api/todos/{id}   | 获取单个任务 |
| POST   | /api/todos        | 创建新任务   |
| PUT    | /api/todos/{id}   | 更新任务     |
| DELETE | /api/todos/{id}   | 删除任务     |

请求体格式 (POST/PUT):
```json
{
  "title": "任务标题",
  "completed": false
}
```

## 启动方式

### 前端启动

**Vue 前端:**
```bash
cd frontend/vue-todo
npm install
npm run dev
```

**React 前端:**
```bash
cd frontend/react-todo
npm install
npm run dev
```

### 后端启动

**Node.js 后端:**
```bash
cd backend/nodejs-todo
npm install
npm run dev
```

**FastAPI 后端:**
```bash
cd backend/fastapi-todo
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 面试考察点

1. **前端**
   - Vue/React 组件开发
   - UI 布局调整 (当前界面较简陋)
   - 状态管理
   - API 对接 (Axios)

2. **后端**
   - RESTful API 设计
   - 数据库 CRUD 操作
   - 前后端数据对接
   - 简单业务逻辑处理

3. **数据库**
   - SQLite 基本操作
   - 表结构理解
   - 增删改查 SQL

## 注意事项

- 两个后端端口都是 8000，不可同时启动
- 两个前端端口分别是 3000 和 3001，可以同时启动
- 前端默认对接 `http://localhost:8000`，如需修改请编辑 `src/App.vue` 或 `src/App.jsx`



