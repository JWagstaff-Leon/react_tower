import Auth from '../Middleware/Auth.js'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
        .post("/new", this.createUserAccount)
        .post("", this.getUserAccount)
        .use(Auth)
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
            next(error);
        }
    }

    async getUserAccount(req, res, next) {
        try
        {
            logger.log("logging in with:", { email: req.body.email, password: req.body.password })
            const account = await accountService.getAccount(req.body);
            const token = account.generateAuthToken();
            res.send(token);
        }
        catch (error)
        {
            next(error)
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
         next(error);
     }
  }
}
