import { useState, useEffect } from "react";
import classnames from "classnames"
export default function ({ todos, setTodos, removeTodo, updateTodos }) {
    const initial = {
        title: "",
        isEdit: false
    }
    let editInputRef = null
    const [editTodo, setEditTodo] = useState(initial);

    useEffect(() => {
        if (editInputRef) editInputRef.focus()
    }, [editTodo])
    const setEditInputRef = (el, todo) => {
        if (editTodo.id === todo.id) editInputRef = el
    }
    const changeCheckState = (e, id) => {
        todos.map((todo) => {
            if (todo.id === id) todo.isCheck = e.target.checked;
        });
        setTodos([...todos]);
    };

    const changeEditState = (todo) => {
        todos.map((item) => {
            if (todo.id === item.id) {
                item.isEdit = true;
                setEditTodo({ ...todo });
            }
        });
        setTodos([...todos]);
    };

    const changeEditWord = (e) => {
        editTodo.title = e.target.value
        setEditTodo({ ...editTodo });
    };

    const confirmEdit = (e, todo) => {
        const handleEdited = (todo) => {
            if (editTodo.title == "") {
                removeTodo(todo);
            } else {
                updateTodos(editTodo)
            }
            setEditTodo(initial);
            console.log('todos', todos)
        };
        if (todo && todo.isEdit) {
            if (e && e.code) {
                if (e.code === "Enter") handleEdited(todo);
            } else handleEdited(todo);
        }
    };
    return (
        <ul className="todo-list">
            {
                todos.map((todo) => {
                    return (
                        <div key={todo.id} className="view">
                            {/* <li className={todo.isEdit ? "blank" : "completed"}> */}
                            <li className={classnames({
                                blank: todo.isEdit,
                                completed: !todo.isEdit
                            })}>
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
                                ref={(el) => { setEditInputRef(el, todo) }}
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
                })
            }
        </ul>
    )
}