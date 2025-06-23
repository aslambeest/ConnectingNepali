import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUI = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    visaStatus: '',
    referredBy: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful! Please check your email to verify.');
      navigate('/login-ui');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="visaStatus"
          value={form.visaStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Visa Status</option>
          <option value="Student">Student</option>
          <option value="PR">Permanent Resident</option>
          <option value="Work Permit">Work Permit</option>
          <option value="Visitor">Visitor</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="referredBy"
          value={form.referredBy}
          onChange={handleChange}
          placeholder="Referral Code (optional)"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUI;
