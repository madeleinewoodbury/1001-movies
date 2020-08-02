import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <i className="fas fa-film"></i>
        1001 Movies
      </Link>
      <ul>
        <li>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/login">Sign In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
