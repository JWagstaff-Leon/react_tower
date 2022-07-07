import React from 'react';
import { Navigate } from 'react-router';
import { authService } from '../services/AuthService.js';

const Logout = () => {
    authService.logout();

    return ( 
        <Navigate to="/" />
     );
}
 
export default Logout;