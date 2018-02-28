import React from "react";
import ReactDOM from "react-dom";
import Auth from "./routes/user/Auth.jsx";
import LandingPage from "./routes/landingPage/landingPage.jsx";
import { Router, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'



console.log('start');
const app = document.getElementById('app');
ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/login" component={Auth}/>
    </Switch>
</BrowserRouter>, app);
