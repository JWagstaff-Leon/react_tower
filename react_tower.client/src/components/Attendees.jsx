import React from 'react';

const Attendees = ({ attendees }) => {
    return ( 
        <div className="row mt-4">
            <div className="col-12">
                <div className="atn">
                    <span className="text-light">See who's attending</span>
                    <div className="bg-secondary px-2 py-1 rounded text-center">
                        {attendees?.length > 0 ?
                        attendees?.map(attendee => {
                            return <img src={attendee.account.picture} alt={`Profile picture of ${attendee.account.name}`} className="attendee-picture mx-1 my-1" title={`${attendee.account.name} is attending`} key={attendee.account.id} />
                        })
                        :
                        <span className="fs-2 no-select fst-italic py-4">Be the first to attend</span>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Attendees;