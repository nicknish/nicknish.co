import React, { useLayoutEffect, useRef } from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';

import styles from './BlogPopularPost.module.css';

const BlogPopularPost = ({ idx, length, path, title, description, date }) => {
  return (
    <article
      className={cx(styles.popularPost, {
        [styles.popularPostLeftPadding]: idx % 2 !== 0,
        [styles.popularPostRightPadding]: idx % 2 === 0,
        [styles.popularPostRightPaddingDesktop]: !idx || idx !== length - 1,
        [styles.popularPostLeftPaddingDesktop]: idx
      })}
      data-testid="BlogIndexPost-popular"
    >
      <Link to={path} className={styles.popularPostLink}>
        <header className={styles.popularPostHeader}>
          <h3 className={styles.popularPostTitle}>{title}</h3>
        </header>
        <p className={styles.popularPostDescription}>{description}</p>
        <span className={styles.popularPostDate}>{date}</span>
      </Link>
    </article>
  );
};

export default BlogPopularPost;
