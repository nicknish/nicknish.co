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
    render={({
      site: {
        siteMetadata: {
          title,
          site_description,
          site_keywords,
          github_url,
          linkedin_url,
          twitter_url
        }
      }
    }) => (
      <div className="site-container">
        <Helmet
          title={title}
          meta={[
            {
              name: 'description',
              content: site_description
            },
            { name: 'keywords', content: site_keywords }
          ]}
        />
        <Header />
        <main className="site-content">{children}</main>
        <Footer
          socialMediaUrls={{
            github: github_url,
            linkedin: linkedin_url,
            twitter: twitter_url
          }}
        />
      </div>
    )}
  />
);

export default Layout;
