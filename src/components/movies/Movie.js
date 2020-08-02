import React, { useContext, useEffect, Fragment } from 'react';
import MoviesContext from '../../context/movies/moviesContext';
import tomato from '../../img/tomato.png';
import imdb from '../../img/imdb-logo-transparent.png';
import metacritic from '../../img/metacritic.png';

const Movie = ({ match }) => {
  const moviesContext = useContext(MoviesContext);
  const { getMovie, movie, loading } = moviesContext;

  useEffect(() => {
    getMovie(match.params.id);

    // eslint-disable-next-line
  }, []);

  const getRatings = () => {
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
  };

  return (
    <div className="movie">
      {!loading && (
        <Fragment>
          {movie && (
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
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
        </Fragment>
      )}
    </div>
  );
};

export default Movie;
