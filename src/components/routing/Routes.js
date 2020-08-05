import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Movies from '../movies/Movies';
import Movie from '../movies/Movie';
import Random from '../movies/Random';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movies/:id" component={Movie} />
          <Route exact path="/random" component={Random} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
