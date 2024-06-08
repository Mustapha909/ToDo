import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }

  function toggleTodo(id: number, completed: boolean) {
    setTodos((currentToDos) => {
      return currentToDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5	">
          <label htmlFor="item">New Item</label>
          <input
            className="focus:bg-sky-200"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="bg-sky-700 bg-opacity-10 px-2 py-1 border border-solid border-sky-700 rounded cursor-pointer outline-none focus:hover:bg-sky-500 ">
          Add
        </button>
      </form>
      <h1 className="text-2xl mt-6	mb-2">ToDo List</h1>
      <ul className="m-0 p-0 ml-4 list-none flex flex-col gap-1">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="flex items-center gap-2">
              <label className="flex gap-1 cursor-pointer	items-center ">
                <input
                  type="checkbox"
                  className="text-gray-800  "
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-700 bg-opacity-10 text-red-700 px-2 py-1 border border-solid border-red-700 rounded cursor-pointer outline-none hover:focus:bg-opacity-20"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
