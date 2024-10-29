import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://event-management-system-backend-dtrl.onrender.com', {
    transports: ['websocket', 'polling']
  });// Connect to the server

const ChatWithOrganizer = ({ organizerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem('username'); // Assuming username is stored

  useEffect(() => {
    // Join chat room with organizer when the component mounts
    socket.emit('joinChat', { username, organizerId });

    // Receive messages from the server
    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [organizerId, username]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Emit message to the server
    socket.emit('sendMessage', {
      message: newMessage,
      organizerId,
      username,
    });

    // Append the new message to the local state
    setMessages((prevMessages) => [
      ...prevMessages,
      { username, message: newMessage },
    ]);

    setNewMessage('');
  };

  return (
    <div className="chat-container bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Chat with Organizer</h2>
      <div className="chat-messages h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border border-gray-300 rounded-l p-2 w-full"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithOrganizer;
