import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Link to="/login"><button className="btn btn-success text-success lighten-30 text-uppercase my-0 my-lg-2">Login</button></Link>
    );
}
 
export default Login;