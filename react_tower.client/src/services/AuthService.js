import { api, setToken } from "./AxiosService.js";
import jwtDecode from "jwt-decode";

const _tokenKey = "token";

function _setToken(token)
{
    window.localStorage.setItem(_tokenKey, token);
    _setApiToken(token);
}

function _clearToken()
{
    window.localStorage.removeItem(_tokenKey);
}

function _setApiToken(token)
{
    setToken(token);
}

class AuthService
{
    
    async createAccount(email, password)
    {
        const res = await api.post("account", { email, password });
        console.log("[AuthService > createAccount > response]", res.data);
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
        _setApiToken(token);
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