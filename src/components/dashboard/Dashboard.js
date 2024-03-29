import React, { useContext, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MovieCard from '../movies/MovieCard';
import Spinner from '../layout/Spinner';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, loading } = authContext;

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className='dashboard page-container'>
      {user && (
        <Fragment>
          {user.role === 'admin' && (
            <div className='admin-btn'>
              <Link to='/addmovie' className='btn btn-light'>
                Add movie
              </Link>
            </div>
          )}
          <h1 className='title'>Hi {user.name}</h1>
          <p className='lead'>
            You have watched {user.watched.length} out of 1001 movies
          </p>
          <div className='btn-container'>
            <Link to='/' className='btn'>
              The movies
            </Link>
          </div>
          <div className='movies'>
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
