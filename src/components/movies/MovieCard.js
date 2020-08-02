import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <Link to={`/movies/${movie.movieId}`}>{movie.title}</Link>
      <span>{movie.year}</span>
    </div>
  );
};

export default MovieCard;
