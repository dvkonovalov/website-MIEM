import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignIn = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data for session persistence
        alert("You are logged in.");
      } else {
        alert(data.message || "Authentication failed.");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      });
      if (response.ok) {
        setUser(null);
        localStorage.removeItem('user');
        alert("You are logged out.");
      } else {
        alert("Log out failed.");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <a href="/server" className="hover:text-gray-300">Сервера</a>
          <a href="/recrutement" className="hover:text-gray-300">Вакансии</a>
        </div>
        {/* Placeholder on the right for balance */}
        <div>
        {user ? (
          <>
            <span className="mr-4">{user.username}</span>
            <button onClick={handleLogOut} className="hover:text-gray-300 ">Log Out</button>
          </>
        ) : (
          <button onClick={() => navigate('/signin')} className="hover:text-gray-300 ">Sign In</button>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
