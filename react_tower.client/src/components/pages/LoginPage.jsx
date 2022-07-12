import React, { useState } from 'react';
import { Link } from "react-router-dom";

const LoginPage = ({ doLogin }) => {
    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

    const handleChange = ({ currentTarget: target }) => {
        const creds = {...loginCreds};
        creds[target.name] = target.value;
        setLoginCreds(creds);
    }

    return ( 
        <>
            <form onSubmit={doLogin}>
                <label htmlFor="login-form-email">Email</label>
                <input type="email" name="email" id="login-form-email" placeholder="Email" className="form-control" required value={loginCreds.email} onChange={handleChange} />
                <label htmlFor="login-form-password">Password</label>
                <input type="password" name="password" id="login-form-password" placeholder="Password" className="form-control" required value={loginCreds.password} onChange={handleChange}/>
                <button className="btn btn-primary mt-4">Login</button>
            </form>
            <Link to="/signup">Sign up for an account</Link>
        </>
    );
}
 
export default LoginPage;