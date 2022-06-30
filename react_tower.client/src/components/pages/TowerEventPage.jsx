import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { commentsService } from '../../services/CommentsService.js';
import { ticketsService } from '../../services/TicketsService.js';
import { towerEventsService } from '../../services/TowerEventsService.js';
import Attendees from '../Attendees.jsx';
import Comments from '../Comments.jsx';
import TowerEventDetails from '../TowerEventDetails.jsx';

function TowerEventPage() {
    const [towerEvent, setTowerEvent] = useState(null);
    const [attendees, setAttendees] = useState(null);
    const [comments, setComments] = useState(null);

    const params = useParams();

    useEffect(() => {
        (async () =>{
            const foundTowerEvent = await towerEventsService.getById(params.id);
            setTowerEvent(foundTowerEvent);
            const foundAttendees = await ticketsService.getByEvent(params.id);
            setAttendees(foundAttendees);
            const foundComments = await commentsService.getByEvent(params.id);
            foundComments.forEach(comment => comment.isAttending = !!(foundAttendees.find(attendee => attendee.id === comment.creator.id)))
            setComments(foundComments);
        })();
    }, [params.id]);

    return (
        <div className="container bg-dark">
            <TowerEventDetails towerEvent={towerEvent}/>
            <Attendees attendees={attendees} />
            <Comments comments={comments} />
        </div>
    );
}
 
export default TowerEventPage;