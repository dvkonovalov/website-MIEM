import React, { useState } from 'react';
import hseimage from '../Assets/hse.png';
import googleimage from '../Assets/google.png';
import { useNavigate } from 'react-router-dom';

const AuthorizationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let csrftoken;
  try {
    csrftoken = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('csrftoken='))
      ?.split('=')[1];
  } catch (error) {
    console.error('CSRF token not found:', error);
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch("http://127.0.0.1:7000/account/login/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error('Не получилось авторизоваться');
      }

      const result = await response.json();
      console.log('Server response:', result);


      if (result.Authorization === "Success") {
        alert("Успешная авторизация.");
        navigate('/');
        window.location.reload();
      } else {
        setError("Проверьте информации.");
      }
    } catch (error) {
      console.error('Не получилось авторизоваться:', error);
      setError("Не получилось авторизоваться " + error.message);
    }
  };

  return (
    <form className="flex justify-center h-screen bg-black text-white w-full mt-12">
      <div className="w-3/4 max-w-md">
        <h1 className="text-5xl font-extrabold text-center mb-12">Авторизация</h1>
        <div className="mb-4">
          <input
            id="email"
            type="text"
            placeholder="Почта"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="flex justify-center">
          <button
            className="w-1/4 border-4 border-white text-white py-2"
            onClick={submit}>
            Войти
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <a href="/signup" className="text-white text-sm">Зарегистрироваться</a>
        </div>
        <div className="flex justify-center mt-1">
          <a href="/forgot_password" className="text-white text-sm">Забыли пароль?</a>
        </div>
      </div>
    </form>
  );
};

export default AuthorizationForm;
