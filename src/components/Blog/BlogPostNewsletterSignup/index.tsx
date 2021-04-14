import React from 'react';
import cx from 'classnames';
import NewsletterSignupForm from '../../NewsletterSignup/Form';
import { TITLE, SUBTITLE } from '../../../constants/copy/newsletter';

import * as styles from './BlogPostNewsletterSignup.module.css';

const BlogPostNewsletterSignup: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cx(styles.container, className)}>
      <p className={styles.title}>{TITLE}</p>
      <p className={styles.subtitle}>{SUBTITLE}</p>
      <NewsletterSignupForm />
    </div>
  );
};

export default BlogPostNewsletterSignup;
