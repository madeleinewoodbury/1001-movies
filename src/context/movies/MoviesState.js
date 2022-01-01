import React, { useReducer } from 'react';
import axios from 'axios';
import MoviesContext from './moviesContext';
import MoviesReducer from './moviesReducer';
import {
  GET_MOVIES,
  GET_MOVIE,
  ADD_MOVIE,
  MOVIE_ERROR,
  CLEAR_MOVIE,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
} from '../types';

// const api = 'http://localhost:5300/api/v1';
const api = 'https://api-1001-movies.herokuapp.com/api/v1';

const MoviesState = (props) => {
  const initialState = {
    movies: [],
    movie: null,
    loading: true,
    error: null,
    message: null,
    pages: 0,
    moviesPerPage: 50,
  };

  const [state, dispatch] = useReducer(MoviesReducer, initialState);

  const addMovie = async (formData, history) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    try {
      const res = await axios.post(`${api}/movies`, formData, config);

      dispatch({
        type: ADD_MOVIE,
        payload: `${res.data.movie.title} added`,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_MESSAGE,
        });
      }, 5000);
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.data.msg,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 5000);
    }
  };

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
            // eslint-disable-next-line
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
        pages: state.pages,
        moviesPerPage: state.moviesPerPage,
        getMovies,
        searchMovies,
        getMovie,
        sortMovies,
        getRandomMovie,
        addMovie,
        clearMovie,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesState;
