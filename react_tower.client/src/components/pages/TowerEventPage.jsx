import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ticketsService } from '../../services/TicketsService.js';
import { towerEventsService } from '../../services/TowerEventsService.js';
import Attendees from '../Attendees.jsx';
import Comments from '../Comments.jsx';
import TowerEventDetails from '../TowerEventDetails.jsx';

function TowerEventPage() {
    const [towerEvent, setTowerEvent] = useState(null);
    const [attendees, setAttendees] = useState(null);

    const params = useParams();

    useEffect(() => {
        (async () =>{
            const foundTowerEvent = await towerEventsService.getById(params.id);
            setTowerEvent(foundTowerEvent);
            const foundAttendees = await ticketsService.getByEvent(params.id);
            setAttendees(foundAttendees);
        })();
    }, [params.id]);

    return (
        <div className="container bg-dark">
            <TowerEventDetails towerEvent={towerEvent}/>
            <Attendees attendees={attendees} />
            <Comments />
        </div>
    );
}
 
export default TowerEventPage;