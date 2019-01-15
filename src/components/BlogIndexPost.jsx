import React from 'react';
import { Link } from 'gatsby';

export const BlogIndexPost = ({ to, title, date, excerpt }) => (
  <article className="blogIndex-post">
    <Link to={to} className="blogIndex-postLinkWrapper">
      <header className="blogIndex-postHeader">
        <h3 className="blogIndex-postTitle">{title}</h3>
      </header>
      <p className="blogIndex-postExcerpt">{excerpt}</p>
      <span className="blogIndex-postDate">{date}</span>
    </Link>
  </article>
);

export default BlogIndexPost;
