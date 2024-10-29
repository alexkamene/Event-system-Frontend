// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import  AuthContext from '../context/Authcontext'; // Assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render children if authenticated
};

export default PrivateRoute;
