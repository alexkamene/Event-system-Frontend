import React, { useEffect, useState } from 'react';
import EventList from '../Dashboards/EventList';
import PrivateRoutes from '../../Routes/PrivateRoutes';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

export default function UserDashboard() {
  const user = localStorage.getItem('username');
  const [newEventAdded, setNewEventAdded] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const checkNewRegisteredEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://event-management-system-backend-33ue.onrender.com/events-registered', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0) {
          setNewEventAdded(true); // Set newEventAdded to true if new events are added
        }
      } catch (error) {
        console.error('Failed to fetch registered events:', error);
      }
    };

    checkNewRegisteredEvents();
  }, []);

  const handleViewRegisteredEvents = () => {
    setNewEventAdded(false); // Reset the new event flag
    navigate('/registered-events'); // Navigate to registered events page
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center p-6">
      <h1 className="font-bold text-2xl mb-6">🖐 Welcome, {user}</h1>

      <div className="flex w-full sm:w-2/3 lg:w-1/2 justify-between">
        {/* View Registered Events Button */}
        <button
          onClick={handleViewRegisteredEvents}
          className="text-black font-bold hover:underline relative"
        >
          Registered
          {newEventAdded && (
            <span className="absolute top-0 right-0 bg-red-500 text-black text-xs font-bold ">
              New
            </span>
          )}
        </button>

        {/* Dashboard Link */}
        <Link
          to="/dashboard/user"
          className="block text-black font-bold text-center hover:underline"
        >
          Dashboard
        </Link>

        {/* Profile Link */}
        <Link
          to="/dashboard/user/Profile"
          className="block text-black font-bold text-center hover:underline"
        >
          Profile
        </Link>

        {/* Feedback Link */}
        <Link
          to=""
          className="block text-black font-bold text-center hover:underline"
        >
          Feedback
        </Link>
      </div>

      {/* Main Content Section */}
      <div className="mt-10 w-full sm:w-2/3 lg:w-3/4">
        <PrivateRoutes>
          <EventList />
        </PrivateRoutes>
      </div>
    </div>
  );
}
