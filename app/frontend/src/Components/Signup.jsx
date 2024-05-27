import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
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
      const response = await fetch("http://127.0.0.1:7000/account/signup/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          username: username,
          password1: password,
          password2: confirmPassword,
          email: email,

        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create account.');
      }

      const result = await response.json();
      alert(result);

      if (result.message === "SUCCESS") {
        alert("Registration succeded.");
        navigate('/');
        window.location.reload();
      } else {
        setError("Please check your registration information.");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError("Registration failed: " + error.message);
    }
  };

  return (
    <form className="flex justify-center h-screen bg-black text-white w-full mt-12" onSubmit={submit}>
      <div className="w-3/4 max-w-md">
        <h1 className="text-5xl font-extrabold text-center mb-12">Регистрация</h1>
        <div className="mb-4">
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            id="confirm-password"
            type="password"
            placeholder="Подтвердите пароль"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="flex justify-center">
          <button type="submit" className="w-1/2 border-4 border-white text-white py-2">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
