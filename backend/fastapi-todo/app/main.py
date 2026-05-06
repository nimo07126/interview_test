from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from app.database import engine, get_db, Base
from app.models import Todo
from app.schemas import TodoCreate, TodoUpdate, TodoResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI Todo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 根路径，返回欢迎信息
@app.get("/")
def root():
    return {"message": "FastAPI Todo API"}
# 获取所有待办事项
@app.get("/api/todos", response_model=List[TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(Todo).all()
    return todos
# 获取单个待办事项
@app.get("/api/todos/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo
# 创建新的待办事项
@app.post("/api/todos", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = Todo(title=todo.title, completed=todo.completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
# 更新待办事项（状态和修改标题）
@app.put("/api/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo_update: TodoUpdate, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    update_data = todo_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)

    db.commit()
    db.refresh(db_todo)
    return db_todo

# 删除待办事项
@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    # 补充完成代码 -------------------------
    
    
    
    
    
    
    
    return {"message": "Todo deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
