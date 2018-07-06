import React from 'react';
import Link from 'gatsby-link';
import sortBy from 'lodash/sortBy';

const POST_URL_BASE = slug => `/blog/${slug}`;

export const Series = ({ data }) => {
  const posts = sortBy(data.series.posts, 'date');

  return (
    <section className="page container">
      <header className="hero">
        <h1 className="page-title">{data.series.title}</h1>
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
        <article className="postPreview" key={post.id}>
          <Link to={POST_URL_BASE(post.slug)} className="postPreview-header">
            <h2 className="postPreview-title">{post.title}</h2>
            <p className="postPreview-excerpt">
              {post.body.childMarkdownRemark.excerpt}
            </p>
          </Link>

          <span className="postPreview-date">{post.date}</span>
        </article>
      ))}
    </section>
  );
};

export const query = graphql`
  query SeriesQuery($slug: String!) {
    series: contentfulSeries(slug: { eq: $slug }) {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      posts {
        id
        title
        slug
        date(formatString: "MMMM DD, YYYY")
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
