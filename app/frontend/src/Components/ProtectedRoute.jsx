import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, onlyUnauthenticated = false }) => {
  const { isAuthenticated } = useAuth();

  if (onlyUnauthenticated && isAuthenticated) {
    return <Navigate to="/" replace />;
  } else if (!onlyUnauthenticated && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
