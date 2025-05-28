import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function AuthPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    referredBy: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };
    setForm((prev) => ({ ...prev, referralCode: generateReferralCode() }));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        referralCode: form.referralCode,
        referredBy: form.referredBy,
      });
      setMessage('');
      navigate('/login-ui');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#2B3C4E] flex flex-col justify-center items-center">
      <img src="/logo.png" alt="Logo" className="mb-6 w-12" />
      <div className="bg-white w-full max-w-md p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Account</h2>
        {message && <p className="text-red-500 mb-4 text-sm">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded text-sm" />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded text-sm" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded text-sm" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border rounded text-sm" />

          {/* Optional input to accept someone else's referral code */}
          <input type="text" name="referredBy" placeholder="Referral Code (if someone referred you)" value={form.referredBy} onChange={handleChange} className="w-full px-4 py-2 border rounded text-sm" />

          {/* Read-only user referral code */}
          <input type="text" name="referralCode" value={form.referralCode} readOnly className="w-full px-4 py-2 border rounded text-sm bg-gray-100 cursor-not-allowed" />

          <button type="submit" className="w-full bg-cyan-800 text-white py-2 rounded hover:bg-cyan-900">Register</button>
        </form>
      </div>

      <footer className="mt-8 text-white text-sm">
        <Link to="/login-ui" className="hover:underline">
          Already have an account? Login
        </Link>
      </footer>
    </div>
  );
}
