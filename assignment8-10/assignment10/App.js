import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './assignment10/store';
import AdminPage from './assignment10/AdminPage';
import EmployeePage from './assignment10/EmployeePage';
import LoginPage from './assignment10/LoginPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/employee" component={EmployeePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={LoginPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
