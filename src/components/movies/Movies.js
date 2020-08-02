import React, { useEffect, useContext, Fragment } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import SearchForm from './SearchForm';
import MovieCard from './MovieCard';

const Movies = () => {
  const moviesContext = useContext(MoviesContext);
  const { getMovies, searchMovies, movies } = moviesContext;

  useEffect(() => {
    getMovies();

    // eslint-disable-next-line
  }, []);

  const handleSearch = (search) => {
    if (search === '') {
      getMovies();
    } else {
      searchMovies(search);
    }
  };

  return (
    <Fragment>
      <SearchForm handleSearch={handleSearch} />
      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </Fragment>
  );
};

export default Movies;
