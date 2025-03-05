import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { toast ,ToastContainer} from 'react-toastify';


const ViewEvents = () => {
  const user = localStorage.getItem('username');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Show event details on click
  };

  const handleCloseModal = () => {
    setSelectedEvent(null); // Close the modal
  };

  const handleOverlayClick = (e) => {
    // Close modal if clicking on the overlay
    if (e.target.id === 'modal-overlay') {
      handleCloseModal();
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://event-management-system-backend-33ue.onrender.com/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted event from the state
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully.');
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div className="relative flex h-screen">
       <ToastContainer position="top-right" autoClose={5000} />
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bg-gray-800 text-white p-6 h-full transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 w-64 z-10`}>
        <h1 className="font-bold text-2xl mb-8 mt-20">Welcome, {user}</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard/organizer" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">Dashboard</Link>
            </li>
            <li>
              <Link to="/organizer-createEvents" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">Create Event</Link>
            </li>
            <li>
              <Link to="/organizer-ViewUsers" className="block bg-blue-500 hover:bg-blue-700 p-3 rounded-lg">View My Events</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden absolute top-4 left-4 z-20">
        <button
          className="p-4 bg-slate-500 mt-20 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <AiOutlineMenu />
        </button>
      </div>

      {/* Main Content Section */}
      <div className={`ml-0 sm:ml-64 p-6 w-full mt-20`}>
        <h2 className="text-2xl font-bold mb-4">View My Events</h2>
        {loading ? (
          <p className='text-green-600'>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event) => (
              <div key={event._id} className="border p-2 rounded-lg cursor-pointer hover:bg-gray-100 ">

                <img src={event.image} alt={event.name} className="w-full h-60  object-cover rounded-lg" />
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Venue: {event.venue}</p>
                <p className="text-gray-600">Available Tickets: {event.availableTickets}</p>
                <button
                  onClick={() => handleEventClick(event)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="text-red-500 hover:underline mt-2 ml-14 btn "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={handleOverlayClick} // Close modal on overlay click
          >
            <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
              <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
                <AiOutlineClose className="text-2xl" />
              </button>
              <img src={selectedEvent.image} alt={selectedEvent.name} 
              className="w-full h-64 object-cover rounded-lg" />
              <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
              
              <p className="text-gray-600">{selectedEvent.description}</p>
              <p className="text-gray-600">Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Venue: {selectedEvent.venue}</p>
              <p className="text-gray-600">Available Tickets: {selectedEvent.availableTickets}</p>
              <p className="text-gray-600">Total Tickets Sold: {selectedEvent.participants.length}</p>

              {/* View Registered Users Link */}
              <Link to={`/organizer-event/${selectedEvent._id}`} className="text-blue-500 hover:underline mt-4 block">
                View Registered Users
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;
