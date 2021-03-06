import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { commentsService } from '../../services/CommentsService.js';
import { ticketsService } from '../../services/TicketsService.js';
import { towerEventsService } from '../../services/TowerEventsService.js';
import Attendees from '../Attendees.jsx';
import Comments from '../Comments.jsx';
import TowerEventDetails from '../TowerEventDetails.jsx';
import PageLoading from "../PageLoading.jsx";
import { logger } from '../../utils/Logger.js';
import Pop from '../../utils/Pop.js';

function TowerEventPage({ account }) {
    const [towerEvent, setTowerEvent] = useState(null);
    const [attendees, setAttendees] = useState(null);
    const [comments, setComments] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const params = useParams();

    const doAttend = async () =>
    {
        try
        {
            setSubmitting(true);
            const newAttendee = await ticketsService.attendEvent(params.id);
            const uTowerEvent = {...towerEvent};
            const uAttendees = [...attendees];
            uTowerEvent.capacity -= 1;
            uAttendees.unshift(newAttendee);
            setTowerEvent(uTowerEvent);
            setAttendees(uAttendees);
            setSubmitting(false);
        }
        catch(error)
        {
            logger.error("[TowerEventPage.jsx > onAttend]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    const doUnattend = async () =>
    {
        try
        {
            if(towerEvent?.capacity < 5 && !(await Pop.confirm("Are you sure?",  "You might not be able to revert this!", "warning", "Yes, cancel ticket.")))
            {
                return;
            }
            setSubmitting(true);
            
            const ticketId = (attendees?.find(a => a.accountId === account.id)).id;
            const removed = await ticketsService.unattendEvent(ticketId);
            const uTowerEvent = {...towerEvent};
            let uAttendees = [...attendees];
            uTowerEvent.capacity += 1;
            uAttendees = uAttendees.filter(a => a.id != removed.id);
            setTowerEvent(uTowerEvent);
            setAttendees(uAttendees);
            setSubmitting(false);
        }
        catch(error)
        {
            setSubmitting(false);
            logger.error("[TowerEventPage.jsx > onUnattend]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    const doUpdateEvent = async (update) =>
    {
        try
        {
            const uEvent = await towerEventsService.edit(update.id, update);
            setTowerEvent(uEvent);
        }
        catch(error)
        {
            logger.error("[TowerEventPage.jsx > doUpdateEvent]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    const doCancelEvent = async () =>
    {
        try
        {
            if(await Pop.confirm("Are you sure?",  "You won't be able to revert this!", "warning", "Yes, cancel it."))
            {
                setTowerEvent(await towerEventsService.cancelEvent(towerEvent.id));
            }
        }
        catch(error)
        {
            logger.error("[TowerEventDetails.jsx > cancelEvent]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    useEffect(() => {
        (async () =>{
            setTowerEvent(null);
            setAttendees(null);
            setComments(null);
            const foundTowerEvent = await towerEventsService.getById(params.id);
            setTowerEvent(foundTowerEvent);
            const foundAttendees = await ticketsService.getByEvent(params.id);
            setAttendees(foundAttendees);
            const foundComments = await commentsService.getByEvent(params.id);
            foundComments.forEach(comment => comment.isAttending = !!(foundAttendees.find(attendee => attendee.accountId === comment.creator.id)))
            setComments(foundComments);
        })();
    }, [params.id]);

    const userAttending = attendees && account?.id && !!attendees.find(a => a.accountId === account?.id);

    const doAddComment = async (body) => 
    {
        const newComment = await commentsService.postComment({ body, eventId: params.id });
        const uComments = [...comments];
        uComments.unshift(newComment);
        setComments(uComments);
        return newComment;
    }

    const doDeleteComment = async (id) =>
    {
        try
        {
            if(await Pop.confirm())
            {
                const removed = await commentsService.remove(id);
                let uComments = [...comments].filter(comment => comment.id != removed.id);
                setComments(uComments);
            }
                
        }
        catch(error)
        {
            logger.error("[TowerEventPage.jsx > doDeleteComment]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    if(!towerEvent || !attendees || !comments)
    {
        return <PageLoading />;
    }

    return (
        <div className="container bg-dark">
            <TowerEventDetails towerEvent={towerEvent} handleAttend={doAttend} handleUnattend={doUnattend} userAttending={userAttending} handleUpdateEvent={doUpdateEvent} handleCancelEvent={doCancelEvent} account={account}v submitting={submitting} />
            { //@ts-ignore
            !towerEvent?.isCanceled && <Attendees attendees={attendees} />}
            <Comments comments={comments} handleNewComment={doAddComment} handleDelete={doDeleteComment} account={account} />
        </div>
    );
}
 
export default TowerEventPage;