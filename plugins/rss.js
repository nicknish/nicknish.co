const siteConfig = require('../siteConfig');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: siteConfig.siteTitle,
            match: '^/blog/',
            serialize({ query }) {
              const siteMetadata = query.site.siteMetadata;

              return query.allContentfulPost.edges.map(({ node }) => {
                const description = node.description
                  ? node.description.childMarkdownRemark
                  : node.body.childMarkdownRemark;

                return {
                  date: node.publishDate,
                  title: node.title,
                  description: description.excerpt,
                  url: siteMetadata.site_url + '/blog/' + node.slug,
                  guid: siteMetadata.site_url + '/blog/' + node.slug,
                  custom_elements: [
                    {
                      'content:encoded': description.html
                    }
                  ]
                };
              });
            },
            query: `
              {
                allContentfulPost(
                  limit: 1000, 
                  sort: { fields: [date], order: DESC }
                ) {
                  edges {
                    node {
                      title
                      slug
                      date(formatString: "MMM D, YYYY")
                      body {
                        childMarkdownRemark {
                          html
                          excerpt(pruneLength: 160)
                        }
                      }
                      description {
                        childMarkdownRemark {
                          html
                          excerpt(pruneLength: 160)
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml'
          }
        ]
      }
    }
  ]
};
