import React from 'react';
import { graphql } from 'gatsby';
import { SEOTypes, getShareImageFromData } from '../components/Layout/SEO';
import Layout from '../components/Layout/Layout';

import BlogPost from '../components/Blog/BlogPost';

export const BlogAmpPostTemplate = ({ data, path }) => {
  const { body, description } = data.post;
  const {
    shareImage,
    shareImageWidth,
    shareImageHeight
  } = getShareImageFromData(data.post.shareImage);

  return (
    <Layout
      type={SEOTypes.post}
      path={path}
      content={{
        ...data.post,
        description: description
          ? description.childMarkdownRemark.excerpt
          : body.childMarkdownRemark.excerpt,
        shareImage,
        shareImageWidth,
        shareImageHeight
      }}
    >
      <BlogPost {...data.post} />
    </Layout>
  );
};

export const query = graphql`
  query BlogAmpPost($id: String!) {
    post: contentfulPost(id: { eq: $id }) {
      title
      date(formatString: "MMM D, YYYY")
      body {
        childMarkdownRemark {
          excerpt
          ...Markdown
        }
      }
      description {
        childMarkdownRemark {
          excerpt(pruneLength: 160)
        }
      }
      shareImage {
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
      }
      publishedDate: date
      tags
    }
  }
`;

export default BlogAmpPostTemplate;
