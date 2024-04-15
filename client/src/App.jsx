import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/Home'
import NavBar2 from './Components/NavBar2/NavBar2'; // Import your NavBar component
import './globals.css';

import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
// for authProvider
const store = createStore({
  authType: 'cookie',
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: false
})

const Login = lazy(() => import('./pages/Login'));
const Store = lazy(() => import('./pages/Store'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Signup = lazy(() => import('./pages/Signup'));
const NoPage = lazy(() => import('./pages/NoPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

const dontShowNav = ['/login', '/signup'];// add more paths to not show navigation bar in them

const App = () => {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <NavBarControlled />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Store' element={<Store />} />
            <Route path='/products/:productId' element={<ProductDetailPage />} />
            <Route element={<AuthOutlet fallbackPath='/Login' />}>
              <Route path='/ScheduleAppointments' element={<Appointments />} />
            </Route>
            <Route path='*' element={<NoPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter >
    </AuthProvider >
  );
};

const NavBarControlled = () => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(!dontShowNav.includes(location.pathname.toLowerCase()));
  }, [location]);

  return showNavBar ? <NavBar2 /> : null;
};

export default App;

