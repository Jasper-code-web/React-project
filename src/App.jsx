import "./App.css";
import "./style.css";
import { useState } from "react";
import TodoList from "./TodoList";
import TodoFilter from "./todoFilter/index";
import { useTodos, useFilter } from "./hooks/hook";
import { todosStorage } from "./hooks/storage";

//useState, useEffect, useContext
//useReducer, useCallback, useMemo, useRef

const todosKey = 'todoskey'

todosStorage.save(todosKey, [
  { title: "创建项目", isCheck: false, id: 1, isEdit: false },
  { title: "组件化开发", isCheck: false, id: 2, isEdit: false },
  { title: "掌握JSX", isCheck: true, id: 3, isEdit: false },
  { title: "掌握hooks", isCheck: true, id: 4, isEdit: false },
]);


function App() {
  const {todos, setTodos, addTodo, removeTodo, updateTodos} = useTodos(todosStorage.fetch(todosKey))
  const {visible, setVisible, filteredTodos} = useFilter(todos)
  const [newTodo, setNewTodo] = useState("");

  const inputWord = (e) => {
    setNewTodo(e.target.value);
  };

  const enterInput = (e) => {
    if (e.code === "Enter") {
      addTodo(newTodo)
      setNewTodo("");
    }
  };

  return (
    <div className="app">
      <input
        placeholder="请输入"
        onKeyUp={(e) => enterInput(e)}
        onChange={(e) => inputWord(e)}
        value={newTodo}
      ></input>
      <TodoList {...{todos: filteredTodos, setTodos, removeTodo, updateTodos}}></TodoList>
      <TodoFilter {...{visible, setVisible}}></TodoFilter>
    </div>
  );
}

export default App;
