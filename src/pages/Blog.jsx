import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import BlogIndexPost from '../components/BlogIndexPost';

export const Blog = ({ data }) => (
  <div className="page">
    <header className="container hero">
      <h1 className="page-title">Blog</h1>
      <p className="page-subtitle">
        Welcome to my blog. I write about software development, business, and
        living a good life here.{' '}
        <a href={data.site.siteMetadata.blog_url}>
          Click here for previous blog
        </a>.
      </p>
    </header>

    <div className="blogIndex-postsAndSeriesContainer container--lg">
      <section className="blogIndex-posts">
        <header className="blogIndex-sectionTitle">
          <h2 className="section-title">Latest Posts</h2>
        </header>
        {data.posts.edges.map(({ node }) => {
          const path = `blog/${node.slug}`;

          return (
            <BlogIndexPost
              key={node.id}
              to={path}
              title={node.title}
              date={node.date}
              excerpt={node.body.childMarkdownRemark.excerpt}
            />
          );
        })}
      </section>

      <section className="blogIndex-series">
        <header className="blogIndex-sectionTitle">
          <h2 className="section-title">Series</h2>
        </header>

        {data.series.edges.map(({ node }) => {
          const path = `series/${node.slug}`;
          const Image = node.previewImage && (
            <div>
              <Img
                sizes={node.previewImage.sizes}
                style={{ position: 'absolute' }}
                className="seriesPreview-bg"
              />
              <div className="seriesPreview-bgOverlay" />
            </div>
          );

          return (
            <article className="seriesPreview">
              <Link to={path} className="seriesPreview-linkWrapper">
                {Image}
                <h3 className="seriesPreview-title">{node.title}</h3>
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  </div>
);

export const query = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        blog_url
      }
    }

    posts: allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          slug
          date(formatString: "MMMM DD, YYYY")
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

export default Blog;
