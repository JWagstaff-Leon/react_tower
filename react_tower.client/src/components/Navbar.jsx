import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService.js';
import Login from './Login.jsx';
import Modal from './Modal.jsx';
import TowerEventForm from './TowerEventForm.jsx';
const bootstrap = require("bootstrap");

const Navbar = ({ account, doLogout }) => {

    const logout = () =>
    {
        authService.logout();
        doLogout();
    }
    
    const showCreateModal = () =>
    {
        bootstrap.Modal.getOrCreateInstance(document.getElementById("create-event-modal")).show();
    }

    return (
        <>
        <nav className="navbar navbar-expand-xl navbar-dark px-3 flex-xl-column">
            <Link className="navbar-brand d-flex d-xl-none" to="/">
                <div className="d-flex flex-column align-items-center">
                    <span className="fs-2" title="Go to home page">the t<img alt="logo" src="images/tower_logo.svg" height="30" />wer</span>
                </div>
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse flex-column" id="navbarText">
                <div className="dropdown my-2 my-lg-0 no-select">
                    <div className="d-flex flex-row flex-xl-column justify-content-around align-items-center">
                        { !account?.id && <Login /> }
                        { account?.id && <img className="rounded border border-infov my-2" height="40" alt="Your account picture" src={account.picture} />}
                        <Link to="/" title="Go to home page">
                            <button className="btn text-info py-2">Home</button>
                        </Link>

                        { account?.id && <Link to="/account" title="Go to your account page">
                            <button className="btn text-info py-2">Account</button>
                        </Link> }
                    </div>
                    
                    <div className="d-flex flex-row flex-xl-column">
                        {
                            account?.id && <>
                        <button className="btn btn-success mt-3 mt-xl-4 me-3 me-xl-0 flex-grow-1" onClick={showCreateModal} title="Create new event">new event</button>
                        <button className="btn btn-dark mt-3 w-xl-100  ms-3 ms-xl-0 flex-grow-1" onClick={logout}>logout</button></>
                        }
                    </div>
                </div>
            </div>
        </nav>
        <Modal elementId="create-event-modal"
            modalTitle={<h4>Create New Event</h4>}
            modalBody={<TowerEventForm />}
        />
        </>
     );
}
 
export default Navbar;