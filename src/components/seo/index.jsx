import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const query = graphql`
  {
    site {
      siteMetadata {
        seo {
          url
          title
          description
          keywords
        }
        social {
          twitterUsername
        }
      }
    }
  }
`;

const SEO = ({}) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          seo: { url, title, description, keywords },
          social: { twitterUsername }
        }
      }
    }) => {
      const metaTitle = props.title || title;
      const metaDescription = props.description || description;
      const metaUrl = props.pathname ? props.url + props.pathname : url;
      const metaImage = props.thumbnail && props.thumbnail;

      return (
        <Helmet
          title={metaTitle}
          meta={[
            { name: 'title', content: metaTitle },
            { name: 'description', content: metaDescription },
            { name: 'keywords', content: keywords },
            { name: 'robots', content: 'index, follow' },

            // OpenGraph (Facebook)
            { property: 'og:site_name', content: props.title },
            { property: 'og:title', content: metaTitle },
            { property: 'og:url', content: metaUrl },
            { property: 'og:image', content: metaImage },
            { property: 'og:image:secure_url', content: metaImage },
            { property: 'og:description', content: metaDescription },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:locale', content: 'en' },
            { property: 'og:type', content: 'website' },

            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: metaTitle },
            { name: 'twitter:description', content: metaDescription },
            { name: 'twitter:image', content: metaImage },
            { name: 'twitter:creator', content: twitterUsername }
          ]}
        />
      );
    }}
  />
);

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any
    })
  }),
  postImage: PropTypes.string
};

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null
};

export default SEO;
