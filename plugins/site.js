module.exports = config => ({
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`${__dirname}/../src/pages/Thanks.jsx`],
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
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: `${__dirname}/../src/images/favicon.png`,
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
    }
  ]
});
