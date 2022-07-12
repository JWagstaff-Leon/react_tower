import React, { Component } from 'react';
import { towerEventsService } from "../../services/TowerEventsService.js";
import Loading from '../Loading.jsx';
import TowerEventCard from '../TowerEventCard.jsx';

class HomePage extends Component {
    state = { 
        towerEvents: null,
    } 

    componentDidMount = async() =>
    {
        const towerEvents = await towerEventsService.getAll();
        this.setState({ towerEvents })
    }

    render() {
        const { towerEvents } = this.state;
        if(!towerEvents)
        {
            return <Loading />;
        }
        return (
            <div className="container bg-dark flex-grow-1">
                
                <div className="row">
                    {towerEvents && towerEvents.
                    // @ts-ignore
                    map(towerEvent => <div className="col-12 col-lg-6 col-xl-4 col-xxl-3" key={towerEvent.id} ><TowerEventCard towerEvent={towerEvent}/></div>)}
                </div>
            </div>
        );
    }
}
 
export default HomePage;