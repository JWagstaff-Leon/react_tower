import Auth from "../Middleware/Auth.js";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";

export class TowerEventsController extends BaseController
{
    constructor()
    {
        super("api/events")
        this.router
            .get("", this.getByQuery)
            .get("/:id", this.getById)
            .get("/:id/tickets", this.getTickets)
            .get("/:id/comments", this.getComments)
            .use(Auth)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.remove)
    }

    async getByQuery(req, res, next)
    {
        try
        {
            return res.send(await towerEventsService.getByQuery(req.query));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async getById(req, res, next)
    {
        try
        {
            return res.send(await towerEventsService.findById(req.params.id));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async getTickets(req, res, next)
    {
        try
        {
            return res.send(await ticketsService.getByEvent(req.params.id));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async getComments(req, res, next)
    {
        try
        {
            return res.send(await commentsService.getByEvent(req.params.id));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async create(req, res, next)
    {
        try
        {
            req.body.maxCapacity = +req.body.capacity;
            delete req.body.capacity;
            req.body.isCanceled = false;
            req.body.creatorId = req.userInfo.id;
            return res.send(await towerEventsService.create(req.body));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async edit(req, res, next)
    {
        try
        {
            req.body.id = req.params.id;
            req.body.creatorId = req.userInfo.id;
            return res.send(await towerEventsService.edit(req.body));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async remove(req, res, next)
    {
        try
        {
            return res.send(await towerEventsService.remove(req.params.id, req.userInfo.id));
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

}