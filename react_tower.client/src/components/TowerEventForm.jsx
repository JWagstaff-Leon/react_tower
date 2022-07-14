import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import PageLoading from './PageLoading.jsx';
const bootstrap = require("bootstrap");

const TowerEventForm = (props) => {
    const navigateTo = useNavigate();

    const now = new Date();

    const [editable, setEditable] = useState({
        name: "",
        type: "concert",
        coverImg: "",
        description: "",
        location: "",
        capacity: "0",
        startDate: now.toISOString().substring(0, 10),
        hour: now.getHours(),
        minute: now.getMinutes()
    });

    const [submitting, setSubmitting] = useState(false);

    const towerEvent = props.towerEvent;

    useEffect(() => {
        if(towerEvent)
        {
            let dateString = "";
            dateString += towerEvent.startDate.getFullYear() + "-";
            if(+towerEvent.startDate.getMonth() + 1 < 10)
            {
                dateString += "0";
            }
            dateString += (+props.towerEvent.startDate.getMonth() + 1) + "-";
            if(+towerEvent.startDate.getDate() < 10)
            {
                dateString += "0";
            }
            dateString += towerEvent.startDate.getDate();

            const uEditable =
            {
                name: towerEvent.name,
                type: towerEvent.type,
                coverImg: towerEvent.coverImg,
                description: towerEvent.description,
                location: towerEvent.location,
                capacity: towerEvent.capacity,
                startDate: dateString,
                hour: towerEvent.startDate.getHours(),
                minute: towerEvent.startDate.getMinutes()
            };
            setEditable(uEditable);
        }
    }, [])

    const submitForm = async (event) =>
    {
        try
        {
            setSubmitting(true);
            event.preventDefault();
            const newData = {...editable};

            const newStartDate = new Date();
            const fullYear = +newData.startDate.substring(0, 4);
            const month = (+newData.startDate.substring(5, 7)) - 1;
            const date = +newData.startDate.substring(8, 10);
            newStartDate.setFullYear(fullYear);
            newStartDate.setMonth(month);
            newStartDate.setDate(date);
            newStartDate.setHours(+newData.hour);
            newStartDate.setMinutes(+newData.minute);
            newStartDate.setSeconds(0);
            newStartDate.setMilliseconds(0);
            newData.startDate = newStartDate;
            
            if(newData.id)
            {
                // const uEvent = await towerEventsService.create(newData);
                await props.handleUpdate(newData);
                bootstrap.Modal.getOrCreateInstance(document.getElementById("edit-event-modal")).hide();
                setTimeout(() => setSubmitting(false), 150)
            }
            else
            {
                const newEvent = await towerEventsService.create(newData);
                bootstrap.Modal.getOrCreateInstance(document.getElementById("create-event-modal")).hide();
                
                const defaultState = {
                    name: "",
                    type: "concert",
                    coverImg: "",
                    description: "",
                    location: "",
                    capacity: "0",
                    startDate: "",
                    hour: "0",
                    minute: "0"
                }
                setEditable(defaultState);
                navigateTo("/event/" + newEvent.id);
                setTimeout(() => setSubmitting(false), 150)
            }
        }
        catch(error)
        {
            setSubmitting(false);
            logger.error("[TowerEventForm.jsx > submitForm]", error.response.data);
            Pop.toast(error.response.data, "error");

        }
    }

    const handleChange = ({ currentTarget: target }) =>
    {
        const update = {...editable};
        update[target.name] = target.value;
        setEditable(update);
    }

    if(submitting)
    {
        return <PageLoading />;
    }

    return (
        <form onSubmit={submitForm} className="d-flex flex-column">
            <div className="d-flex mb-3">
                <div className="me-1 flex-grow-1">
                    <label>Event Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Tower Event Name" onChange={handleChange} value={editable.name} maxLength={30} required />
                </div>
                <div className="ms-1">
                    <label>Event Type</label>
                    <select className="form-control" name="type" onChange={handleChange} value={editable.type} required>
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                    </select>
                </div>
            </div>
            <label>Cover Image URL</label>
            <input type="url" className="form-control mb-1" name="coverImg" placeholder="Cover Image URL" onChange={handleChange} value={editable.coverImg} required />
            <label>Description</label>
            <textarea className="form-control mb-3" name="description" placeholder="Description" onChange={handleChange} value={editable.description} required></textarea>
            <div className="d-flex mb-2">
                <div className="me-1">
                    <label>Event Location</label>
                    <input type="text" className="form-control mb-3" name="location" placeholder="Location" onChange={handleChange} value={editable.location} maxLength={30} required />
                </div>
                <div className="ms-1">
                    <label>Capacity</label>
                    <input type="number" className="form-control" name="capacity" placeholder="Capacity" min="0" onChange={handleChange} value={editable.capacity} required />
                </div>
            </div>
            <div className="d-flex mb-5">
                <div className="me-1">
                    <label>Event Date</label>
                    <input type="date" className="form-control" name="startDate" onChange={handleChange} value={editable.startDate} required />
                </div>
                <div>
                    <label>Event Start Time</label>
                    <div className="d-flex">
                        <label className="visually-hidden">Event Start Hour</label>
                        <input type="number" className="form-control" name="hour" min="0" max="23" placeholder="HH" onChange={handleChange} value={editable.hour} required />
                        <span className="fs-3 mx-2">:</span>
                        <label className="visually-hidden">Event Start Minute</label>
                        <input type="number" className="form-control" name="minute" min="0" max="59" placeholder="MM" onChange={handleChange} value={editable.minute} required />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-danger" type="button" data-bs-dismiss="modal">Cancel</button>
                {towerEvent?.id && <button className="btn btn-primary ms-3" type="submit">Edit Event</button>}
                {!towerEvent?.id && <button className="btn btn-primary ms-3" type="submit">Create Event</button>}
            </div>
        </form>
    );
}
 
export default TowerEventForm;