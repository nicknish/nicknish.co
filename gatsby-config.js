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
    twitter_url: config.twitter_url,
    resume_url: config.resume_url
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
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: `${__dirname}/src/images/favicon.png`,
        // WebApp Manifest Configuration
        appName: 'Nick Nish', // Inferred with your package.json
        appDescription: config.site_description,
        developerName: 'Nick Nish',
        developerURL: config.siteUrl,
        dir: 'auto',
        lang: 'en-US',
        background: '#ff8061',
        theme_color: '#ff8061',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
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
