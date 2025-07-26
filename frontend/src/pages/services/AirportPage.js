import React, { useState } from 'react';
import { FaPlaneArrival, FaHome, FaUserFriends, FaCalendarCheck, FaEnvelopeOpenText } from 'react-icons/fa';

const AirportPickup = () => {
  const [form, setForm] = useState({ name: '', email: '', arrivalDate: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Integration pending)');
  };

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1601987077228-3cc9efc35098?auto=format&fit=crop&w=1950&q=80"
          alt="Airport Arrival"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl sm:text-5xl font-bold drop-shadow-xl">
              Airport Pickup & Settlement Help
            </h1>
            <p className="text-blue-100 text-lg mt-4 max-w-2xl mx-auto">
              Your smooth landing starts here. Settle confidently with Nepali Circle — from the airport to your new home.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10 mt-[-5rem] relative z-10">
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FaPlaneArrival className="text-xl text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Airport Pickup Includes:</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Warm welcome at Vancouver International Airport (YVR)</li>
            <li>Signboard for easy identification</li>
            <li>Assistance with luggage and airport navigation</li>
            <li>Free welcome kit (SIM card, snacks, essentials)</li>
            <li>Drop-off to your accommodation</li>
          </ul>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FaHome className="text-xl text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Settlement Assistance:</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Help finding housing (temporary or long-term)</li>
            <li>Assistance setting up bank account, SIN, and SIM card</li>
            <li>Orientation for grocery shopping & public transport</li>
            <li>Compass card setup for transit</li>
            <li>Intro to Nepali community and student groups</li>
          </ul>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FaUserFriends className="text-xl text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Who Can Benefit?</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>International students</li>
            <li>Work permit holders and skilled migrants</li>
            <li>Permanent Residents and newcomers</li>
            <li>Visitors needing temporary support</li>
          </ul>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FaCalendarCheck className="text-xl text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Booking Form</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-gray-700">Arrival Date</label>
              <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-gray-700">Additional Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Submit Request
            </button>
          </form>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FaEnvelopeOpenText className="text-xl text-pink-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Questions?</h2>
          </div>
          <p className="text-gray-700">
            Reach out anytime at{' '}
            <a href="mailto:support@nepalicircle.com" className="text-blue-600 underline hover:text-blue-800">support@nepalicircle.com</a>{' '}
            or via our <a href="#" className="text-blue-600 underline hover:text-blue-800">Contact Page</a>.
          </p>
        </section>

        <div className="text-center text-xl text-gray-800 font-semibold mt-12">
          🌟 We’re here to make your arrival stress-free. <br />
          <span className="text-blue-600">Welcome to Canada!</span>
        </div>
      </div>
    </div>
  );
};

export default AirportPickup;
