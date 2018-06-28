module.exports = {
  // Add site metadata which can be grabbed from GraphQL
  siteMetadata: {
    title: `Nick Nish - Developer & Startup Boy`,
    site_description: `Nick Nish's Portfolio and Blog. Learn about life, love, and business as a millennial.`,
    site_keywords: `developer, business, millennial`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },
  ],
}
