import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      <li>
        <NavLink to='/random'>Random</NavLink>
      </li>
      <li>
        <NavLink to='/about'>About</NavLink>
      </li>
      <li>
        <NavLink to='/dashboard'>
          <i className='fas fa-user show-md'></i>{' '}
          <span className='hide-md'>{user && user.name.split(' ')[0]}</span>
        </NavLink>
      </li>

      <li onClick={onLogout}>
        <i className='fas fa-sign-out-alt show-md' />{' '}
        <span className='hide-md'>Sign Out</span>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to='/random'>Random</NavLink>
      </li>
      <li>
        <NavLink to='/about'>About</NavLink>
      </li>
      <li>
        <NavLink to='/login'>
          <i className='fas fa-sign-in-alt show-md'></i>{' '}
          <span className='hide-md'>Sign In</span>
        </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <Link to='/' className='brand'>
        <i className='fas fa-film'></i>
        <span className='hide-md'>1001 Movies</span>
      </Link>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
