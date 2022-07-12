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
        <div className="container">
            <div className="row flex-column h-100 justify-content-center">
                <div className="col-12 offset-lg-3 col-lg-6">
                    <h1 className="text-light fs-2">Sign in to The Tower</h1>
                    <form onSubmit={doLogin}>
                        <label htmlFor="login-form-email" className="text-light">Email</label>
                        <input type="email" name="email" id="login-form-email" placeholder="Email" className="form-control" required value={loginCreds.email} onChange={handleChange} />
                        <label htmlFor="login-form-password" className="text-light mt-2">Password</label>
                        <input type="password" name="password" id="login-form-password" placeholder="Password" className="form-control" required value={loginCreds.password} onChange={handleChange}/>
                        <button className="btn btn-primary mt-4">Login</button>
                    </form>
                    <div className="mt-3">
                        <Link to="/signup">Sign up for an account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default LoginPage;