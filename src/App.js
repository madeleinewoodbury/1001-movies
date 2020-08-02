import React from 'react';
import MoviesState from './context/movies/MoviesState';
import Routes from './components/routing/Routes';
import './App.css';

const App = () => {
  return (
    <MoviesState>
      <Routes />
    </MoviesState>
  );
};

export default App;
