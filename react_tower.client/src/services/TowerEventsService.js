import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

function _formatDate(p_date)
{
    let newDate = "";

    newDate += p_date.getDate();
    if(+newDate >= 4 && +newDate <= 20 )
    {
        newDate += "th";
    }
    else
    {
        switch(newDate[newDate.length - 1])
        {
        case "0":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            newDate += "th";
            break;
        case "1":
            newDate += "st";
            break;
        case "2":
            newDate += "nd";
            break;
        case "3":
            newDate += "rd";
            break;
        }
    }

    newDate += " of ";

    switch(p_date.getMonth())
    {
        case 0:
            newDate += "January";
            break;
        case 1:
            newDate += "February";
            break;
        case 2:
            newDate += "March";
            break;
        case 3:
            newDate += "April";
            break;
        case 4:
            newDate += "May";
            break;
        case 5:
            newDate += "June";
            break;
        case 6:
            newDate += "July";
            break;
        case 7:
            newDate += "August";
            break;
        case 8:
            newDate += "September";
            break;
        case 9:
            newDate += "October";
            break;
        case 10:
            newDate += "November";
            break;
        case 11:
            newDate += "December";
            break;
    }

    return newDate;
}

function _formatTime(p_date)
{
    let newTime = "";

    if(p_date.getHours() < 10)
    {
        newTime += "0";
    }
    newTime += p_date.getHours();
    newTime += ":";
    if(p_date.getMinutes() < 10)
    {
        newTime += "0";
    }
    newTime += p_date.getMinutes();
    
    return newTime;
}

function _parseDate(p_date)
{
    const dateNums = {};
    dateNums.day = p_date.getDate();
    dateNums.month = p_date.getMonth() + 1;
    dateNums.year = p_date.getFullYear();
    dateNums.hour = p_date.getHours();
    dateNums.minute = p_date.getMinutes();
    return dateNums;
}

class TowerEventsService
{
    async getAll()
    {
        const res = await api.get("api/events");
        res.data.forEach(v => v.startDate = new Date(v.startDate));
        res.data.forEach(v => v.startNums = _parseDate(v.startDate));
        res.data.forEach(v => v.dateString = _formatDate(v.startDate));
        res.data.forEach(v => v.timeString = _formatTime(v.startDate));
        logger.log("TowerEventsService > getAll response", res.data);
        return res.data;
    }

    
    async getById(id)
    {
        const res = await api.get("api/events/" + id);
        res.data.startDate = new Date(res.data.startDate);
        res.data.startNums = _parseDate(res.data.startDate);
        res.data.dateString = _formatDate(res.data.startDate);
        res.data.timeString = _formatTime(res.data.startDate);
        logger.log("TowerEventsService > getById response", res.data);
        return res.data;
    }

    async create(data)
    {
        const res = await api.post("api/events", data);
        res.data.startDate = new Date(res.data.startDate);
        res.data.startNums = _parseDate(res.data.startDate);
        res.data.dateString = _formatDate(res.data.startDate);
        res.data.timeString = _formatTime(res.data.startDate);
        logger.log("TowerEventsService > create response", res.data);
        return res.data;
    }
    
    async edit(id, data)
    {
        const res = await api.put("api/events/" + id, data);
        res.data.startDate = new Date(res.data.startDate);
        res.data.startNums = _parseDate(res.data.startDate);
        res.data.dateString = _formatDate(res.data.startDate);
        res.data.timeString = _formatTime(res.data.startDate);
        logger.log("TowerEventsService > edit response", res.data);
        return res.data;
    }
    
    async cancelEvent(id)
    {
        const res = await api.delete("api/events/" + id);
        res.data.startDate = new Date(res.data.startDate);
        res.data.startNums = _parseDate(res.data.startDate);
        res.data.dateString = _formatDate(res.data.startDate);
        res.data.timeString = _formatTime(res.data.startDate);
        logger.log("TowerEventsService > cancel response", res.data);
        return res.data;
    }
}

export const towerEventsService = new TowerEventsService();