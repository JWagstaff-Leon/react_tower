import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController
{
    constructor()
    {
        super("api/comments")
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.create)
            .delete("/:id", this.remove)
    }

    async create(req, res, next)
    {
        try
        {
            req.body.creatorId = req.userInfo.id;
            return res.send(await commentsService.create(req.body));
        }
        catch(error)
        {
            next(error);
        }
    }

    async remove(req, res, next)
    {
        try
        {
            return res.send(await commentsService.remove(req.params.id, req.userInfo.id));
        }
        catch(error)
        {
            next(error);
        }
    }

}