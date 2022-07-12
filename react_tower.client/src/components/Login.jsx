import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Link to="/login"><button className="btn btn-success">Login</button></Link>
    );
}
 
export default Login;