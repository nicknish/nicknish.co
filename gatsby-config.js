const autoprefixer = require('autoprefixer');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const config = require('./src/utils/siteConfig');

module.exports = {
  siteMetadata: {
    blogUrl: config.blogUrl,
    resumeUrl: config.resumeUrl,
    seo: {
      url: config.url,
      title: config.title,
      description: config.description,
      keywords: config.keywords
    },
    social: {
      github: config.githubUrl,
      linkedin: config.linkedinUrl,
      twitter: config.twitterUrl,
      twitterUsername: config.twitterUsername
    }
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
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
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
                url
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
