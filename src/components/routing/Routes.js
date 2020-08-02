import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Movies from '../movies/Movies';

const Routes = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/movies" component={Movies} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
