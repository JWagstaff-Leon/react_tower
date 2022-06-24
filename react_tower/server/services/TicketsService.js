import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import req from "express/lib/request";
import { dbContext } from "../db/DbContext.js";

class TicketsService
{
    async getByEvent(eventId)
    {
        return await dbContext.Tickets.find({ eventId }).populate("account", "name picture");
    }

    async getByAccount(accountId)
    {
        return await dbContext.Tickets.find({ accountId }).populate("event");
    }

    async create(data)
    {
        const found = await dbContext.Tickets.findOne({ eventId: data.eventId, accountId: data.accountId });
        if(found)
        {
            throw new BadRequest("You already have a ticket for this event.");
        }
        const towerEvent = await dbContext.TowerEvents.findOne({_id: data.eventId}).populate("filled");
        if(towerEvent.maxCapacity <= towerEvent.filled)
        {
            throw new BadRequest("This event is at capacity.");
        }
        const created = await dbContext.Tickets.create(data);
        await created.populate("account", "name picture");
        return created;
    }

    async remove(id, userId)
    {
        const removed = await dbContext.Tickets.findById(id)
        if(!removed)
        {
            throw new BadRequest("Could not find a ticket with that id.");
        }
        if(removed.accountId.toString() !== userId)
        {
            throw new Forbidden("You do not have permission to delete this ticket.");
        }
        await removed.remove();
        return removed;
    }
}

export const ticketsService = new TicketsService();