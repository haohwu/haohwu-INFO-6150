import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import JobListen from './JobListen';
import Company from './Company';


function App(){
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/job" component={Job} />
                <Route exact path="/job/listen" component={JobListen} />
                <Route exact path="/company" component={Company} />
            </Switch>
        </Router>
    );
}

export default App;