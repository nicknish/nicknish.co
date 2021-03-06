import React, { useRef } from 'react';
import shortid from 'shortid';

import Page from '../../Layout/Page';
import Comments from '../Comments';
import 'prismjs/themes/prism-tomorrow.css';
import styles from './BlogPost.module.css';
import BlogPostNewsletterSignup from '../BlogPostNewsletterSignup';
import { useMediumZoom } from './BlogPostHooks';

const addKeys = (arr = [], propName: string) =>
  arr.map(item => ({ key: shortid.generate(), [propName]: item }));

interface IBlogPostProps {
  title: string;
  date: string;
  body: any;
  tags: any;
}

const BlogPost: React.FC<IBlogPostProps> = ({ title, date, body, tags }) => {
  const postBodyRef = useRef();
  useMediumZoom(postBodyRef);

  const tagsWithKeys = tags && tags.length ? addKeys(tags, 'tag') : [];
  const tagElems = tagsWithKeys.map(tag => (
    <span className={styles.blogPostTag} key={tag.key}>
      {tag.tag}
    </span>
  ));

  return (
    <Page className="post container">
      <header className={styles.postHeader}>
        <h1 className={styles.postTitle}>{title}</h1>
        <span className={styles.postDate}>{date}</span>
      </header>

      <div
        ref={postBodyRef}
        className={styles.postBody}
        dangerouslySetInnerHTML={{
          __html: body.childMarkdownRemark.html
        }}
      />

      <div className={styles.blogPostTags}>{tagElems}</div>

      <BlogPostNewsletterSignup className={styles.newsletter} />
      <Comments />
    </Page>
  );
};

export default BlogPost;
