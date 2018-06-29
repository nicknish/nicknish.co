import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../scss/index.scss';

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: data.site.siteMetadata.site_description
        },
        { name: 'keywords', content: data.site.siteMetadata.site_keywords }
      ]}
    />
    <Header blogUrl={data.site.siteMetadata.blog_url} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0
      }}
    >
      {children()}
    </div>
    <Footer
      socialMediaUrls={{
        github: data.site.siteMetadata.github_url,
        linkedin: data.site.siteMetadata.linkedin_url,
        twitter: data.site.siteMetadata.twitter_url
      }}
    />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        site_description
        site_keywords
        blog_url
        github_url
        linkedin_url
        twitter_url
      }
    }
  }
`;
