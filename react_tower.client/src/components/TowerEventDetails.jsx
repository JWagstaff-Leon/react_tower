import React from 'react';

const TowerEventDetails = ({ towerEvent }) => {
    const attendOption = (() => {
        if(towerEvent?.isCanceled) return <div className="bg-danger fs-6 fw-bold text-dark text-center mt-2 p-2 rounded-3 w-100">Event Cancelled</div>
        if(towerEvent?.capacity <= 0) return <div className="bg-warning fs-6 fw-bold text-dark text-center mt-2 p-2 rounded-3 w-100">Event is Full</div>
        return <button className="btn btn-warning">Attend</button> // TODO add onClick
    })();

    return (
        <div className="row">
            <div className="col-12">
                <div className="p-2 ted position-relative">
                    <img src={towerEvent?.coverImg} alt={`Blurred cover image for ${towerEvent?.name}`} />
                    <div className="m-2 p-4">
                        <div className="row h-100 align-items-center">
                            <div className="col-12 col-lg-4">
                                <img src={towerEvent?.coverImg} alt={`Cover image for ${towerEvent?.name}`} />
                            </div>

                            <div className="col-12 col-lg-8 d-flex flex-column align-self-start mt-4 pe-5 pb-4 flex-grow-1 h-100">
                                <div className="d-flex flex-column flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <span className="fs-3 text-light text-shadow">{towerEvent?.name}</span>
                                        <span className="fs-4 text-light text-shadow">{towerEvent?.dateString}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="fs-4 text-light text-shadow">{towerEvent?.location}</span>
                                        <span className="fs-4 text-light text-shadow">Starting at {towerEvent?.timeString}</span>
                                    </div>
                                    <div className="flex-grow-1 mt-4">
                                        <p className="text-light fs-5 text-shadow">{towerEvent?.description}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {towerEvent?.capacity > 0 && !towerEvent.isCanceled && <span className="fs-4 text-light text-shadow"><span className="text-info">{towerEvent?.capacity}</span> spots left</span>}
                                        {attendOption}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default TowerEventDetails;