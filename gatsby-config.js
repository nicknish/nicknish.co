const autoprefixer = require('autoprefixer');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const config = require('./src/utils/siteConfig');

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    title: config.title,
    site_description: config.site_description,
    site_keywords: config.site_keywords,
    blog_url: config.blog_url,
    github_url: config.github_url,
    linkedin_url: config.linkedin_url,
    twitter_url: config.twitter_url
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images'
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENV
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          `gatsby-remark-copy-linked-files`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: []
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`${__dirname}/src/pages/Thanks.jsx`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ]
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify` // MUST BE LAST
  ]
};
