import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import BlogIndexPost from '../BlogIndexPost';

import styles from './Blog.module.css';
import NewsletterSignupForm from '../NewsletterSignupForm';

const BlogNewsletterSignupForm = () => (
  <>
    <p>Signup for the newsletter to keep up to date!</p>
    <NewsletterSignupForm />
  </>
);

const cleanupData = data => {
  return data.edges.map(({ node }) => node);
};

const Blog = ({ data }) => {
  const posts = cleanupData(data.posts);
  const series = cleanupData(data.series);

  return (
    <>
      <header
        className={cx(styles.container, styles.hero)}
        data-testid="BlogHeader"
      >
        <h1 className={styles.pageTitle}>Hi, I'm Nick Nish.</h1>
        <p className={styles.pageSubtitle}>
          Welcome to my blog where you'll find articles on learning to code,
          React, JavaScript, and thoughts on tech and products.
        </p>
        <BlogNewsletterSignupForm />
      </header>

      <div
        className={cx(
          styles.blogIndexPostsAndSeriesContainer,
          styles.containerLg
        )}
      >
        <section className={styles.blogIndexPosts}>
          <header className={styles.blogIndexSectionTitle}>
            <h2 className={styles.sectionTitle}>Latest Posts</h2>
          </header>
          {posts.map(data => {
            const path = `/blog/${data.slug}`;

            return (
              <BlogIndexPost
                key={data.id}
                to={path}
                title={data.title}
                date={data.date}
                excerpt={data.body.childMarkdownRemark.excerpt}
              />
            );
          })}
        </section>

        <section className={styles.blogIndexSeries}>
          <header className={styles.blogIndexSectionTitle}>
            <h2 className={styles.sectionTitle}>Series</h2>
          </header>

          {series.map(data => {
            const path = `/series/${data.slug}`;
            const Image = data.previewImage && (
              <div>
                <Img
                  sizes={data.previewImage.sizes}
                  style={{ position: 'absolute' }}
                  className={styles.seriesPreviewBg}
                />
                <div className={styles.seriesPreviewBgOverlay} />
              </div>
            );

            return (
              <article
                key={path}
                className={styles.seriesPreview}
                data-testid="BlogSeriesLink"
              >
                <Link to={path} className={styles.seriesPreviewLinkWrapper}>
                  {Image}
                  <h3 className={styles.seriesPreviewTitle}>{data.title}</h3>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Blog;
