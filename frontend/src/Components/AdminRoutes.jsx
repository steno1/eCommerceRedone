import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const AdminRoute = () => {

    const { userInfo } = useSelector((state) => state.auth);

    return (
        userInfo && userInfo.isAdmin ? <Outlet /> : 
        <Navigate to="/login" replace /> 
    );
}

export default AdminRoute; 