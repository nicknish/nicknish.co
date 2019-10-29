import React from 'react';
import { graphql } from 'gatsby';
import { SEOTypes } from '../components/Layout/SEO';
import Layout from '../components/Layout/Layout';

import BlogPost from '../components/Blog/BlogPost';

const getShareImage = image => {
  if (!image) {
    return {};
  }

  const shareImage = image.file.url;
  const shareImageWidth = image.file.details.image.width;
  const shareImageHeight = image.file.details.image.height;

  return { shareImage, shareImageWidth, shareImageHeight };
};

export const BlogPostTemplate = ({ data, path }) => {
  const { body, description } = data.post;
  const { shareImage, shareImageWidth, shareImageHeight } = getShareImage(
    data.post.shareImage
  );

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
  query BlogPost($id: String!) {
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

export default BlogPostTemplate;
