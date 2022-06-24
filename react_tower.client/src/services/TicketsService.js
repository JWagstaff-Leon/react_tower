import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

function _formatDate(p_date)
{
    p_date = new Date(p_date)
    let newDate = "";

    newDate += p_date.getDate();
    if(+newDate >= 4 && +newDate <= 20 )
    {
        newDate += "th";
    }
    else
    {
        switch(newDate[newDate.length - 1])
        {
        case "0":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            newDate += "th";
            break;
        case "1":
            newDate += "st";
            break;
        case "2":
            newDate += "nd";
            break;
        case "3":
            newDate += "rd";
            break;
        }
    }

    newDate += " of ";

    switch(p_date.getMonth())
    {
        case 0:
            newDate += "January";
            break;
        case 1:
            newDate += "February";
            break;
        case 2:
            newDate += "March";
            break;
        case 3:
            newDate += "April";
            break;
        case 4:
            newDate += "May";
            break;
        case 5:
            newDate += "June";
            break;
        case 6:
            newDate += "July";
            break;
        case 7:
            newDate += "August";
            break;
        case 8:
            newDate += "September";
            break;
        case 9:
            newDate += "October";
            break;
        case 10:
            newDate += "November";
            break;
        case 11:
            newDate += "December";
            break;
    }

    return newDate;
}

class TicketsService
{
    async getByEvent(eventId)
    {
        
        const res = await api.get("api/events/" + eventId + "/tickets");
        logger.log("TicketsService > getByEvent response", res.data)
        AppState.attendees = res.data.map(ticket => ticket.account);
    }

    async attendEvent(eventId)
    {
        const res = await api.post("api/tickets", { eventId });
        const res2 = await api.get("account/tickets");

        
        logger.log("TicketsService > attendEvent > post 'api/tickets' response", res.data);
        logger.log("TicketsService > attendEvent > get 'account/tickets' response", res2.data);
        
        const newTicket = res2.data.find(ticket => ticket.eventId === res.data.eventId);
        newTicket.event.dateString = _formatDate(newTicket.event.startDate);
        AppState.userTickets.push(newTicket);
        AppState.attendees.unshift(res.data.account);

        const eventIndex = AppState.towerEvents.findIndex(event => event.id === res.data.eventId);
        AppState.towerEvents[eventIndex].capacity -= 1;

        AppState.activeTowerEvent.capacity -= 1;
    }
    
    async unattendEvent(id)
    {
        const res = await api.delete("api/tickets/" + id);
        logger.log("TicketsService > unattendEvent response", res.data);

        const attendeeIndex = AppState.attendees.findIndex(attendee => attendee.id === res.data.accountId);
        AppState.attendees.splice(attendeeIndex, 1);

        const userIndex = AppState.userTickets.findIndex(ticket => ticket.eventId === res.data.eventId);
        AppState.userTickets.splice(userIndex, 1);

        const eventIndex = AppState.towerEvents.findIndex(event => event.id === res.data.eventId);
        AppState.towerEvents[eventIndex].capacity += 1;
        
        AppState.activeTowerEvent.capacity += 1;
    }

    async getUserTickets()
    {
        this.clearUserActive();
        const res = await api.get("account/tickets");
        res.data.forEach(v => v.event.dateString = _formatDate(v.event.startDate));
        logger.log("TicketsService > getUserTickets response", res.data)
        AppState.userTickets = res.data;
    }

    clearActive()
    {
        AppState.attendees = [];
    }

    clearUserActive()
    {
        AppState.userTickets = null;
    }
}

export const ticketsService = new TicketsService();