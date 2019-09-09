import React from 'react';
import PropTypes from 'prop-types';

import SiteMetadata from './SiteMetadata';
import SEO, { SEOPropTypes } from './SEO';
import Header from './header';
import Footer from './footer';
import '../scss/index.scss';

const Layout = ({ children, ...seoProps }) => (
  <div className="site-container">
    <SiteMetadata />
    <SEO {...seoProps} />
    <Header />
    <main className="site-content">{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
  ...SEOPropTypes
};

export default Layout;
