import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService
{
    async getByEvent(eventId)
    {
        const res = await api.get("api/events/" + eventId + "/comments");
        logger.log("CommentsService.vue > getByEvent response", res.data);
        return res.data.reverse();
    }

    async postComment(data)
    {
        const res = await api.post("api/comments", data);
        logger.log("CommentsService > postComment response", res.data);
        return res.data;
    }

    async remove(id)
    {
        const res = await api.delete("api/comments/" + id);
        logger.log("CommentsService > remove response", res.data);
        return res.data
    }
}

export const commentsService = new CommentsService();