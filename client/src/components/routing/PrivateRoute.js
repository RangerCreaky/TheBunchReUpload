import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => {
        return state.auth.isAuthenticated;
    });
    return ((!isAuthenticated) ? <Navigate to="/login" replace /> : children)
}

export default PrivateRoute;