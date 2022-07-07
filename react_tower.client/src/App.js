import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { accountService } from "../src/services/AccountService.js";
import HomePage from "./components/pages/HomePage.jsx";
import TowerEventPage from "./components/pages/TowerEventPage.jsx";
import AccountPage from "./components/pages/AccountPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import { authService } from "./services/AuthService.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    const [account, setAccount] = useState({});

    useEffect(() => { authService.loadToken() }, []);

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

    const loginWithToken = (token) =>
    {
        authService.login(token);
        const userInfo = authService.currentUser;
        setAccount(userInfo);
    }

    return (
        <main className="bg-dark">
            <div className="scrollable">
                <BrowserRouter>
                    <div className="bg-dark">
                        <Link to="/">
                        <span className="text-light">{JSON.stringify(account)}</span>
                        </Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/event/:id" element={<TowerEventPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        {ProtectedRoute({ path: "/login", element: <LoginPage doLogin={handleLogin} />, check: !account.id })}
                        {ProtectedRoute({ path: "/signup", element: <SignupPage doSignup={handleSignup} />, check: !account.id })}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </main>
    );
}

export default App;
