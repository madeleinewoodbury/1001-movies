import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const ResetPassword = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { resetPassword, isAuthenticated } = authContext;
  const [formData, setFormData] = useState({ password: '', password2: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (formData.password !== formData.password2) {
      alert('Passwords must match');
    } else {
      resetPassword(formData, match.params.resettoken);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='auth-form'>
      <h1>Forgot Password</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={(e) => handleChange(e)}
            minLength={6}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={formData.password2}
            onChange={(e) => handleChange(e)}
            minLength={6}
            required
          />
        </div>
        <input type='submit' className='btn' value='Save Password' />
      </form>
    </div>
  );
};

export default ResetPassword;
