import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa'; // Import social icons

const EventRegistration = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // Track if user is registered
  const navigate = useNavigate(); // useNavigate for navigation

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://event-management-system-backend-33ue.onrender.com/events/${id}`); // Replace with your API URL
        setEvent(response.data);
        console.log("Fetched event:", response.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        toast.error("Failed to fetch event details.");
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegistration = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        toast.error("Unauthorized. Please login to view registered events.");
        return;
      }

      const response = await axios.post(`https://event-management-system-backend-33ue.onrender.com/events/register/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the request
        },
      });
      toast.success(response.data.message || "Registered successfully!");
      setIsRegistered(true); // Set registration state to true
    } catch (error) {
      // Display specific error messages from the backend
      if (error.response) {
        toast.error(error.response.data.message || "Failed to register for event.");
      } else {
        toast.error("An error occurred, please try again.");
      }
    }
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="container mx-auto mt-24">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
        {/* Event Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-[600px] object-cover rounded-lg shadow-lg" // Consistent with example site
          />
        </div>

        {/* Event Details and Actions Section */}
        <div className="w-full lg:w-1/2 bg-white border border-gray-300 shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{event.name}</h1>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-inner">
            <h2 className="text-xl font-bold mb-2">Event Description</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 text-sm">
                <strong>Date:</strong> {moment(event.date).format('MMMM Do, YYYY')}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                <strong>Venue:</strong> {event.venue}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                <strong>Available Tickets:</strong> {event.availableTickets}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                <strong>Ticket Price:</strong> ${event.ticketPrice}
              </p>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4 shadow-inner">
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="text-gray-600 text-sm">For inquiries, reach out at: support@eventplatform.com</p>
            <div className="flex gap-4 mt-2">
              <a href="https://wa.me/yourwhatsappphonenumber" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-green-600 text-2xl" />
              </a>
              <a href="https://facebook.com/yourfacebookpage" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-600 text-2xl" />
              </a>
              <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-400 text-2xl" />
              </a>
            </div>
          </div>

          {/* Conditional Registration/Proceed to Pay Button */}
          <div className="text-center mt-6">
            {isRegistered ? (
              <Link to="/registered-events">
                <button className="bg-blue-500 text-white p-3 rounded-lg w-full shadow-lg">
                  View Registered Events
                </button>
              </Link>
            ) : (
              <>
                <button
                  onClick={handleRegistration}
                  className="bg-green-500 text-white p-3 rounded-lg w-full mb-4 shadow-lg hover:bg-green-600 transition-colors"
                >
                  Register for this Event
                </button>
              </>
            )}
          </div>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
