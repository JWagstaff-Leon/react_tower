import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SignupPage = ({ doSignup }) => {

    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

    const handleChange = ({ currentTarget: target }) => {
        const creds = {...loginCreds};
        creds[target.name] = target.value;
        setLoginCreds(creds);
    }

    return (
        <div className="container flex-grow-1">
            <div className="row flex-column h-100 justify-content-center">
                <div className="col-12 offset-lg-3 col-lg-6">
                    <h1 className="text-light fs-2">Sign up for The Tower</h1>
                    <form onSubmit={doSignup}>
                        <label htmlFor="signup-form-email" className="text-light">Email</label>
                        <input type="email" name="email" id="signup-form-email" placeholder="Email" className="form-control" required value={loginCreds.email} onChange={handleChange} />
                        <label htmlFor="signup-form-password" className="text-light mt-2">Password</label>
                        <input type="password" name="password" id="signup-form-password" placeholder="Password" className="form-control" required value={loginCreds.password} onChange={handleChange}/>
                        <button className="btn btn-primary mt-4">Sign up</button>
                    </form>
                    <div className="mt-3">
                        <Link to="/login" replace={true} className="fw-bold fs-5 text-primary text-decoration-none"><i className="mdi mdi-chevron-left-circle-outline"></i>  Back to login page</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SignupPage;