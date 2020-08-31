import React, { useState, useContext, useEffect, Fragment } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import AuthContext from '../../context/auth/authContext';
import tomato from '../../img/tomato.png';
import imdb from '../../img/imdb-logo-transparent.png';
import metacritic from '../../img/metacritic.png';
import filmPlacholder from '../../img/film-placeholder.png';
import Spinner from '../layout/Spinner';

const Movie = ({ match }) => {
  const moviesContext = useContext(MoviesContext);
  const authContext = useContext(AuthContext);
  const { getMovie, movie, loading, clearMovie } = moviesContext;
  const { isAuthenticated, updateWatched, user } = authContext;
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const clear = async () => {
      await clearMovie();
      getMovie(match.params.id);
    };
    clear();
    if (user !== null) {
      if (
        user.watched.filter((film) => film._id === match.params.id).length > 0
      ) {
        setWatched(true);
      } else {
      }
    }

    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    updateWatched(movie.movieId);
    setWatched(!watched);
  };

  const getRatings = () => {
    if (movie.ratings !== undefined) {
      let ratings = movie.ratings.map((rating, id) => (
        <div className="rating" key={id}>
          {rating.Source === 'Internet Movie Database' && (
            <img className="imdb" src={imdb} alt="imdb" />
          )}
          {rating.Source === 'Rotten Tomatoes' && (
            <img className="tomato" src={tomato} alt="rotten tomato" />
          )}
          {rating.Source === 'Metacritic' && (
            <img className="metacritic" src={metacritic} alt="rotten tomato" />
          )}
          <span>{rating.Value}</span>
        </div>
      ));

      return ratings;
    }
  };

  return (
    <div className="movie">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {movie !== null && (
            <Fragment>
              <h1 className="title">
                {movie.title} ({movie.year})
              </h1>
              <div className="info">
                <span className="rating">{movie.rated}</span>
                <span className="runtime">{movie.runtime}</span>
                <span className="genre">{movie.genre}</span>
                <span className="released">
                  {movie.Released} ({movie.country})
                </span>
                {movie.language !== 'N/A' && (
                  <span className="language">{movie.language}</span>
                )}
              </div>
              <div className="content">
                <div className="poster">
                  <img
                    src={movie.poster}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = filmPlacholder;
                    }}
                    alt={`${movie.title} poster`}
                  />
                  <div className="ratings">{getRatings()}</div>
                </div>
                <div className="about">
                  <p className="plot">{movie.plot}</p>

                  <div className="credits">
                    <p className="production">
                      <strong>Production: </strong>
                      {movie.production}
                    </p>
                    <p className="director">
                      <strong>Director: </strong>
                      {movie.director}
                    </p>
                    <p className="writer">
                      <strong>Writer: </strong>
                      {movie.writer}
                    </p>
                    <p className="stars">
                      <strong>Stars: </strong>
                      {movie.actors}
                    </p>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {isAuthenticated && (
            <div onClick={(e) => handleClick()}>
              <div
                className={
                  watched ? 'watched-btn watched' : 'watched-btn unwatched'
                }
              >
                {watched ? 'Watched' : 'Not Watched'}{' '}
                <i className={watched ? 'fas fa-check' : 'fas fa-times'}></i>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Movie;
