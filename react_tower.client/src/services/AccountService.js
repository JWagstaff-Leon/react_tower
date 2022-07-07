import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
    async getAccount(email, password) {
        try {
        const res = await api.post('/account', { email, password })
        return res.data
        } catch (err) {
        logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
        }
    }

    async createAccount(email, password)
    {
        const res = await api.post("/account/new", { email, password })
        logger.log("AccountService > createAccount > response", res.data);
        return res.data;
    }
}

export const accountService = new AccountService()
