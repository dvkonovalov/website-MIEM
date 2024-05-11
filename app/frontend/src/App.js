import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import NavBar from "./Components/NavBar"
import Body from './Components/Body';
import Methodologies from './Components/Methodologies';
import Labs from './Components/Labs';
import Vacancies from './Components/Vacancy';
import AuthorizationForm from './Components/Signin';
import ScheduleFetcher from './Components/Schedule';

function App() {

  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={
          <>
            <div class="py-8">
              <Body />
            </div></>} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/material" element={<Methodologies />} />
          <Route path="/recrutement" element={<Vacancies />} />
          <Route path="/signin" element={<AuthorizationForm />} />
          <Route path="/schedule" element={<ScheduleFetcher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
