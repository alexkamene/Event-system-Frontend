import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RegisteredUsers = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://event-management-system-backend-dtrl.onrender.com/organizer-event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.participants); // Assuming participants contains the registered users
      } catch (error) {
        console.error('Failed to fetch registered users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredUsers();
  }, [id]);

  if (loading) return <p className='mt-20'>Loading registered users...</p>;

  return (
    <div className='mt-24'>
      <h2 className="text-2xl font-bold">Registered Users</h2>
      {users.length === 0 ? (
        <p>No users registered for this event.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg flex flex-col items-center">
              <img 
                src={user.profilePicture || 'default-profile.png'} // Fallback image if none exists
                alt={user.name} 
                className="w-20 h-20 rounded-full mb-2" 
              />
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
