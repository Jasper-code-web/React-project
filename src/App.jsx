import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./style.css";
import { useEffect } from "react";

//useState, useEffect, useContext
//useReducer, useCallback, useMemo, useRef

const STORAGE_KEY = "todomvc-react"
const todosStorage = {
  fetch() {
    const todos = JSON.parse(window.localStorage.getItem(STORAGE_KEY || '[]'))
    return todos
  },
  save(todos) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

todosStorage.save([
  { title: "创建项目", isCheck: false, id: 1, isEdit: false },
  { title: "组件化开发", isCheck: false, id: 2, isEdit: false },
  { title: "掌握JSX", isCheck: true, id: 3, isEdit: false },
  { title: "掌握hooks", isCheck: true, id: 4, isEdit: false },
])

function App() {
  const [todos, setTodos] = useState(todosStorage.fetch());
  const initial = {
    title: "",
    isEdit: false
  }
  let editInputRef = null

  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(initial);

  const setEditInputRef = (el, todo) => {
    if(editTodo.id === todo.id) editInputRef = el
  }

  useEffect(() => {
    if(editInputRef) editInputRef.focus()
  }, [editTodo])

  useEffect(() => {
    todosStorage.save(todos)
  }, [todos])

  const inputWord = (e) => {
    setNewTodo(e.target.value);
  };

  const enterInput = (e) => {
    if (e.code === "Enter") {
      setTodos([
        ...todos,
        {
          title: newTodo,
          isCheck: false,
          isEdit: false,
          id: todos[todos.length - 1].id + 1,
        },
      ]);
      setNewTodo("");
    }
  };

  const changeCheckState = (e, id) => {
    todos.map((todo) => {
      if (todo.id === id) todo.isCheck = e.target.checked;
    });
    setTodos([...todos]);
  };

  const removeTodo = (todo) => {
    setTodos([...todos.filter((item) => item.id !== todo.id)]);
  };

  const changeEditState = (todo) => {
    todos.map((item) => {
      if (todo.id === item.id) {
        item.isEdit = true;
        setEditTodo({...todo});
      }
    });
    setTodos([...todos]);
  };

  const changeEditWord = (e) => {
    editTodo.title = e.target.value
    setEditTodo({...editTodo});
  };

  const confirmEdit = (e, todo) => {
    const handleEdited = (todo) => {
      if (editTodo.title == "") {
        removeTodo(todo);
      } else {
        todos.map((item) => {
          if (todo.id === item.id) {
            item.title = editTodo.title;
            item.isEdit = false;
          }
        });
        setTodos([...todos]);
      }
      setEditTodo(initial);
    };
    if (todo && todo.isEdit) {
      if (e && e.code) {
        if (e.code === "Enter") handleEdited(todo);
      } else handleEdited(todo);
    }
  };

  return (
    <div className="app">
      <ul className="todo-list">
        <input
          placeholder="请输入"
          onKeyUp={(e) => enterInput(e)}
          onChange={(e) => inputWord(e)}
          value={newTodo}
        ></input>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="view">
              <li className={todo.isEdit ? "blank" : "completed"}>
                <span
                  className={todo.isCheck ? "title" : ""}
                  onDoubleClick={() => changeEditState(todo)}
                >
                  {todo.title}
                </span>
                <input
                  type="checkbox"
                  value={todo.isCheck}
                  checked={todo.isCheck}
                  onChange={(e) => changeCheckState(e, todo.id)}
                ></input>
                <span className="close" onClick={() => removeTodo(todo)}>
                  X
                </span>
              </li>
              <input
                type="text"
                value={editTodo?.title}
                ref={(el) => {setEditInputRef(el, todo)}}
                onKeyUp={(e) => confirmEdit(e, todo)}
                onBlur={(e) => {
                  confirmEdit(e, todo);
                }}
                onChange={(e) => {
                  changeEditWord(e);
                }}
                className={todo.isEdit ? "edit-input" : "invisible-input"}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
