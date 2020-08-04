import React, { useEffect, useContext, Fragment } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import AuthContext from '../../context/auth/authContext';
import SearchForm from './SearchForm';
import MovieCard from './MovieCard';

const Movies = () => {
  const moviesContext = useContext(MoviesContext);
  const authContext = useContext(AuthContext);
  const { getMovies, searchMovies, movies, sortMovies } = moviesContext;
  const { isAuthenticated, user, updateWatched } = authContext;

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

  const handleSortMovies = (sort) => {
    sortMovies();
  };

  const handleUpdateWatched = (movieId) => {
    updateWatched(movieId);
  };

  return (
    <Fragment>
      <SearchForm
        handleSearch={handleSearch}
        handleSortMovies={handleSortMovies}
      />
      <div className="movies">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isAuthenticated={isAuthenticated}
            watched={user && user.watched}
            handleUpdateWatched={handleUpdateWatched}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Movies;
