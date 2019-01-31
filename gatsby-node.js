const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const WorkPage = path.resolve(`./src/templates/work.jsx`);
  const ProjectPage = path.resolve(`./src/templates/project.jsx`);

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        projects: allContentfulProject {
          edges {
            node {
              slug
            }
          }
        }
        work: allContentfulWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) return reject(result.errors);

      result.data.projects.edges.forEach(({ node }) => {
        createPage({
          path: `projects/${node.slug}`,
          component: ProjectPage,
          context: {
            slug: node.slug
          }
        });
      });

      result.data.work.edges.forEach(({ node }) => {
        createPage({
          path: `work/${node.slug}`,
          component: WorkPage,
          context: {
            slug: node.slug
          }
        });
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
          component: path.resolve(`./src/templates/blogPost.jsx`),
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
          component: path.resolve(`./src/templates/series.jsx`),
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
