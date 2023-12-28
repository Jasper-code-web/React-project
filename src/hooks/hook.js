import { todosStorage } from "./storage";
import { useState, useEffect, useMemo } from "react";
const todosKey = 'todoskey'
export function useTodos(todoList) {
  const [todos, setTodos] = useState(todoList);
  useEffect(() => {
    todosStorage.save(todosKey, todos);
  }, [todos]);
  const removeTodo = (todo) => {
    setTodos([...todos.filter((item) => item.id !== todo.id)]);
  };
  const addTodo = (title) => {
    setTodos([
      ...todos,
      {
        title: title,
        isCheck: false,
        isEdit: false,
        id: todos[todos.length - 1].id + 1,
      },
    ]);
  };
  const updateTodos = (editTodo) => {
    const todo = todos.find((item) => item.id === editTodo.id);
    Object.assign(todo, editTodo);
    todo.isEdit = false
    setTodos([...todos]);
  };
  return {todos, setTodos, removeTodo, addTodo, updateTodos}
}

export function useFilter(todos) {
  const [visible, setVisible] = useState("all")
  const filteredTodos = useMemo(() => {
    if(visible === "all") {
      return todos
    }
    else if(visible === "active") return todos.filter(item => item.isCheck)
    else return todos.filter(item => !item.isCheck)
  }, [todos, visible])
  return {visible, setVisible, filteredTodos}
}