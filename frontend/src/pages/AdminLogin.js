import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-black">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Login as Admin
      </button>
    </div>
  );
};

export default AdminLogin;
