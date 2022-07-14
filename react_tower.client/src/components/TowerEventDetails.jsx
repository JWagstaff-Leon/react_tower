import React from 'react';
import LittleLoading from './LittleLoading.jsx';
import Modal from './Modal.jsx';
import TowerEventForm from './TowerEventForm.jsx';

const TowerEventDetails = ({ account, towerEvent, handleAttend, handleUnattend, handleCancelEvent, handleUpdateEvent, userAttending, submitting }) => {
    const attendOption = (() => {
        const cancelTicketButtonClass = "btn btn-" + (towerEvent?.capacity > 5 ? "warning" : "danger")
        if(towerEvent?.isCanceled) return <div className="bg-danger fs-4 fw-bold text-dark text-center mt-2 p-2 rounded-3 w-100">Event Cancelled</div>
        if(towerEvent?.startDate < +Date.now()) return <div className="bg-secondary lighten-25 fs-4 fw-bold text-center mt-2 p-2 rounded-3 w-100"><span className="text-dark">Event is over</span></div>
        if(userAttending) return <button className={cancelTicketButtonClass} onClick={handleUnattend}>Cancel Ticket</button>
        if(towerEvent?.capacity <= 0) return <div className="bg-warning fs-4 fw-bold text-dark text-center mt-2 p-2 rounded-3 w-100">Event is Full</div>
        if(account?.id) return <button className="btn btn-warning" onClick={handleAttend}>Attend</button>
    })();

    const editButton =
        !towerEvent.isCanceled && 
        towerEvent.startDate >= +Date.now() &&
        account?.id &&
        account.id === towerEvent?.creatorId &&
        <>
        <button className="text-light mt-1 px-3 py-1 btn fs-1" data-bs-toggle="dropdown"><i className="fs-1 my-0 mdi mdi-dots-horizontal"></i></button>
        <ul className="dropdown-menu" aria-labelledby="manage-event-button-label">
            <li className="dropdown-item no-select action" data-bs-toggle="modal" data-bs-target="#edit-event-modal">edit event</li>
            <li className="dropdown-item text-danger no-select action" onClick={handleCancelEvent}>cancel event</li>
        </ul> 
        </>

    return (
        <>
        <div className="row">
            <div className="col-12">
                <div className="p-2 ted position-relative no-select d-flex d-xl-block flex-column">
                    <img src={towerEvent?.coverImg} alt={`Blurred cover image for ${towerEvent?.name}`} />
                    {editButton}
                    <div className="m-2 p-4">
                        <div className="row h-100 flex-column flex-xl-row align-items-center">
                            <div className="col-12 col-xl-4">
                                <img src={towerEvent?.coverImg} alt={`Cover image for ${towerEvent?.name}`} />
                            </div>

                            <div className="col-12 col-xl-8 d-flex flex-column align-self-start mt-4 pe-5 pb-4 flex-grow-1 ted-box">
                                <div className="d-flex flex-column flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <span className="fs-3 text-light text-shadow">{towerEvent?.name}</span>
                                        <span className="fs-4 text-light text-shadow">{towerEvent?.dateString}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fs-4 text-info text-shadow">{towerEvent?.location}</span>
                                        <span className="fs-4 text-info text-shadow">Starting at {towerEvent?.timeString}</span>
                                    </div>
                                    <div className="flex-grow-1 mt-4">
                                        <p className="text-light fs-5 text-shadow">{towerEvent?.description}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {(towerEvent?.capacity > 0 || userAttending) && !towerEvent.isCanceled && towerEvent.startDate >= +Date.now() && <span className="fs-4 text-light text-shadow"><span className="text-info">{towerEvent?.capacity}</span> spot{towerEvent?.capacity != 1 ? "s" : ""} left</span>}
                                        {!submitting ? attendOption : <LittleLoading />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {towerEvent && <Modal elementId="edit-event-modal" modalTitle="Edit Event" modalBody={<TowerEventForm towerEvent={towerEvent} handleUpdate={handleUpdateEvent} />}></Modal>}
        </>
    );
}
 
export default TowerEventDetails;