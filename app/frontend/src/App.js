import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from "./Components/NavBar";
import Body from './Components/Body';
import Methodologies from './Components/Methodologies';
import Labs from './Components/Labs';
import Vacancies from './Components/Vacancy';
import AuthorizationForm from './Components/Signin';
import ScheduleFetcher from './Components/Schedule';
import Useful_links from './Components/Useful';
import RegisterForm from './Components/Signup';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <NavBar/>
          <Routes>
            <Route path="/" element={<><div className="py-8"><Body /></div></>} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/material" element={<Methodologies />} />
            <Route path="/recrutement" element={<Vacancies />} />
            <Route path="/signin" element={
              <ProtectedRoute onlyUnauthenticated={true}>
                <AuthorizationForm />
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={<ScheduleFetcher />} />
            <Route path="/useful_links" element={<Useful_links />} />
            <Route path="/signup" element={
              <ProtectedRoute onlyUnauthenticated={true}>
                <RegisterForm />
              </ProtectedRoute>
            }/>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
