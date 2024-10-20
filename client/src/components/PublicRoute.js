import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, loggedIn }) => {
  return loggedIn.id ? <Navigate to="/" /> : children;
};

export default PublicRoute;
