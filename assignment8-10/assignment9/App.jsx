import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './assignment9/Home';
import about from './assignment9/about';
import JobListen from './assignment9/JobListen';
import contact from './assignment9/contact';
import Company from './assignment9/Company';
import Login from './assignment9/Login';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={about} />
                <Route path="/jobs" component={JobListen} />
                <Route path="/contact" component={contact} />
                <Route path="/companies" component={Company} />
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
