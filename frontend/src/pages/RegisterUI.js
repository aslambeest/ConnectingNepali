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
    licenseType: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('❌ Your passwords do not match.');
    }

    try {
      const payload = { ...form };
      delete payload.confirmPassword;

      const BASE_URL = process.env.REACT_APP_API_URL;
      await axios.post(`${BASE_URL}/api/auth/register`, payload);

      alert('🎉 Registration successful! Please check your email to verify your account.');
      navigate('/login-ui');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Join Nepali Circle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
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
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Create Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
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
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Visa Type</label>
            <select
              name="visaStatus"
              value={form.visaStatus}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>Select your visa type</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Work Permit">Work Permit</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="Visitor Visa">Visitor Visa</option>
              <option value="Refugee Claimant">Refugee Claimant</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Driver’s License Class
            </label>
            <select
              name="licenseType"
              value={form.licenseType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-700"
            >
              <option value="" disabled>Select License Class</option>
              <option value="7L">7L – Learner (with supervision)</option>
              <option value="7N">7N – Novice (can drive alone)</option>
              <option value="5">5 – Regular cars, SUVs, light trucks</option>
              <option value="8L/8">8L / 8 – Motorcycle & ATV</option>
              <option value="Limited-speed">Limited-speed (e.g. mopeds)</option>
              <option value="4">4 – Taxi, ambulance, small bus</option>
              <option value="3">3 – Large trucks & heavy trailers</option>
              <option value="2">2 – Buses, including school buses</option>
              <option value="1">1 – Tractor-trailers (all heavy vehicles)</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Referral (if any)</label>
            <input
              type="text"
              name="referredBy"
              value={form.referredBy}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login-ui')}
            className="text-purple-600 font-medium hover:underline"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
