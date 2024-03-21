import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar2 from './Components/NavBar2/NavBar2'; // Import your NavBar component
import HomePage from './pages/Home'; // Import your HomePage component
import Login from './pages/Login'; // Import your Login component
import Store from './pages/Store'; // Import your Store component
import Appointments from './pages/Appointments'; // Import your Appointments component
import Signup from './pages/Signup';
import NoPage from './pages/NoPage'; // Import your NoPage component
import './globals.css';

const dontShowNav = ['/Login', '/Signup'];// add more paths to not show navigation bar in them

const App = () => {
  return (
    <BrowserRouter>
    <NavBar2/>
      {/* <NavBarControlled /> */}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Store' element={<Store />} />
        <Route path='/ScheduleAppointments' element={<Appointments />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const NavBarControlled = () => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar( !dontShowNav.includes(location.pathname));
  }, [location]);

  return showNavBar ? <NavBar /> : null;
};

export default App;

