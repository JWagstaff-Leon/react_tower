import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { commentsService } from '../../services/CommentsService.js';
import { ticketsService } from '../../services/TicketsService.js';
import { towerEventsService } from '../../services/TowerEventsService.js';
import Attendees from '../Attendees.jsx';
import Comments from '../Comments.jsx';
import TowerEventDetails from '../TowerEventDetails.jsx';
import Loading from "../Loading.jsx";

function TowerEventPage({ account }) {
    const [towerEvent, setTowerEvent] = useState(null);
    const [attendees, setAttendees] = useState(null);
    const [comments, setComments] = useState(null);

    const params = useParams();

    const onAttend = async () =>
    {
        try
        {
            const newAttendee = await ticketsService.attendEvent(params.id);
            const uTowerEvent = {...towerEvent};
            const uAttendees = [...attendees];
            console.log("-------", uAttendees, "-------");
            uTowerEvent.capacity -= 1;
            uAttendees.unshift(newAttendee);
            setTowerEvent(uTowerEvent);
            setAttendees(uAttendees);
        }
        catch(error)
        {
            console.error("[TowerEventPage.jsx > onAttend]", error.message);
        }
    }

    const onUnattend = async () =>
    {
        try
        {
            const ticketId = (attendees?.find(a => a.accountId === account.id)).id;
            const removed = await ticketsService.unattendEvent(ticketId);
            const uTowerEvent = {...towerEvent};
            let uAttendees = [...attendees];
            uTowerEvent.capacity += 1;
            uAttendees = uAttendees.filter(a => a.id != removed.id);
            setTowerEvent(uTowerEvent);
            setAttendees(uAttendees);
        }
        catch(error)
        {
            console.error("[TowerEventPage.jsx > onUnattend]", error.message);
        }
    }

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

    const userAttending = attendees && account?.id && !!attendees.find(a => a.accountId === account?.id);

    if(!towerEvent || !attendees || !comments)
    {
        return <Loading />;
    }

    return (
        <div className="container bg-dark">
            <TowerEventDetails towerEvent={towerEvent} handleAttend={onAttend} handleUnattend={onUnattend}  userAttending={userAttending} account={account} />
            { //@ts-ignore
            !towerEvent?.isCanceled && <Attendees attendees={attendees} />}
            <Comments comments={comments} />
        </div>
    );
}
 
export default TowerEventPage;