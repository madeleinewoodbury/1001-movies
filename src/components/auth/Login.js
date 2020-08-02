import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log(formData);
  };

  return (
    <div className="auth-form">
      <h1>Sign In</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
        <input type="submit" className="btn" value="Sign In" />
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Sign Up here!</Link>
      </p>
    </div>
  );
};

export default Login;
