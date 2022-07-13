import { api, setToken } from "./AxiosService.js";
import jwtDecode from "jwt-decode";
import { logger } from "../utils/Logger.js";

const _tokenKey = "token";

function _setToken(token)
{
    if(token)
    {
        window.localStorage.setItem(_tokenKey, token);
        setToken(token);
    }

}

function _clearToken()
{
    window.localStorage.removeItem(_tokenKey);
}

class AuthService
{
    
    async createAccount(email, password)
    {
        const res = await api.post("account", { email, password });
        logger.log("[AuthService > createAccount > response]", res.data);
        _setToken(res.data);
        return res.data;
    }
    
    login(token)
    {
        _setToken(token);
    }
    
    logout()
    {
        _clearToken();
        return {};
    }

    loadToken()
    {
        const token = window.localStorage.getItem(_tokenKey);
        _setToken(token);
        return token;
    }

    get currentUser()
    {
        const token = this.loadToken();
        if(token)
        {
            return jwtDecode(token);
        }
        else
        {
            return {};
        }
    }
}

export const authService = new AuthService();