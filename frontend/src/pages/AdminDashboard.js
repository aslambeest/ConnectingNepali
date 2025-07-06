import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCheckCircle, FaTimesCircle, FaShuttleVan, FaIdCard, FaGift } from 'react-icons/fa';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/admin-stats`)
      .then(res => setStats(res.data))
      .catch(err => {
        console.error('❌ Failed to fetch admin stats:', err);
        setError('Failed to load admin stats');
      });
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!stats) return <p>Loading admin dashboard...</p>;

  return (
    <div className="p-6 text-black bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard 📊</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold flex items-center gap-2"><FaUsers /> Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Verified Users</h2>
          <p>{stats.verifiedUsers}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold flex items-center gap-2"><FaTimesCircle className="text-red-600" /> Unverified Users</h2>
          <p>{stats.unverifiedUsers}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold flex items-center gap-2"><FaShuttleVan /> Airport Pickup</h2>
          <p>Yes: {stats.airportPickup?.yes}</p>
          <p>No: {stats.airportPickup?.no}</p>
          <p>Not Set: {stats.airportPickup?.notSet}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold flex items-center gap-2"><FaIdCard /> License Breakdown</h2>
          {Array.isArray(stats.licenseStats) ? (
            stats.licenseStats.map(item => (
              <p key={item._id}>{item._id}: {item.count}</p>
            ))
          ) : (
            <p>No license data available</p>
          )}
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold flex items-center gap-2"><FaGift /> Referred Users</h2>
          <p>{stats.referredUsers ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
