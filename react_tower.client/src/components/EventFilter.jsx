import React from 'react';

const EventFilter = ({ handleChange, currentFilter, filters }) => {
    return ( 
        <ul className="nav nav-tabs my-4 border-danger no-select no-drag">
            <li onClick={() => handleChange("")} className={"nav-item rounded-top action" + (currentFilter === "" ? " active border-info bg-info" : " border-danger")}>
                <span className={"nav-link" + (currentFilter === "" ? " text-dark" : " text-primary" )}>all</span>
            </li>
            {filters.map(filter => 
                <li key={filter} onClick={() => handleChange(filter)} className={"nav-item rounded-top action" + (currentFilter === filter ? " active border-info bg-info" : " border-danger")}>
                    <span className={"nav-link" + (currentFilter === filter ? " text-dark" : " text-primary" )}>{filter}</span>
                </li>
            )}
        </ul>
    );
}
 
export default EventFilter;