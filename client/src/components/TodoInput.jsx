import { useCookies } from 'react-cookie';
import { useState } from 'react';

function TodoInput({ getData, setShowInputTodo }) {
  const [cookies, _setCookie, _removeCookie] = useCookies(null);
  const [todo, setTodo] = useState({
    userEmail: cookies.Email,
    title: "",
    date: new Date(),
  });

  const handleOnChange = (e) => {
    setTodo(todo => ({
      ...todo,
      title: e.target.value
    }))
  }

  const postData = async (e) => {
    e.preventDefault();

    const form = e.target.form;
    const input = form.elements[0];

    if (input.checkValidity()) {
      try {
        const response = await fetch("http://localhost:8000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo)
        })
        if (response.status === 200) {
          setShowInputTodo(false);
          setTodo(todo => ({
            ...todo,
            title: ""
          }))
          getData();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("el campo de entrada no es valido");
    }
  }

  return (
    <form className="">
      <div>
        <div className="relative py-1">
          <input
            autoFocus
            className="outline-0 w-full py-2 px-0.5 transition duration-150 ease-in-out border-2 border-transparent focus:shadow-none focus:border-blue-300 sm:leading-5 rounded-md"
            placeholder="New reminder..."
            type="text"
            onChange={handleOnChange}
            value={todo.title}
            maxLength={30}
            required
          />
          <div className="absolute inset-y-0 right-0 flex py-1">
            <button
              type="onSubmit"
              onClick={postData}
              className="items-center px-4 text-sm text-gray-700 hover:text-gray-400"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default TodoInput;
