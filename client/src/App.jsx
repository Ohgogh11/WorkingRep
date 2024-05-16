import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/Home";
import NavBar from "./Components/NavBar/NavBar"; // Import your NavBar component
import Loading from "./pages/Loading";
import "./globals.css";

import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import AdminOutlet from "./Components/AdminOutLet";
import CreateProduct from "./pages/CreateProduct";
import CreateBarber from "./pages/CreateBarber";

// import Appointments from "./pages/Appointments"; //! delete after testing
// for authProvider
const authStore = createStore({
  authType: "cookie",
  authName: "_auth",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});
// react-query
const queryClient = new QueryClient();

const Login = lazy(() => import("./pages/Login"));
const Store = lazy(() => import("./pages/Store"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Signup = lazy(() => import("./pages/Signup"));
const NoPage = lazy(() => import("./pages/NoPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const TokenGenerationPage = lazy(() => import("./pages/TokenGenerationPage"));
const AppointmentConfirmationPage = lazy(() =>
  import("./pages/AppointmentConfirmation")
);
const dontShowNav = ["/login", "/signup"]; // add more paths to not show navigation bar in them

const App = () => {
  return (
    <AuthProvider store={authStore}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NavBarControlled />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/' element={<HomePage />} />
              <Route
                path='/AppointmentConfirmation/:token'
                element={<AppointmentConfirmationPage />}
              />
              <Route path='/Login' element={<Login />} />
              <Route path='/Signup' element={<Signup />} />
              <Route path='/Store' element={<Store />} />
              <Route path='/New-Barber/:token' element={<CreateBarber />} />
              <Route
                path='/products/:productId'
                element={<ProductDetailPage />}
              />
              <Route element={<AuthOutlet fallbackPath='/Login' />}>
                <Route
                  path='/ScheduleAppointments'
                  element={<Appointments />}
                />
                <Route element={<AdminOutlet />}>
                  <Route path='/admin' element={<div>admin</div>} />
                  <Route
                    path='/admin/barberLink'
                    element={<TokenGenerationPage />}
                  />
                  <Route
                    path='/admin/Create-New-Product'
                    element={<CreateProduct />}
                  />
                </Route>
              </Route>
              <Route path='*' element={<NoPage />} />
            </Routes>
          </Suspense>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

const NavBarControlled = () => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(!dontShowNav.includes(location.pathname.toLowerCase()));
  }, [location]);

  return showNavBar ? <NavBar /> : null;
};

export default App;
