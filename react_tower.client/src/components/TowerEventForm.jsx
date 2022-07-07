import React, { useEffect, useState } from 'react';

const TowerEventForm = (props) => {

    const [editable, setEditable] = useState({
        name: "",
        type: "",
        coverImg: "",
        description: "",
        location: "",
        capacity: "0",
        date: "",
        hour: "0",
        minute: "0"
    });

    const towerEvent = props.towerEvent;

    useEffect(() => {
        if(towerEvent)
        {
            setEditable(towerEvent);
        }
    }, [])

    const submitForm = (event) =>
    {
        event.preventDefault();
        console.log(editable);
    }

    const handleChange = ({ currentTarget: target }) =>
    {
        const update = {...editable};
        update[target.name] = target.value;
        setEditable(update);
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
                    <input type="date" className="form-control" name="date" onChange={handleChange} value={editable.date} required />
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