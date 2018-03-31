import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import MCC from "./components/MCC";
import MC from "./components/MC";
import MCM from "./components/MCM";
import GM from "./components/GM";


class App extends Component {

    render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={MCC}/>
                    <Route exact path="/MC" component={MC}/>
                    <Route exact path="/MCM" component={MCM}/>
                    <Route exact path="/GM" component={GM}/>
                    <Redirect from='*' to='/' />
                </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
