// src/pages/Dashboard.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const services = [
  { icon: '✈️', title: 'Airport Pickup', featured: true },
  { icon: '🏠', title: 'Housing Help' },
  { icon: '💼', title: 'Job Board' },
  { icon: '📚', title: 'Student Support' },
  { icon: '🆔', title: 'SIN & ID Setup' },
  { icon: '🛍️', title: 'Nepali Stores' },
  { icon: '📄', title: 'Legal Help' },
  { icon: '🗣️', title: 'Language Prep' },
  { icon: '🤝', title: 'Community' },
  { icon: '👨‍⚕️', title: 'Health Services' },
  { icon: '🧘‍♂️', title: 'Mental Wellness' },
  { icon: '📦', title: 'Courier & Cargo' },
  { icon: '🏦', title: 'Banking Advice' },
  { icon: '🍼', title: 'Childcare Info' },
  { icon: '🎓', title: 'Scholarship Guide' },
  { icon: '📅', title: 'Events Calendar' },
  { icon: '🧑‍🏫', title: 'Skill Training' },
  { icon: '📞', title: 'Emergency Contacts' },
  { icon: '🧾', title: 'Tax Filing Help' },
  { icon: '🎮', title: 'Youth Programs' },
  { icon: '🧑‍🍳', title: 'Cooking Classes' },
  { icon: '🛒', title: 'Grocery List' },
  { icon: '🚗', title: 'Driving License' },
  { icon: '📬', title: 'Postal & Shipping' },
  { icon: '🕌', title: 'Religious Centers' },
  { icon: '🏕️', title: 'Travel & Outdoors' },
  { icon: '🧼', title: 'Household Setup' },
  { icon: '💻', title: 'Digital Literacy' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-10 border-b shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">Nepali Circle</h1>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login-ui')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login / Register
          </button>
        )}
      </header>

      <section className="bg-white pt-10 px-4">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 shadow p-8 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome, Nepali Immigrants!</h2>
            <p className="text-gray-700 text-lg">जहाँ नेपाली मनहरू जोडिन्छन्।</p>
          </div>
        </div>
      </section>

      <section className="bg-white pt-10 px-4">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 shadow min-h-[300px] w-full">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">📢 Announcements & Events</h2>
              <p className="text-gray-600 text-lg mb-5 leading-relaxed">
                Stay informed with updates, events, and community highlights curated for the Nepali diaspora.
              </p>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.error('Please log in to continue');
                    navigate('/login-ui');
                  } else {
                    navigate('/events');
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
              >
                Show More
              </button>
            </div>
            <div>
              <Swiper spaceBetween={30} slidesPerView={1} autoplay={{ delay: 3500 }} navigation loop modules={[Navigation, Autoplay]}>
                {['shoe1.png', 'shoe2.png', 'shoe3.png'].map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="rounded-xl overflow-hidden bg-white p-4 border border-gray-200">
                      <img src={`/images/${img}`} alt={`Slide ${index + 1}`} className="w-full h-64 object-contain" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-10 px-4">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Services</h2>
            <div className="relative">
              <button onClick={() => scroll('left')} className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white border p-3 rounded-full shadow hover:bg-blue-100 z-10">
                <ChevronLeft className="w-5 h-5 text-blue-600" />
              </button>
              <div ref={scrollRef} className="flex space-x-6 overflow-x-auto no-scrollbar pb-4">
                {services.map((item, i) => (
                  <div key={i} className="relative flex-shrink-0 w-32 bg-blue-50 border border-blue-200 rounded-xl shadow p-3 text-center hover:scale-105 transition-transform duration-200 hover:ring hover:ring-blue-100">
                    {item.featured && (
                      <span className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                      </span>
                    )}
                    <div className="text-2xl mb-2 text-blue-600 animate-pulse">{item.icon}</div>
                    <h4 className="text-xs font-semibold text-blue-700 leading-tight mb-1">{item.title}</h4>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          toast.error('Login to access this service');
                          navigate('/login-ui');
                        } else {
                          navigate(`/services/${item.title.replace(/\s+/g, '-').toLowerCase()}`);
                        }
                      }}
                      className="text-xs text-blue-600 underline hover:text-blue-800"
                    >
                      Show More
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => scroll('right')} className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white border p-3 rounded-full shadow hover:bg-blue-100 z-10">
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-6 mt-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 border-t pt-4">
          © {new Date().getFullYear()} ConnectingNepali. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
