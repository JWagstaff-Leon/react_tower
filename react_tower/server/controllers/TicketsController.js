import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController
{
    constructor()
    {
        super("api/tickets");
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post("", this.create)
        .delete("/:id", this.remove)
    }

    async create(req, res, next)
    {
        try
        {
            req.body.accountId = req.userInfo.id;
            return res.send(await ticketsService.create(req.body));
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
            return res.send(await ticketsService.remove(req.params.id, req.userInfo.id));
        }
        catch(error)
        {
            next(error);
        }
    }

}