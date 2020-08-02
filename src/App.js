import React from 'react';
import AuthState from './context/auth/AuthState';
import MoviesState from './context/movies/MoviesState';
import Routes from './components/routing/Routes';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <MoviesState>
        <Routes />
      </MoviesState>
    </AuthState>
  );
};

export default App;
