import React, { useState, useContext, useEffect, Fragment } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import AuthContext from '../../context/auth/authContext';
import tomato from '../../img/tomato.png';
import imdb from '../../img/imdb-logo-transparent.png';
import metacritic from '../../img/metacritic.png';
import filmPlacholder from '../../img/film-placeholder.png';

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
        user.watched.filter((film) => film.movieId === match.params.id).length >
        0
      ) {
        setWatched(true);
      } else {
      }
    }

    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    updateWatched(match.params.id);
    setWatched(!watched);
  };

  const getRatings = () => {
    if (movie.Ratings !== undefined) {
      let ratings = movie.Ratings.map((rating, id) => (
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
      {!loading && (
        <Fragment>
          {movie !== null && (
            <Fragment>
              <h1 className="title">
                {movie.Title} ({movie.Year})
              </h1>
              <div className="info">
                <span className="rating">{movie.Rated}</span>
                <span className="runtime">{movie.Runtime}</span>
                <span className="genre">{movie.Genre}</span>
                <span className="released">
                  {movie.Released} ({movie.Country})
                </span>
                {movie.Language !== 'N/A' && (
                  <span className="language">{movie.Language}</span>
                )}
              </div>
              <div className="content">
                <div className="poster">
                  <img
                    src={movie.Poster}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = filmPlacholder;
                    }}
                    alt={`${movie.Title} poster`}
                  />
                  <div className="ratings">{getRatings()}</div>
                </div>
                <div className="about">
                  <p className="plot">{movie.Plot}</p>

                  <div className="credits">
                    <p className="production">
                      <strong>Production: </strong>
                      {movie.Production}
                    </p>
                    <p className="director">
                      <strong>Director: </strong>
                      {movie.Director}
                    </p>
                    <p className="writer">
                      <strong>Writer: </strong>
                      {movie.Writer}
                    </p>
                    <p className="stars">
                      <strong>Stars: </strong>
                      {movie.Actors}
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
