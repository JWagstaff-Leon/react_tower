import React, { Component } from 'react';
import { towerEventsService } from "../../services/TowerEventsService.js";
import TowerEventCard from '../TowerEventCard.jsx';

class HomePage extends Component {
    state = { 
        towerEvents: null
    } 

    componentDidMount = async() =>
    {
        const towerEvents = await towerEventsService.getAll();
        this.setState({ towerEvents })
    }

    render() {
        const { towerEvents } = this.state;
        return (
            <div className="container-fluid bg-dark">
                <div className="row">
                    <span>This is the home page</span>
                </div>
                <div className="row">
                    {towerEvents && towerEvents.
// @ts-ignore
                    map(towerEvent => <div className="col-3"><TowerEventCard towerEvent={towerEvent}/></div>)}
                </div>
            </div>
        );
    }
}
 
export default HomePage;