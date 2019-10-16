const proxy = require('http-proxy-middleware');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const config = require('./siteConfig');

const filesystem = require('./plugins/filesystem');
const sources = require('./plugins/sources');
const markdown = require('./plugins/markdown');
const analytics = require('./plugins/analytics');
const site = require('./plugins/site');
const typescript = require('./plugins/typescript');
const css = require('./plugins/css');
const images = require('./plugins/images');
const typography = require('./plugins/typography.js');
const netlify = require('./plugins/netlify');

module.exports = {
  siteMetadata: config,
  plugins: [
    ...typescript.plugins,
    ...site(config).plugins,
    ...css.plugins,
    ...typography.plugins,
    ...images.plugins,
    ...filesystem.plugins,
    ...sources.plugins,
    ...markdown.plugins,
    ...analytics.plugins,
    ...netlify.plugins // MUST BE LAST
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
