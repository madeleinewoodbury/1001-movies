import React, { useEffect, useContext, useState, Fragment } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import AuthContext from '../../context/auth/authContext';
import SearchForm from './SearchForm';
import MovieCard from './MovieCard';
import Pagination from '../layout/Pagination';
import Spinner from '../layout/Spinner';

const Movies = () => {
  const moviesContext = useContext(MoviesContext);
  const authContext = useContext(AuthContext);
  const {
    getMovies,
    searchMovies,
    movies,
    sortMovies,
    pages,
    moviesPerPage,
    loading,
  } = moviesContext;
  const { isAuthenticated, user, updateWatched } = authContext;
  const [moviesOnPage, setMoviesOnPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (movies.length > 0) {
      // Update pages
      let sliceIndex =
        currentPage === 0 ? currentPage : currentPage * moviesPerPage;
      let moviesSlice = movies.slice(sliceIndex, sliceIndex + moviesPerPage);
      setMoviesOnPage(moviesSlice);
    } else {
      getMovies();
    }

    window.addEventListener('scroll', handleScroll);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
      console.log('cleanup');
    };
  }, [currentPage, getMovies, moviesPerPage, movies]);

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

  const nextPage = () => {
    currentPage === pages - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    currentPage === 0
      ? setCurrentPage(pages - 1)
      : setCurrentPage(currentPage - 1);
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <SearchForm
        handleSearch={handleSearch}
        handleSortMovies={handleSortMovies}
      />
      <div className="movies" onScrollCapture={(e) => console.log('hey')}>
        {moviesOnPage.map((movie) => (
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
      <Pagination
        currentPage={currentPage}
        pages={pages}
        nextPage={nextPage}
        prevPage={prevPage}
        setPage={setPage}
      />
    </Fragment>
  );
};

export default Movies;
