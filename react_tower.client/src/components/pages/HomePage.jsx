import React from 'react';
import { useState, useEffect } from 'react';
import { towerEventsService } from "../../services/TowerEventsService.js";
import EventFilter from '../EventFilter.jsx';
import PageLoading from '../PageLoading.jsx';
import TowerEventCard from '../TowerEventCard.jsx';

const HomePage = () => {
    const [towerEvents, setTowerEvents] = useState(null);
    const [filteredTowerEvents, setFilteredTowerEvents] = useState(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const mount = async() => {
            const uTowerEvents = (await towerEventsService.getAll()).filter(te => te.startDate >= +Date.now());
            setTowerEvents(uTowerEvents);    
        };
        mount();
    }, []);

    useEffect(() => {
        console.log("Dirty dogs");
        if(filter === "")
        {
            setFilteredTowerEvents(towerEvents);
        }
        else
        {
            const uFilteredTowerEvents = towerEvents?.filter(te => te.type.toLowerCase() === filter.toLowerCase());
            setFilteredTowerEvents(uFilteredTowerEvents);
        }
    }, [towerEvents, filter]);

    const doChangeFilter = (uFilter) =>
    {
        setFilter(uFilter);
    }

    if(!towerEvents)
    {
        return <PageLoading />;
    }

    const filters = [ "concert", "convention", "sport", "digital" ];

    return (
        <div className="d-flex flex-column align-items-center">
            <EventFilter handleChange={doChangeFilter} currentFilter={filter} filters={filters}/>
            <div className="container bg-dark flex-grow-1">
                <div className="row">
                    {towerEvents && (
                        filteredTowerEvents?.length > 0 ?
                        filteredTowerEvents?.map(towerEvent => <div className="col-12 col-lg-6 col-xl-4 col-xxl-3" key={towerEvent.id} ><TowerEventCard towerEvent={towerEvent}/></div>)
                        :
                        <div className="col-12">
                            <span className="text-primary text-center fs-3">No Events Found</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
 
export default HomePage;