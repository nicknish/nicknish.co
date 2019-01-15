const path = require('path');
const ShowTemplate = path.resolve(`${__dirname}/src/templates/show.jsx`);
const BlogPostTemplate = path.resolve(
  `${__dirname}/src/templates/blogPost.jsx`
);
const SeriesTemplate = path.resolve(`${__dirname}/src/templates/series.jsx`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        markdownPosts: allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                path
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) return reject(result.errors);

      result.data.markdownPosts.edges.forEach(({ node }) => {
        if (node.frontmatter.path) {
          createPage({
            path: node.frontmatter.path,
            component: ShowTemplate,
            context: {
              id: node.id
            }
          });
        }
      });

      resolve();
    });
  });

  const loadPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        blogPosts: allContentfulPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) return reject(result.errors);

      result.data.blogPosts.edges.forEach(({ node }) => {
        createPage({
          path: `blog/${node.slug}`,
          component: BlogPostTemplate,
          context: {
            id: node.id
          }
        });
      });

      resolve();
    });
  });

  const loadSeries = new Promise((resolve, reject) => {
    graphql(`
      {
        series: allContentfulSeries {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) return reject(result.errors);

      result.data.series.edges.forEach(({ node }) => {
        createPage({
          path: `series/${node.slug}`,
          component: SeriesTemplate,
          context: {
            slug: node.slug
          }
        });
      });

      resolve();
    });
  });

  return Promise.all([loadPages, loadPosts, loadSeries]);
};
