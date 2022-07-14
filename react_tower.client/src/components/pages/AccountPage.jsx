import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ticketsService } from "../../services/TicketsService.js";
import { towerEventsService } from "../../services/TowerEventsService.js";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
import Loading from "../Loading.jsx";
import TowerEventCard from "../TowerEventCard.jsx";
import UserTicket from "../UserTicket.jsx";

const AccountPage = () => {
    const [userEvents, setUserEvents] = useState(null);
    const [userTickets, setUserTickets] = useState(null);

    useEffect(() => {
    const mount = async () =>
    {
        const uUserEvents = await towerEventsService.getByCurrentUser();
        const uUserTickets = await ticketsService.getByCurrentUser();
        setUserEvents(uUserEvents);
        setUserTickets(uUserTickets);
    }
        mount();
    }, []);

    if(!userEvents || !userTickets)
    {
        return <Loading />;
    }

    const doCancelTicket = async (ticketId) =>
    {
        try
        {
            if(await Pop.confirm("Are you sure?",  "You might not be able to revert this!", "warning", "Yes, cancel ticket."))
            {
                const removed = await ticketsService.unattendEvent(ticketId);
                const uUserTickets = [...userTickets].filter(ticket => ticket.id != removed.id);
                setUserTickets(uUserTickets);
            }
        }
        catch(error)
        {
            logger.error("[AccountPage.jsx > doCancelTicket]", error.response.data);
            Pop.toast(error.response.data, "error");
        }
    }

    return (
        <div className="container">
            <div className="flex-grow-1 d-flex flex-column align-items-center bg-dark fade-in">
                <span className="text-primary fs-1 mt-3 border-bottom border-primary pb-1 no-select">Your Account Page</span>
                    <div className="container my-5 px-3">
                        {
                            userEvents.length > 0 &&
                            <>
                            <div className="d-flex flex-column">
                                <span className="text-success fs-3 no-select">Your Events</span>
                                <span className="text-primary fs-2 px-xl-5">You have not made any events.</span>
                            </div>
                            <div className="row px-xl-5 mb-5">
                                {userEvents.map(towerEvent => <div className="col-12 col-lg-6 col-xl-4 col-xxl-3" key={towerEvent.id} ><TowerEventCard key={towerEvent.id} towerEvent={towerEvent} /></div>)}
                            </div>
                            </>
                        }
                        <span className="text-success fs-3 pt-5 no-select">Upcoming Events</span>
                        <div className="row flex-column">
                            {userTickets?.length <= 0 && <span v-if="userTickets.length <= 0" className="text-primary fs-2 px-xl-5">You are not registered for any upcoming events.</span>}
                            <div className="col-12 col-xl-8 offset-0 offset-xl-2">
                                {userTickets?.filter(ticket => new Date(ticket.event.startDate) >= +Date.now()).map(ticket => <UserTicket ticket={ticket} key={ticket.id} handleCancel={doCancelTicket} />)}
                            </div>
                        </div>

                    <span className="text-success fs-3 pt-5 no-select">Past Events</span>
                    <div className="row flex-column">
                        {userTickets?.length <= 0 && <span v-if="userTickets.length <= 0" className="text-primary fs-2 px-xl-5">You are not registered for any upcoming events.</span>}
                        <div className="col-12 col-xl-8 offset-0 offset-xl-2">
                            {userTickets?.filter(ticket => new Date(ticket.event.startDate) <= +Date.now()).map(ticket => <UserTicket ticket={ticket} key={ticket.id} handleCancel={doCancelTicket} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AccountPage;