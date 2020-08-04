import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MovieContext from '../../context/movies/moviesContext';
import MovieCard from '../movies/MovieCard';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const movieContext = useContext(MovieContext);
  const { isAuthenticated, user } = authContext;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="dashboard">
      {user && (
        <Fragment>
          <h1>Hi {user.name}</h1>
          <p className="lead">
            You have watched {user.watched.length} out of 1001 movies
          </p>
          <div className="movies">
            {user.watched.map((movie, id) => (
              <MovieCard key={id} movie={movie} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
