import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
class TowerEventsService
{
    async getByQuery(query = {})
    {
        return await dbContext.TowerEvents.find(query).populate("creator filled");
    }

    async findById(id)
    {
        const found = await dbContext.TowerEvents.findById(id).populate("creator", "name picture").populate("filled");
        if(!found)
        {
            throw new BadRequest("Event with that id not found.");
        }
        return found;
    }

    async create(data)
    {
        const created = await dbContext.TowerEvents.create(data);
        await created.populate("creator filled");
        return created;
    }

    async edit(data)
    {
        const edited = await this.findById(data.id);
        if (edited.creatorId.toString() !== data.creatorId)
        {
            throw new Forbidden("You do not have permission to edit this event.");
        }
        if(edited.isCanceled)
        {
            throw new Forbidden("You cannot edit a cancelled event.");
        }


        edited.name = data.name || edited.name;
        edited.description = data.description || edited.description;
        edited.coverImg = data.coverImg || edited.coverImg;
        edited.location = data.location || edited.location;
        edited.maxCapacity = data.maxCapacity || edited.maxCapacity;
        edited.capacity = data.capacity || edited.capacity;
        edited.startDate = data.startDate || edited.startDate;
        edited.type = data.type || edited.type;
        
        await edited.save();
        return edited;
    }

    async remove(id, userId)
    {
        const removed = await this.findById(id);
        if (removed.creatorId.toString() !== userId)
        {
            throw new Forbidden("You do not have permission to cancel this event.");
        }
        removed.isCanceled = true;
        removed.save();
        return removed;
    }
}

export const towerEventsService = new TowerEventsService();