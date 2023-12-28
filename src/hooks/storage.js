export const todosStorage = {
  fetch(key) {
    const todos = JSON.parse(
      window.localStorage.getItem(key) || "[]"
    );
    return todos;
  },
  save(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
};