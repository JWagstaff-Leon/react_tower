import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
    async getAccount(email, password)
    {
        const res = await api.post("account", { email, password });
        logger.log("AccountService > getAccount > response", res.data);
        return res.data;
    }

    async createAccount(email, password)
    {
        const res = await api.post("account/new", { email, password })
        logger.log("AccountService > createAccount > response", res.data);
        return res.data;
    }
}

export const accountService = new AccountService()
