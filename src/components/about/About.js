import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='about page-container'>
      <h1 className='title'>1001 Movies</h1>
      <p className='lead'>
        All the movies from the <em>1001 Movies You Must See Before You Die</em>{' '}
        book. The list also includes movies added every year and therefore there
        are more than 1001 movies in the list.
        <br />
        <br />
        Users can, once registered, keep track of all the films they have seen
        by marking them as watched.
      </p>
      <br />
      <h2>
        How many of the <em>1001 movies</em> have you seen?
      </h2>
      <div className='btn-container'>
        <Link to='/' className='btn'>
          The movies
        </Link>
      </div>
    </div>
  );
};

export default About;
