import React, { useState } from 'react';

const SignupPage = ({ doSignup }) => {

    const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });

    const handleChange = ({ currentTarget: target }) => {
        const creds = {...loginCreds};
        creds[target.name] = target.value;
        setLoginCreds(creds);
    }

    return ( 
        <form onSubmit={doSignup}>
            <label htmlFor="signup-form-email">Email</label>
            <input type="email" name="email" id="signup-form-email" placeholder="Email" className="form-control" required value={loginCreds.email} onChange={handleChange} />
            <label htmlFor="signup-form-password">Password</label>
            <input type="password" name="password" id="signup-form-password" placeholder="Password" className="form-control" required value={loginCreds.password} onChange={handleChange}/>
            <button className="btn btn-primary mt-4">Signup</button>
        </form>
     );
}
 
export default SignupPage;