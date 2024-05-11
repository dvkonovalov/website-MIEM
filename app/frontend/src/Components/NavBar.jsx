import React from 'react';

const Navbar = () => {
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
        <div className="flex-grow flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-8 space-y-4 sm:space-y-0">
          <a href="/labs" className="hover:text-gray-300">Лабы</a>
          <a href="/material" className="hover:text-gray-300">Методички</a>
          <a href="/schedule" className="hover:text-gray-300">Расписание</a>
          <a href="/server" className="hover:text-gray-300">Сервера</a>
          <a href="/recrutement" className="hover:text-gray-300">Вакансии</a>
        </div>
        {/* Placeholder on the right for balance */}
        <div className="text-xl font-bold opacity-0">
          {/* Invisible logo for balance */}
          Logo
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
