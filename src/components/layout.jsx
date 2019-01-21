import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import '../scss/index.scss';

const query = graphql`
  query LayoutQuery {
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

const Layout = ({ children, location }) => (
  <StaticQuery
    query={query}
    render={data => (
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
        <main className="site-content">{children}</main>
        <Footer
          socialMediaUrls={{
            github: data.site.siteMetadata.github_url,
            linkedin: data.site.siteMetadata.linkedin_url,
            twitter: data.site.siteMetadata.twitter_url
          }}
        />
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;
