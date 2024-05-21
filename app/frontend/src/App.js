import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from "./Components/NavBar";
import Body from './Components/Body';
import Methodologies from './Components/Methodologies';
import Labs from './Components/Labs';
import Vacancies from './Components/Vacancy';
import ScheduleFetcher from './Components/Schedule';
import Useful_links from './Components/Useful';
import AuthorizationForm from './Components/Signin';
import RegisterForm from './Components/Signup';
import useUserStatus from './Components/UseUserStatus';
import ResetPassword from './Components/ResetPassword';


const PublicRoute = ({ element }) => {
  const { isSessionValid } = useUserStatus();
  const navigate = useNavigate();

  if (isSessionValid) {
    alert("You're already connected");
    navigate('/');
    return null;
  }

  return element;
};

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<div className="py-8"><Body /></div>} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/material" element={<Methodologies />} />
        <Route path="/recrutement" element={<Vacancies />} />
        <Route path="/signin" element={<PublicRoute element={<AuthorizationForm />} />} />
        <Route path="/forgot_password" element={<PublicRoute element={<ResetPassword />} />} />
        <Route path="/schedule" element={<ScheduleFetcher />} />
        <Route path="/useful_links" element={<Useful_links />} />
        <Route path="/signup" element={<PublicRoute element={<RegisterForm />} />} />
      </Routes>
    </Router>
  );
}

export default App;
