import Axios from 'axios'
import { baseURL } from '../env'

export const setToken = (token) =>
{
    api.defaults.headers["authorization"] = token;
}
export const api = Axios.create({
    baseURL,
    timeout: 8000
})
