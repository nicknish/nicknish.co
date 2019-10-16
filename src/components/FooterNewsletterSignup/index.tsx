import React from 'react';
import NewsletterSignupForm from '../NewsletterSignupForm';

import styles from './FooterNewsletterSignup.module.css';

const FooterNewsletterSignup = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Sign up for the newsletter</p>
      <p className={styles.subtitle}>
        Learn how to code and get the scoop on tech salaries, JavaScript, React,
        and more.
      </p>
      <NewsletterSignupForm />
    </div>
  );
};

export default FooterNewsletterSignup;
