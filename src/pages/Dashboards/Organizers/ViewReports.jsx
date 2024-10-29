// src/Pages/Dashboards/OrganizerDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlinePlus, AiFillDashboard, AiOutlineUser, AiOutlineFile } from 'react-icons/ai'; // Import icons

const ViewReports = () => {
  const user = localStorage.getItem('username');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar

  return (
    <div className="relative flex h-screen">
      {/* Sidebar Section */}
      <div
        className={`fixed top-0 left-0 bg-gray-800 text-white p-6 h-full transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 w-64 z-10`}
      >
        <h1 className="font-bold text-2xl mb-8 mt-20">Welcome, {user}</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/organizer/dashboard" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">
                <AiFillDashboard className="inline mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/organizer/create-event" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">
                <AiOutlinePlus className="inline mr-2" /> Create Event
              </Link>
            </li>
            <li>
              <Link to="organizer-ViewUsers" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">
                <AiOutlineUser className="inline mr-2" /> View Users
              </Link>
            </li>
            <li>
              <Link to="/organizer/view-reports" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">
                <AiOutlineFile className="inline mr-2" /> View Reports
              </Link>
            </li>
            <li>
              <Link to="/organizer/delete-events" className="block bg-red-500 hover:bg-red-700 p-3 rounded-lg">
                <AiOutlineFile className="inline mr-2" /> Delete Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden absolute top-4 left-4 z-20">
        <button
          className="p-4 bg-blue-500 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <AiOutlineMenu />
        </button>
      </div>

      {/* Overlay for Small Screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      
    </div>
  );
};

export default ViewReports;
