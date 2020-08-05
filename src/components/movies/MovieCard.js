import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import filmPlaceholder from '../../img/film-placeholder.png';

const MovieCard = ({
  movie,
  isAuthenticated,
  watched,
  handleUpdateWatched,
}) => {
  const handleClick = (e) => {
    if (
      e.target.classList.contains('ribbon') ||
      e.target.classList.contains('fa-check')
    ) {
      handleUpdateWatched(movie.movieId);
    }
  };
  return (
    <div className="movie-card" onClick={(e) => handleClick(e)}>
      <img
        src={movie.poster}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = filmPlaceholder;
        }}
        alt={`${movie.title} poster`}
      />
      <Link to={`/movies/${movie.movieId}`}>{movie.title}</Link>
      <span>{movie.year}</span>
      {isAuthenticated && (
        <Fragment>
          <div
            className={
              watched.filter((item) => item.movieId === movie.movieId).length >
              0
                ? 'ribbon watched'
                : 'ribbon'
            }
          ></div>
          <i className="fas fa-check"></i>
        </Fragment>
      )}
    </div>
  );
};

export default MovieCard;
