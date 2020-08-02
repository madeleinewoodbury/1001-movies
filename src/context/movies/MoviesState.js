import React, { useReducer } from 'react';
import axios from 'axios';
import MoviesContext from './moviesContext';
import MoviesReducer from './moviesReducer';
import { GET_MOVIES, GET_MOVIE } from '../types';

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

  const getMovie = async (movieId) => {
    try {
      const res = await axios.get(`${api}/movies/${movieId}`);
      dispatch({
        type: GET_MOVIE,
        payload: res.data.movie,
      });
    } catch (err) {
      console.log('Something went wrong');
    }
  };

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
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesState;
