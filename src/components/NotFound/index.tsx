import React from 'react';
import { Link } from 'gatsby';

import Page from '../Layout/Page';
import Button, { ButtonThemes, ButtonSizes } from '../common/Button';

import styles from './404.module.css';

const NotFound: React.FC = () => (
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
);

export default NotFound;
