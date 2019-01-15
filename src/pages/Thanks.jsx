import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

export const ContactFormSuccess = ({ location }) => (
  <Layout location={location}>
    <div className="page container">
      <h1 className="page-title">Thank you!</h1>
      <p>I will try to respond to your message within 24 hours.</p>
      <div className="u-textCenter">
        <Link to="/" className="btn btn-sm btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  </Layout>
);

export default ContactFormSuccess;
