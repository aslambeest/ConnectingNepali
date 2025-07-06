import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLogin from '../pages/AdminLogin';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  if (!token) return <AdminLogin />;
  if (isAdmin !== 'true') return <Navigate to="/dashboard" replace />;

  return <AdminDashboard />;
};

export default AdminRoute;
