module.exports = config => ({
  plugins: [
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/work/`, `/blog/`, `/blog/*`]
      }
    }
  ]
});
