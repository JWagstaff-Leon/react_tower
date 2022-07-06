import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      return res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

    async createAccount(data)
    {
        const res = await api.post("/account", data)
        logger.log("AccountService > createAccount > response", res.data);
        return res.data;
    }
}

export const accountService = new AccountService()
