import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function LoginUI() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const API_URL = 'https://connectingnepali.onrender.com/'; // Replace with process.env.REACT_APP_API_URL in production

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateAirportPickup = async (userId, enroll) => {
    try {
      const res = await fetch(`${API_URL}/api/user/airport-pickup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, enroll }),
      });

      const data = await res.json();
      return data.success;
    } catch (error) {
      console.error('❌ Error updating airport pickup:', error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const user = data.user;

      if (user.licenseType && user.airportPickupEnrollment === null) {
        setLoggedInUser({ ...user, token: data.token });
        setShowModal(true);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('googleUser', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('token', credentialResponse.credential);
    localStorage.setItem('googleUser', JSON.stringify(decoded));
    navigate('/dashboard');
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-6">
          <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">or</div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert('Google Login Failed')}
          />

          <div className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 underline">Register</a>
          </div>
        </div>
      </div>

      {/* Airport Pickup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Would you like to enroll in Airport Pickup service?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={async () => {
                  const success = await updateAirportPickup(loggedInUser._id, true);
                  if (success) {
                    localStorage.setItem('token', loggedInUser.token);
                    loggedInUser.airportPickupEnrollment = true;
                    localStorage.setItem('googleUser', JSON.stringify(loggedInUser));
                    navigate('/dashboard');
                  }
                  setShowModal(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                onClick={async () => {
                  const success = await updateAirportPickup(loggedInUser._id, false);
                  if (success) {
                    localStorage.setItem('token', loggedInUser.token);
                    loggedInUser.airportPickupEnrollment = false;
                    localStorage.setItem('googleUser', JSON.stringify(loggedInUser));
                    navigate('/dashboard');
                  }
                  setShowModal(false);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
