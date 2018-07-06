import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../scss/index.scss';

const Layout = ({ children, data, location }) => (
  <div className="site-container">
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
    <Header />
    <main className="site-content">{children()}</main>
    <Footer
      pathName={location.pathname}
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
        github_url
        linkedin_url
        twitter_url
      }
    }
  }
`;
