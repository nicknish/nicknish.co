import React from 'react';
import { graphql } from 'gatsby';
import { SEOTypes } from '../components/Layout/SEO';
import { HOME_URL } from '../constants/urls';
import Layout from '../components/Layout/Layout';
import Blog from '../components/Blog';

const Homepage = ({ data }) => {
  return (
    <Layout type={SEOTypes.page} content={{}} path={HOME_URL}>
      <Blog data={data} />
    </Layout>
  );
};

export const query = graphql`
  query IndexQuery {
    popularPosts: contentfulPopularPosts(
      title: { eq: "Blog Index Popular Posts" }
    ) {
      title
      posts {
        description {
          childMarkdownRemark {
            excerpt(pruneLength: 90)
          }
        }
        body {
          childMarkdownRemark {
            excerpt(pruneLength: 90)
          }
        }
        date(formatString: "MMM D, YYYY")
        title
        slug
      }
    }

    posts: allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          slug
          date(formatString: "MMM D, YYYY")
          title
          body {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }

    series: allContentfulSeries {
      edges {
        node {
          id
          slug
          title
          previewImage {
            sizes {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`;

export default Homepage;
