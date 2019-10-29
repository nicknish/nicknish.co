import React from 'react';
import { Link } from 'gatsby';
import sortBy from 'lodash/sortBy';
import Page from '../../Layout/Page';

import styles from './BlogPostSeries.module.css';

const POST_URL_BASE = slug => `/blog/${slug}`;

const BlogPostSeries = ({ data }) => {
  const posts = sortBy(data.series.posts, 'date');

  return (
    <Page className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{data.series.title}</h1>
        {data.series.description && (
          <div
            className="page-subtitle"
            dangerouslySetInnerHTML={{
              __html: data.series.description.childMarkdownRemark.html
            }}
          />
        )}
      </header>

      {posts.map(post => (
        <Link
          to={POST_URL_BASE(post.slug)}
          className={styles.postPreview}
          key={post.id}
          data-testid="BlogSeriesPageLink"
        >
          <article>
            <h2 className={styles.postPreviewTitle}>{post.title}</h2>
            <p className={styles.postPreviewExcerpt}>
              {post.body.childMarkdownRemark.excerpt}
            </p>

            <span className={styles.postPreviewDate}>{post.date}</span>
          </article>
        </Link>
      ))}
    </Page>
  );
};

export default BlogPostSeries;
