import React from 'react';

const Attendees = ({ attendees }) => {
    return ( 
        <div className="row mt-4">
            <div className="col-12">
                <div className="atn">
                    <span className="text-light">See who's attending</span>
                    <div className="bg-secondary p-2 rounded">
                        {attendees?.map(attendee => {
                            return <img src={attendee.picture} alt={`Profile picture of ${attendee.name}`} className="attendee-picture mx-1" title={`${attendee.name} is attending`}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Attendees;