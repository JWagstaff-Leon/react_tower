import React, { Component } from 'react';
import { accountService } from '../../services/AccountService.js';
import { towerEventsService } from "../../services/TowerEventsService.js";
import TowerEventCard from '../TowerEventCard.jsx';

class HomePage extends Component {
    state = { 
        towerEvents: null,
        login:
        {
            email: "",
            password: ""
        }
    } 

    componentDidMount = async() =>
    {
        const towerEvents = await towerEventsService.getAll();
        this.setState({ towerEvents })
    }

    handleLogin = async (event) => {
        event.preventDefault();
        console.log("form submitted with:", this.state.login);
        await accountService.createAccount(this.state.login);
        return;
    }

    handleChange = ({ currentTarget: target }) => {
        const login = {...this.state.login};
        login[target.name] = target.value;
        this.setState({login});
    }

    render() {
        const { towerEvents } = this.state;
        return (
            <div className="container bg-dark">
                <form onSubmit={this.handleLogin}>
                    <label htmlFor="login-form-email">Email</label>
                    <input type="email" name="email" id="login-form-email" placeholder="Email" className="form-control" required value={this.state.login.email} onChange={this.handleChange} />
                    <label htmlFor="login-form-password">Password</label>
                    <input type="password" name="password" id="login-form-password" placeholder="Password" className="form-control" required value={this.state.login.password} onChange={this.handleChange}/>
                    <button className="btn btn-primary mt-4">Login</button>
                </form>
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