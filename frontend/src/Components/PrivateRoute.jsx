import { Navigate } from 'react-router-dom'; // Importing Navigate component for routing
import { Outlet } from 'react-router-dom'; // Importing Outlet component for nested routing
import React from 'react'; // Importing the core React library
import { useSelector } from 'react-redux'; // Importing useSelector hook for accessing Redux store

const PrivateRoute = () => { // Defining a functional component named PrivateRoute

    const { userInfo } = useSelector((state) => state.auth); // Using useSelector to extract userInfo from Redux store

    return (
        userInfo ? <Outlet /> : <Navigate to="/login" replace /> // Conditional rendering based on presence of userInfo
    );
}

export default PrivateRoute; // Exporting the PrivateRoute component
