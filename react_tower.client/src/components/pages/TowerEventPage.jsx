import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { towerEventsService } from '../../services/TowerEventsService.js';
import Attendees from '../Attendees.jsx';
import Comments from '../Comments.jsx';
import TowerEventDetails from '../TowerEventDetails.jsx';

function TowerEventPage() {
    const [towerEvent, setTowerEvent] = useState(null);

    const params = useParams();

    useEffect(() => {
        (async () =>{
            const foundTowerEvent = await towerEventsService.getById(params.id);
            setTowerEvent(foundTowerEvent);
        })();
    }, [params.id]);

    return (
        <div className="container-fluid">
            <TowerEventDetails towerEvent={towerEvent}/>
            <Attendees />
            <Comments />
        </div>
    );
}
 
export default TowerEventPage;