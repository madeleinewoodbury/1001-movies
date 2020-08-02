import React, { useEffect, useContext } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import MovieCard from './MovieCard';

const Movies = () => {
  const moviesContext = useContext(MoviesContext);
  const { getMovies, movies } = moviesContext;

  useEffect(() => {
    getMovies();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
