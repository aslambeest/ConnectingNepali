import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterUI = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    visaStatus: '',
    referredBy: '',
    licenseClass: '' // ✅ added license class to state
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('❌ Passwords do not match!');
    }

    try {
      const payload = { ...form };
      delete payload.confirmPassword;
      await axios.post('https://connectingnepali.onrender.com/api/auth/register', payload);
      alert('✅ Registration successful! Please verify your email.');
      navigate('/login-ui');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Visa Status</label>
            <select
              name="visaStatus"
              value={form.visaStatus}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Visa Status</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Work Permit">Work Permit</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="Visitor Visa">Visitor Visa</option>
              <option value="Refugee Claimant">Refugee Claimant</option>
              <option value="Citizen">Citizens</option>
            </select>
          </div>

          {/* ✅ License Class dropdown added below Visa Status */}
          <div>
            <label className="text-sm text-gray-600">License Class</label>
            <select
              name="licenseClass"
              value={form.licenseClass}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select License Class</option>
              <option value="7L">7L – New drivers; must be supervised</option>
              <option value="7N">7N – Novice drivers; can drive alone with limits</option>
              <option value="5">5 – Cars, SUVs, light trucks, motorhomes (up to 2-axle)</option>
              <option value="8L/8">8L / 8 – Motorcycles, ATVs, all-terrain cycles</option>
              <option value="Limited-speed">Limited-speed bikes (≤ 50cc, ≤ 70 km/h)</option>
              <option value="4">4 – Taxis, ambulances, small/medium buses</option>
              <option value="3">3 – Multi-axle trucks, mobile cranes, heavy trailers</option>
              <option value="2">2 – Buses including school and special-activity</option>
              <option value="1">1 – Tractor-trailers; all Class 1–5 vehicles</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Referral Code (optional)</label>
            <input
              type="text"
              name="referredBy"
              value={form.referredBy}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login-ui')}
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
