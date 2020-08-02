import React, { useEffect, useContext } from 'react';
import MoviesContext from '../../context/movies/moviesContext';

const Movies = () => {
  const moviesContext = useContext(MoviesContext);
  const { getMovies } = moviesContext;

  useEffect(() => {
    getMovies();

    // eslint-disable-next-line
  }, []);
  return <div className="movies">Movies</div>;
};

export default Movies;
