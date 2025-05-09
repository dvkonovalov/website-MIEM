import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStatus from './UseUserStatus';
import logo from '../Utils/logo.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userStatus, isSessionValid, hasRemoteAccess } = useUserStatus();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


  const handleLogOut = async () => {
    try {
      await axios.post('http://127.0.0.1/account/logout/', {}, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': document.cookie
            .split(';')
            .find((c) => c.trim().startsWith('csrftoken='))
            ?.split('=')[1],
        }});

      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed: ' + error.message);
    }
  };

  const handleNoAccess = () => {
    alert("У вас нет доступа к серверам");
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <a href="/">
          <img src={logo} className="h-8 w-8"/>
          </a>
        </div>
        <div className="flex-grow flex flex-col sm:flex-row md:flex-row justify-center items-center space-x-0 sm:space-x-8 space-y-4 sm:space-y-0">
          <a href="https://netlab.auditory.ru/" className="hover:text-gray-300">Лабы</a>
          <a href="/material" className="hover:text-gray-300">Методички</a>
          <a href="/useful_links" className="hover:text-gray-300">Ссылки</a>
          {isSessionValid && hasRemoteAccess ? (
            <a href="https://gatekeeper.miem.hse.ru/" className="hover:text-gray-300">Сервера</a>
          ) : (
            <a onClick={handleNoAccess} className="hover:text-gray-300 cursor-pointer">Сервера</a>
          )}
          <a href="https://cabinet.miem.hse.ru/profile/618/managed/active" className="hover:text-gray-300">Вакансии</a>
        </div>
        <div className="relative inline-block text-left">
      {isSessionValid ? (
        <div>
          <button
            onClick={handleMenuToggle}
            className="flex items-center mr-4 hover:text-gray-300 focus:outline-none"
          >
            {userStatus.username}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black border border-white">
              <button
                onClick={handleLogOut}
                className="block w-full text-left px-4 py-2 hover:text-gray-300"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/signin')}
          className="hover:text-gray-300"
        >
          Войти
        </button>
      )}
    </div>
    </div>
    </nav>
  );
};

export default Navbar;
