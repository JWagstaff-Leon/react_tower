import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class CommentsService
{
    async getByEvent(eventId)
    {
        return await dbContext.Comments.find({ eventId }).populate("creator", "name picture");
    }

    async create(data)
    {
        const created = await dbContext.Comments.create(data);
        await created.populate("creator", "name picture");
        return created;
    }

    async remove(id, userId)
    {
        const removed = await dbContext.Comments.findById(id);
        if(!removed)
        {
            throw new BadRequest("Could not find a comment with that id.");
        }
        if(removed.creatorId.toString() !== userId)
        {
            throw new Forbidden("You do not have permission to delete this comment.");
        }
        removed.remove();
        return removed;
    }
}

export const commentsService = new CommentsService();