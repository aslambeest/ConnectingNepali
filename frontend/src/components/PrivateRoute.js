// src/components/PrivateRoute.js
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  const location = useLocation();

  const [triggerLogin, setTriggerLogin] = useState(false);

  // If not logged in and visiting /admin → show login form right here
  if (!token && location.pathname === '/admin') {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={() => {}} // mock input
        />
        <label className="block mb-4">
          <input
            type="checkbox"
            onChange={() => {
              localStorage.setItem('isAdmin', 'true');
            }}
          />{' '}
          I am admin
        </label>
        <button
          onClick={() => {
            localStorage.setItem('token', 'test123');
            setTriggerLogin(!triggerLogin); // force re-render
          }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login as Admin
        </button>
      </div>
    );
  }

  // Logged in, but not admin trying to access /admin
  if (location.pathname === '/admin' && isAdmin !== 'true') {
    return <Navigate to="/login-ui" replace />;
  }

  // Not logged in and not accessing /admin
  if (!token) {
    return <Navigate to="/login-ui" replace />;
  }

  return children;
}
