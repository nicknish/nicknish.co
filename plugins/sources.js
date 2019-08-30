module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENV,
        host:
          process.env.NODE_ENV === 'development'
            ? `preview.contentful.com`
            : `cdn.contentful.com`
      }
    }
  ]
};
