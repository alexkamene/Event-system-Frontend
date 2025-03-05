import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('recent'); // State for sort option

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          toast.error("Unauthorized. Please login to view registered events.");
          return;
        }



        const response = await axios.get('https://event-management-system-backend-33ue.onrender.com/events-registered', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the request
          },
        });

        console.log("Fetched registered events:", response.data);
        setEvents(response.data); // Set the registered events in state
      } catch (error) {
        toast.error("Failed to fetch registered events.");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRegisteredEvents();
  }, []);

  // Sorting function
  const sortEvents = (option) => {
    let sortedEvents;
    switch (option) {
      case 'recent':
        sortedEvents = [...events].sort((a, b) => moment(b.date) - moment(a.date)); // Recent first
        break;
      case 'oldest':
        sortedEvents = [...events].sort((a, b) => moment(a.date) - moment(b.date)); // Oldest first
        break;
      case 'a-z':
        sortedEvents = [...events].sort((a, b) => a.name.localeCompare(b.name)); // A-Z
        break;
      default:
        sortedEvents = events;
    }
    setEvents(sortedEvents);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortEvents(e.target.value);
  };

  if (loading) return <p className='text-center items-center justify-center '>Loading registered events...</p>;

  return (
    <div className='mt-24'>
      <h1 className="text-2xl font-bold">Registered Events</h1>

      {/* Sort Options */}
      <div className="my-4">
        <label className="mr-2">Sort By:</label>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A-Z</option>
        </select>
      </div>

      {events.length === 0 ? (
        <p>No registered events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {events.map(event => (
            <div key={event._id} className="border p-4 rounded-lg relative">
              {/* Recent Tag */}
              {moment(event.date).isAfter(moment().subtract(7, 'days')) && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Recent
                </span>
              )}

              {/* Days Remaining (Overlay on Image) */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full shadow-lg z-10">
                {moment(event.date).diff(moment(), 'days') > 0 ? `${moment(event.date).diff(moment(), 'days')} days remaining` : "Event has passed"}
              </div>

              {/* Event Image */}
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-60 object-cover mb-4 rounded-lg"
              />

              {/* Event Name */}
              <h2 className="text-lg font-bold mb-2">{event.name}</h2>

              {/* Event Description */}
              <p className="mb-2">{event.description}</p>

              {/* Event Date */}
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong> {moment(event.date).format('MMMM Do, YYYY')}
              </p>

              {/* Event Venue */}
              <p className="text-gray-600 mb-2">
                <strong>Venue:</strong> {event.venue}
              </p>

              {/* Available Tickets */}
              <p className="text-gray-600 mb-2">
                <strong>Available Tickets:</strong> {event.availableTickets}
              </p>

              {/* view detais */}
              <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;
