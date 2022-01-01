import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';
import Alert from '../layout/Alert';

const ForgotPassword = () => {
  const authContext = useContext(AuthContext);
  const { forgotPassword, isAuthenticated, message } = authContext;
  const [formData, setFormData] = useState({ email: '' });

  const handleSubmit = (e) => {
    e.preventDefault(e);
    forgotPassword(formData);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='auth-form'>
      {message && <Alert msg={message} type='success' />}
      <h1>Forgot Password</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            required
          />
        </div>
        <input type='submit' className='btn' value='Send Email' />
      </form>
    </div>
  );
};

export default ForgotPassword;
