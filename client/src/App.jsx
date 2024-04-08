import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/Home'
import NavBar2 from './Components/NavBar2/NavBar2'; // Import your NavBar component
import './globals.css';

const Login = lazy(() => import('./pages/Login'));
const Store = lazy(() => import('./pages/Store'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Signup = lazy(() => import('./pages/Signup'));
const NoPage = lazy(() => import('./pages/NoPage'));


const dontShowNav = ['/Login', '/Signup'];// add more paths to not show navigation bar in them

const App = () => {
  return (
    <BrowserRouter>
      <NavBar2 />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Store' element={<Store />} />
          <Route path='/ScheduleAppointments' element={<Appointments />} />
          {/* //TODO need to add Product page for a page with id /product:{productID} */}
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter >
  );
};

const NavBarControlled = () => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(!dontShowNav.includes(location.pathname));
  }, [location]);

  return showNavBar ? <NavBar2 /> : null;
};

export default App;

