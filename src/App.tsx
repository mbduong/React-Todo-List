import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  return <ToDoList />;
}

type Task = {
  id: string;
  text: string;
  checked: boolean;
}

// entire to do list component
function ToDoList({ }) {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <>
      <h2>To Do List</h2>
      <div>
        <InputBar
          task={task}
          setTask={setTask}
          todos={todos}
          setTodos={setTodos}
        />
        <TaskList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

// form component of to do list
function InputBar({ task, setTask, todos, setTodos }: { task: any; setTask: any; todos: any; setTodos: any;}) {
  const handleInput = (e: any) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      text: task,
      checked: false,
    };

    setTodos([...todos, newTask]);
    setTask("");
  };

  return (
    <form>
      <input className="todo-input" value={task} onChange={handleInput}
        type="text" placeholder="add task">
      </input>
      <button className="todo-button" onClick={handleSubmit}>+</button>
    </form>
  );
}

// list component of to do list
function TaskList({ todos, setTodos }: { todos: any; setTodos: any }) {
  
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((task: Task) => {
          return (
            <TaskItem
              todos={todos}
              setTodos={setTodos}
              key={task.id}
              task={task}
            />
          );
        })}
      </ul>
    </div>
  );
}

type TaskProps = {
  todos: Task[];
  setTodos: any;
  task: Task;
}

// task item component of to do list
function TaskItem({ todos, setTodos, task }: TaskProps) {
  // https://stackoverflow.com/questions/57341541/removing-object-from-array-using-hooks-usestate
  const handleRemove = (e: any) => {
    setTodos(todos.filter((item: any) => item.id !== task.id));
  };

  // https://stackoverflow.com/questions/72426117/update-boolean-value-in-usestate-array
  const handleChecked = (e: any) => {
    setTodos(
      todos.map((item: any) => {
        if (item.id === task.id) {
          return {
            ...item, checked: !item.checked,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      <input type="checkbox" className="check-button" onClick={handleChecked} />
      <li className={`todo-item ${task.checked && "strikethrough"}`}>{task.text}</li>
      <button className="remove-button" onClick={handleRemove}>X</button>
    </div>
  );
}
