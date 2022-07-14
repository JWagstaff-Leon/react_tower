import React from 'react';
import { Link } from 'react-router-dom';

const UserTicket = ({ ticket, handleCancel }) => {
    return (
        <div className="d-flex ticket bg-dark lighten-20 my-5 shadow position-relative no-select">
            <Link to={`../event/${ticket.eventId}`}><img src={ticket.event.coverImg} className="event-image" alt="" /></Link>
            <div className="d-flex flex-column ms-2 mt-2 ms-md-4 mt-md-4 flex-grow-1 justify-content-between">
                <div className="d-flex flex-column">
                    <span className="fw-bold fs-6 fs-md-5 mb-md-2">{ticket.event.name}</span>
                    <span className="text-info fw-md-bold">{ticket.event.location}</span>
                    <span className="text-info fw-md-bold">{ticket.event.dateString}</span>
                </div>
                <div className="align-self-center mb-1 mb-md-3">
                    {
                        new Date(ticket.event.startDate) >= Date.now() &&
                        <button className="btn btn-danger" onClick={() => handleCancel(ticket.id)}>Cancel Ticket</button>
                    }
                </div>
                </div>
                <div className="ticket-circle-div">
                <div className="ticket-circle bg-dark"></div>
            </div>
        </div>
    );
}
 
export default UserTicket;