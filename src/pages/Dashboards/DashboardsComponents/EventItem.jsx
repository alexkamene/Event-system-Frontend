import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import moment from 'moment';

const EventItem = ({ event }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="border p-2 rounded-lg overflow-hidden relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Event Image with hover effect */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={event.image}
          alt={event.name}
          className={`w-full object-cover transition-all duration-300 h-96 ${
            hovered ? 'h-96' : 'h-64'
          }`}
        />
        
        {/* Info displayed on hover */}
        {hovered && (
          <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 transition-opacity duration-300 opacity-100 flex flex-col justify-center items-center">
            <p className="mb-2">
              <strong>Available Tickets:</strong> {event.availableTickets}
            </p>
            <p className="mb-2">
              <strong>Ticket Price:</strong> ${event.ticketPrice}
            </p>
            <p className="mb-2">
              <strong>Venue:</strong> {event.venue}
            </p>
          </div>
        )}
      </div>

      {/* Event Name */}
      <h2 className="text-xl font-bold mt-4">{event.name}</h2>

      
      

      {/* Link to Event Registration Page */}
      <Link to={`/events/register/${event._id}`} className="btn btn-primary w-full mt-4">
      View The Event
      </Link>
    </div>
  );
};

export default EventItem;
