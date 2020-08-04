import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MovieContext from '../../context/movies/moviesContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const movieContext = useContext(MovieContext);
  const { isAuthenticated, user } = authContext;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <div className="dashboard">{user && <h1>Hi {user.name}</h1>}</div>;
};

export default Dashboard;
