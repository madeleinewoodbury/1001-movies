import { GET_MOVIES, GET_MOVIE } from '../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
        loading: false,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: payload,
        loading: false,
      };
    default:
      return state;
  }
};
