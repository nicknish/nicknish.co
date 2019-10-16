const autoprefixer = require('autoprefixer');
const customMedia = require('postcss-custom-media');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [customMedia(), autoprefixer()]
      }
    }
  ]
};
