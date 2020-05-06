import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <header>
        {/* <icon name="search" /> */}
        Oops - we've looked everywhere but couldn't find this.
      </header>
      <span>
        <Link to="/bonsai">Return to Bonsai page</Link>
      </span>
    </div>
  );
};

export default NotFound;
