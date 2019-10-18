import React from 'react';
import { graphql } from 'gatsby';
import shortid from 'shortid';
import { SEOTypes } from '../components/SEO';
import Layout from '../components/layout';
import Page from '../components/layout/page';

import styles from '../css/BlogPost.module.css';

const addKeys = (arr = [], propName: string) =>
  arr.map(item => ({ key: shortid.generate(), [propName]: item }));

const getShareImage = image => {
  if (!image) {
    return {};
  }

  const shareImage = image.file.url;
  const shareImageWidth = image.file.details.image.width;
  const shareImageHeight = image.file.details.image.height;

  return { shareImage, shareImageWidth, shareImageHeight };
};

export const BlogPost = ({ data, path }) => {
  const { title, tags, date, body, description } = data.post;
  const { shareImage, shareImageWidth, shareImageHeight } = getShareImage(
    data.post.shareImage
  );

  const tagsWithKeys = tags && tags.length ? addKeys(tags, 'tag') : [];
  const tagElems = tagsWithKeys.map(tag => (
    <span className={styles.blogPostTag} key={tag.key}>
      {tag.tag}
    </span>
  ));

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
      <Page className="post container">
        <header className={styles.postHeader}>
          <h1 className={styles.postTitle}>{title}</h1>
          <span className={styles.postDate}>{date}</span>
        </header>

        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{
            __html: body.childMarkdownRemark.html
          }}
        />

        <div className={styles.blogPostTags}>{tagElems}</div>
      </Page>
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

export default BlogPost;
