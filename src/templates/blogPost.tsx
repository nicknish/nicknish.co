import React from 'react';
import { graphql } from 'gatsby';
import shortid from 'shortid';
import { SEOTypes } from '../components/SEO';
import Layout from '../components/layout';
import Page from '../components/layout/page';

import styles from '../css/BlogPost.module.css';

const addKeys = (arr = [], propName) =>
  arr.map(item => ({ key: shortid.generate(), [propName]: item }));

export const BlogPost = ({ data, path }) => {
  const { title, tags, date, body } = data.post;

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
        excerpt: body.childMarkdownRemark.excerpt,
        ...data.post
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
      publishedDate: date
      tags
    }
  }
`;

export default BlogPost;
