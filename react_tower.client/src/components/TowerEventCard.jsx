import React from 'react';
import { Link } from "react-router-dom";

const TowerEventCard = ({ towerEvent }) => {
    
    const capacityElem = (() => {
        if(towerEvent.isCanceled) return <div className="bg-danger fs-6 fw-bold text-dark text-center mt-2 p-1 rounded">Event Cancelled</div>
        if(towerEvent.startDate < +Date.now()) return <div className="bg-secondary lighten-25s fs-6 fw-bold text-center mt-2 p-1 rounded"><span className="text-dark">Event is over</span></div>
        if(towerEvent.capacity <= 0) return <div className="bg-warning fs-6 fw-bold text-dark text-center mt-2 p-1 rounded">Event is Full</div>
        return <h2 className="text-light fs-6 align-self-end"><span className=" fw-bold text-primary fs-5">{towerEvent.capacity}</span> spot{towerEvent.capacity === 1 ? "" : "s"} left</h2>
    })(); //casually call an anonymous function the same line it's declared

    return (
        <Link to={`/event/${towerEvent.id}`} title={`Open event page for ${towerEvent.name}`}>
            <div className="bg-dark lighten-20 rounded-3 my-2">
                <div className="tec p-1">
                    <div className="position-relative">
                        <img src={towerEvent.coverImg} alt={`Image for event named ${towerEvent.name}`} className="rounded" />
                        <div className="position-absolute d-flex flex-column flex-grow-1 p-2 rounded-bottom">
                            <h1 className="text-light fs-4 mb-1 fw-bold">{towerEvent.name}</h1>
                            <h2 className="text-light fs-6">{towerEvent.location}</h2>
                            <h2 className="text-light fs-6">{towerEvent.dateString}</h2>
                            {capacityElem}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
     );
}
 
export default TowerEventCard;