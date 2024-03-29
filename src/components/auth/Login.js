import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../layout/Alert';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated, error } = authContext;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    login(formData);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='auth-form'>
      {error && <Alert msg={error} type='danger' />}
      <h1>Sign In</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
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
        <input type='submit' className='btn' value='Sign In' />
      </form>
      <p>
        Don't have an account yet? <Link to='/register'>Sign Up here!</Link>
      </p>
      <Link to='/forgotpassword' className='text-primary'>
        Forgot password
      </Link>
    </div>
  );
};

export default Login;
