import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStatus from './UseUserStatus';

const Navbar = () => {
  const navigate = useNavigate();
  const { userStatus, isSessionValid, hasRemoteAccess } = useUserStatus();


  const handleLogOut = async () => {
    try {
      await axios.post('http://127.0.0.1:7000/account/logout/', {}, {
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
    alert("You don't have access to the servers");
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo on the left */}
        <div className="text-xl font-bold">
          <a href="/" className="hover:text-gray-300">
            Logo
          </a>
        </div>
        {/* Centered navigation links */}
        <div className="flex-grow flex flex-col sm:flex-row md:flex-row justify-center items-center space-x-0 sm:space-x-8 space-y-4 sm:space-y-0">
          <a href="/labs" className="hover:text-gray-300">Лабы</a>
          <a href="/material" className="hover:text-gray-300">Методички</a>
          <a href="/schedule" className="hover:text-gray-300">Расписание</a>
          <a href="/useful_links" className="hover:text-gray-300">Ссылки</a>
          {isSessionValid && hasRemoteAccess ? (
            <a href="/wetty" className="hover:text-gray-300">Сервера</a>
          ) : (
            <a onClick={handleNoAccess} className="hover:text-gray-300 cursor-pointer">Сервера</a>
          )}
          <a href="/recrutement" className="hover:text-gray-300">Вакансии</a>
        </div>
        {/* User info or Sign In button */}
        <div>
          {isSessionValid ? (
            <>
              <span className="mr-4">{userStatus.username}</span>
              <button onClick={handleLogOut} className="hover:text-gray-300">Log Out</button>
            </>
          ) : (
            <button onClick={() => navigate('/signin')} className="hover:text-gray-300">Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
