import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Page from '../components/layout/page';
import Button from '../components/button';

export const ContactFormSuccess = ({ location }) => (
  <Layout location={location}>
    <Page className="container tc">
      <h1 className="page-title">Thank you!</h1>
      <p className="mb4">
        I will try to respond to your message within 24 hours.
      </p>
      <Button theme="primary" size="small" component={Link} to="/">
        Go Home
      </Button>
    </Page>
  </Layout>
);

export default ContactFormSuccess;
