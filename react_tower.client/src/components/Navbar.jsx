import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService.js';
import Modal from './Modal.jsx';
import TowerEventForm from './TowerEventForm.jsx';
const bootstrap = require("bootstrap");

const Navbar = ({ account }) => {
    const navigateTo = useNavigate();

    const logout = () =>
    {
        authService.logout();
        navigateTo("/");
    }
    
    const showCreateModal = () =>
    {
        bootstrap.Modal.getOrCreateInstance(document.getElementById("create-event-modal")).show();
    }

    return (
        <React.Fragment>
        <nav className="navbar navbar-expand-xl navbar-dark px-3 flex-xl-column">
            <Link className="navbar-brand d-flex d-xl-none" to="/">
                <div className="d-flex flex-column align-items-center">
                    <span className="fs-2" title="Go to home page">the t<img alt="logo" src="../assets/img/tower_logo.svg" height="30" />wer</span>
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
                        {/* <Login /> */}
                        <Link to="/" title="Go to home page">
                            <button className="btn text-info py-2">Home</button>
                        </Link>

                        <Link v-if="signedIn" to="/account" title="Go to your account page">
                            <button className="btn text-info py-2">Account</button>
                        </Link>
                    </div>
                    
                    <div className="d-flex flex-row flex-xl-column">
                        <button v-if="signedIn" className="btn btn-success mt-3 mt-xl-4 me-3 me-xl-0 flex-grow-1" onClick={showCreateModal} title="Create new event">new event</button>
                        <button v-if="signedIn" className="btn btn-dark mt-3 w-xl-100  ms-3 ms-xl-0 flex-grow-1" onClick={logout}>logout</button>
                    </div>
                </div>
            </div>
        </nav>
        <Modal elementId="create-event-modal"
            modalTitle={<h4>Create New Event</h4>}
            modalBody={<TowerEventForm />}
        />
        </React.Fragment>
     );
}
 
export default Navbar;