import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import { SEOTypes } from '../components/SEO';
import Page from '../components/Layout/Page';
import Button, { ButtonThemes, ButtonSizes } from '../components/common/Button';

import styles from '../css/404.module.css';

const NotFoundPage = () => (
  <Layout
    type={SEOTypes.page}
    content={{ title: 'Not Found' }}
    path="/not-found"
  >
    <Page className={styles.page}>
      <h1 className={styles.pageTitle}>Sorry, there{"'"}s nothing here!</h1>
      <p>
        That
        {"'"}s weird. You found a dead-end. Click below to go back to the good
        stuff.
      </p>
      <Button
        to="/"
        component={Link}
        theme={ButtonThemes.primary}
        size={ButtonSizes.small}
      >
        Go Home
      </Button>
    </Page>
  </Layout>
);

export default NotFoundPage;
