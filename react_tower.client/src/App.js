import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { accountService } from "../src/services/AccountService.js";
import HomePage from "./components/pages/HomePage.jsx";
import TowerEventPage from "./components/pages/TowerEventPage.jsx";
import AccountPage from "./components/pages/AccountPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import { authService } from "./services/AuthService.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Logout from "./components/Logout.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    const [account, setAccount] = useState({});

    useEffect(() => { authService.loadToken(); setAccount(authService.currentUser); }, []);

    const handleLogin = async (event) =>
    {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try
        {
            const token = await accountService.getAccount(email, password);
            loginWithToken(token);

        }
        catch(error)
        {
            console.error("[App.js > handleLogin]", error.message);
        }
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try
        {
            const token = await accountService.createAccount(email, password);
            loginWithToken(token);
        }
        catch(error)
        {
            console.error("[App.js > handleSignup]", error.message);
        }
    }

    const handleLogout = () =>
    {
        setAccount({});
    }

    const loginWithToken = (token) =>
    {
        authService.login(token);
        const userInfo = authService.currentUser;
        setAccount(userInfo);
    }

    return (
        <BrowserRouter>
            <main className="d-flex flex-xl-row-reverse flex-column">
                <Navbar account={account} doLogout={handleLogout} />
                <div className="scrollable flex-grow-1 d-flex flex-column bg-dark">
                    <div className="bg-dark pb-4">
                        <Link to="/" className="d-none d-xl-inline-block no-link-style">
                            <span className="text-light fs-1 ps-4 d-inline no-select" title="Go to home page">the t<img src="images/tower_logo.svg" height="48" alt="" />wer</span>
                        </Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/event/:id" element={<TowerEventPage account={account} />} />
                        <Route path="/account" element={<AccountPage />} />
                        {ProtectedRoute({ path: "/login", element: <LoginPage doLogin={handleLogin} />, check: !account.id })}
                        {ProtectedRoute({ path: "/signup", element: <SignupPage doSignup={handleSignup} />, check: !account.id })}
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;