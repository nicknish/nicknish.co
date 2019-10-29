const path = require('path');

const PATH_TYPE = {
  PROJECTS: 'projects',
  WORK: 'work',
  SERIES: 'series',
  BLOG: 'blog'
};

const PATH_URL_MAP = {
  [PATH_TYPE.PROJECTS]: 'projects',
  [PATH_TYPE.WORK]: 'work',
  [PATH_TYPE.BLOG]: 'blog',
  [PATH_TYPE.SERIES]: 'series'
};

const generatePathName = (type, slug) => {
  return `${PATH_URL_MAP[type]}/${slug}`;
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const WorkPage = path.resolve(`./src/templates/work.tsx`);
  const ProjectPage = path.resolve(`./src/templates/project.tsx`);
  const BlogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`);
  const BlogAmpPostTemplate = path.resolve(`./src/templates/blogPost.amp.tsx`);
  const SeriesBlogPostTemplate = path.resolve(`./src/templates/series.tsx`);

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
          path: generatePathName(PATH_TYPE.PROJECTS, node.slug),
          component: ProjectPage,
          context: { slug: node.slug }
        });
      });

      result.data.work.edges.forEach(({ node }) => {
        createPage({
          path: generatePathName(PATH_TYPE.WORK, node.slug),
          component: WorkPage,
          context: { slug: node.slug }
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
        const path = generatePathName(PATH_TYPE.BLOG, node.slug);

        createPage({
          path,
          component: BlogPostTemplate,
          context: { id: node.id }
        });

        createPage({
          path: `${path}/amp`,
          component: BlogAmpPostTemplate,
          context: { id: node.id }
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
          path: generatePathName(PATH_TYPE.SERIES, node.slug),
          component: SeriesBlogPostTemplate,
          context: { slug: node.slug }
        });
      });

      resolve();
    });
  });

  return Promise.all([loadPages, loadPosts, loadSeries]);
};
