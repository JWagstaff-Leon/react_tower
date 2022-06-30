import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage.jsx";
import TowerEventPage from "./components/pages/TowerEventPage.jsx";
import AccountPage from "./components/pages/AccountPage.jsx";

function App() {
  return (
    <main className="bg-dark">
        <div className="scrollable">
            <div className="bg-dark">
                <span className="text-light">The Tower</span>
            </div>
            <BrowserRouter>
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
