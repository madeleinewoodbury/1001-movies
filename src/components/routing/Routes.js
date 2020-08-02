import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Movies from '../movies/Movies';
import Movie from '../movies/Movie';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movies/:id" component={Movie} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
