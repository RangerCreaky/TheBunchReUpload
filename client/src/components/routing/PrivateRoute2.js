import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute2 = ({ children }) => {
    const { isAuthenticated, inBunch } = useSelector((state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            inBunch: state.auth.inBunch
        };
    });

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if (!inBunch) {
        return <Navigate to="/bunch-landing" replace />
    }
    return (children);
}

export default PrivateRoute2;