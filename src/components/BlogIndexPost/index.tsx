import React from 'react';
import { Link } from 'gatsby';

import styles from './BlogIndexPost.module.css';

interface BlogPostProps {
  to: string;
  title: string;
  date: string;
  excerpt: string;
}

export const BlogIndexPost: React.FC<BlogPostProps> = ({
  to,
  title,
  date,
  excerpt
}) => (
  <article className={styles.blogIndexPost}>
    <Link to={to} className={styles.blogIndexPostLinkWrapper}>
      <header className={styles.blogIndexPostHeader}>
        <h3 className={styles.blogIndexPostTitle}>{title}</h3>
      </header>
      <p className={styles.blogIndexPostExcerpt}>{excerpt}</p>
      <span className={styles.blogIndexPostDate}>{date}</span>
    </Link>
  </article>
);

export default BlogIndexPost;
