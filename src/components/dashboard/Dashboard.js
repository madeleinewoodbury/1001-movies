import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MovieCard from '../movies/MovieCard';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="dashboard page-container">
      {user && (
        <Fragment>
          <h1 className="title">Hi {user.name}</h1>
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
