import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from '../images/UploadImage';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [availableTickets, setAvailableTickets] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for the image URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error('Please upload an image before creating the event.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post('https://event-management-system-backend-dtrl.onrender.com/addEvent', {
        name,
        description,
        date,
        venue,
        availableTickets,
        ticketPrice,
        image: imageUrl, // Use the uploaded image URL here
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message); // Show success message
      // Reset form inputs
      setName('');
      setDescription('');
      setDate('');
      setVenue('');
      setAvailableTickets('');
      setTicketPrice('');
      setImageUrl(''); // Reset image URL after submission
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Create New Event</h1>
        <p className="text-center text-gray-500 mb-4">
          Welcome, Event Creator! Fill in the details below to set up your event.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm h-28 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Venue"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="number"
              value={availableTickets}
              onChange={(e) => setAvailableTickets(e.target.value)}
              placeholder="Available Tickets"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="Ticket Price"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Image Component */}
          <div className="py-2">
            <UploadImage setImageUrl={setImageUrl} />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
          >
            Create Event
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default CreateEvent;
