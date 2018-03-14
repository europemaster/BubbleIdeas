import "../styles/style.scss";
import React from "react";
import ReactDOM from "react-dom";
import Auth from "./routes/user/Auth.jsx";
import LandingPage from "./routes/landingPage/landingPage.jsx";
import { Router, Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import api from "./api/index.js";
import createBrowserHistory from 'history/createBrowserHistory'



console.log('start');
const app = document.getElementById('app');
ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route exact path="/" render={() => (
            !api.isAuthenticated() ? (
                <Redirect to="/login"/>
            ) : (
                <LandingPage/>
            )
        )}/>
        <Route path="/project" component={LandingPage}/>
        <Route path="/login" component={Auth}/>
    </Switch>
</BrowserRouter>, app);
