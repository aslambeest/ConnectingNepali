import React from 'react';

const rooms = [
  {
    price: 980,
    verified: true,
    type: "Apartment",
    postedAgo: "1 day ago",
    beds: 1,
    baths: 2,
    size: "110 FT²",
    location: "East 55th Avenue, Vancouver, BC",
    image: "https://i.imgur.com/C56hHcO.png"
  },
  {
    price: 1900,
    verified: true,
    type: "Apartment",
    postedAgo: "1 day ago",
    beds: 2,
    baths: 1,
    size: "550 FT²",
    location: "243 Saint Helens Avenue, Toronto, ON",
    image: "https://i.imgur.com/8mZc6kI.png"
  },
  {
    price: 2000,
    verified: true,
    type: "Studio",
    postedAgo: "1 day ago",
    beds: 1,
    baths: 1,
    size: "400 FT²",
    location: "1340 Odessa Crescent, Oakville, ON",
    image: "https://i.imgur.com/NBk6jxD.png"
  }
];

const AvailableRoomsList = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">New Apartments for Rent</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={room.image} alt="Room" className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-gray-800">${room.price}</span>
                {room.verified && <span className="text-sm text-blue-500 font-medium">✔ Verified</span>}
              </div>
              <div className="text-sm text-gray-600 mb-2">{room.type} · {room.postedAgo}</div>
              <div className="text-sm text-gray-700 mb-1">
                {room.beds} BED · {room.baths} BATH · {room.size}
              </div>
              <div className="text-sm text-gray-600 mb-3">{room.location}</div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomsList;