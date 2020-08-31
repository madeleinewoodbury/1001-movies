import { GET_MOVIES, GET_MOVIE, CLEAR_MOVIE } from '../types';

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
        loading: false,
      };
    default:
      return state;
  }
};
