import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Authentication from "./components/Authentication";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import AddIcon from "./components/AddIcon";

function App() {
  const [todos, setTodos] = useState([]);
  const [cookies, _setCookie, removeCookie] = useCookies(null);
  const [showInputTodo, setShowInputTodo] = useState(false);

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json()
      setTodos(json);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteTodo = async (todo) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "DELETE"
      });

      if (response.status === 200)
        getData();
    } catch (error) {
      console.error(error);
    }
  }

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");

    window.location.reload();
  }

  const editTodo = async (todo) => {
    todo.is_done = !todo.is_done;

    try {
      const response = await fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
      });
      if (response.status === 200)
        getData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authToken) getData();
  }, []);

  return (
    <div className="App mx-auto">
      {authToken ?
        (
          <>
            <div className="mt-10 flex justify-between items-center px-2">
              <span className="font-medium text-sm text-cool-900 border-b-2 border-black">Reminders</span>
              <button className="font-medium text-sm text-cool-900 border-b-2 border-black" onClick={signOut}>signout</button>
            </div>
            <div className="p-12 mt-10 rounded-md shadow-lg bg-white">
              <div className={`${todos.length > 0 ? "mb-10" : "mb-4"}`}>
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold">Reminders</h1>
                  <button
                    className="p-2 border border-transparent rounded hover:border-gray-300 text-gray-600"
                    onClick={() => setShowInputTodo(!showInputTodo)}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
              <div>
                <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
              </div>
              {showInputTodo && <TodoInput getData={getData} setShowInputTodo={setShowInputTodo} />}
            </div>
          </>
        )
        : <Authentication />}
    </div>
  );
}

export default App;
