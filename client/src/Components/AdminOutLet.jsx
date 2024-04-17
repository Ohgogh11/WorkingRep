// AdminOutlet.js
import React from 'react';
// import { Navigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Unauthorized from './Unauthorized';
import { Outlet } from 'react-router-dom';

const AdminOutlet = () => {
  const authUser = useAuthUser();

  // Check if user is authenticated and has admin role
  const isAdmin = authUser && authUser.role && authUser.role.toLowerCase() === 'admin';

  return isAdmin ? <Outlet/> : <Unauthorized/>;
};

export default AdminOutlet;
