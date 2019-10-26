import React from 'react';
import { Link } from 'gatsby';

import { SEOTypes } from '../components/Layout/SEO';
import Layout from '../components/Layout/Layout';
import Page from '../components/Layout/Page';
import Button, { ButtonThemes, ButtonSizes } from '../components/common/Button';

export const ContactFormSuccess: React.FC = () => (
  <Layout type={SEOTypes.page} content={{ title: 'Thanks' }} path="/thanks">
    <Page className="container tc">
      <h1 className="page-title">Thank you!</h1>
      <p className="mb4">
        I will try to respond to your message within 24 hours.
      </p>
      <Button
        theme={ButtonThemes.primary}
        size={ButtonSizes.small}
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </Page>
  </Layout>
);

export default ContactFormSuccess;
