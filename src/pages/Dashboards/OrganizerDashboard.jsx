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
        const response = await axios.get('https://event-management-system-backend-dtrl.onrender.com/events-organizer', {
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

  const handleDelete = async (eventId) => {
    const isConfirmed = confirm('Are you sure you want to delete this event?');
    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://event-management-system-backend-dtrl.onrender.com/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('An error occurred while trying to delete the event. Please try again.');
    }
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date()).length;
  const eventCategories = new Set(events.map((event) => event.participants.length)).size;
  const eventsToday = events.filter((event) => new Date(event.date).toDateString() === new Date().toDateString()).length;

  const menuItems = [
    { label: 'Dashboard', icon: <AiFillDashboard />, path: '/dashboar/dorganizer' },
    { label: 'Create Event', icon: <AiOutlinePlus />, path: '/organizer-createEvents' },
    { label: 'View Events', icon: <AiOutlineUser />, path: '/organizer-ViewUsers' },
    { label: 'View Reports', icon: <AiOutlineFile />, path: '' },
    { label: 'Coming Soon', icon: <AiOutlineFile />, path: '', className: 'bg-red-500 hover:bg-red-700' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bg-[#252631] text-white w-64 h-full transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
        <div className="text-center py-10">
          <h1 className="text-xl font-bold">Organizer Dashboard</h1>
          <p>Welcome, {user}</p>
        </div>
        <nav>
          <ul className="space-y-4 px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className={`flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-blue-600 transition ${item.className || ''}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden fixed top-4 left-4 z-20">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-700 text-white rounded-md">
          <AiOutlineMenu />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-0 sm:ml-64 p-6">
        <h1 className="font-bold text-3xl mb-8">Dashboard Overview</h1>

        {/* Event Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Total Events</h2>
              <p className="text-xl mt-2">{loading ? 'Loading...' : totalEvents}</p>
            </div>
            {totalEvents > previousCount ? (
              <AiFillCaretUp className="text-green-400 text-2xl" />
            ) : (
              <AiFillCaretDown className="text-red-400 text-2xl" />
            )}
          </div>

          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <p className="text-xl mt-2">{loading ? 'Loading...' : upcomingEvents}</p>
            </div>
            {upcomingEvents > 0 && <AiFillCaretUp className="text-green-400 text-2xl" />}
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Highest Registered</h2>
              <p className="text-xl mt-2">{loading ? 'Loading...' : eventCategories}</p>
            </div>
          </div>

          <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Events Today</h2>
              <p className="text-xl mt-2">{loading ? 'Loading...' : eventsToday}</p>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
          <h2 className="font-bold text-2xl mb-4">Event List</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Event Name</th>
                <th className="border px-4 py-2">Users</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="border px-4 py-2">{event.name}</td>
                  <td className="border px-4 py-2">{event.participants.length}</td>
                  <td className="border px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <button className="text-red-500" onClick={() => handleDelete(event._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
