import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlinePlus,
  AiFillDashboard,
  AiOutlineUser,
  AiOutlineFile,
  AiFillCaretUp,
  AiFillCaretDown,
} from 'react-icons/ai';
import axios from 'axios';

const OrganizerDashboard = () => {
  const user = localStorage.getItem('username');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousCount, setPreviousCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://event-management-system-backend-33ue.onrender.com/events-organizer', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
        setPreviousCount(response.data.length);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const menuItems = [
    { label: 'Dashboard', icon: <AiFillDashboard />, path: '/dashboar/dorganizer' },
    { label: 'Create Event', icon: <AiOutlinePlus />, path: '/organizer-createEvents' },
    { label: 'View Events', icon: <AiOutlineUser />, path: '/organizer-ViewUsers' },
    { label: 'View Reports', icon: <AiOutlineFile />, path: '' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Sidebar / Bottom Nav */}
      <div className={`fixed bottom-0 w-full bg-[#252631] text-white flex justify-around p-4 sm:top-0 sm:left-0 sm:w-64 sm:h-full sm:flex-col sm:justify-start ${sidebarOpen ? '' : 'hidden sm:flex'}`}>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="flex flex-col items-center sm:flex-row sm:space-x-3 py-2 sm:py-3 px-4 rounded-md hover:bg-blue-600 transition">
            {item.icon}
            <span className="hidden sm:block">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden fixed top-4 left-4 z-20">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-700 text-white rounded-md">
          <AiOutlineMenu />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 sm:ml-64">
        <h1 className="font-bold text-3xl mb-8">Dashboard Overview</h1>
        {/* Event Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Total Events</h2>
            <p className="text-xl mt-2">{loading ? 'Loading...' : events.length}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <p className="text-xl mt-2">{loading ? 'Loading...' : events.filter(event => new Date(event.date) > new Date()).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
