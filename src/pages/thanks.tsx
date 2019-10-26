import React from 'react';
import { Link } from 'gatsby';

import { SEOTypes } from '../components/SEO';
import Layout from '../components/layout';
import Page from '../components/layout/page';
import Button, { ButtonThemes, ButtonSizes } from '../components/Button';

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
