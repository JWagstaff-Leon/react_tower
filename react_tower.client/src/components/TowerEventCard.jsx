import React from 'react';
import { Link } from "react-router-dom";

const TowerEventCard = ({ towerEvent }) => {
    
    const capacityElem = (() => {
        if(towerEvent.isCanceled) return <div className="bg-danger fs-6 fw-bold text-dark text-center mt-2">Event Cancelled</div>
        if(towerEvent.capacity <= 0) return <div className="bg-warning fs-6 fw-bold text-dark text-center mt-2">Event is Full</div>
        return <h2 className="text-light fs-6 align-self-end"><span className=" fw-bold text-info fs-5">{towerEvent.capacity}</span> spot{towerEvent.capacity === 1 ? "" : "s"} left</h2>
    })(); //casually call an anonymous function the same line it's declared

    console.log("Capacity elem",capacityElem);

    return (
        <Link to={`/event/${towerEvent.id}`} title={`Open event page for ${towerEvent.name}`}>
            <div className="tec my-2 p-2">
                <div className="position-relative">
                    <img src={towerEvent.coverImg} alt={`Image for event named ${towerEvent.name}`} />
                    <div className="position-absolute d-flex flex-column flex-grow-1 p-2">
                        <h1 className="text-light fs-4 mb-1 fw-bold">{towerEvent.name}</h1>
                        <h2 className="text-light fs-6">{towerEvent.location}</h2>
                        <h2 className="text-light fs-6">{towerEvent.dateString}</h2>
                        {capacityElem}
                    </div>
                </div>
            </div>
        </Link>
     );
}
 
export default TowerEventCard;