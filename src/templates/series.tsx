import React from 'react';
import { Link, graphql } from 'gatsby';
import sortBy from 'lodash/sortBy';
import Layout from '../components/layout';
import Page from '../components/Layout/Page';

import styles from '../css/Series.module.css';
import { SEOTypes } from '../components/SEO';

const POST_URL_BASE = slug => `/blog/${slug}`;

export const Series = ({ data, path }) => {
  const posts = sortBy(data.series.posts, 'date');

  return (
    <Layout
      type={SEOTypes.post}
      path={path}
      content={{
        title: data.series.title,
        excerpt: data.series.description.childMarkdownRemark.excerpt
      }}
    >
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
    </Layout>
  );
};

export const query = graphql`
  query SeriesQuery($slug: String!) {
    series: contentfulSeries(slug: { eq: $slug }) {
      title
      description {
        childMarkdownRemark {
          excerpt
          ...Markdown
        }
      }
      posts {
        id
        title
        slug
        date(formatString: "MMM D, YYYY")
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  }
`;

export default Series;
