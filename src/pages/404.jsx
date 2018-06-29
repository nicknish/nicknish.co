import React from 'react';
import Link from 'gatsby-link';

const NotFoundPage = () => (
  <div className="container">
    <h1>Sorry, there{"'"}s nothing here!</h1>
    <p>
      That
      {"'"}
      s weird. You found a dead-end. Click below to go back to the good stuff.
    </p>
    <Link to="/" className="btn btn-primary btn-sm">
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;
