module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken:
          process.env.NODE_ENV === 'development'
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENV,
        host:
          process.env.NODE_ENV === 'development'
            ? process.env.CONTENTFUL_PREVIEW_ENDPOINT
            : process.env.CONTENTFUL_PRODUCTION_ENDPOINT
      }
    }
  ]
};
