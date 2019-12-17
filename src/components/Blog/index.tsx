import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import BlogIndexPost from '../BlogIndexPost';
import BlogPopularPost from './BlogPopularPost';
import NewsletterSignupForm from '../NewsletterSignup/Form';
import {
  createPath,
  BLOG_URL,
  SERIES_URL,
  START_HERE_URL
} from '../../constants/urls';
import { cleanupData } from '../../utils/helpers';

import styles from './Blog.module.css';

const BlogNewsletterSignupForm = () => (
  <>
    <p>Signup for the newsletter to keep up to date!</p>
    <NewsletterSignupForm />
  </>
);

const Blog = ({ data }) => {
  const popularPosts = data.popularPosts.posts;
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
          Welcome to my blog where you'll find writing on ideas, tutorials, and
          resources ranging on topics like startups, making products, and
          software engineering.
        </p>
        <p className="mb2">
          👉{' '}
          <Link
            to={START_HERE_URL}
            className="b"
            data-testid="BlogHeader-startHereLink"
          >
            Start Here
          </Link>
        </p>
        <p className="ma0">👇 Or check out my latest writing</p>
      </header>

      <section className={styles.popularPostsSection}>
        <header className={styles.blogIndexSectionTitle}>
          <h2 className={styles.sectionTitle}>Popular Posts</h2>
        </header>

        <div className={styles.popularPosts}>
          {popularPosts.map((data, idx) => {
            const path = createPath(BLOG_URL, data.slug);

            return (
              <BlogPopularPost
                key={data.id}
                idx={idx}
                length={popularPosts.length}
                path={path}
                title={data.title}
                description={
                  data.description
                    ? data.description.childMarkdownRemark.excerpt
                    : data.body.childMarkdownRemark.excerpt
                }
                date={data.date}
              />
            );
          })}
        </div>
      </section>

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
            const path = createPath(SERIES_URL, data.slug);
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
