/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const ShowTemplate = path.resolve(`${__dirname}/src/templates/Show.jsx`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: ShowTemplate,
        context: {
          id: node.id
        } // additional data can be passed via context
      });
    });
  });
};
