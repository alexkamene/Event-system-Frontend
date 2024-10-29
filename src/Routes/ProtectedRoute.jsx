// src/Routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext  from '../context/Authcontext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext); // Access user context

  // Check if user is authenticated and has the required role
  if (!user || user.role !== requiredRole) {

   localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    

    return <Navigate to="/login" />; // Redirect to login if unauthorized
    
  }

  return children; // Render children if authorized
};

export default ProtectedRoute;
