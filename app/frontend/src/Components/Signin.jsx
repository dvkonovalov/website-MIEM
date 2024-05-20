import React, {useState} from 'react';
import hseimage from '../Assets/hse.png';
import googleimage from '../Assets/google.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'



const AuthorizationForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const csrftoken = document.cookie
    .split(';')
    .find((c) => c.trim().startsWith('csrftoken='))
    ?.replace('csrftoken=', '');


  const submit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/account/login/", {
      method: "POST",
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Server response not OK');
      }
    })
    .then((result) => {
      if (result.message === "SUCCESS") {
        alert("You are logged in.");
        navigate('/');
        login();
      } else {
        alert("Please check your login information.");
      }
    })
    .catch((error) => {
      console.error('Login failed:', error);
      alert("Login failed: " + error.message);
    });
  }

  return (
    <form className="flex justify-center h-screen bg-black text-white w-full mt-12">
      <div className="w-3/4 max-w-md">
        <h1 className="text-5xl font-extrabold text-center mb-12">Авторизация</h1>
        <div className="flex flex-col items-center justify-between mb-8 space-y-4">
        <a src="" className="flex items-center justify-between p-2 border border-custom-gray rounded-full w-full">
            <div className="flex justify-center items-center rounded-full bg-white some-icon-class">
                <img src= {hseimage} alt="Icon" className="w-8 h-8" />
            </div>
            <span className="text-center flex-grow">ЕЛК ВШЭ</span>
            <div className="w-8"></div>
        </a>
        <a src="" className="flex items-center p-2 border border-custom-gray rounded-full w-full">
            <div className="flex justify-center items-center some-icon-class">
                <img src= {googleimage} alt="Icon" className="w-8 h-8" />
            </div>
            <span className="text-center flex-grow">Google</span>
            <div className="w-8"></div>
        </a>
        </div>
        <div className="mb-4">
          <input
            id="email"
            type="text"
            placeholder="Почта"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className="w-full p-2 text-white bg-black border border-custom-gray"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="flex justify-center">
          <button
            className="w-1/4 border-4 border-white text-white py-2"
            onClick={submit}>
            Войти
          </button>
        </div>
        <div className="flex justify-center mt-1">
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