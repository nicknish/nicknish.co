require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  // Add site metadata which can be grabbed from GraphQL
  siteMetadata: {
    title: `Nick Nish - Developer & Startup Boy`,
    site_description: `Nick Nish's Portfolio and Blog. Learn about life, love, and business as a millennial.`,
    site_keywords: `developer, business, millennial`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
