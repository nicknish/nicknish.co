import React from 'react';
import shortid from 'shortid';

const addKeys = (arr = [], propName) =>
  arr.map(item => ({ key: shortid.generate(), [propName]: item }));

export const BlogPost = ({ data }) => {
  const { id, slug, title, tags, date, body } = data.post;

  const tagsWithKeys = tags && tags.length ? addKeys(tags, 'tag') : [];
  const tagElems = tagsWithKeys.map(tag => (
    <span className="blogPost-tag" key={tag.key}>
      {tag.tag}
    </span>
  ));

  return (
    <div className="page post container">
      <header className="post-header">
        <h1>{title}</h1>
        <span className="post-date">{date}</span>
      </header>

      <div
        className="post-body"
        dangerouslySetInnerHTML={{
          __html: body.childMarkdownRemark.html
        }}
      />

      <div className="blogPost-tags u-clearfix">{tagElems}</div>
    </div>
  );
};

export const query = graphql`
  query BlogPost($id: String!) {
    post: contentfulPost(id: { eq: $id }) {
      id
      slug
      title
      date(formatString: "MMMM DD, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default BlogPost;
