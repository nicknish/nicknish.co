import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Page from '../components/layout/page';
import Button from '../components/button';

const NotFoundPage = ({}) => (
  <Layout page={{ title: 'Not Found' }} path="/not-found">
    <Page className="page container">
      <h1 className="page-title">Sorry, there{"'"}s nothing here!</h1>
      <p>
        That
        {"'"}s weird. You found a dead-end. Click below to go back to the good
        stuff.
      </p>
      <Button to="/" component={Link} theme="primary" size="small">
        Go Home
      </Button>
    </Page>
  </Layout>
);

export default NotFoundPage;
