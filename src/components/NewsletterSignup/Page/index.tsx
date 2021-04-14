import React from 'react';
import Page from '../../Layout/Page';
import NewsletterSignupForm from '../Form';

import { TITLE, SUBTITLE } from '../../../constants/copy/newsletter';
import * as styles from './NewsletterSignupPage.module.css';

const NewsletterSignupPage = () => {
  return (
    <Page className={styles.newsletter}>
      <h1 className={styles.title}>{TITLE}</h1>
      <p>{SUBTITLE}</p>
      <NewsletterSignupForm />
    </Page>
  );
};

export default NewsletterSignupPage;
