import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ path, element, check, redirect = -1, replace = true}) => {    
    return (
        <Route path={path} element={ check ? element : <Navigate to={redirect} replace={replace} /> }/>
    );
}

export default ProtectedRoute;