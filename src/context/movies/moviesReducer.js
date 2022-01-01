import {
  GET_MOVIES,
  GET_MOVIE,
  MOVIE_ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  CLEAR_MOVIE,
  ADD_MOVIE,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
        pages: Math.trunc(payload.length / state.moviesPerPage + 1),
        loading: false,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: payload,
        loading: false,
      };
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: null,
        movies: [],
        loading: false,
      };
    case ADD_MOVIE:
      return {
        ...state,
        message: payload,
      };
    case MOVIE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
