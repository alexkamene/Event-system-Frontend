import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventItem from './EventItem';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://event-management-system-backend-33ue.onrender.com/events'); // Replace with your API URL
        setEvents(response.data);
        // console.log("Fetched events:", response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on the search term
  const filteredEvents = events.filter(event =>
    event?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Browse Events</h1>

      {/* Search Bar */}
      <form className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md"
        />
      </form>

      {/* Event List */}
      {loading ? (
        <p className="text-center text-lg text-green-500">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventItem key={event._id} event={event} />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
