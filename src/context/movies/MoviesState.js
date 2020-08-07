import React, { useReducer } from 'react';
import axios from 'axios';
import MoviesContext from './moviesContext';
import MoviesReducer from './moviesReducer';
import { GET_MOVIES, GET_MOVIE, CLEAR_MOVIE } from '../types';

const api = 'http://localhost:5000/api/v1';

const MoviesState = (props) => {
  const initialState = {
    movies: [],
    movie: null,
    loading: true,
    error: null,
    message: null,
  };

  const [state, dispatch] = useReducer(MoviesReducer, initialState);

  const getMovies = async () => {
    try {
      const res = await axios.get(`${api}/movies`);
      dispatch({
        type: GET_MOVIES,
        payload: res.data.movies,
      });
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  const sortMovies = () => {
    let reverseMovies = state.movies.reverse();
    dispatch({
      type: GET_MOVIES,
      payload: reverseMovies,
    });
  };

  const searchMovies = async (search) => {
    try {
      const res = await axios.get(`${api}/movies/search/${search}`);
      dispatch({
        type: GET_MOVIES,
        payload: res.data.movies,
      });
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  const getMovie = async (id) => {
    clearMovie();
    try {
      const res = await axios.get(`${api}/movies/${id}`);
      dispatch({
        type: GET_MOVIE,
        payload: res.data.movie,
      });
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  const getRandomMovie = (watched) => {
    clearMovie();

    let movie;
    const getRandom = () => {
      let random = Math.floor(Math.random() * Math.floor(state.movies.length));
      return state.movies[random];
    };

    if (watched.length < 1) {
      movie = getRandom();
    } else {
      let watchedBefore = true;
      while (watchedBefore) {
        movie = getRandom();
        if (
          watched.filter(
            (watchedMovie) => watchedMovie.movieId === movie.movieId
          ).length === 0
        ) {
          watchedBefore = false;
        }
      }
    }
    dispatch({
      type: GET_MOVIE,
      payload: movie,
    });
  };

  const clearMovie = () => dispatch({ type: CLEAR_MOVIE });

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        loading: state.loading,
        error: state.error,
        message: state.message,
        getMovies,
        searchMovies,
        getMovie,
        sortMovies,
        getRandomMovie,
        clearMovie,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesState;
