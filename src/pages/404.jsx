import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <div className="page container">
      <h1 className="page-title">Sorry, there{"'"}s nothing here!</h1>
      <p>
        That
        {"'"}s weird. You found a dead-end. Click below to go back to the good
        stuff.
      </p>
      <Link to="/" className="btn btn-primary btn-sm">
        Go Home
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;
