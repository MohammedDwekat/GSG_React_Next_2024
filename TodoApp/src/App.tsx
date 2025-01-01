import { useState } from "react";
import Dashboard from "./components/dashboard/dashboard.component";
import Form from "./components/form/form.component";
import TodoList from "./components/todo-list/todo-list.component";
import { ITodoItem } from "./components/types";

function App() {
  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const handleNewItem = (item: ITodoItem) => {
    setTodos([...todos, item]);
  };

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.dataset["itemId"];
    const newItem = todos.map((item) =>
      item.id === Number(itemId) ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(newItem);
  };

  const handleDelete = (index: number) => {
    setTodos([
      ...todos.slice(0, index),
      ...todos.slice(index + 1, todos.length),
    ]);
  };

  return (
    <div>
      <h1> To do app {new Date().toDateString()}</h1>
      <Form onSubmit={handleNewItem} />
      <Dashboard items={todos} />
      <TodoList
        items={todos}
        onToggle={handleTaskToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
