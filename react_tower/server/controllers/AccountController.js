import { Auth0Provider } from '@bcwdev/auth0provider'
import Auth from '../Middleware/Auth.js'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
        .post("", this.createUserAccount)
        .use(Auth)
        .get('', this.getUserAccount)
        .get("/tickets", this.getTickets)
  }

    async createUserAccount(req, res, next)
    {
        try
        {
            const userInfo = await accountService.createAccount(req.body)
            return res.send(userInfo);
        }
        catch(error)
        {
            next(error);
        }
    }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
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
