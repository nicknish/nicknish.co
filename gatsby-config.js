const proxy = require('http-proxy-middleware');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const config = require('./src/utils/siteConfig');

const filesystem = require('./plugins/filesystem');
const sources = require('./plugins/sources');
const markdown = require('./plugins/markdown');
const analytics = require('./plugins/analytics');
const site = require('./plugins/site');
const css = require('./plugins/css');
const images = require('./plugins/images');
const netlify = require('./plugins/netlify');

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    title: config.title,
    site_description: config.site_description,
    site_keywords: config.site_keywords,
    blog_url: config.blog_url,
    github_url: config.github_url,
    linkedin_url: config.linkedin_url,
    twitter_url: config.twitter_url,
    resume_url: config.resume_url
  },
  plugins: [
    ...site(config).plugins,
    ...css.plugins,
    ...images.plugins,
    ...filesystem.plugins,
    ...sources.plugins,
    ...markdown.plugins,
    ...analytics.plugins,
    // MUST BE LAST (?)
    ...netlify.plugins
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    );
  }
};
