import React from 'react';

const Attendees = ({ attendees }) => {
    return ( 
        <div className="row mt-4">
            <div className="col-12">
                <div className="atn">
                    <span className="text-light no-select">See who's attending</span>
                    <div className="bg-secondary px-2 py-1 rounded d-flex flex-wrap">
                        {
                        attendees?.length > 0 ?
                        attendees?.map(attendee => {
                            return <img src={attendee.account.picture} alt={`Profile picture of ${attendee.account.name}`} className="attendee-picture mx-1 my-1" title={`${attendee.account.name} is attending`} key={attendee.account.id} />
                        })
                        :
                        <span className="fs-1 no-select text-success darken-5 fst-italic py-2 mx-auto">Be the first to attend</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Attendees;