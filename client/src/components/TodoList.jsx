import DeleteIcon from "./DeleteIcon";

function TodoList({ todos, deleteTodo, editTodo }) {
  return (
    <ul className="divide-y divide-cool-100">
      {todos.map(todo =>
        <li
          className="flex items-center justify-between py-2 group"
          key={todo.id}
        >
          <div onClick={() => editTodo(todo)} className={`cursor-pointer ${todo.is_done ? "line-through" : "no-underline"}`}>{todo.title}</div>
          <button
            className="flex items-center invisible px-2 py-1 opacity-50 hover:opacity-100 group-hover:visible"
            onClick={() => deleteTodo(todo)}
          >
            <DeleteIcon />
          </button>
        </li>)
      }
    </ul>
  )
}


export default TodoList; 
