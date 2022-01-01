import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  UPDATE_WATCHED,
  CLEAR_ERRORS,
} from '../types';

const api = 'http://localhost:5300/api/v1';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get(`${api}/auth`, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`${api}/auth`, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.errors[0].msg,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 5000);
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`${api}/users`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.errors[0].msg,
      });

      setTimeout(() => {
        dispatch({
          type: 'CLEAR_ERRORS',
        });
      }, 5000);
    }
  };

  const updateWatched = async (movieId) => {
    const config = {
      headers: {
        'x-auth-token': state.token,
      },
    };
    try {
      const res = await axios.get(`${api}/movies/users/${movieId}`, config);
      loadUser();
      dispatch({
        type: UPDATE_WATCHED,
        payload: res.data,
      });
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        login,
        register,
        logout,
        updateWatched,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
