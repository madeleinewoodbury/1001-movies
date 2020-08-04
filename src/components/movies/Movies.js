import React, { useEffect, useContext, useState, Fragment } from 'react';
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
    window.addEventListener('scroll', handleScroll);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
      console.log('cleanup');
    };
    // eslint-disable-next-line
  }, []);

  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    }

    if (window.scrollY === 0) {
      setShowScroll(false);
    }
  };

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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <SearchForm
        handleSearch={handleSearch}
        handleSortMovies={handleSortMovies}
      />
      <div className="movies" onScrollCapture={(e) => console.log('hey')}>
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
      <div
        onClick={scrollToTop}
        className={!showScroll ? 'scroll hide' : 'scroll show'}
      >
        <i className="fas fa-arrow-circle-up"></i>
        <span>Back to top</span>
      </div>
    </Fragment>
  );
};

export default Movies;
