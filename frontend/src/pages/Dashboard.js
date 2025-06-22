import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, Building, CreditCard, BookOpen, Briefcase, Users, Languages,
  Store, ShieldCheck, Globe, Megaphone, CalendarClock
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('googleUser'));
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('profilePic'));

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('profilePic', reader.result);
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('googleUser');
    // DO NOT remove profilePic so it's retained
    // localStorage.removeItem('profilePic');
    navigate('/login-ui');
  };

  const announcements = [
    {
      title: 'Enrolment Open for Summer 2025 Term',
      date: 'Now until July 14, 2025',
      content: 'Click here to enrol in your courses before the deadline.'
    },
    {
      title: 'Library Support for Assignments',
      date: 'June 3, 2025',
      content: 'The library team is ready to help you with research, citation, and writing tips.'
    }
  ];

  const events = [
    {
      title: 'Mental Health Workshop',
      date: 'June 17, 10:30–11:00am',
      content: 'From Stress to Success: Prioritizing Mental Health in Student Life'
    },
    {
      title: 'PGWP Information Session',
      date: 'June 17, 2:30–4:00pm',
      content: 'What is a PGWP and how to prepare for it.'
    }
  ];

  const services = [
    { name: 'Airport Pickup', icon: Home, link: '/services/airport' },
    { name: 'Housing Support', icon: Building, link: '/services/housing' },
    { name: 'SIN & Bank Setup', icon: CreditCard, link: '/services/sin-bank' },
    { name: 'Student Resources', icon: BookOpen, link: '/services/student' },
    { name: 'Job Portal', icon: Briefcase, link: '/services/jobs' },
    { name: 'Community Events', icon: Users, link: '/services/community' },
    { name: 'Language Classes', icon: Languages, link: '/services/language' },
    { name: 'Business Directory', icon: Store, link: '/services/directory' },
    { name: 'Legal & Immigration Help', icon: ShieldCheck, link: '/services/legal' },
    { name: 'New to Canada Guide', icon: Globe, link: '/services/new-to-canada' }
  ];

  return (
    <div className="flex flex-row w-full min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-6 flex-shrink-0">
        <div className="text-sm font-semibold">NEPALI CIRCLE</div>
        <nav className="space-y-2">
          {services.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700"
            >
              <item.icon size={18} />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">Welcome,</p>
            <h1 className="text-xl font-semibold">{user?.name || 'Guest'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <img
                src={profilePic || user?.picture}
                alt="Profile"
                className="w-16 h-16 rounded-full border shadow hover:ring-2 hover:ring-blue-400"
                title="Click to upload profile picture"
              />
            </label>
            <button onClick={handleLogout} className="text-red-600 font-medium hover:underline">
              Log Out
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mb-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            className="rounded-xl shadow-lg"
          >
            <SwiperSlide>
              <div className="w-full h-64">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1050115383%2F998415394483%2F1%2Foriginal.20250610-192241?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=424b9fdb9912886d192bb13345a958b6"
                  alt="Nepal Slide"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-64">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1042114103%2F2195299412973%2F1%2Foriginal.20250530-044823?w=940&auto=format%2Ccompress&q=75&sharp=10&s=650b2b8f26b217ea2cee14cc589e9273"
                  alt="Canada Slide"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-64">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1050114013%2F998415394483%2F1%2Foriginal.20250610-192107?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.481060606061&fp-y=0.61433447099&s=13fdb076c14a2983aa9d3e7364b22293"
                  alt="Community Slide"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Dashboard Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Welcome Message */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">👋 Welcome to Nepali Circle!</h2>
            <p className="text-sm text-gray-700">Helping Nepali newcomers navigate Canada with confidence.</p>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Megaphone className="text-blue-600" size={20} /> Announcements
            </h2>
            {announcements.map((a, i) => (
              <div key={i} className="mb-3 border-b pb-2">
                <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                <p className="text-xs text-gray-500">{a.date}</p>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <CalendarClock className="text-blue-600" size={20} /> Events
            </h2>
            {events.map((e, i) => (
              <div key={i} className="mb-3 border-b pb-2">
                <p className="text-sm font-semibold text-gray-800">{e.title}</p>
                <p className="text-xs text-gray-500">{e.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
