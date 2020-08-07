import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieContext from '../../context/movies/moviesContext';
import AuthContext from '../../context/auth/authContext';
import filmPlacholder from '../../img/film-placeholder.png';

const Random = () => {
  const movieContext = useContext(MovieContext);
  const authContext = useContext(AuthContext);
  const { getRandomMovie, getMovies, movie, clearMovie } = movieContext;
  const { user } = authContext;

  useEffect(() => {
    clearMovie();
    getMovies();

    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    let watched = [];
    if (user !== null) {
      watched = user.watched;
    }
    getRandomMovie(watched);
  };
  return (
    <div className="random page-container">
      <h1 className="title">Not sure what to watch?</h1>
      <p className="lead">Pick a random film out of the 1001 movies...</p>
      <button onClick={handleClick} className="btn">
        Get Movie
      </button>
      {movie !== null && (
        <div className="movie-card">
          <img
            src={movie.poster}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = filmPlacholder;
            }}
            alt={`${movie.title} poster`}
          />
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          <span>{movie.year}</span>
        </div>
      )}
    </div>
  );
};

export default Random;
