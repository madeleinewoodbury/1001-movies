import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import MoviesContext from '../../context/movies/moviesContext';
import { Redirect } from 'react-router-dom';

const AddMovie = ({ history }) => {
  const authContext = useContext(AuthContext);
  const moviesContext = useContext(MoviesContext);

  const { user, isAuthenticated } = authContext;
  const { addMovie } = moviesContext;
  const [formData, setFormData] = useState({ movieId: '' });

  const handleSubmit = (e) => {
    e.preventDefault(e);
    addMovie(formData, history);
  };

  if (!isAuthenticated || user.role !== 'admin') {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form'>
      <h1>Add Movie to Database</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Movie id'
            name='movieId'
            value={formData.movieId}
            onChange={(e) => setFormData({ movieId: e.target.value })}
            required
          />
        </div>
        <input type='submit' className='btn' value='Add Movie' />
      </form>
    </div>
  );
};

export default AddMovie;
