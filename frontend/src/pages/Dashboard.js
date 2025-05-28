import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user') || localStorage.getItem('registeredUser');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      console.log('Loaded user from localStorage:', parsedUser); // ✅ For debugging
      setUser(parsedUser);
    } else {
      navigate('/login-ui');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('registeredUser');
    navigate('/login-ui');
  };

  const services = [
    { icon: '🆕', title: 'New in Canada', desc: 'Arrival guide and newcomer essentials' },
    { icon: '✈️', title: 'Airport Pickup & Settlement Help', desc: 'Smooth landing and support from day 1' },
    { icon: '🏠', title: 'Housing Assistance', desc: 'Shared rooms, rental tips, and landlord advice' },
    { icon: '📄', title: 'SIN, Bank, ID Setup', desc: 'Documents and accounts made easy' },
    { icon: '🎓', title: 'Student Support', desc: 'Colleges, PGWP, study visa help' },
    { icon: '💼', title: 'Job Connection', desc: 'Resumes, job boards, and referrals' },
    { icon: '🤝', title: 'Community Support', desc: 'Meetups, culture and connection' },
    { icon: '📚', title: 'Language Support', desc: 'IELTS prep, French and translation' },
    { icon: '🛍️', title: 'Nepali Directory', desc: 'Shops, food, services near you' },
    { icon: '🧾', title: 'Legal/Immigration Help', desc: 'PR pathway, lawyers and resources' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name || 'User'}</h1>
          <p className="text-sm text-gray-600">
            Your Referral Code: <strong>{user?.referralCode}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Reward Points: <strong>{user?.rewardPoints || 0}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Invite friends:
            <span className="text-blue-700 font-medium break-all">
              https://connectingnepali.com/register?ref={user?.referralCode}
            </span>
          </p>
        </div>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Explore Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {services.map((service, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/services/${service.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`)}
            className="bg-white shadow-md rounded p-5 hover:shadow-lg cursor-pointer transition"
          >
            <div className="text-3xl mb-3">{service.icon}</div>
            <h3 className="text-lg font-bold mb-1">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{service.desc}</p>
            <span className="text-blue-600 hover:underline">Learn More</span>
          </div>
        ))}
      </div>
    </div>
  );
}
