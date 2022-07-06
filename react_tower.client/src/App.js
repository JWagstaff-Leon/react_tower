import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./components/pages/HomePage.jsx";
import TowerEventPage from "./components/pages/TowerEventPage.jsx";
import AccountPage from "./components/pages/AccountPage.jsx";

function App() {
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
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    </main>
  );
}

export default App;
