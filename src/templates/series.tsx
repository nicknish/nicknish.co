import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';

import { SEOTypes } from '../components/Layout/SEO';
import BlogPostSeries from '../components/Blog/BlogPostSeries';

export const BlogPostSeriesTemplate = ({ data, path }) => {
  return (
    <Layout
      type={SEOTypes.post}
      path={path}
      content={{
        title: data.series.title,
        excerpt: data.series.description.childMarkdownRemark.excerpt
      }}
    >
      <BlogPostSeries data={data} />
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

export default BlogPostSeriesTemplate;
