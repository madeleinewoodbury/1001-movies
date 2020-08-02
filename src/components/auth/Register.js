import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link, Redirect } from 'react-router-dom';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated } = authContext;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (formData.password !== formData.password2) {
      alert('Passwords must match');
    } else {
      register(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-form">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            minLength={6}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formData.password2}
            onChange={(e) => handleChange(e)}
            minLength={6}
            required
          />
        </div>
        <input type="submit" className="btn" value="Sign Up" />
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In here!</Link>
      </p>
    </div>
  );
};

export default Register;
