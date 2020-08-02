import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Movies from '../movies/Movies';
import Movie from '../movies/Movie';

const Routes = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movies/:id" component={Movie} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
