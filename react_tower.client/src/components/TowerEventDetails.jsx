import React from 'react';

const TowerEventDetails = ({ towerEvent }) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="p-2 ted">
                    <img src={towerEvent.coverImg} alt={`Blurred cover image for ${towerEvent.name}`} />

                    <div className="row h-100">
                        <div className="col-12 col-lg-4 h-100">
                            <img src={towerEvent.coverImg} alt={`Cover image for ${towerEvent.name}`} />
                        </div>
                        <div className="col-12 col-lg-8 d-flex flex-column">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default TowerEventDetails;