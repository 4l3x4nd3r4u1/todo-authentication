import { useState } from 'react';
import { useCookies } from 'react-cookie';

function Authentication() {
  const [_cookies, setCookie, _removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match");
      return;
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  }

  return (
    <div className="bg-white mt-16 p-12 rounded-md shadow">
      <form>
        <h2 className='text-2xl'>{isLogIn ? 'Please log in' : "Please sign up"}</h2>
        <input
          autoFocus
          className="mt-4 outline-0 w-full py-2 px-0.5 transition duration-150 ease-in-out border-2 border-transparent focus:shadow-none focus:border-blue-300 sm:leading-5 rounded-md"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 outline-0 w-full py-2 px-0.5 transition duration-150 ease-in-out border-2 border-transparent focus:shadow-none focus:border-blue-300 sm:leading-5 rounded-md"
        />
        {!isLogIn &&
          <input
            className="mt-2 outline-0 w-full py-2 px-0.5 transition duration-150 ease-in-out border-2 border-transparent focus:shadow-none focus:border-blue-300 sm:leading-5 rounded-md"
            type="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        }
        <button
          className='mt-4 border px-2 rounded-md'
          type="submit"
          onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
        >
          submit
        </button>
        {error && <p className="mt-4 border border-red-200 text-sm text-center">{error}</p>}
      </form>
      <div className='mt-4 flex justify-between'>
        <button onClick={() => viewLogin(false)} className='border px-2 rounded-md'>Sign up</button>
        <button onClick={() => viewLogin(true)} className='border px-2 rounded-md'>Login</button>
      </div>
    </div>
  )
}

export default Authentication;
