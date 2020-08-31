import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
      <h2 className="text-center">Loading your movies...</h2>
    </Fragment>
  );
};
