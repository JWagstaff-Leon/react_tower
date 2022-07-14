import Auth from '../Middleware/Auth.js'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
        .post("/new", this.createUserAccount)
        .post("", this.getUserAccount)
        .use(Auth)
        .get("/events", this.getEvents)
        .get("/tickets", this.getTickets)
  }

    async createUserAccount(req, res, next)
    {
        try
        {
            const userInfo = await accountService.createAccount(req.body);
            const token = userInfo.generateAuthToken();
            return res.send(token);
        }
        catch(error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async getUserAccount(req, res, next) {
        try
        {
            const account = await accountService.getAccount(req.body);
            const token = account.generateAuthToken();
            res.send(token);
        }
        catch (error)
        {
            // next(error);
            return res.status(error.status).send(error.message);
        }
    }

    async getEvents(req, res, next)
    {
        try
        {
            return res.send(await towerEventsService.getByQuery({ creatorId: req.userInfo.id }));
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
         return res.send(await ticketsService.getByAccount(req.userInfo.id));
     }
     catch(error)
     {
        // next(error);
        return res.status(error.status).send(error.message);
    }
  }
}
