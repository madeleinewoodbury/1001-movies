import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import About from '../about/About';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Movies from '../movies/Movies';
import Movie from '../movies/Movie';
import Random from '../movies/Random';
import AddMovie from '../admin/AddMovie';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Movies} />
          <Route exact path='/about' component={About} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/movies' component={Movies} />
          <Route exact path='/movies/:id' component={Movie} />
          <Route exact path='/random' component={Random} />
          <Route exact path='/addmovie' component={AddMovie} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route
            exact
            path='/resetpassword/:resettoken'
            component={ResetPassword}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
