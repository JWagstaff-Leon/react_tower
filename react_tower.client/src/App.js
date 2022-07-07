import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { accountService } from "../src/services/AccountService.js";
import HomePage from "./components/pages/HomePage.jsx";
import TowerEventPage from "./components/pages/TowerEventPage.jsx";
import AccountPage from "./components/pages/AccountPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import jwtDecode from "jwt-decode";
import { setToken } from "../src/services/AxiosService.js";
import { authService } from "./services/AuthService.js";

function App() {
    const [account, setAccount] = useState({});

    const handleLogin = async (event) =>
    {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const token = await accountService.getAccount(email, password);
        loginWithToken(token);
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const token = await accountService.createAccount(email, password);
        loginWithToken(token);
    }

    const loginWithToken = (token) =>
    {
        authService.login(token);
        console.log("Current user: ", authService.currentUser);
        setAccount(authService.currentUser);
    }

    return (
        <main className="bg-dark">
            <div className="scrollable">
                <BrowserRouter>
                    <div className="bg-dark">
                        <Link to="/">
                        <span className="text-light">The Tower</span>
                        </Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/event/:id" element={<TowerEventPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/login" element={<LoginPage doLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignupPage doSignup={handleSignup} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </main>
    );
}

export default App;
