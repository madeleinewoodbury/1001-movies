import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Movies from '../movies/Movies';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/movies" component={Movies} />
      </Switch>
    </Router>
  );
};

export default Routes;
