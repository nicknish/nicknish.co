import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Page from '../components/layout/page';

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <Page className="page container">
      <h1 className="page-title">Sorry, there{"'"}s nothing here!</h1>
      <p>
        That
        {"'"}s weird. You found a dead-end. Click below to go back to the good
        stuff.
      </p>
      <Link to="/" className="btn btn-primary btn-sm">
        Go Home
      </Link>
    </Page>
  </Layout>
);

export default NotFoundPage;
